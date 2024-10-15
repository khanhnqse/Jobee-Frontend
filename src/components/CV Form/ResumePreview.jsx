import React from 'react';
import Layout1 from '../LayoutTemplate/Layout1';
import Layout2 from '../LayoutTemplate/Layout2';
import Layout3 from '../LayoutTemplate/Layout3';
import Layout4 from '../LayoutTemplate/Layout4';

const ResumePreview = ({ selectedLayout, resumeData }) => {
  const renderResumePreview = () => {
    switch (selectedLayout) {
      case 'layout1':
        return <Layout1 resumeData={resumeData} />;
      case 'layout2':
        return <Layout2 resumeData={resumeData} />;
      case 'layout3':
        return <Layout3 resumeData={resumeData} />;
      case 'layout4':
        return <Layout4 resumeData={resumeData} />;
      default:
        return <Layout1 resumeData={resumeData} />;
    }
  };

  return (
    <div id="resume-preview" style={{ marginTop: '16px' }}>
      {renderResumePreview()}
    </div>
  );
};

export default ResumePreview;
