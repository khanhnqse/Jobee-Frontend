import React, { useState, useEffect } from 'react';
import {
  Form,
  Typography,
  Divider,
  Button,
  Row,
  Col,
  Card,
  Steps,
  Pagination,
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
import { Link } from 'react-router-dom';

const { Title } = Typography;
const { Step } = Steps;

const defaultData = {
  profilePicture: 'https://via.placeholder.com/100',
  fullName: 'John Doe',
  professionalTitle: 'Software Engineer',
  address: '123 Main St, Anytown, USA',
  dateOfBirth: '01/01/2003',
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

const cvTemplates = [
  {
    id: 'layout1',
    title: 'Basic',
    imageUrl:
      'https://www.shutterstock.com/create/assets/asset-gateway/template/previews/25533-0.png?width=500&format=webp',
  },
  {
    id: 'layout2',
    title: 'Simple',
    imageUrl:
      'https://static.jobscan.co/blog/uploads/Student-resume-with-no-experience.png',
  },
  {
    id: 'layout3',
    title: 'Modern',
    imageUrl:
      'https://www.cvresumebuild.com/wp-content/uploads/2024/03/TEACHER-OF-ENGLISH-LANGUAGE_Page1-600x850.png',
  },
  {
    id: 'layout4',
    title: 'Classic',
    imageUrl:
      'https://www.my-resume-templates.com/wp-content/uploads/2023/05/functional-resume-template-350x495.jpg',
  },
];

const CvMaker = () => {
  const [form] = Form.useForm();
  const [resumeData, setResumeData] = useState(defaultData);
  const [selectedLayout, setSelectedLayout] = useState('layout1');
  const [currentStep, setCurrentStep] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const templatesPerPage = 2;

  useEffect(() => {
    form.setFieldsValue(resumeData);
  }, [resumeData, form]);

  const onFinish = (values) => {
    console.log('Form values on finish:', values);
    const profilePicture = values.profilePicture;
    console.log('Profile picture data URL:', profilePicture);

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
    console.log('Form values on change:', values);
    setResumeData((prevData) => ({ ...prevData, ...values }));
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

  const handleLayoutChange = (templateId) => {
    setSelectedLayout(templateId);
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

  // Pagination
  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = cvTemplates.slice(
    indexOfFirstTemplate,
    indexOfLastTemplate
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
              className="bg-white py-2 px-6 mt-[25px] rounded-lg shadow-md"
            >
              <Steps current={currentStep}>
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <div className="steps-content">{steps[currentStep].content}</div>
              <div className="steps-action">
                {currentStep < steps.length - 1 && (
                  <Button
                    style={{
                      backgroundColor: '#3b7b7a',
                      borderColor: '#3b7b7a',
                      color: '#fff',
                    }}
                    type="primary"
                    onClick={() => next()}
                    block
                  >
                    Next
                  </Button>
                )}
                {currentStep === steps.length - 1 && (
                  <Form.Item>
                    <Button
                      style={{
                        backgroundColor: '#3b7b7a',
                        borderColor: '#3b7b7a',
                        color: '#fff',
                      }}
                      type="primary"
                      htmlType="submit"
                      block
                    >
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

          {/* Resume Preview and Template Selection Section (2/3 of the width) */}
          <Col span={16}>
            <Row gutter={16}>
              <Col span={19}>
                <div id="resume-preview" style={{ marginTop: '16px' }}>
                  {renderResumePreview()}
                </div>
              </Col>
              <Col span={5}>
                <Typography.Title level={4}>
                  Change CV Template
                </Typography.Title>
                <Row gutter={[16, 16]}>
                  {currentTemplates.map((template) => (
                    <Col span={24} key={template.id}>
                      <Card
                        hoverable
                        onClick={() => handleLayoutChange(template.id)}
                        cover={
                          <img
                            alt={template.title}
                            src={template.imageUrl}
                            style={{
                              height: '250px',
                              objectFit: 'cover',
                              marginBottom: '-19px',
                            }}
                          />
                        }
                        className={
                          selectedLayout === template.id ? 'selected' : ''
                        }
                        style={{
                          width: '100%',
                          height: '280px',
                          border:
                            selectedLayout === template.id
                              ? '2px solid #1890ff'
                              : 'none',
                          borderRadius: '8px',
                        }}
                      >
                        <Card.Meta title={template.title} />
                      </Card>
                    </Col>
                  ))}
                </Row>
                <Pagination
                  current={currentPage}
                  pageSize={templatesPerPage}
                  total={cvTemplates.length}
                  onChange={handlePageChange}
                  style={{ marginTop: '16px', textAlign: 'center' }}
                />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '20px' }}>
          <Col>
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
              Save as PDF
            </Button>
          </Col>
          <Col>
            <Link to="/grade-resume">
              <Button
                type="default"
                style={{
                  fontWeight: 'bold',
                  width: '250px',
                  height: '50px',
                }}
              >
                Grade your resume now
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CvMaker;
