import React from 'react';
import { Form, Input, Space, Button, Typography } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const SkillsForm = () => (
  <>
    <Title level={4}>Skills</Title>
    <Form.List name="skills">
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
                name={[name, 'skill']}
                fieldKey={[fieldKey, 'skill']}
                label="Skill"
                rules={[{ required: true, message: 'Please enter the skill' }]}
              >
                <Input placeholder="Skill" />
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
              Add Skill
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  </>
);

export default SkillsForm;
