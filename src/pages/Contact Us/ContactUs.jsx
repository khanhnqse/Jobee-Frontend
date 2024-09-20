import React from 'react';
import { Row, Col, Input, Button, Checkbox, Typography } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ContactUs = () => {
  return (
    <div
      style={{
        backgroundColor: '#eae4c4',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: '50px 0', // Added padding for better spacing
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
            {Array.from({ length: 7 }, (_, index) => (
              <Input
                key={index}
                placeholder={
                  [
                    'Work email',
                    'Function / Role',
                    'Management level',
                    'Company name',
                    'First name',
                    'Last name',
                    'Phone',
                  ][index]
                }
                style={{ marginTop: '15px', height: '50px' }}
              />
            ))}

            <Button
              type="primary"
              style={{
                marginTop: '15px',
                backgroundColor: '#c94c4b',
                borderColor: '#c94c4b',
                width: '120px',
              }}
            >
              Join us
            </Button>
            <br />
            <Checkbox style={{ marginTop: '15px' }}>
              Agree with our policies
            </Checkbox>
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
              Click here
            </Title>
            <Text style={{ fontSize: '20px', color: '#666' }}>
              If you are admin to switch.
            </Text>
          </Col>
        </Row>
        <Row
          style={{
            marginTop: '50px',
            backgroundColor: '#0f1110cc',
            padding: '50px 0',
            borderRadius: '10px',
            color: 'white',
            backgroundImage: 'url("./src/assets/Frame 3 (1).png")',
          }}
        >
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
              Agree with our<a href="/">policies</a>
            </Checkbox>
            <br />
            <Button
              type="primary"
              style={{
                marginTop: '15px',
                backgroundColor: '#c94c4b',
                borderColor: '#c94c4b',
              }}
            >
              Sign up
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ContactUs;
