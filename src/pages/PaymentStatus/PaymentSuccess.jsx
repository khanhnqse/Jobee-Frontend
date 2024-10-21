import React from 'react';
import { Button, Typography, Row, Col } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/'); // Navigate to the home page or another relevant page
  };

  return (
    <div
      style={{
        backgroundColor: '#eae3c3',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          maxWidth: '600px',
          width: '100%',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <CheckCircleOutlined style={{ fontSize: '64px', color: '#52c41a' }} />
        <Title level={2} style={{ marginTop: '20px' }}>
          Payment Successful!
        </Title>
        <Paragraph style={{ fontSize: '18px', marginTop: '20px' }}>
          Thank you for your purchase. Your payment has been processed
          successfully.
        </Paragraph>
        <Button
          type="primary"
          style={{
            backgroundColor: '#3b7b7a',
            borderColor: '#3b7b7a',
            color: '#fff',
            marginTop: '20px',
          }}
          onClick={handleBackToHome}
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
