import React from 'react';
import { Card, Row, Col, Typography, Divider } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  BookOutlined,
  ToolOutlined,
  ProjectOutlined,
  TrophyOutlined,
  UserOutlined,
  GlobalOutlined,
  CalendarFilled,
  CalendarOutlined,
} from '@ant-design/icons';
import { MdDateRange } from 'react-icons/md';

const { Title, Text } = Typography;

const Layout1 = ({ resumeData }) => (
  <Card
    id="resume-preview"
    className="w-full max-w-4xl bg-white p-6 mt-6 rounded-lg shadow-md"
  >
    <Row gutter={16}>
      <Col span={8} style={{ backgroundColor: '#87b3fa', padding: '20px' }}>
        <div>
          <img
            src={resumeData.profilePicture || 'https://via.placeholder.com/100'}
            alt="Profile"
            className="mb-4"
            style={{
              borderRadius: '50%',
              width: '100px',
              height: '100px',
            }}
          />
          <Text strong>
            <UserOutlined /> Information
          </Text>
          <Divider />
          {resumeData.dateOfBirth && (
            <>
              <Text>
                <CalendarOutlined /> {resumeData.dateOfBirth}
              </Text>
              <br />
            </>
          )}

          {resumeData.address && (
            <>
              <Text>
                <HomeOutlined /> {resumeData.address}
              </Text>
              <br />
            </>
          )}
          {resumeData.email && (
            <>
              <Text>
                <MailOutlined /> {resumeData.email}
              </Text>
              <br />
            </>
          )}
          {resumeData.phoneNumber && (
            <>
              <Text>
                <PhoneOutlined /> {resumeData.phoneNumber}
              </Text>
              <br />
            </>
          )}
        </div>
        <Divider />
        {resumeData.skills && resumeData.skills.length > 0 && (
          <>
            <Text strong>
              <ToolOutlined /> Skills
            </Text>
            <ul>
              {resumeData.skills.map(
                (skill, idx) =>
                  skill && (
                    <li key={idx}>
                      <Text>{skill.skill}</Text>
                    </li>
                  )
              )}
            </ul>
            <Divider />
          </>
        )}
        {resumeData.languages && resumeData.languages.length > 0 && (
          <>
            <Text strong>
              <GlobalOutlined /> Languages
            </Text>
            <ul>
              {resumeData.languages.map(
                (language, idx) =>
                  language && (
                    <li key={idx}>
                      <Text>
                        {language.language} - {language.proficiency}
                      </Text>
                    </li>
                  )
              )}
            </ul>
            <Divider />
          </>
        )}
      </Col>
      <Col span={16}>
        <Title level={2}>{resumeData.fullName}</Title>
        <Title level={5}>{resumeData.professionalTitle}</Title>
        <Divider />
        {resumeData.summary && (
          <>
            <Text strong>
              <UserOutlined /> Summary
            </Text>
            <p>{resumeData.summary}</p>
            <Divider />
          </>
        )}
        {resumeData.education && resumeData.education.length > 0 && (
          <>
            <Text strong>
              <BookOutlined /> Education
            </Text>
            <ul>
              {resumeData.education.map(
                (edu, idx) =>
                  edu && (
                    <li key={idx}>
                      <Text>
                        {edu.degree} at {edu.institution},{' '}
                        {new Date(edu.startDate).toLocaleDateString()} -{' '}
                        {new Date(edu.endDate).toLocaleDateString()}
                      </Text>
                    </li>
                  )
              )}
            </ul>
            <Divider />
          </>
        )}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <>
            <Text strong>
              <ToolOutlined /> Experience
            </Text>
            <ul>
              {resumeData.experience.map(
                (exp, idx) =>
                  exp && (
                    <li key={idx}>
                      <Text>
                        {exp.position} at {exp.company},{' '}
                        {new Date(exp.startDate).toLocaleDateString()} -{' '}
                        {new Date(exp.endDate).toLocaleDateString()}
                      </Text>
                    </li>
                  )
              )}
            </ul>
            <Divider />
          </>
        )}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <>
            <Text strong>
              <ProjectOutlined /> Projects
            </Text>
            <ul>
              {resumeData.projects.map(
                (project, idx) =>
                  project && (
                    <li key={idx}>
                      <Text>
                        <strong>{project.projectName}</strong>:{' '}
                        {project.description}
                      </Text>
                    </li>
                  )
              )}
            </ul>
            <Divider />
          </>
        )}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <>
            <Text strong>
              <TrophyOutlined /> Certifications
            </Text>
            <ul>
              {resumeData.certifications.map(
                (cert, idx) =>
                  cert && (
                    <li key={idx}>
                      <Text>
                        <strong>{cert.certificationName}</strong> by{' '}
                        {cert.issuer}
                      </Text>
                    </li>
                  )
              )}
            </ul>
          </>
        )}
      </Col>
    </Row>
  </Card>
);

export default Layout1;
