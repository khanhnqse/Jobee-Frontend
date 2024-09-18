import { Button, Col, Input, Row, Typography } from 'antd';
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
      style={{ backgroundColor: '#3b7b7a', color: 'white', padding: '20px' }}
    >
      <Row justify="space-between" align="middle">
        <Col>
          <img
            src={logoFooter}
            alt="Artboard copy"
            style={{ width: 400, height: 89 }}
          />
          <Paragraph style={{ color: 'white' }}>
            Subscribe for more deals and information
          </Paragraph>
          <Input
            placeholder="Enter your email"
            suffix={<Button type="primary">Send</Button>}
            style={{ width: 300, marginTop: 16 }}
          />
        </Col>
        <Col>
          <Title level={4} style={{ color: 'white' }}>
            Contact us at
          </Title>
          <Paragraph style={{ color: 'white' }}>
            <MailOutlined /> jobee.co@gmail.com
          </Paragraph>
          <Paragraph style={{ color: 'white' }}>
            <PhoneOutlined /> (+84) 000 000 0000
          </Paragraph>
          <Paragraph style={{ color: 'white' }}>
            <FacebookOutlined /> Jobee Co
          </Paragraph>
        </Col>
      </Row>
    </div>
  );
}
