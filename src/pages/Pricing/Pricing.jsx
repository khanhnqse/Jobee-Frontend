import React, { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Divider,
  message,
  Spin,
  List,
} from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title, Text } = Typography;

const Pricing = () => {
  const navigate = useNavigate();
  const [isProfessionalPlans, setIsProfessionalPlans] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const featuresMapping = {
    Standard: [
      'Announcement of competitions and workshops to improve skills',
      'Open additional interview features to receive JD to complete questions.',
      'Full access to community features.',
      'Priority customer support.',
      'All CV templates',
    ],
    'Standard +': [
      'Announcement of competitions and workshops to improve skills',
      'Open additional interview features to receive JD to complete questions.',
      'Full access to community features.',
      'Priority customer support.',
      'All CV templates',
      'Additional feature for Standard +',
    ],
    Professional: [
      'All features of Standard +',
      'Access to premium job listings',
      'One-on-one career coaching sessions',
      'Exclusive networking events',
    ],
    'Professional +': [
      'All features of Professional',
      'Dedicated account manager',
      'Advanced analytics and reporting',
      'Customizable CV templates',
    ],
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://jobeewepappapi20241008011108.azurewebsites.net/api/SubscriptionPlan/plans'
      );
      const fetchedPlans = response.data.map((plan) => ({
        ...plan,
        features: featuresMapping[plan.planName] || [],
      }));
      setPlans(fetchedPlans);
      message.success('Plans fetched successfully!');
    } catch (error) {
      console.error('Failed to fetch plans:', error);
      message.error('Failed to fetch plans. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePlans = () => {
    setIsProfessionalPlans(!isProfessionalPlans);
  };

  const handleSelectPlan = (plan) => {
    navigate('/checkout', { state: { selectedPlan: plan } });
  };

  const plansToDisplay = isProfessionalPlans
    ? plans.filter((plan) => plan.planName.includes('Professional'))
    : plans.filter((plan) => !plan.planName.includes('Professional'));

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

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
          backgroundColor: '#eae3c3',
          maxWidth: '1440px',
          width: '100%',
          height: 'auto',
          position: 'relative',
          padding: '20px',
        }}
      >
        <Row justify="center" style={{ marginTop: '52px' }}>
          <Col>
            <Title level={1} style={{ color: '#1d2127', textAlign: 'center' }}>
              Purchase a subscription
            </Title>
            <Text
              style={{
                color: '#52575d',
                fontSize: '20px',
                textAlign: 'center',
                display: 'block',
                margin: '10px 0',
              }}
            >
              Choose the plan that works for you.
            </Text>
          </Col>
        </Row>

        <Row justify="center" gutter={[32, 32]} style={{ marginTop: '52px' }}>
          {plansToDisplay.map((plan) => (
            <Col key={plan.planId} xs={24} sm={12} md={8}>
              <Card
                style={{
                  borderRadius: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
                bodyStyle={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Title level={2}>{plan.planName}</Title>
                <div style={{ marginTop: '28px', flexGrow: 1 }}>
                  <List
                    dataSource={plan.features}
                    renderItem={(feature) => (
                      <List.Item>
                        <CheckCircleOutlined
                          style={{ color: '#3B7B7A', marginRight: '8px' }}
                        />
                        {feature}
                      </List.Item>
                    )}
                  />
                </div>
                <Divider style={{ marginTop: '28px' }} />
                <Title level={2} style={{ marginTop: '16px' }}>
                  {plan.price.toLocaleString('vi-VN')} VND
                  <span style={{ fontSize: '18px' }}>
                    {' '}
                    / {plan.duration} month(s)
                  </span>
                </Title>
                <Button
                  type="primary"
                  style={{
                    width: '100%',
                    height: '64px',
                    borderRadius: '12px',
                    marginTop: 'auto',
                    backgroundColor: '#3B7B7A',
                  }}
                  onClick={() => handleSelectPlan(plan)}
                >
                  Choose
                </Button>
              </Card>
            </Col>
          ))}
        </Row>

        <Row justify="center" style={{ marginTop: '52px' }}>
          <Button
            type="primary"
            onClick={handleTogglePlans}
            style={{
              width: '174px',
              height: '52px',
              borderRadius: '12px',
              backgroundColor: '#3B7B7A',
            }}
          >
            {isProfessionalPlans ? 'Back' : 'More'}
          </Button>
        </Row>
      </div>
    </div>
  );
};

export default Pricing;
