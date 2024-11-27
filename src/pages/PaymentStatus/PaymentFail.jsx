import React, { useEffect, useState, useRef } from 'react';
import { Button, Typography, message } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const { Title, Paragraph } = Typography;

const PaymentFail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { jwtToken, logout } = useAuth();
  const [subscriptionUpdated, setSubscriptionUpdated] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);
  const apiCallRef = useRef(false); // Prevent duplicate calls

  const handleBackToHome = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    if (apiCallRef.current) return; // Prevent further calls
    apiCallRef.current = true;

    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status');
    const planId = queryParams.get('planId');
    const amount = queryParams.get('amount');
    const paymentMethod = queryParams.get('paymentMethod');

    if (status === 'CANCELLED' && planId) {
      const handleApiCalls = async () => {
        try {
          if (!subscriptionUpdated) {
            await axios.post(
              `https://jobeeapi.azurewebsites.net/api/Account/subcription-plan/${planId}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                },
              }
            );
            message.success('Subscription plan updated successfully.');
            setSubscriptionUpdated(true);
          }

          if (!orderCreated) {
            await axios.post(
              'https://jobeeapi.azurewebsites.net/api/order',
              {
                amount: parseFloat(amount),
                paymentMethod,
                status: 'PAID',
                paymentDate: new Date().toISOString(),
              },
              {
                headers: {
                  Authorization: `Bearer ${jwtToken}`,
                },
              }
            );
            message.success('Order created successfully.');
            setOrderCreated(true);
          }
        } catch (error) {
          message.error('Failed to update subscription plan or create order.');
        }
      };

      handleApiCalls();
    }
  }, [location.search, jwtToken]);

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
        <CloseCircleOutlined style={{ fontSize: '64px', color: '#ff4d4f' }} />
        <Title level={2} style={{ marginTop: '20px' }}>
          Payment Failed
        </Title>
        <Paragraph style={{ fontSize: '18px', marginTop: '20px' }}>
          Unfortunately, your payment could not be processed. Please try again
          or contact support for assistance.
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

export default PaymentFail;
