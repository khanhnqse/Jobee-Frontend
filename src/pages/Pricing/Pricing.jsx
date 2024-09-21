import React from 'react';
import { Row, Col, Card, Typography, Button, Divider } from 'antd';
import { CheckCircleOutlined, ArrowRightOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
const Pricing = () => {
  return (
    <div
      style={{
        backgroundColor: '#eae3c3',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <div
        style={{
          backgroundColor: '#eae3c3',
          width: '1440px',
          height: '1120px',
          position: 'relative',
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
                paddingLeft: '51px',
              }}
            >
              Choose the plan that works for you.
            </Text>
          </Col>
        </Row>
        <Row justify="center" gutter={32} style={{ marginTop: '52px' }}>
          <Col>
            <Card
              style={{
                width: 400,
                height: 750,
                backgroundColor: '#3b7b7a',
                borderRadius: '20px',
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
                  width: '327px',
                  height: '340px',
                  marginTop: '86px',
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
                    width: '327px',
                    height: '340px',
                    objectFit: 'cover',
                  }}
                  alt="Animation"
                  src="./src/assets/pricing.png"
                />
              </div>
            </Card>
          </Col>
          <Col>
            <Card style={{ width: 400, height: 750, borderRadius: '20px' }}>
              <Title level={2}>Standard</Title>
              <Text style={{ color: '#a9a9aa', fontSize: '22px' }}>
                What You’ll Get
              </Text>
              <div style={{ marginTop: '28px' }}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <CheckCircleOutlined
                    style={{ fontSize: '24px', color: '#34343e' }}
                  />
                  <Text style={{ fontSize: '18px', color: '#34343e' }}>
                    Announcement of competitions and workshops to improve skills
                  </Text>
                </div>
                <div
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
                    Open additional interview features to receive JD to complete
                    questions.
                  </Text>
                </div>
                <div
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
                    Full access to community features.
                  </Text>
                </div>
                <div
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
                    Priority customer support.
                  </Text>
                </div>
                <div
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
                    All CV templates
                  </Text>
                </div>
              </div>
              <Divider style={{ marginTop: '28px' }} />
              <Title level={2} style={{ marginTop: '112px' }}>
                99,000VND
                <span style={{ fontSize: '18px' }}>/month</span>
              </Title>
              <Button
                type="primary"
                style={{
                  width: '352px',
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
          <Col>
            <Card style={{ width: 400, height: 750, borderRadius: '20px' }}>
              <Title level={2}>Standard +</Title>
              <Text style={{ color: '#a9a9aa', fontSize: '22px' }}>
                What You’ll Get
              </Text>
              <div style={{ marginTop: '28px' }}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <CheckCircleOutlined
                    style={{ fontSize: '24px', color: '#34343e' }}
                  />
                  <Text style={{ fontSize: '18px', color: '#34343e' }}>
                    All services in the Standard
                  </Text>
                </div>
                <div
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
                    1-1 career consultation with experts.
                  </Text>
                </div>
                <div
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
                    Message directly with recruiters.
                  </Text>
                </div>
                <div
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
                    Exclusive access to premium job postings.
                  </Text>
                </div>
                <div
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
                    Automatically notify when favorite employers post news
                  </Text>
                </div>
                <div
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
                    Interviews are no longer limited
                  </Text>
                </div>
                <div
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
                    AI scores your CV and gives advice
                  </Text>
                </div>
              </div>
              <Divider style={{ marginTop: '28px' }} />
              <Title level={2} style={{ marginTop: '16px' }}>
                299,000VND
                <span style={{ fontSize: '18px' }}>/3 month</span>
              </Title>
              <Button
                type="primary"
                style={{
                  width: '352px',
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
export default Pricing;
