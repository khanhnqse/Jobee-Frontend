import React from 'react';
import { Row, Col, Card, Typography, Button, Divider } from 'antd';
import { CheckCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';
import pricing from '../../assets/pricing.png';
const { Title, Text } = Typography;

const PricingEmployer = () => {
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
          <Col xs={24} sm={12} md={8}>
            <Card
              style={{
                backgroundColor: '#3b7b7a',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%', // Make card take full height
              }}
            >
              <Title level={2} style={{ color: 'white' }}>
                Save More
                <br />
                <span style={{ fontWeight: 'bold' }}>With Goodplans.</span>
              </Title>
              <Text style={{ color: 'white', fontSize: '18px' }}>
                Choose a plan and get onboard in minutes. Then get $100 credits
                for your next payment.
              </Text>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '340px',
                  marginTop: '20px',
                }}
              >
                <ArrowRightOutlined
                  style={{
                    fontSize: '40px',
                    color: 'white',
                    position: 'absolute',
                    top: '11px',
                    left: '31px',
                  }}
                />
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '20px',
                  }}
                  alt="Animation"
                  src={pricing}
                />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              style={{
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Title level={2}>Standard</Title>
              <Text style={{ color: '#a9a9aa', fontSize: '22px' }}>
                What You’ll Get
              </Text>
              <div style={{ marginTop: '28px', flexGrow: 1 }}>
                {[
                  'Announcement of competitions and workshops to improve skills',
                  'Open additional interview features to receive JD to complete questions',
                  'Full access to community features',
                  'Priority customer support',
                  'All CV templates',
                ].map((item, index) => (
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
              <Title level={2} style={{ marginTop: '112px' }}>
                99,000VND
                <span style={{ fontSize: '18px' }}>/month</span>
              </Title>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  height: '64px',
                  borderRadius: '12px',
                  marginTop: '28px',
                  backgroundColor: '#3B7B7A',
                }}
              >
                Choose
              </Button>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              style={{
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <Title level={2}>Standard +</Title>
              <Text style={{ color: '#a9a9aa', fontSize: '22px' }}>
                What You’ll Get
              </Text>
              <div style={{ marginTop: '28px', flexGrow: 1 }}>
                {[
                  'All services in the Standard',
                  '1-1 career consultation with experts',
                  'Message directly with recruiters',
                  'Exclusive access to premium job postings',
                  'Automatically notify when favorite employers post news',
                  'Interviews are no longer limited',
                  'AI scores your CV and gives advice',
                ].map((item, index) => (
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
              <Divider style={{ marginTop: '56px' }} />
              <Title level={2} style={{ marginTop: '16px' }}>
                299,000VND
                <span style={{ fontSize: '18px' }}>/3 month</span>
              </Title>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  height: '64px',
                  borderRadius: '12px',
                  marginTop: '28px',
                  backgroundColor: '#3B7B7A',
                }}
              >
                Choose
              </Button>
            </Card>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '52px' }}>
          <Button
            type="primary"
            style={{
              width: '174px',
              height: '52px',
              borderRadius: '12px',
              backgroundColor: '#3B7B7A',
            }}
          >
            More
          </Button>
        </Row>
      </div>
    </div>
  );
};

export default PricingEmployer;
