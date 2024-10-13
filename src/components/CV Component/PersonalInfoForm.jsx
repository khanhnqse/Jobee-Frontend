import React, { useState } from 'react';
import { Form, Input, Typography, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const PersonalInfoForm = ({ form, setResumeData }) => {
  const [fileList, setFileList] = useState([]);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    console.log('Selected file:', file); // Log the selected file

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        console.log('Image loaded:', e.target.result); // Log the image data URL
        form.setFieldsValue({ profilePicture: e.target.result });
        setResumeData((prevData) => ({
          ...prevData,
          profilePicture: e.target.result,
        }));
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error); // Log any errors
      };
      reader.readAsDataURL(file);
    } else {
      console.error('No file selected');
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
        <Button icon={<UploadOutlined />}>
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        </Button>
      </Form.Item>
    </>
  );
};

export default PersonalInfoForm;
