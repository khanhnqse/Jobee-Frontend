import React from 'react';
import { Form, Button, Steps } from 'antd';
import PersonalInfoForm from '../CV Component/PersonalInfoForm';
import EducationForm from '../CV Component/EducationForm';
import ExperienceForm from '../CV Component/ExperienceForm';
import SkillsForm from '../CV Component/SkillsForm';
import ProjectsForm from '../CV Component/ProjectsForm';
import CertificationsForm from '../CV Component/CertificationsForm';
import LanguagesForm from '../CV Component/LanguagesForm';

const { Step } = Steps;

const steps = [
  {
    title: 'Personal Info',
    content: <PersonalInfoForm />,
  },
  {
    title: 'Education',
    content: <EducationForm />,
  },
  {
    title: 'Experience',
    content: <ExperienceForm />,
  },
  {
    title: 'Skills',
    content: <SkillsForm />,
  },
  {
    title: 'Projects',
    content: <ProjectsForm />,
  },
  {
    title: 'Certifications',
    content: <CertificationsForm />,
  },
  {
    title: 'Languages',
    content: <LanguagesForm />,
  },
];

const ResumeForm = ({
  form,
  currentStep,
  next,
  prev,
  onFinish,
  handleFormChange,
}) => (
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
        <Button type="primary" onClick={next} block>
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
        <Button style={{ marginTop: 8 }} onClick={prev} block>
          Previous
        </Button>
      )}
    </div>
  </Form>
);

export default ResumeForm;
