import React from 'react';
import { Card, Row, Col, Typography, Divider, Tag } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  BookOutlined,
  ToolOutlined,
  TrophyOutlined,
  UserOutlined,
  GlobalOutlined,
  CalendarOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Layout8 = ({ resumeData }) => (
  <Card
    id="resume-preview"
    className="w-full max-w-4xl bg-white p-6 mt-6 rounded-lg shadow-lg"
    style={{
      border: 'none',
      padding: '0',
      background: 'linear-gradient(180deg, #F0F4F8 50%, #ffffff 50%)',
      overflow: 'hidden',
    }}
  >
    <Row gutter={16}>
      {/* Sidebar with Profile and Contact Info */}
      <Col
        span={8}
        style={{
          backgroundColor: '#283593',
          padding: '20px',
          color: '#fff',
          borderTopLeftRadius: '8px',
          borderBottomLeftRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Profile Image */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
            src={resumeData.profilePicture || 'https://via.placeholder.com/100'}
            alt="Profile"
            style={{
              borderRadius: '50%',
              width: '100px',
              height: '100px',
              border: '4px solid #ffffff',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
            }}
          />
          <Title level={3} style={{ color: '#FFF5E1', marginTop: '10px' }}>
            {resumeData.fullName}
          </Title>
          <Text italic style={{ color: '#FDD835' }}>
            {resumeData.professionalTitle}
          </Text>
        </div>

        {/* Contact Information */}
        <Divider style={{ backgroundColor: '#ffffff50' }} />
        <div style={{ color: '#ffffffb3', textAlign: 'center' }}>
          <Text className="text-white">
            <HomeOutlined /> {resumeData.address}
          </Text>
          <br />
          <Text className="text-white">
            <PhoneOutlined /> {resumeData.phoneNumber}
          </Text>
          <br />
          <Text className="text-white">
            <MailOutlined /> {resumeData.email}
          </Text>
        </div>

        {/* Skills Section */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div style={{ width: '100%' }}>
            <Divider style={{ backgroundColor: '#ffffff50' }} />
            <Text strong className="text-white">
              <ToolOutlined /> Skills
            </Text>
            <ul style={{ paddingLeft: '20px', color: '#ffffffb3' }}>
              {resumeData.skills.map(
                (skill, idx) =>
                  skill && (
                    <li key={idx}>
                      <Text className="text-white">{skill.skill}</Text>
                    </li>
                  )
              )}
            </ul>
          </div>
        )}

        {/* Languages Section */}
        {resumeData.languages && resumeData.languages.length > 0 && (
          <div style={{ width: '100%' }}>
            <Divider style={{ backgroundColor: '#ffffff50' }} />
            <Text className="text-white" strong>
              <GlobalOutlined /> Languages
            </Text>
            <ul style={{ paddingLeft: '20px', color: '#ffffffb3' }}>
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
        )}
      </Col>

      {/* Main Content */}
      <Col span={16} style={{ padding: '20px', backgroundColor: '#F9FAFB' }}>
        {/* Summary Section */}
        {resumeData.summary && (
          <div>
            <Title level={4} style={{ color: '#283593', marginBottom: '12px' }}>
              <UserOutlined /> Summary
            </Title>
            <Text>{resumeData.summary}</Text>
            <Divider />
          </div>
        )}

        {/* Education Section */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div>
            <Title level={4} style={{ color: '#283593', marginBottom: '12px' }}>
              <BookOutlined /> Education
            </Title>
            <ul>
              {resumeData.education.map(
                (edu, idx) =>
                  edu && (
                    <li key={idx} style={{ marginBottom: '8px' }}>
                      <Text>
                        <strong>{edu.degree}</strong> at {edu.institution},{' '}
                        {new Date(edu.startDate).toLocaleDateString()} -{' '}
                        {new Date(edu.endDate).toLocaleDateString()}
                      </Text>
                    </li>
                  )
              )}
            </ul>
            <Divider />
          </div>
        )}

        {/* Experience Section */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div>
            <Title level={4} style={{ color: '#283593', marginBottom: '12px' }}>
              <ToolOutlined /> Experience
            </Title>
            <ul>
              {resumeData.experience.map(
                (exp, idx) =>
                  exp && (
                    <li key={idx} style={{ marginBottom: '8px' }}>
                      <Text>
                        <strong>{exp.position}</strong> at {exp.company},{' '}
                        {new Date(exp.startDate).toLocaleDateString()} -{' '}
                        {new Date(exp.endDate).toLocaleDateString()}
                      </Text>
                    </li>
                  )
              )}
            </ul>
            <Divider />
          </div>
        )}

        {/* Projects Section */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <div>
            <Title level={4} style={{ color: '#283593', marginBottom: '12px' }}>
              <TrophyOutlined /> Projects
            </Title>
            <ul>
              {resumeData.projects.map(
                (project, idx) =>
                  project && (
                    <li key={idx} style={{ marginBottom: '8px' }}>
                      <Text>
                        <strong>{project.projectName}</strong>:{' '}
                        {project.description}
                      </Text>
                    </li>
                  )
              )}
            </ul>
            <Divider />
          </div>
        )}

        {/* Certifications Section */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <div>
            <Title level={4} style={{ color: '#283593', marginBottom: '12px' }}>
              <TrophyOutlined /> Certifications
            </Title>
            <ul>
              {resumeData.certifications.map(
                (cert, idx) =>
                  cert && (
                    <li key={idx} style={{ marginBottom: '8px' }}>
                      <Text>
                        <strong>{cert.certificationName}</strong> by{' '}
                        {cert.issuer}
                      </Text>
                    </li>
                  )
              )}
            </ul>
          </div>
        )}
      </Col>
    </Row>
  </Card>
);

export default Layout8;
