import React, { useState } from 'react';
import { Row, Col, Card, Typography, Button, Divider } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Pricing = () => {
  // Initial pricing plans
  const initialPlans = [
    {
      id: 1,
      title: 'Standard',
      price: '99,000VND',
      duration: '/month',
      features: [
        'Announcement of competitions and workshops to improve skills',
        'Open additional interview features to receive JD to complete questions.',
        'Full access to community features.',
        'Priority customer support.',
        'All CV templates',
      ],
    },
    {
      id: 2,
      title: 'Standard +',
      price: '299,000VND',
      duration: '/3 month',
      features: [
        'All services in the Standard',
        '1-1 career consultation with experts.',
        'Message directly with recruiters.',
        'Exclusive access to premium job postings.',
        'Automatically notify when favorite employers post news',
        'Interviews are no longer limited',
        'AI scores your CV and gives advice',
      ],
    },
  ];

  // Professional plans (shown after clicking "More")
  const professionalPlans = [
    {
      id: 1,
      title: 'Professional',
      price: '1,999,000VND',
      duration: '/month',
      features: [
        'Increase the number of job postings.',
        'Employer branding features.',
        'Posts are more eye-catching.',
        'Push news 3 times during prime time.',
        'Analyze and report candidate data.',
        'Priority customer support.',
        'Company introduction page.',
      ],
    },
    {
      id: 2,
      title: 'Professional +',
      price: '4,999,000VND',
      duration: '/3 month',
      features: [
        'Show top searches',
        'Analyze and report candidate data.',
        'Access an exclusive source of talented candidates.',
        'Promote recruitment news.',
        'Specialized account management.',
        'All services in the Professional',
      ],
    },
  ];

  const [isProfessionalPlans, setIsProfessionalPlans] = useState(false);

  // Toggle between plans
  const handleTogglePlans = () => {
    setIsProfessionalPlans(!isProfessionalPlans);
  };

  // Current plans based on state
  const plansToDisplay = isProfessionalPlans ? professionalPlans : initialPlans;

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

        {/* Render Pricing Cards */}
        <Row justify="center" gutter={[32, 32]} style={{ marginTop: '52px' }}>
          {plansToDisplay.map((plan) => (
            <Col key={plan.id} xs={24} sm={12} md={8}>
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
                <Title level={2}>{plan.title}</Title>
                <div style={{ marginTop: '28px', flexGrow: 1 }}>
                  {plan.features.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginTop: '16px',
                      }}
                    >
                      <CheckCircleOutlined
                        style={{ fontSize: '24px', color: '#34343e' }}
                      />
                      <Text style={{ fontSize: '18px', color: '#34343e' }}>
                        {item}
                      </Text>
                    </div>
                  ))}
                </div>
                <Divider style={{ marginTop: '28px' }} />
                <Title level={2} style={{ marginTop: '16px' }}>
                  {plan.price}
                  <span style={{ fontSize: '18px' }}>{plan.duration}</span>
                </Title>
                <Button
                  type="primary"
                  style={{
                    width: '100%',
                    height: '64px', // Set a fixed height to ensure consistency
                    borderRadius: '12px',
                    marginTop: 'auto', // Push button to the bottom
                    backgroundColor: '#3B7B7A',
                  }}
                >
                  Choose
                </Button>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Show More/Back button */}
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
