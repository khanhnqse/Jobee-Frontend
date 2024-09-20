import { Button, Col, Input, Row, Typography, Space } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  FacebookOutlined,
} from '@ant-design/icons';
import logoFooter from '../../assets/artboard-3-copy-2-4x-2.png';

const { Paragraph, Title } = Typography;

export default function Footer() {
  return (
    <div
      style={{
        backgroundColor: '#3b7b7a',
        color: 'white',
        padding: '40px 20px',
      }}
    >
      <Row justify="center" align="middle" gutter={[24, 24]}>
        <Col xs={24} md={12} lg={8}>
          <img
            src={logoFooter}
            alt="Artboard copy"
            style={{
              width: '100%',
              maxWidth: 300,
              height: 'auto',
              marginLeft: '45px',
            }}
          />
          <Paragraph
            style={{ color: 'white', marginTop: '16px', marginLeft: '72px' }}
          >
            Subscribe for more deals and information
          </Paragraph>
          <Input
            placeholder="Enter your email"
            suffix={
              <Button
                style={{
                  backgroundColor: '#C94C4B',
                }}
                type="primary"
              >
                Send
              </Button>
            }
            style={{
              width: '100%',
              maxWidth: 400,
              marginTop: 16,
              backgroundColor: '#EAE4C4',
              PaddingRight: '5px',
            }}
          />
        </Col>

        <Col xs={24} md={12} lg={8} style={{ paddingLeft: '250px' }}>
          <Title level={4} style={{ color: 'white' }}>
            Contact us at
          </Title>
          <Space direction="vertical" size="middle">
            <Paragraph style={{ color: 'white' }}>
              <MailOutlined /> jobee.co@gmail.com
            </Paragraph>
            <Paragraph style={{ color: 'white' }}>
              <PhoneOutlined /> (+84) 000 000 0000
            </Paragraph>
            <Paragraph style={{ color: 'white' }}>
              <FacebookOutlined /> Jobee Co
            </Paragraph>
          </Space>
        </Col>
      </Row>
    </div>
  );
}
