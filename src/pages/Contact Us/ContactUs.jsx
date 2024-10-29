import React, { useState } from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  message,
} from 'antd';
import { Link } from 'react-router-dom';
import contact from '../../assets/contact.png';
import TextArea from 'antd/es/input/TextArea';

const { Title, Text } = Typography;

const ContactUs = () => {
  const [result, setResult] = useState('');

  const onSubmit = async (values) => {
    setResult('Sending...');

    const formData = new FormData();
    formData.append('name', `${values.firstName} ${values.lastName}`);
    formData.append('email', values.email);
    formData.append('role', values.role);
    formData.append('management_level', values.managementLevel);
    formData.append('company', values.company);
    formData.append('phone', values.phone);
    formData.append('message', values.message);
    formData.append('access_key', 'f172babe-4c28-4c65-b854-6a4134d7fb6c');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult('Form Submitted Successfully');
        message.success('Your message has been sent!');
      } else {
        setResult(data.message);
        message.error('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResult('An error occurred. Please try again later.');
      message.error('An error occurred. Please try again later.');
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#eae4c4',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: '50px 0',
      }}
    >
      <div
        style={{
          width: '80%',
          maxWidth: '1440px',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Row style={{ marginTop: '50px' }}>
          <Col span={12} offset={2}>
            <Title level={1} style={{ fontSize: '36px', fontWeight: '600' }}>
              Contact our team for collaboration
            </Title>
            <Text style={{ fontSize: '20px', color: '#666' }}>
              Become a client and unlock a vast pool of qualified candidates
              with our special offer.
            </Text>
            <Text style={{ fontSize: '16px', color: '#999' }}>
              *All fields are required
            </Text>

            {/* Ant Design Form for input fields */}
            <Form layout="vertical" onFinish={onSubmit}>
              <Form.Item
                label="Work email"
                name="email"
                rules={[
                  { required: true, message: 'Please enter your email!' },
                  { type: 'email', message: 'The input is not valid E-mail!' },
                ]}
              >
                <Input
                  placeholder="Work email"
                  style={{ marginTop: '15px', height: '50px' }}
                />
              </Form.Item>

              <Form.Item
                label="Function / Role"
                name="role"
                rules={[{ required: true, message: 'Please enter your role!' }]}
              >
                <Input
                  placeholder="Function / Role"
                  style={{ marginTop: '15px', height: '50px' }}
                />
              </Form.Item>

              <Form.Item
                label="Management level"
                name="managementLevel"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your management level!',
                  },
                ]}
              >
                <Input
                  placeholder="Management level"
                  style={{ marginTop: '15px', height: '50px' }}
                />
              </Form.Item>

              <Form.Item
                label="Company name"
                name="company"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your company name!',
                  },
                ]}
              >
                <Input
                  placeholder="Company name"
                  style={{ marginTop: '15px', height: '50px' }}
                />
              </Form.Item>

              <Form.Item
                label="First name"
                name="firstName"
                rules={[
                  { required: true, message: 'Please enter your first name!' },
                ]}
              >
                <Input
                  placeholder="First name"
                  style={{ marginTop: '15px', height: '50px' }}
                />
              </Form.Item>

              <Form.Item
                label="Last name"
                name="lastName"
                rules={[
                  { required: true, message: 'Please enter your last name!' },
                ]}
              >
                <Input
                  placeholder="Last name"
                  style={{ marginTop: '15px', height: '50px' }}
                />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your phone number!',
                  },
                ]}
              >
                <Input
                  placeholder="Phone"
                  style={{ marginTop: '15px', height: '50px' }}
                />
              </Form.Item>
              <Form.Item label="Write your message" name="message">
                <TextArea
                  placeholder="message"
                  style={{ marginTop: '15px', height: '50px' }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    marginTop: '15px',
                    backgroundColor: '#c94c4b',
                    borderColor: '#c94c4b',
                  }}
                >
                  Join us now
                </Button>
              </Form.Item>
            </Form>
          </Col>

          <Col span={8} offset={2}>
            <Title level={3} style={{ fontSize: '28px', fontWeight: '500' }}>
              Things are really looking up for you.
            </Title>
            <Text style={{ fontSize: '20px', color: '#666' }}>
              Our brand has been trusted by many corporations and companies
              ensuring your best hiring and assistance.
            </Text>
            <Title level={3} style={{ marginTop: '20px', fontSize: '24px' }}>
              Need more support?
            </Title>
            <Text style={{ fontSize: '20px', color: '#666' }}>
              Our contact info is below ready to help you on every step of the
              way.
            </Text>
            <Title level={3} style={{ marginTop: '20px', fontSize: '24px' }}>
              <a
                href="/dashboard"
                style={{
                  color: '#3B7B7A', // Custom color
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'color 0.3s', // Smooth transition for color
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#c94c4b')} // Change color on hover
                onMouseLeave={(e) => (e.currentTarget.style.color = '#3B7B7A')} // Revert color on leave
              >
                Click here
              </a>
            </Title>
            <Text style={{ fontSize: '20px', color: '#666' }}>
              If you are admin to switch.
            </Text>
          </Col>
        </Row>

        {/* Bottom section with background image */}
        <Row
          style={{
            marginTop: '50px',
            backgroundColor: '#0f1110cc',
            padding: '50px 0',
            borderRadius: '10px',
            position: 'relative', // for absolute positioning of the image
            color: 'white',
          }}
        >
          {/* Add the background image here */}
          <img
            src={contact}
            alt="Background"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '10px',
              zIndex: -1, // Ensures the image stays behind the content
            }}
          />

          <Col span={12} offset={6} style={{ textAlign: 'center' }}>
            <Title level={2} style={{ color: 'white' }}>
              Want a personal account?
            </Title>
            <Text style={{ color: 'white', fontSize: '20px' }}>
              Sign up now for more offers from us.
            </Text>
            <Input
              placeholder="Mail or username"
              style={{
                marginTop: '15px',
                height: '50px',
                borderColor: 'white',
              }}
            />
            <Input.Password
              placeholder="Password"
              style={{
                marginTop: '18px',
                height: '50px',
                borderColor: 'white',
              }}
            />
            <Checkbox style={{ marginTop: '15px', color: 'white' }}>
              Agree with our <Link to="/policy">policies</Link>
            </Checkbox>
            <br />
            <Link to="/register">
              <Button
                type="primary"
                style={{
                  marginTop: '15px',
                  backgroundColor: '#c94c4b',
                  borderColor: '#c94c4b',
                }}
              >
                Sign up now
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactUs;
