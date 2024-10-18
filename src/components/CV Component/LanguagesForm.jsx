import React from 'react';
import { Form, Input, Button, Space, Select, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

const proficiencyLevels = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Fluent',
  'Native',
];

const LanguagesForm = () => {
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
                  <Input placeholder="Language" style={{ width: 200 }} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'proficiency']}
                  fieldKey={[fieldKey, 'proficiency']}
                  rules={[{ required: true, message: 'Missing proficiency' }]}
                >
                  <Select
                    placeholder="Select proficiency"
                    style={{ width: 200 }}
                  >
                    {proficiencyLevels.map((level) => (
                      <Option key={level} value={level}>
                        {level}
                      </Option>
                    ))}
                  </Select>
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
