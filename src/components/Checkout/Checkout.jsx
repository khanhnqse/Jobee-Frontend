import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Form,
  Input,
  Divider,
  message,
  Spin,
} from 'antd';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const { Title, Text } = Typography;

const Checkout = () => {
  const location = useLocation();
  const { selectedPlan } = location.state || {};

  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userId, jwtToken } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
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
          form.setFieldsValue({
            fullName: userData.fullName,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
          });
        } else {
          message.error(response.data.message || 'Failed to fetch user data.');
        }
      } catch (error) {
        message.error('Failed to fetch user data.');
      }
    };

    if (userId && jwtToken) {
      fetchUserData();
    }
  }, [userId, jwtToken, form]);

  const handleFormSubmit = async (values) => {
    const { phoneNumber } = values;
    const planId = selectedPlan ? selectedPlan.planId : null;

    if (!planId) {
      message.error('No plan selected.');
      return;
    }

    const requestBody = {
      productId: planId,
      description: phoneNumber,
      returnUrl: 'https://solva-app.vercel.app/success',
      cancelUrl: 'https://solva-app.vercel.app/fail',
    };

    setLoading(true);

    try {
      const response = await axios.post(
        'https://jobeeapi.azurewebsites.net/create-payment-link',
        requestBody
      );
      message.success('Payment link created successfully!');

      window.location.href = response.data;
    } catch (error) {
      console.error('Failed to create payment link:', error);
      message.error('Failed to create payment link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentMethodClick = (method) => {
    if (method.supported) {
      setPaymentMethod(method.value);
    } else {
      message.warning('Phương thức thanh toán này chưa hỗ trợ');
    }
  };

  const defaultPlan = {
    planName: 'No Plan Selected',
    price: 0,
    duration: 0,
    features: [],
  };

  const plan = selectedPlan || defaultPlan;

  const paymentMethods = [
    { value: 'vnpay', label: 'VN Pay', supported: true },
    { value: 'momo', label: 'MoMo', supported: false },
    { value: 'bankTransfer', label: 'Bank Transfer', supported: false },
  ];

  return (
    <div
      style={{
        backgroundColor: '#eae3c3',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: '20px',
      }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          maxWidth: '1200px',
          width: '100%',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Title level={2} style={{ textAlign: 'center' }}>
          Checkout
        </Title>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card
              style={{
                borderRadius: '12px',
                backgroundColor: '#f5f5f5',
              }}
            >
              <Title level={3}>{plan.planName}</Title>
              <Text>
                {plan.price.toLocaleString('vi-VN')} VND / {plan.duration}{' '}
                month(s)
              </Text>
              <Divider />
              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </Card>
          </Col>
          <Col span={16}>
            <Spin spinning={loading}>
              <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                <Title level={4}>User Information</Title>
                <Form.Item
                  name="fullName"
                  label="Full Name"
                  rules={[
                    { required: true, message: 'Please enter your full name' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[
                    { required: true, message: 'Please enter your email' },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your phone number',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Divider />
                <Title level={4}>Payment Method</Title>
                <Row gutter={[16, 16]}>
                  {paymentMethods.map((method) => (
                    <Col span={8} key={method.value}>
                      <Card
                        onClick={() => handlePaymentMethodClick(method)}
                        style={{
                          borderRadius: '12px',
                          cursor: 'pointer',
                          border:
                            paymentMethod === method.value
                              ? '2px solid #1890ff'
                              : '1px solid #d9d9d9',
                          textAlign: 'center',
                        }}
                      >
                        <img
                          src={`/${method.value}.jpg`}
                          alt={method.label}
                          style={{
                            width: '50px',
                            height: '50px',
                            marginBottom: '10px',
                          }}
                        />
                        <Text>{method.label}</Text>
                      </Card>
                    </Col>
                  ))}
                </Row>

                <Button
                  style={{
                    backgroundColor: '#3b7b7a',
                    borderColor: '#3b7b7a',
                    color: '#fff',
                    marginTop: '20px',
                  }}
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Pay Now
                </Button>
              </Form>
            </Spin>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Checkout;
