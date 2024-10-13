import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Typography } from 'antd';

const LanguagesForm = () => {
  const { Title } = Typography;
  return (
    <>
      <Title level={4}>Languages</Title>
      <Form.List name="languages">
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
                  name={[name, 'language']}
                  fieldKey={[fieldKey, 'language']}
                  rules={[{ required: true, message: 'Missing language' }]}
                >
                  <Input placeholder="Language" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'proficiency']}
                  fieldKey={[fieldKey, 'proficiency']}
                  rules={[{ required: true, message: 'Missing proficiency' }]}
                >
                  <Input placeholder="Proficiency" />
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
                Add Language
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default LanguagesForm;
