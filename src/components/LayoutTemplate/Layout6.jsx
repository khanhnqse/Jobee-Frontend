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

const Layout6 = ({ resumeData }) => (
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
      {/* Left Column */}
      <Col
        span={8}
        style={{
          backgroundColor: '#2b8a44',
          padding: '20px',
          color: '#fff',
          borderRadius: '10px',
        }}
      >
        {/* Profile Picture */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Avatar
            src={resumeData.profilePicture || 'https://via.placeholder.com/100'}
            alt="Profile"
            size={100}
            style={{
              borderRadius: '50%',
              width: '100px',
              height: '100px',
            }}
          />
        </div>

        {/* Contact Information */}
        <div style={{ marginBottom: '20px' }}>
          <Title level={4} style={{ color: '#fff' }}>
            Contact Information
          </Title>
          {resumeData.phoneNumber && (
            <Text style={{ color: '#fff' }}>
              <PhoneOutlined /> {resumeData.phoneNumber}
            </Text>
          )}
          <br />
          {resumeData.email && (
            <Text style={{ color: '#fff' }}>
              <MailOutlined /> {resumeData.email}
            </Text>
          )}
          <br />
          {resumeData.address && (
            <Text style={{ color: '#fff' }}>
              <HomeOutlined /> {resumeData.address}
            </Text>
          )}
        </div>

        {/* About Me Section */}
        <div style={{ marginBottom: '20px' }}>
          <Title level={4} style={{ color: '#fff' }}>
            About Me
          </Title>
          <p>{resumeData.summary || 'No summary provided.'}</p>
        </div>

        {/* Languages */}
        <div style={{ marginBottom: '20px' }}>
          <Title level={4} style={{ color: '#fff' }}>
            Languages
          </Title>
          <ul>
            {resumeData.languages.map(
              (language, idx) =>
                language && (
                  <li key={idx}>
                    <Text className="text-white">
                      {language.language} - {language.proficiency}
                    </Text>
                  </li>
                )
            )}
          </ul>
        </div>

        {/* Expertise */}
        <div>
          <Title level={4} style={{ color: '#fff' }}>
            Expertise
          </Title>
          <ul>
            {resumeData.skills.map(
              (skill, idx) =>
                skill && (
                  <li key={idx}>
                    <Text className="text-white">{skill.skill}</Text>
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
        {/* Name and Title */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Title level={2}>{resumeData.fullName}</Title>
          <Title level={4} type="secondary">
            {resumeData.professionalTitle}
          </Title>
        </div>

        {/* Experience Section */}
        <Divider />
        <Title level={4}>Experience</Title>
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

        {/* Education Section */}
        <Divider />
        <Title level={4}>Education</Title>
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

        {/* Skills Summary */}
        <Divider />
        <Title level={4}>Skills Summary</Title>
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

        {/* Certifications */}
        <Divider />
        <Title level={4}>Certifications</Title>
        <ul>
          {resumeData.certifications.map(
            (cert, idx) =>
              cert && (
                <li key={idx} style={{ marginBottom: '10px' }}>
                  <Text>
                    <TrophyOutlined /> {cert.certificationName} by {cert.issuer}
                  </Text>
                </li>
              )
          )}
        </ul>
      </Col>
    </Row>
  </Card>
);

export default Layout6;
