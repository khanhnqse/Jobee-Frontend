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
    {
      position: 'Web Developer',
      company: 'Web Development Inc.',
    },
  ],
  projects: [
    {
      projectName: 'Example Project',
      description:
        'Developed a full-stack web application using React and Node.js.',
    },
    {
      projectName: 'Another Project',
      description: 'Implemented new features for an existing web application.',
    },
  ],
  certifications: [
    {
      certificationName: 'Certified JavaScript Developer',
      issuer: 'Example Institute',
    },
    {
      certificationName: 'React Certification',
      issuer: 'React Training',
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
    console.log('Form values on finish:', values); // Log form values
    const profilePicture = values.profilePicture;
    console.log('Profile picture data URL:', profilePicture); // Log the profile picture data URL

    if (profilePicture) {
      setResumeData((prevData) => ({
        ...prevData,
        profilePicture,
      }));
    } else {
      setResumeData((prevData) => ({ ...prevData, ...values }));
    }
  };

  const handleFormChange = () => {
    const values = form.getFieldsValue();
    console.log('Form values on change:', values); // Log form values on change
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
      content: <PersonalInfoForm form={form} setResumeData={setResumeData} />, // Pass form and setResumeData to child components
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
    <>
      <div className="min-h-screen bg-[#eae3c3] p-4">
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
              className="bg-white py-2 px-6 mt-[73px] rounded-lg shadow-md"
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
          <Col span={12}>
            <div>
              <Select
                defaultValue="layout1"
                style={{ width: '100%', marginBottom: '16px' }}
                onChange={handleLayoutChange}
                dropdownStyle={{ maxHeight: '300px' }} // Optional to control dropdown height
              >
                <Option value="layout1">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src="https://marketplace.canva.com/EAFRuCp3DcY/1/0/1131w/canva-black-white-minimalist-cv-resume-f5JNR-K5jjw.jpg"
                      alt="Basic"
                      style={{
                        width: '40px',
                        height: 'auto',
                        marginRight: '10px',
                        objectFit: 'cover',
                      }} // Adjusted width
                    />
                    <span>Basic</span>
                  </div>
                </Option>
                <Option value="layout2">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src="/path/to/layout2.png"
                      alt="Simple"
                      style={{
                        width: '40px',
                        height: 'auto',
                        marginRight: '10px',
                        objectFit: 'cover',
                      }} // Adjusted width
                    />
                    <span>Simple</span>
                  </div>
                </Option>
                <Option value="layout3">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src="/path/to/layout3.png"
                      alt="Modern"
                      style={{
                        width: '40px',
                        height: 'auto',
                        marginRight: '10px',
                        objectFit: 'cover',
                      }} // Adjusted width
                    />
                    <span>Modern</span>
                  </div>
                </Option>
                <Option value="layout4">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src="/path/to/layout4.png"
                      alt="Classic"
                      style={{
                        width: '40px',
                        height: 'auto',
                        marginRight: '10px',
                        objectFit: 'cover',
                      }} // Adjusted width
                    />
                    <span>Classic</span>
                  </div>
                </Option>
              </Select>
              {renderResumePreview()}
            </div>
          </Col>
          <Button
            type="primary"
            onClick={saveResumeAsPDF}
            block
            style={{
              backgroundColor: '#4CAF50',
              borderColor: '#4CAF50',
              color: '#fff',
              fontWeight: 'bold',
              width: '250px',
              height: '50px',
              marginTop: '20px',

              marginLeft: '510px',
            }}
          >
            Save as PDF
          </Button>
        </Row>
      </div>
    </>
  );
};

export default CvMaker;
