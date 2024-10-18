import React from 'react';
import { Card, Row, Col, Typography, Divider, Tag } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  BookOutlined,
  TrophyOutlined,
  UserOutlined,
  GlobalOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Layout4 = ({ resumeData }) => (
  <Card
    id="resume-preview"
    className="w-full max-w-4xl bg-white p-6 mt-6 rounded-lg shadow-md"
  >
    {/* Header Section */}
    <Row
      gutter={16}
      style={{ backgroundColor: '#29527A', padding: '20px', color: 'white' }}
    >
      <Col span={4} style={{ textAlign: 'center' }}>
        {/* Profile Picture */}
        <img
          src={resumeData.profilePicture || 'https://via.placeholder.com/100'}
          alt="Profile"
          style={{
            width: '100px',
            height: '100px',
            objectFit: 'cover',
          }}
        />
      </Col>
      <Col span={20}>
        <Title level={2} style={{ color: 'white', marginBottom: 0 }}>
          {resumeData.fullName || 'Full Name'}
        </Title>
        <Title level={5} style={{ color: 'lightgray' }}>
          {resumeData.professionalTitle || 'Professional Title'}
        </Title>
        <div style={{ marginTop: '10px' }}>
          <Text style={{ color: 'white' }}>
            <CalendarOutlined /> {resumeData.dateOfBirth || 'Date of Birth'}
          </Text>
          <br />
          <Text style={{ color: 'white' }}>
            <PhoneOutlined /> {resumeData.phoneNumber || 'Phone Number'}
          </Text>
          <br />
          <Text style={{ color: 'white' }}>
            <MailOutlined /> {resumeData.email || 'Email'}
          </Text>
          <br />
          <Text style={{ color: 'white' }}>
            <HomeOutlined /> {resumeData.address || 'Address'}
          </Text>
        </div>
      </Col>
    </Row>

    {/* Content Section */}
    <Row gutter={16} style={{ padding: '20px' }}>
      {/* Left Column */}
      <Col span={12}>
        {/* Skills Section */}
        <Text strong>
          <GlobalOutlined /> Skills
        </Text>
        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
          {resumeData.skills?.map((skill, idx) => (
            <li key={idx}>
              <Text>{skill?.skill || 'No skill provided'}</Text>
            </li>
          ))}
        </ul>
        <Divider />

        {/* Languages Section */}
        <Text strong>
          <GlobalOutlined /> Languages
        </Text>
        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
          {resumeData.languages?.map((language, idx) => (
            <li key={idx}>
              <Text>
                {language?.language || 'Language'} -{' '}
                {language?.proficiency || 'Proficiency'}
              </Text>
            </li>
          ))}
        </ul>
        <Divider />

        {/* Certifications Section */}
        <Text strong>
          <TrophyOutlined /> Certifications
        </Text>
        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
          {resumeData.certifications?.map((cert, idx) => (
            <li key={idx}>
              <Text>
                <strong>
                  {cert?.certificationName || 'Certification Name'}
                </strong>{' '}
                by {cert?.issuer || 'Issuer'}
              </Text>
            </li>
          ))}
        </ul>
      </Col>

      {/* Right Column */}
      <Col span={12}>
        {/* Profile Summary */}
        <Text strong>
          <UserOutlined /> Profile
        </Text>
        <p>{resumeData.summary || 'No summary provided'}</p>
        <Divider />

        {/* Education Section */}
        <Text strong>
          <BookOutlined /> Education
        </Text>
        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
          {resumeData.education?.map((edu, idx) => (
            <li key={idx}>
              <Text>
                {edu?.degree || 'Degree'} at {edu?.institution || 'Institution'}{' '}
                (
                {edu?.startDate
                  ? new Date(edu.startDate).toLocaleDateString()
                  : 'Start Date'}{' '}
                -{' '}
                {edu?.endDate
                  ? new Date(edu.endDate).toLocaleDateString()
                  : 'End Date'}
                )
              </Text>
            </li>
          ))}
        </ul>
        <Divider />

        {/* Work Experience Section */}
        <Text strong>
          <BookOutlined /> Employment History
        </Text>
        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
          {resumeData.experience?.map((exp, idx) => (
            <li key={idx}>
              <Text>
                {exp?.position || 'Position'} at {exp?.company || 'Company'} (
                {exp?.startDate
                  ? new Date(exp.startDate).toLocaleDateString()
                  : 'Start Date'}{' '}
                -{' '}
                {exp?.endDate
                  ? new Date(exp.endDate).toLocaleDateString()
                  : 'End Date'}
                )
              </Text>
              <p>{exp?.description || 'No description provided'}</p>
            </li>
          ))}
        </ul>

        {/* Projects Section */}
        <Divider />
        <Text strong>
          <BookOutlined /> Projects
        </Text>
        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
          {resumeData.projects?.map((project, idx) => (
            <li key={idx}>
              <Text>
                <strong>{project?.projectName || 'Project Name'}</strong>:{' '}
                {project?.description || 'No description provided'}
              </Text>
            </li>
          ))}
        </ul>
      </Col>
    </Row>
  </Card>
);

export default Layout4;
