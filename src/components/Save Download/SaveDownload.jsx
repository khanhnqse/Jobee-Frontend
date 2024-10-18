import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SaveDownload = () => {
  const handleDownload = () => {
    const input = document.getElementById('cv-preview');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0);
      pdf.save('cv.pdf');
    });
  };

  return (
    <button className="save-download" onClick={handleDownload}>
      Save and Download
    </button>
  );
};

export default SaveDownload;
