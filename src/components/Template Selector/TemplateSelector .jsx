import React from 'react';
import { Card, Button } from 'antd';

const TemplateSelector = ({ setSelectedTemplate }) => {
  const templates = [
    { id: 1, title: 'Basic 1', imageUrl: 'template1.png' },
    { id: 2, title: 'Basic 2', imageUrl: 'template2.png' },
    { id: 3, title: 'Professional', imageUrl: 'template3.png' },
    { id: 4, title: 'Modern', imageUrl: 'template4.png' },
  ];

  return (
    <div className="template-selector">
      <h3>Change CV template</h3>
      <div>
        {templates.map((template) => (
          <Card key={template.id} hoverable>
            <img
              src={template.imageUrl}
              alt={template.title}
              style={{ width: '100%' }}
            />
            <Button onClick={() => setSelectedTemplate(template.id)}>
              Select
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
