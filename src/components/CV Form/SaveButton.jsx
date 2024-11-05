import React from 'react';
import { Button } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SaveButton = ({ resumeData }) => {
  const loadFont = async (url) => {
    const response = await fetch(url);
    const fontBlob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(fontBlob);
    });
  };

  const saveResumeAsPDF = async () => {
    const pdf = new jsPDF();

    const fontBase64 = await loadFont('/fonts/Roboto-Regular.ttf');
    pdf.addFileToVFS('Roboto-Regular.ttf', fontBase64);
    pdf.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');
    pdf.setFont('Roboto');

    pdf.setFontSize(18);
    pdf.text(resumeData.fullName || 'Full Name', 105, 20, null, null, 'center');
    pdf.setFontSize(14);
    pdf.text(
      resumeData.professionalTitle || 'Professional Title',
      105,
      30,
      null,
      null,
      'center'
    );

    pdf.setFontSize(10);
    pdf.text('Contact Information', 15, 40);
    pdf.text(`Address: ${resumeData.address || 'Address'}`, 15, 45);
    pdf.text(`Email: ${resumeData.email || 'Email'}`, 15, 50);
    pdf.text(`Phone: ${resumeData.phoneNumber || 'Phone Number'}`, 15, 55);
    pdf.text(
      `Date of Birth: ${resumeData.dateOfBirth || 'Date of Birth'}`,
      15,
      60
    );

    let finalY = 65;

    if (resumeData.summary) {
      pdf.text('Summary', 15, finalY);
      pdf.text(resumeData.summary, 15, finalY + 5, { maxWidth: 180 });
      finalY += 15;
    }

    pdf.text('Skills', 15, finalY);
    finalY += 5;
    pdf.autoTable({
      startY: finalY,
      body: resumeData.skills?.map((skill) => [
        skill?.skill || 'No skill provided',
      ]) || [['No skills provided']],
      theme: 'plain',
      styles: { font: 'Roboto', fontSize: 10 },
      pageBreak: 'avoid',
    });
    finalY = pdf.lastAutoTable.finalY + 10;

    pdf.text('Education', 15, finalY);
    pdf.autoTable({
      startY: finalY + 5,
      body: resumeData.education?.map((edu) => [
        `${edu?.degree || 'Degree'} at ${edu?.institution || 'Institution'}`,
        `${
          edu?.startDate
            ? new Date(edu.startDate).toLocaleDateString()
            : 'Start Date'
        } - ${
          edu?.endDate ? new Date(edu.endDate).toLocaleDateString() : 'End Date'
        }`,
      ]) || [['No education details provided']],
      theme: 'plain',
      styles: { font: 'Roboto', fontSize: 10 },
      pageBreak: 'avoid',
    });
    finalY = pdf.lastAutoTable.finalY + 10;

    // Experience Section
    pdf.text('Experience', 15, finalY);
    pdf.autoTable({
      startY: finalY + 5,
      body: resumeData.experience?.map((exp) => [
        `${exp?.position || 'Position'} at ${exp?.company || 'Company'}`,
        `${
          exp?.startDate
            ? new Date(exp.startDate).toLocaleDateString()
            : 'Start Date'
        } - ${
          exp?.endDate ? new Date(exp.endDate).toLocaleDateString() : 'End Date'
        }`,
      ]) || [['No experience details provided']],
      theme: 'plain',
      styles: { font: 'Roboto', fontSize: 10 },
      pageBreak: 'avoid',
    });
    finalY = pdf.lastAutoTable.finalY + 10;

    // Projects Section
    pdf.text('Projects', 15, finalY);
    pdf.autoTable({
      startY: finalY + 5,
      body: resumeData.projects?.map((project) => [
        `${project?.projectName || 'Project Name'}`,
        `${project?.description || 'No description provided'}`,
      ]) || [['No projects provided']],
      theme: 'plain',
      styles: { font: 'Roboto', fontSize: 10 },
      pageBreak: 'avoid',
    });
    finalY = pdf.lastAutoTable.finalY + 10;

    // Certifications Section
    pdf.text('Certifications', 15, finalY);
    pdf.autoTable({
      startY: finalY + 5,
      body: resumeData.certifications?.map((cert) => [
        `${cert?.certificationName || 'Certification Name'}`,
        `by ${cert?.issuer || 'Issuer'}`,
      ]) || [['No certifications provided']],
      theme: 'plain',
      styles: { font: 'Roboto', fontSize: 10 },
      pageBreak: 'avoid',
    });

    // Save PDF
    pdf.save('gradeFile.pdf');
  };

  return (
    <Button
      type="default"
      onClick={saveResumeAsPDF}
      style={{
        fontWeight: 'bold',
        width: '250px',
        height: '50px',
        marginRight: '10px',
      }}
    >
      Get file to grade
    </Button>
  );
};

export default SaveButton;
