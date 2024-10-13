import React from 'react';
import { Card, Row, Col, Typography, Divider } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  BookOutlined,
  TrophyOutlined,
  UserOutlined,
  GlobalOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Layout3 = ({ resumeData }) => (
  <Card
    id="resume-preview"
    className="w-full max-w-4xl bg-white p-6 mt-6 rounded-lg shadow-md"
  >
    <Row gutter={16}>
      {/* Left column */}
      <Col span={8} style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
        {/* Profile Picture */}
        <div style={{ textAlign: 'center' }}>
          <img
            src={resumeData.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="mb-4"
            style={{
              borderRadius: '50%',
              width: '150px',
              height: '150px',
              objectFit: 'cover',
            }}
          />
        </div>
        {/* Contact Info */}
        <div style={{ marginTop: '20px' }}>
          <Text strong>
            <UserOutlined /> Contact
          </Text>
          <Divider />
          <Text>
            <MailOutlined /> {resumeData.email || 'Email'}
          </Text>
          <br />
          <Text>
            <PhoneOutlined /> {resumeData.phoneNumber || 'Phone Number'}
          </Text>
          <br />
          <Text>
            <HomeOutlined /> {resumeData.address || 'Address'}
          </Text>
        </div>
        <Divider />
        {/* Skills Section */}
        <Text strong>
          <GlobalOutlined /> Skills
        </Text>
        <ul style={{ paddingLeft: '20px' }}>
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
        <ul style={{ paddingLeft: '20px' }}>
          {resumeData.languages?.map((language, idx) => (
            <li key={idx}>
              <Text>{language?.language || 'No language provided'}</Text>
            </li>
          ))}
        </ul>
      </Col>

      {/* Right column */}
      <Col span={16} style={{ padding: '20px' }}>
        <Title level={2}>{resumeData.fullName || 'Full Name'}</Title>
        <Title level={5}>
          {resumeData.professionalTitle || 'Professional Title'}
        </Title>
        <Divider />
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
        <ul style={{ paddingLeft: '20px' }}>
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
        <ul style={{ paddingLeft: '20px' }}>
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
        <Divider />
        {/* Projects Section */}
        <Text strong>
          <BookOutlined /> Projects
        </Text>
        <ul style={{ paddingLeft: '20px' }}>
          {resumeData.projects?.map((project, idx) => (
            <li key={idx}>
              <Text>
                <strong>{project?.projectName || 'Project Name'}</strong>:{' '}
                {project?.description || 'No description provided'}
              </Text>
            </li>
          ))}
        </ul>
        <Divider />
        {/* Certifications Section */}
        <Text strong>
          <TrophyOutlined /> Certifications
        </Text>
        <ul style={{ paddingLeft: '20px' }}>
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
    </Row>
  </Card>
);

export default Layout3;
