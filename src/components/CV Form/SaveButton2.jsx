import React from 'react';
import { Button } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SaveButton2 = ({ elementId }) => {
  const saveResumeAsPDF = () => {
    const input = document.getElementById(elementId);

    html2canvas(input, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'letter');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth(); // Letter width (215.9 mm)
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width; // Maintain aspect ratio
      const scaleFactor = 1;
      const scaledWidth = pdfWidth * scaleFactor;
      const scaledHeight = pdfHeight * scaleFactor;

      if (scaledHeight > pdf.internal.pageSize.getHeight()) {
        const scaleToFitFactor =
          pdf.internal.pageSize.getHeight() / scaledHeight;
        const finalWidth = scaledWidth * scaleToFitFactor;
        const finalHeight = scaledHeight * scaleToFitFactor;
        pdf.addImage(imgData, 'PNG', 0, 0, finalWidth, finalHeight);
      } else {
        pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);
      }

      pdf.save('resume.pdf');
    });
  };

  return (
    <Button
      type="primary"
      onClick={saveResumeAsPDF}
      style={{
        backgroundColor: '#3b7b7a',
        borderColor: '#3b7b7a',
        color: '#fff',
        fontWeight: 'bold',
        width: '250px',
        height: '50px',
        marginRight: '10px',
      }}
    >
      Download Resume
    </Button>
  );
};

export default SaveButton2;
