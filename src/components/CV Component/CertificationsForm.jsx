import React from 'react';
import { Form, Input, Space, Button, Typography } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const CertificationsForm = () => (
  <>
    <Title level={4}>Certifications</Title>
    <Form.List name="certifications">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <Space
              key={key}
              style={{ display: 'flex', marginBottom: 8 }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name, 'certificationName']}
                fieldKey={[fieldKey, 'certificationName']}
                label="Certification Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the certification name',
                  },
                ]}
              >
                <Input placeholder="Certification Name" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'issuer']}
                fieldKey={[fieldKey, 'issuer']}
                label="Issuer"
                rules={[{ required: true, message: 'Please enter the issuer' }]}
              >
                <Input placeholder="Issuer" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
            >
              Add Certification
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  </>
);

export default CertificationsForm;
