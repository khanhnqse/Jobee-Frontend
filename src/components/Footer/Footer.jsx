import { Button, Col, Input, Row, Typography, Space } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import logoFooter from '../../assets/artboard-3-copy-2-4x-2.png';
import { Link } from 'react-router-dom';

const { Paragraph, Title } = Typography;

export default function Footer() {
  return (
    <div
      style={{
        backgroundColor: '#3b7b7a',
        color: 'white',
        padding: '68px 40px',
        textAlign: 'left',
      }}
    >
      <Row justify="center" align="top" gutter={[32, 32]}>
        {/* Logo and Subscription Section */}
        <Col xs={24} md={8} lg={6}>
          <img
            src={logoFooter}
            alt="Logo"
            style={{
              width: '200px',
              height: 'auto',
              marginLeft: '38px',
            }}
          />
          <Paragraph
            style={{ marginTop: '16px', marginLeft: '28px', color: 'white' }}
          >
            Subscribe for more deals and updates
          </Paragraph>
          <Input
            placeholder="Enter your email"
            suffix={
              <Button
                style={{
                  backgroundColor: '#C94C4B',
                  borderColor: '#C94C4B',
                }}
                type="primary"
              >
                Send
              </Button>
            }
            style={{
              marginTop: '16px',
              maxWidth: '300px',
              backgroundColor: '#EAE4C4',
            }}
          />
        </Col>

        {/* Contact Info Section */}
        <Col xs={24} md={8} lg={6}>
          <Title level={4} style={{ color: '#EAE4C4' }}>
            Contact Us
          </Title>
          <Typography direction="vertical" size="middle">
            <Paragraph style={{ color: 'white' }}>
              <MailOutlined /> jobee.co@gmail.com
            </Paragraph>
            <Paragraph style={{ color: 'white' }}>
              <PhoneOutlined /> (+84) 000 000 0000
            </Paragraph>
            <Paragraph style={{ color: 'white' }}>
              <FacebookOutlined />
              Jobee Co
            </Paragraph>
          </Typography>
        </Col>

        {/* Quick Links Section */}
        <Col xs={24} md={8} lg={6}>
          <Title level={4} style={{ color: '#EAE4C4' }}>
            Quick Links
          </Title>
          <Typography direction="vertical" size="middle">
            <Paragraph style={{ color: 'white' }}>
              <Link to="/" style={{ color: 'white' }}>
                Home
              </Link>
            </Paragraph>
            <Paragraph style={{ color: 'white' }}>
              <Link to="/cv" style={{ color: 'white' }}>
                CV Assistance
              </Link>
            </Paragraph>
            <Paragraph style={{ color: 'white' }}>
              <Link to="/simulated-interview" style={{ color: 'white' }}>
                Simulated Interview
              </Link>
            </Paragraph>
            <Paragraph style={{ color: 'white' }}>
              <Link to="/pricing" style={{ color: 'white' }}>
                Pricing
              </Link>
            </Paragraph>
          </Typography>
        </Col>

        {/* Social Media Section */}
        <Col xs={24} md={8} lg={6}>
          <Title level={4} style={{ color: '#EAE4C4' }}>
            Follow Us
          </Title>
          <Space size="large">
            <a
              href="https://www.facebook.com/profile.php?id=61565674033774"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookOutlined style={{ fontSize: '24px', color: 'white' }} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramOutlined style={{ fontSize: '24px', color: 'white' }} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterOutlined style={{ fontSize: '24px', color: 'white' }} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinOutlined style={{ fontSize: '24px', color: 'white' }} />
            </a>
          </Space>
        </Col>
      </Row>

      {/* Footer Bottom */}
      <Row justify="center" style={{ marginTop: '20px', textAlign: 'center' }}>
        <Col span={24}>
          <Paragraph style={{ color: '#EAE4C4' }}>
            © 2024 Jobee Co. All rights reserved.
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
}
