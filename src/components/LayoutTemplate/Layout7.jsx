import React from 'react';
import { Card, Row, Col, Typography, Divider, Avatar, Progress } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  TrophyOutlined,
  UserOutlined,
  GlobalOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const getProficiencyPercent = (proficiency) => {
  switch (proficiency) {
    case 'Beginner':
      return 25;
    case 'Intermediate':
      return 50;
    case 'Advanced':
      return 75;
    case 'Expert':
      return 100;
    default:
      return 0;
  }
};

const Layout7 = ({ resumeData }) => (
  <Card
    id="resume-preview"
    className="w-full max-w-4xl bg-white p-6 mt-6 rounded-lg shadow-md"
    style={{
      position: 'relative',
      overflow: 'hidden',
      background: '#f5f5f5',
    }}
  >
    <Row gutter={[16, 16]}>
      {/* Header Section */}
      <Col span={24} style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Avatar
          src={resumeData.profilePicture || 'https://via.placeholder.com/100'}
          alt="Profile"
          size={120}
          style={{
            borderRadius: '50%',
            width: '120px',
            height: '120px',
            marginBottom: '10px',
          }}
        />
        <Title level={2}>{resumeData.fullName}</Title>
        <Title level={4} type="secondary">
          {resumeData.professionalTitle}
        </Title>
      </Col>

      {/* Left Column */}
      <Col span={8} style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
        {/* Contact Information */}
        <div style={{ marginBottom: '20px' }}>
          <Title level={4}>Contact Information</Title>
          <Divider />
          {resumeData.phoneNumber && (
            <Text style={{ display: 'block', marginBottom: '5px' }}>
              <PhoneOutlined /> {resumeData.phoneNumber}
            </Text>
          )}
          {resumeData.email && (
            <Text style={{ display: 'block', marginBottom: '5px' }}>
              <MailOutlined /> {resumeData.email}
            </Text>
          )}
          {resumeData.address && (
            <Text style={{ display: 'block', marginBottom: '5px' }}>
              <HomeOutlined /> {resumeData.address}
            </Text>
          )}
        </div>

        {/* Languages */}
        <div style={{ marginBottom: '20px' }}>
          <Title level={4}>Languages</Title>
          <Divider />
          <ul>
            {resumeData.languages.map(
              (language, idx) =>
                language && (
                  <li key={idx} style={{ marginBottom: '10px' }}>
                    <Text>
                      {language.language} - {language.proficiency}
                    </Text>
                  </li>
                )
            )}
          </ul>
        </div>

        {/* Skills Summary */}
        <div style={{ marginBottom: '20px' }}>
          <Title level={4}>Skills Summary</Title>
          <Divider />
          <ul>
            {resumeData.skills.map(
              (skill, idx) =>
                skill && (
                  <li key={idx} style={{ marginBottom: '10px' }}>
                    <Text>{skill.skill}</Text>
                    <Progress
                      percent={getProficiencyPercent(skill.proficiency)}
                      strokeColor="#1890ff"
                      style={{ marginTop: '5px' }}
                    />
                  </li>
                )
            )}
          </ul>
        </div>
      </Col>

      {/* Right Column */}
      <Col span={16} style={{ padding: '20px' }}>
        {/* About Me Section */}
        <div style={{ marginBottom: '20px' }}>
          <Title level={4}>About Me</Title>
          <Divider />
          <p>{resumeData.aboutMe || 'No summary provided.'}</p>
        </div>

        {/* Experience Section */}
        <div style={{ marginBottom: '20px' }}>
          <Title level={4}>Experience</Title>
          <Divider />
          <ul>
            {resumeData.experience.map(
              (exp, idx) =>
                exp && (
                  <li key={idx} style={{ marginBottom: '10px' }}>
                    <Text strong>{exp.position}</Text> at {exp.company}
                    <br />
                    <Text type="secondary">
                      {new Date(exp.startDate).toLocaleDateString()} -{' '}
                      {new Date(exp.endDate).toLocaleDateString()}
                    </Text>
                    <p>{exp.description}</p>
                  </li>
                )
            )}
          </ul>
        </div>

        {/* Education Section */}
        <div style={{ marginBottom: '20px' }}>
          <Title level={4}>Education</Title>
          <Divider />
          <ul>
            {resumeData.education &&
              resumeData.education.map(
                (edu, idx) =>
                  edu && (
                    <li key={idx} style={{ marginBottom: '10px' }}>
                      <Text strong>{edu.degree}</Text> at {edu.institution}
                      <br />
                      <Text type="secondary">
                        {new Date(edu.startDate).toLocaleDateString()} -{' '}
                        {new Date(edu.endDate).toLocaleDateString()}
                      </Text>
                    </li>
                  )
              )}
          </ul>
        </div>

        {/* Certifications */}
        <div style={{ marginBottom: '20px' }}>
          <Title level={4}>Certifications</Title>
          <Divider />
          <ul>
            {resumeData.certifications.map(
              (cert, idx) =>
                cert && (
                  <li key={idx} style={{ marginBottom: '10px' }}>
                    <Text>
                      <TrophyOutlined /> {cert.certificationName} by{' '}
                      {cert.issuer}
                    </Text>
                  </li>
                )
            )}
          </ul>
        </div>
      </Col>
    </Row>
  </Card>
);

export default Layout7;
