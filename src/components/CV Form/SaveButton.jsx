import React from 'react';
import { Button } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const SaveButton = ({ resumeData }) => {
  const saveResumeAsPDF = () => {
    const pdf = new jsPDF();

    // Add resume title and personal info
    pdf.setFontSize(22);
    pdf.text(resumeData.fullName || 'Full Name', 105, 20, null, null, 'center');
    pdf.setFontSize(16);
    pdf.text(
      resumeData.professionalTitle || 'Professional Title',
      105,
      30,
      null,
      null,
      'center'
    );

    // Add Contact Information
    pdf.setFontSize(12);
    pdf.text('Contact Information', 15, 50);
    pdf.text(`Address: ${resumeData.address || 'Address'}`, 15, 60);
    pdf.text(`Email: ${resumeData.email || 'Email'}`, 15, 70);
    pdf.text(`Phone: ${resumeData.phoneNumber || 'Phone Number'}`, 15, 80);
    pdf.text(
      `Date of Birth: ${resumeData.dateOfBirth || 'Date of Birth'}`,
      15,
      90
    );

    // Skills Section
    pdf.text('Skills', 15, 110);
    let finalY = 115;
    pdf.autoTable({
      startY: finalY,
      body: resumeData.skills?.map((skill) => [
        skill?.skill || 'No skill provided',
      ]) || [['No skills provided']],
      theme: 'plain',
    });
    finalY = pdf.lastAutoTable.finalY + 10;

    // Education Section
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
