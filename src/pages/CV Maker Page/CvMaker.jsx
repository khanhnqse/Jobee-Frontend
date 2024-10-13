import React, { useState, useEffect } from 'react';
import {
  Form,
  Typography,
  Divider,
  Button,
  Row,
  Col,
  Select,
  Steps,
} from 'antd';
import PersonalInfoForm from '@/components/CV Component/PersonalInfoForm';
import EducationForm from '@/components/CV Component/EducationForm';
import ExperienceForm from '@/components/CV Component/ExperienceForm';
import SkillsForm from '@/components/CV Component/SkillsForm';
import ProjectsForm from '@/components/CV Component/ProjectsForm';
import CertificationsForm from '@/components/CV Component/CertificationsForm';
import LanguagesForm from '@/components/CV Component/LanguagesForm'; // Import LanguagesForm
import Layout1 from '@/components/LayoutTemplate/Layout1';
import Layout2 from '@/components/LayoutTemplate/Layout2';
import Layout3 from '@/components/LayoutTemplate/Layout3';
import Layout4 from '@/components/LayoutTemplate/Layout4';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const { Title } = Typography;
const { Option } = Select;
const { Step } = Steps;

const defaultData = {
  profilePicture: 'https://via.placeholder.com/100',
  fullName: 'John Doe',
  professionalTitle: 'Software Engineer',
  address: '123 Main St, Anytown, USA',
  email: 'example@example.com',
  phoneNumber: '(123) 456-7890',
  summary:
    'Experienced software engineer with a strong background in developing scalable web applications and working with modern technologies.',
  skills: [{ skill: 'JavaScript' }, { skill: 'React' }, { skill: 'Node.js' }],
  languages: [
    { language: 'English', proficiency: 'Fluent' },
    { language: 'Spanish', proficiency: 'Intermediate' },
  ],
  education: [
    {
      degree: 'B.Sc. in Computer Science',
      institution: 'University of Example',
    },
  ],
  experience: [
    {
      position: 'Software Engineer',
      company: 'Tech Company',
    },
  ],
  projects: [
    {
      projectName: 'Example Project',
      description:
        'Developed a full-stack web application using React and Node.js.',
    },
  ],
  certifications: [
    {
      certificationName: 'Certified JavaScript Developer',
      issuer: 'Example Institute',
    },
  ],
};

const CvMaker = () => {
  const [form] = Form.useForm();
  const [resumeData, setResumeData] = useState(defaultData);
  const [selectedLayout, setSelectedLayout] = useState('layout1');
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    form.setFieldsValue(resumeData); // Set form values when resumeData changes
  }, [resumeData, form]);

  const onFinish = (values) => {
    const profilePicture = values.profilePicture?.[0]?.originFileObj;
    const reader = new FileReader();
    reader.onload = (e) => {
      setResumeData({ ...values, profilePicture: e.target.result });
    };
    if (profilePicture) {
      reader.readAsDataURL(profilePicture);
    } else {
      setResumeData(values);
    }
  };

  const handleFormChange = () => {
    const values = form.getFieldsValue();
    setResumeData((prevData) => ({ ...prevData, ...values })); // Update resumeData only for changed fields
  };

  const saveResumeAsPDF = () => {
    const input = document.getElementById('resume-preview');

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

  const handleLayoutChange = (value) => {
    setSelectedLayout(value);
  };

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

  const steps = [
    {
      title: 'Personal Info',
      content: <PersonalInfoForm form={form} />, // Pass form to child components
    },
    {
      title: 'Education',
      content: <EducationForm form={form} />,
    },
    {
      title: 'Experience',
      content: <ExperienceForm form={form} />,
    },
    {
      title: 'Skills',
      content: <SkillsForm form={form} />,
    },
    {
      title: 'Projects',
      content: <ProjectsForm form={form} />,
    },
    {
      title: 'Certifications',
      content: <CertificationsForm form={form} />,
    },
    {
      title: 'Languages',
      content: <LanguagesForm form={form} />,
    },
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <Title level={2} className="text-center">
        Resume Maker
      </Title>
      <Row gutter={16}>
        {/* Form Section (1/3 of the width) */}
        <Col span={8}>
          <Form
            form={form}
            onFinish={onFinish}
            onValuesChange={handleFormChange}
            layout="vertical"
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <Steps current={currentStep}>
              {steps.map((item) => (
                <Step key={item.title} title={item.title} />
              ))}
            </Steps>
            <div className="steps-content">{steps[currentStep].content}</div>
            <div className="steps-action">
              {currentStep < steps.length - 1 && (
                <Button type="primary" onClick={() => next()} block>
                  Next
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Form.Item>
                  <Button type="primary" htmlType="submit" block>
                    Generate Resume
                  </Button>
                </Form.Item>
              )}
              {currentStep > 0 && (
                <Button style={{ marginTop: 8 }} onClick={() => prev()} block>
                  Previous
                </Button>
              )}
            </div>
          </Form>
        </Col>

        {/* Resume Preview Section (2/3 of the width) */}
        <Col span={16}>
          <div>
            <Select
              defaultValue="layout1"
              style={{ width: '100%', marginBottom: '16px' }}
              onChange={handleLayoutChange}
            >
              <Option value="layout1">Layout 1</Option>
              <Option value="layout2">Layout 2</Option>
              <Option value="layout3">Layout 3</Option>
              <Option value="layout4">Layout 4</Option>
            </Select>
            {renderResumePreview()}
            <Button type="primary" onClick={saveResumeAsPDF} block>
              Save as PDF
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CvMaker;
