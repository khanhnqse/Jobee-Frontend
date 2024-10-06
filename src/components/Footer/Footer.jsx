import { Button, Col, Input, Row, Typography, Space } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  TikTokOutlined,
} from '@ant-design/icons';
import logoFooter from '../../assets/artboard-3-copy-2-4x-2.png';
import { Link } from 'react-router-dom';
import './Footer.css'; // Import the CSS file
import { MdOutlinePolicy } from 'react-icons/md';

const { Paragraph, Title } = Typography;

export default function Footer() {
  return (
    <div className="footer-container">
      <Row justify="center" align="top" gutter={[32, 32]}>
        {/* Logo and Subscription Section */}
        <Col xs={24} md={8} lg={6}>
          <img src={logoFooter} alt="Logo" className="footer-logo" />
          <Paragraph className="footer-paragraph">
            Subscribe for more deals and updates
          </Paragraph>
          <Input
            placeholder="Enter your email"
            suffix={
              <Button className="send-button" type="primary">
                Send
              </Button>
            }
            className="email-input"
          />
        </Col>

        {/* Contact Info Section */}
        <Col xs={24} md={8} lg={6}>
          <Title level={4} className="footer-title pl-7">
            Contact Us
          </Title>
          <Typography direction="vertical" size="middle">
            <Paragraph className="footer-paragraph">
              <MailOutlined /> jobee.co@gmail.com
            </Paragraph>
            <Paragraph className="footer-paragraph">
              <PhoneOutlined /> (+84) 000 000 0000
            </Paragraph>
            <Paragraph className="footer-paragraph">
              <FacebookOutlined /> Jobee Co
            </Paragraph>
          </Typography>
        </Col>

        {/* Quick Links Section */}
        <Col xs={24} md={8} lg={6}>
          <Title level={4} className="footer-title pl-7">
            Quick Links
          </Title>
          <Typography direction="vertical" size="middle">
            <Paragraph className="footer-paragraph">
              <Link to="/" className="footer-link">
                Home
              </Link>
            </Paragraph>
            <Paragraph className="footer-paragraph">
              <Link to="/cv" className="footer-link">
                CV Assistance
              </Link>
            </Paragraph>
            <Paragraph className="footer-paragraph">
              <Link to="/simulated-interview" className="footer-link">
                Simulated Interview
              </Link>
            </Paragraph>
            <Paragraph className="footer-paragraph">
              <Link to="/pricing" className="footer-link">
                Pricing
              </Link>
            </Paragraph>
            <Paragraph className="footer-paragraph">
              <Link to="/policy" className="footer-link">
                Our policy
              </Link>
            </Paragraph>
          </Typography>
        </Col>

        {/* Social Media Section */}
        <Col xs={24} md={8} lg={6}>
          <Title level={4} className="footer-title">
            Follow Us
          </Title>
          <Space size="large">
            <a
              href="https://www.facebook.com/profile.php?id=61565674033774"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FacebookOutlined />
            </a>
            <a
              href="https://www.tiktok.com/@jobeeofficial?_t=8qJfhHxjGkr&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <TikTokOutlined />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <TwitterOutlined />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <LinkedinOutlined />
            </a>
          </Space>
        </Col>
      </Row>

      {/* Footer Bottom */}
      <Row justify="center" className="footer-bottom">
        <Col span={24}>
          <Paragraph style={{ color: '#EAE4C4' }}>
            © 2024 Jobee Co. All rights reserved.
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
}
