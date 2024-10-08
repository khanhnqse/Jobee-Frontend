import React, { useState } from 'react';
import { Button } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Toolbar from '@/components/Tool bar/Toolbar';
import TemplateSelector from '@/components/Template Selector/TemplateSelector ';
import CVPreview from '@/components/CV Preview/CVPreview';

const CVMaker = () => {
  const [editorContent, setEditorContent] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(1);

  // Function to download the CV as PDF
  const handleDownload = () => {
    const input = document.getElementById('cv-preview');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('cv.pdf');
    });
  };

  return (
    <div className="cv-maker">
      {/* Toolbar for editing */}
      <Toolbar setEditorContent={setEditorContent} />

      {/* Template Selector */}
      <TemplateSelector setSelectedTemplate={setSelectedTemplate} />

      {/* CV Preview */}
      <div id="cv-preview">
        <CVPreview
          editorContent={editorContent}
          selectedTemplate={selectedTemplate}
        />
      </div>

      {/* Save and Download Buttons */}
      <Button onClick={handleDownload}>Download as PDF</Button>
    </div>
  );
};

export default CVMaker;
