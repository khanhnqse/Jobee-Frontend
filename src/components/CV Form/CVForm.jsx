import React from 'react';
import { Form, Input, Button } from 'antd';

const CVForm = ({ onChange }) => {
  return (
    <Form layout="vertical" className="space-y-6" onValuesChange={onChange}>
      <Form.Item label="Full Name" name="name">
        <Input placeholder="Enter your full name" />
      </Form.Item>
      <Form.Item label="Email" name="email">
        <Input placeholder="Enter your email" />
      </Form.Item>
      <Form.Item label="Phone" name="phone">
        <Input placeholder="Enter your phone number" />
      </Form.Item>
      <Form.Item label="Summary" name="summary">
        <Input.TextArea
          rows={4}
          placeholder="Write a short summary about yourself"
        />
      </Form.Item>
      <Button type="primary" className="w-full">
        Generate CV
      </Button>
    </Form>
  );
};

export default CVForm;
