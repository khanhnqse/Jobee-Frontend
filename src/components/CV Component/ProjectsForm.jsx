import React from 'react';
import { Form, Input, Space, Button, Typography } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ProjectsForm = () => (
  <>
    <Title level={4}>Projects</Title>
    <Form.List name="projects">
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
                name={[name, 'projectName']}
                fieldKey={[fieldKey, 'projectName']}
                label="Project Name"
                rules={[
                  { required: true, message: 'Please enter the project name' },
                ]}
              >
                <Input placeholder="Project Name" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'description']}
                fieldKey={[fieldKey, 'description']}
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the project description',
                  },
                ]}
              >
                <Input.TextArea placeholder="Description" rows={2} />
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
              Add Project
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  </>
);

export default ProjectsForm;
