import React from 'react';
import { Form, Input, DatePicker, Space, Button, Typography } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ExperienceForm = () => (
  <>
    <Title level={4}>Experience</Title>
    <Form.List name="experience">
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
                name={[name, 'company']}
                fieldKey={[fieldKey, 'company']}
                label="Company"
                rules={[
                  { required: true, message: 'Please enter the company name' },
                ]}
              >
                <Input placeholder="Company" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'position']}
                fieldKey={[fieldKey, 'position']}
                label="Position"
                rules={[
                  { required: true, message: 'Please enter the position' },
                ]}
              >
                <Input placeholder="Position" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'startDate']}
                fieldKey={[fieldKey, 'startDate']}
                label="Start Date"
                rules={[
                  { required: true, message: 'Please enter the start date' },
                ]}
              >
                <DatePicker placeholder="Start Date" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'endDate']}
                fieldKey={[fieldKey, 'endDate']}
                label="End Date"
                rules={[
                  { required: true, message: 'Please enter the end date' },
                ]}
              >
                <DatePicker placeholder="End Date" />
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
              Add Experience
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  </>
);

export default ExperienceForm;
