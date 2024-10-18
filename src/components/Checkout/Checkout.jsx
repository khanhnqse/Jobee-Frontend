import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Card, Typography, Button, Form, Input, Divider } from 'antd';

const { Title, Text } = Typography;

const Checkout = () => {
  const location = useLocation();
  const { selectedPlan } = location.state || {};

  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState(null);

  const handleFormSubmit = (values) => {
    console.log('Form values:', values);
    // Process payment here
  };

  // Default plan in case selectedPlan is undefined
  const defaultPlan = {
    title: 'No Plan Selected',
    price: '0 VND',
    duration: '',
    features: [],
  };

  const plan = selectedPlan || defaultPlan;

  const paymentMethods = [
    { value: 'vnpay', label: 'VN Pay' },
    { value: 'momo', label: 'MoMo' },
    { value: 'bankTransfer', label: 'Bank Transfer' },
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
              <Title level={3}>{plan.title}</Title>
              <Text>
                {plan.price} {plan.duration}
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
                rules={[{ required: true, message: 'Please enter your email' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Phone Number"
                rules={[
                  { required: true, message: 'Please enter your phone number' },
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
                      onClick={() => setPaymentMethod(method.value)}
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
                        src={`public/${method.value}.jpg`}
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
              {paymentMethod === 'vnpay' && (
                <>
                  <Form.Item
                    name="cardNumber"
                    label="Card Number"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your card number',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="expiryDate"
                    label="Expiry Date"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your card expiry date',
                      },
                    ]}
                  >
                    <Input placeholder="MM/YY" />
                  </Form.Item>
                  <Form.Item
                    name="cvv"
                    label="CVV"
                    rules={[
                      { required: true, message: 'Please enter your card CVV' },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </>
              )}
              {paymentMethod === 'momo' && (
                <Form.Item
                  name="momoPhoneNumber"
                  label="MoMo Phone Number"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your MoMo phone number',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}
              {paymentMethod === 'bankTransfer' && (
                <Form.Item
                  name="bankAccount"
                  label="Bank Account"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your bank account details',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              )}
              <Form.Item
                name="billingAddress"
                label="Billing Address"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your billing address',
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Button
                style={{
                  backgroundColor: '#3b7b7a',
                  borderColor: '#3b7b7a',
                  color: '#fff',
                }}
                type="primary"
                htmlType="submit"
                block
              >
                Pay Now
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Checkout;
