import React from 'react';
import { Form, Input, Typography, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const PersonalInfoForm = ({ form, setResumeData }) => {
  const handleProfilePictureChange = (info) => {
    if (info.file.status === 'done') {
      const reader = new FileReader();
      reader.onload = (e) => {
        form.setFieldsValue({ profilePicture: e.target.result });
        setResumeData((prevData) => ({
          ...prevData,
          profilePicture: e.target.result,
        }));
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  return (
    <>
      <Title level={4}>Personal Information</Title>
      <Form.Item
        name="fullName"
        label="Full Name"
        rules={[{ required: true, message: 'Please enter your full name' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="professionalTitle"
        label="Professional Title"
        rules={[
          { required: true, message: 'Please enter your professional title' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="summary"
        label="Summary"
        rules={[{ required: true, message: 'Please enter a summary' }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="email"
        label="Email"
        rules={[{ required: true, message: 'Please enter your email' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phoneNumber"
        label="Phone Number"
        rules={[{ required: true, message: 'Please enter your phone number' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="Address"
        rules={[{ required: true, message: 'Please enter your address' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="profilePicture" label="Profile Picture">
        <Upload
          name="profilePicture"
          listType="picture"
          maxCount={1}
          onChange={handleProfilePictureChange}
        >
          <Button icon={<UploadOutlined />}>Upload Profile Picture</Button>
        </Upload>
      </Form.Item>
    </>
  );
};

export default PersonalInfoForm;
