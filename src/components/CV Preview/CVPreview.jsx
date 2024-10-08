import React from 'react';

const CVPreview = ({ editorContent, selectedTemplate }) => {
  // Choose layout based on selectedTemplate
  const renderTemplate = () => {
    switch (selectedTemplate) {
      case 1:
        return <div>Basic Template 1 Layout</div>;
      case 2:
        return <div>Basic Template 2 Layout</div>;
      case 3:
        return <div>Professional Template Layout</div>;
      case 4:
        return <div>Modern Template Layout</div>;
      default:
        return <div>Select a Template</div>;
    }
  };

  return (
    <div className="cv-preview">
      {renderTemplate()}
      <div dangerouslySetInnerHTML={{ __html: editorContent }} />
    </div>
  );
};

export default CVPreview;
