import React from 'react';
import { Button } from 'antd';

const Sidebar = ({ onTemplateChange }) => {
  return (
    <div className="space-y-4">
      <Button
        type="primary"
        className="w-full"
        onClick={() => onTemplateChange('Basic 1')}
      >
        Change to Basic 1
      </Button>
      <Button
        type="default"
        className="w-full"
        onClick={() => onTemplateChange('Professional')}
      >
        Change to Professional
      </Button>
      <Button type="default" className="w-full">
        CV Library
      </Button>
      <Button type="default" className="w-full">
        CV Tutorial
      </Button>
      <Button type="default" className="w-full">
        CV Checking
      </Button>
    </div>
  );
};

export default Sidebar;
