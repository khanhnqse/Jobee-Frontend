import React, { useState } from 'react';
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Form,
  Input,
  Divider,
  Avatar,
} from 'antd';
import {
  EditOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  UserOutlined,
  IdcardOutlined,
  FileTextOutlined,
  SaveOutlined,
  CloseOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Profile = () => {
  const [form] = Form.useForm();
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicture, setProfilePicture] = useState(
    'https://via.placeholder.com/180x180'
  );

  const user = {
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    age: '30/03/2003',
    description: 'Standard user account',
    jobTitle: 'Software Engineer',
  };

  const handleEdit = () => {
    setIsEditing(true);
    form.setFieldsValue(user);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleFormSubmit = (values) => {
    console.log('Updated values:', values);
    setIsEditing(false);
    // Update user information here
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

  return (
    <div
      style={{
        backgroundColor: '#f4f5f9',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          maxWidth: '900px',
          width: '100%',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <Title level={2} style={{ color: '#333' }}>
          User Profile
        </Title>
        <Divider style={{ margin: '20px 0' }} />
        <Card
          style={{
            borderRadius: '12px',
            backgroundColor: '#f9f9f9',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Row gutter={24} justify="center">
            <Col span={24} sm={8}>
              <div style={{ textAlign: 'center' }}>
                <img
                  src={profilePicture}
                  alt="Profile"
                  style={{
                    borderRadius: '50%',
                    width: '180px',
                    height: '180px',
                    border: '4px solid #3b7b7a',
                    objectFit: 'cover',
                  }}
                />
                {!isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    style={{ marginTop: '10px' }}
                    onChange={handleProfilePictureChange}
                  />
                )}
              </div>
            </Col>

            <Col span={24} sm={16}>
              {!isEditing ? (
                <>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Title level={4} style={{ color: '#3b7b7a' }}>
                        <UserOutlined /> Full Name
                      </Title>
                      <Text style={{ fontSize: '16px' }}>{user.fullName}</Text>
                    </Col>
                    <Col span={12}>
                      <Title level={4} style={{ color: '#3b7b7a' }}>
                        <MailOutlined /> Email
                      </Title>
                      <Text style={{ fontSize: '16px' }}>{user.email}</Text>
                    </Col>
                  </Row>
                  <Row gutter={16} style={{ marginTop: '20px' }}>
                    <Col span={12}>
                      <Title level={4} style={{ color: '#3b7b7a' }}>
                        <PhoneOutlined /> Phone Number
                      </Title>
                      <Text style={{ fontSize: '16px' }}>
                        {user.phoneNumber}
                      </Text>
                    </Col>
                    <Col span={12}>
                      <Title level={4} style={{ color: '#3b7b7a' }}>
                        <CalendarOutlined /> Age
                      </Title>
                      <Text style={{ fontSize: '16px' }}>{user.age}</Text>
                    </Col>
                  </Row>
                  <Row gutter={16} style={{ marginTop: '20px' }}>
                    <Col span={12}>
                      <Title level={4} style={{ color: '#3b7b7a' }}>
                        <IdcardOutlined /> Job Title
                      </Title>
                      <Text style={{ fontSize: '16px' }}>{user.jobTitle}</Text>
                    </Col>
                    <Col span={12}>
                      <Title level={4} style={{ color: '#3b7b7a' }}>
                        <HomeOutlined /> Address
                      </Title>
                      <Text style={{ fontSize: '16px' }}>{user.address}</Text>
                    </Col>
                  </Row>
                  <Row style={{ marginTop: '20px' }}>
                    <Col span={24}>
                      <Title level={4} style={{ color: '#3b7b7a' }}>
                        <FileTextOutlined /> Description
                      </Title>
                      <Text style={{ fontSize: '16px' }}>
                        {user.description}
                      </Text>
                    </Col>
                  </Row>
                  <div style={{ marginTop: '20px' }}>
                    <Button
                      type="primary"
                      onClick={handleEdit}
                      style={{
                        backgroundColor: '#3b7b7a',
                        borderColor: '#3b7b7a',
                        color: '#fff',
                      }}
                    >
                      <EditOutlined /> Edit Profile
                    </Button>
                  </div>
                </>
              ) : (
                <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                  <Form.Item name="profilePicture" label="Profile Picture">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                    />
                  </Form.Item>
                  <Form.Item
                    name="fullName"
                    label={
                      <span>
                        <UserOutlined /> Full Name
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your full name',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label={
                      <span>
                        <MailOutlined /> Email
                      </span>
                    }
                    rules={[
                      { required: true, message: 'Please enter your email' },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    label={
                      <span>
                        <PhoneOutlined /> Phone Number
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your phone number',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="address"
                    label={
                      <span>
                        <HomeOutlined /> Address
                      </span>
                    }
                    rules={[
                      { required: true, message: 'Please enter your address' },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="age"
                    label={
                      <span>
                        <CalendarOutlined /> Age
                      </span>
                    }
                    rules={[
                      { required: true, message: 'Please enter your age' },
                    ]}
                  >
                    <Input type="number" />
                  </Form.Item>
                  <Form.Item
                    name="jobTitle"
                    label={
                      <span>
                        <IdcardOutlined /> Job Title
                      </span>
                    }
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your job title',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="description"
                    label={
                      <span>
                        <FileTextOutlined /> Description
                      </span>
                    }
                    rules={[
                      { required: true, message: 'Please enter a description' },
                    ]}
                  >
                    <Input.TextArea rows={4} />
                  </Form.Item>
                  <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        backgroundColor: '#3b7b7a',
                        borderColor: '#3b7b7a',
                        color: '#fff',
                        marginRight: '10px',
                      }}
                    >
                      <SaveOutlined /> Save Changes
                    </Button>
                    <Button
                      onClick={handleCancel}
                      style={{
                        backgroundColor: '#fff',
                        borderColor: '#ddd',
                        color: '#333',
                      }}
                    >
                      <CloseOutlined /> Cancel
                    </Button>
                  </div>
                </Form>
              )}
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
