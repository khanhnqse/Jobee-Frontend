import React from 'react';
import { Form, Input, DatePicker, Space, Button, Typography } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const EducationForm = () => (
  <>
    <Title level={4}>Education</Title>
    <Form.List name="education">
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
                name={[name, 'institution']}
                fieldKey={[fieldKey, 'institution']}
                label="Institution"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the institution name',
                  },
                ]}
              >
                <Input placeholder="Institution" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'degree']}
                fieldKey={[fieldKey, 'degree']}
                label="Degree"
                rules={[{ required: true, message: 'Please enter the degree' }]}
              >
                <Input placeholder="Degree" />
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
              Add Education
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  </>
);

export default EducationForm;
