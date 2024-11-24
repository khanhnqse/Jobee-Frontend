import React, { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Typography,
  message,
  Row,
  Col,
  Spin,
  DatePicker,
  Card,
  Descriptions,
} from 'antd';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  IdcardOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import moment from 'moment';

import defaultProfilePicture from '../../assets/avatar.png';

const { Title } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(defaultProfilePicture);
  const [loading, setLoading] = useState(true); // Loading state
  const { userId, jwtToken } = useAuth();
  const [subscription, setSubscription] = useState(null); // Subscription state

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true); // Set loading to true when starting the API call
      try {
        const response = await axios.get(
          `https://jobeeapi.azurewebsites.net/api/Account/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        if (response.data.isSuccess) {
          const userData = response.data.result;
          setUser(userData);
          setProfilePicture(userData.profilePicture || defaultProfilePicture);
          form.setFieldsValue({
            fullName: userData.fullName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
            address: userData.address,
            dob: userData.dob ? moment(userData.dob) : null,
            jobTitle: userData.jobTitle,
            description: userData.description,
          });
        } else {
          message.error(response.data.message || 'Failed to fetch user data.');
        }
      } catch (error) {
        message.error('Failed to fetch user data.');
      } finally {
        setLoading(false); // Set loading to false after the API call is complete
      }
    };

    if (userId && jwtToken) {
      fetchUserData();
    }

    // Retrieve subscription details from localStorage
    const storedSubscription = localStorage.getItem('subscription');
    if (storedSubscription) {
      setSubscription(JSON.parse(storedSubscription));
    }
  }, [userId, jwtToken, form]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
    form.setFieldsValue({
      fullName: user.fullName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      dob: user.dob ? moment(user.dob) : null,
      jobTitle: user.jobTitle,
      description: user.description,
    });
  };

  const handleFormSubmit = async (values) => {
    const updateData = {
      address: values.address,
      dob: values.dob ? values.dob.toISOString() : null,
      description: values.description,
      fullName: values.fullName,
      jobTitle: values.jobTitle,
      phoneNumber: values.phoneNumber,
      profilePicture: profilePicture,
    };

    try {
      await axios.put(
        `https://jobeeapi.azurewebsites.net/api/Account/${userId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      message.success('Profile updated successfully!');
      setIsEditing(false);
      setUser(updateData);
    } catch (error) {
      message.error('Failed to update profile.');
    }
  };

  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post(
          'https://jobeeapi.azurewebsites.net/api/Account/upload-image',
          formData,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        if (response.data.url) {
          setProfilePicture(response.data.url);
          console.log('image', response.data.url);
          message.success('Profile picture uploaded successfully!');
        } else {
          message.error(
            response.data.message || 'Failed to upload profile picture.'
          );
        }
      } catch (error) {
        message.error('Failed to upload profile picture.');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center my-96">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '800px',
        margin: '0 auto',
        backgroundColor: '#f0f2f5',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Title level={2} style={{ textAlign: 'center' }}>
        Profile
      </Title>
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          <img
            src={profilePicture}
            alt="Profile"
            style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              border: '4px solid #3B7B7A',
              objectFit: 'cover',
              display: 'block',
              margin: '0 auto',
            }}
          />
          {isEditing && (
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                style={{ border: 'none' }}
              />
            </div>
          )}
        </Col>
      </Row>

      <Form
        form={form}
        onFinish={handleFormSubmit}
        layout="vertical"
        style={{ marginTop: '20px' }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="fullName" label="Full Name">
              <Input prefix={<UserOutlined />} readOnly={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="email" label="Email">
              <Input prefix={<MailOutlined />} readOnly={!isEditing} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="phoneNumber" label="Phone Number">
              <Input prefix={<PhoneOutlined />} readOnly={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="address" label="Address">
              <Input prefix={<HomeOutlined />} readOnly={!isEditing} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="dob" label="Date of Birth">
              <DatePicker
                style={{ width: '100%' }}
                disabled={!isEditing}
                format="YYYY-MM-DD"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="jobTitle" label="Job Title">
              <Input prefix={<IdcardOutlined />} readOnly={!isEditing} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="description" label="Description">
          <Input.TextArea
            prefix={<FileTextOutlined />}
            readOnly={!isEditing}
            rows={4}
          />
        </Form.Item>

        {isEditing && (
          <div style={{ textAlign: 'center' }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: '8px' }}
            >
              Save
            </Button>
            <Button type="button" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}
      </Form>

      {!isEditing && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Button
            type="button"
            onClick={handleEdit}
            style={{ backgroundColor: '#3B7B7A', color: 'white' }}
          >
            Edit Profile
          </Button>
        </div>
      )}

      {/* Subscription Details */}
      {subscription && subscription.planName !== 'normal' && (
        <Card
          title="Subscription Details"
          bordered={false}
          style={{
            marginTop: '20px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            background:
              'linear-gradient(to right, rgba(59, 123, 122, 0.8), rgba(234, 227, 195, 0.8))', // Transparent gradient background
          }}
        >
          <Descriptions column={1}>
            <Descriptions.Item label="Plan Name">
              {subscription.plan.planName}
            </Descriptions.Item>
            <Descriptions.Item label="Start Date">
              {moment(subscription.startDate).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="End Date">
              {moment(subscription.endDate).format('YYYY-MM-DD')}
            </Descriptions.Item>
            <Descriptions.Item label="Duration">
              {subscription.plan.duration} months
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
    </div>
  );
};

export default Profile;
