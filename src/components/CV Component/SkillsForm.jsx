import React from 'react';
import { Form, Input, Space, Button, Typography, Select, Progress } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;

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
              >
                <Input placeholder="Skill" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'proficiency']}
                fieldKey={[fieldKey, 'proficiency']}
                label="Proficiency Level"
              >
                <Select placeholder="Select proficiency level">
                  <Option value="Beginner">Beginner</Option>
                  <Option value="Intermediate">Intermediate</Option>
                  <Option value="Advanced">Advanced</Option>
                  <Option value="Expert">Expert</Option>
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
              Add Skill
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  </>
);

export default SkillsForm;
