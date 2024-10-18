import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Typography, message, Row, Col, Spin } from 'antd';
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

import profilePicture from '../../assets/avatar.png';

const { Title } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState(null);
  const { userId, jwtToken } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://jobeewepappapi20241008011108.azurewebsites.net/api/Account/user?id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        message.error('Failed to fetch user data.');
      }
    };

    if (userId && jwtToken) {
      fetchUserData();
    }
  }, [userId, jwtToken]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    form.resetFields();
  };

  const handleFormSubmit = async (values) => {
    try {
      await axios.put(
        `https://jobeewepappapi20241008011108.azurewebsites.net/api/Account/${userId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      message.success('Profile updated successfully!');
      setIsEditing(false);
      setUser(values);
    } catch (error) {
      message.error('Failed to update profile.');
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
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
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              style={{ border: 'none' }}
            />
          </div>
        </Col>
      </Row>

      <Form
        form={form}
        initialValues={{
          fullName: user.fullName || 'N/A',
          email: user.email || 'N/A',
          phoneNumber: user.phoneNumber || 'N/A',
          address: user.address || 'Ho Chi Minh City, Vietnam',
          age: user.age || 'N/A',
          jobTitle: user.jobTitle || 'Software Engineer',
          description: user.description || 'N/A',
        }}
        onFinish={handleFormSubmit}
        layout="vertical"
        style={{ marginTop: '20px' }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="fullName" label="Full Name">
              <Input prefix={<UserOutlined />} disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="email" label="Email">
              <Input prefix={<MailOutlined />} disabled={!isEditing} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="phoneNumber" label="Phone Number">
              <Input prefix={<PhoneOutlined />} disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="address" label="Address">
              <Input prefix={<HomeOutlined />} disabled={!isEditing} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="age" label="Age">
              <Input prefix={<IdcardOutlined />} disabled={!isEditing} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="jobTitle" label="Job Title">
              <Input prefix={<IdcardOutlined />} disabled={!isEditing} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="description" label="Description">
          <Input.TextArea
            prefix={<FileTextOutlined />}
            disabled={!isEditing}
            rows={4}
          />
        </Form.Item>

        <div style={{ textAlign: 'center' }}>
          {isEditing ? (
            <>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: '8px' }}
              >
                Save
              </Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </>
          ) : (
            <Button
              onClick={handleEdit}
              style={{ backgroundColor: '#3B7B7A', color: 'white' }}
            >
              Edit Profile
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
};

export default Profile;
