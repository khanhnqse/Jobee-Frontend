import React from 'react';
import { Card, Row, Col, Typography, Divider } from 'antd';

const { Title, Text } = Typography;

const Layout2 = ({ resumeData }) => (
  <Card
    id="resume-preview"
    className="w-full max-w-4xl bg-white p-6 mt-6 rounded-lg shadow-md"
  >
    <Row gutter={16}>
      <Col span={24}>
        <Title level={2} style={{ textAlign: 'center' }}>
          {resumeData.fullName || 'Full Name'}
        </Title>
        <Title level={5} style={{ textAlign: 'center' }}>
          {resumeData.professionalTitle || 'Professional Title'}
        </Title>
        <Divider />
        <Row>
          <Col span={12}>
            <Text strong>Contact</Text>
            <Divider />
            <Text>{resumeData.address || 'Address'}</Text>
            <br />
            <Text>{resumeData.email || 'Email'}</Text>
            <br />
            <Text>{resumeData.phoneNumber || 'Phone Number'}</Text>
            <br />
            <Text>{resumeData.dateOfBirth || 'Date of Birth'}</Text>
            <Divider />
            <Text strong>Skills</Text>
            <ul>
              {resumeData.skills?.length > 0 ? (
                resumeData.skills.map((skill, idx) => (
                  <li key={idx}>
                    <Text>{skill?.skill || 'No skill provided'}</Text>
                  </li>
                ))
              ) : (
                <li>
                  <Text>No skills provided.</Text>
                </li>
              )}
            </ul>
            <Divider />
          </Col>

          <Col span={12}>
            <Text strong>Education</Text>
            <ul>
              {resumeData.education?.length > 0 ? (
                resumeData.education.map((edu, idx) => (
                  <li key={idx}>
                    <Text>
                      {edu?.degree || 'Degree'} at{' '}
                      {edu?.institution || 'Institution'},{' '}
                      {edu?.startDate
                        ? new Date(edu.startDate).toLocaleDateString()
                        : 'Start Date'}{' '}
                      -{' '}
                      {edu?.endDate
                        ? new Date(edu.endDate).toLocaleDateString()
                        : 'End Date'}
                    </Text>
                  </li>
                ))
              ) : (
                <li>
                  <Text>No education details provided.</Text>
                </li>
              )}
            </ul>
            <Divider />
            <Text strong>Experience</Text>
            <ul>
              {resumeData.experience?.length > 0 ? (
                resumeData.experience.map((exp, idx) => (
                  <li key={idx}>
                    <Text>
                      {exp?.position || 'Position'} at{' '}
                      {exp?.company || 'Company'},{' '}
                      {exp?.startDate
                        ? new Date(exp.startDate).toLocaleDateString()
                        : 'Start Date'}{' '}
                      -{' '}
                      {exp?.endDate
                        ? new Date(exp.endDate).toLocaleDateString()
                        : 'End Date'}
                    </Text>
                  </li>
                ))
              ) : (
                <li>
                  <Text>No experience details provided.</Text>
                </li>
              )}
            </ul>
            <Divider />

            <Text strong>Projects</Text>
            <ul>
              {resumeData.projects?.length > 0 ? (
                resumeData.projects.map((project, idx) => (
                  <li key={idx}>
                    <Text>
                      <strong>{project?.projectName || 'Project Name'}</strong>:{' '}
                      {project?.description || 'No description provided'}
                    </Text>
                  </li>
                ))
              ) : (
                <li>
                  <Text>No projects provided.</Text>
                </li>
              )}
            </ul>
            <Divider />
            <Text strong>Certifications</Text>
            <ul>
              {resumeData.certifications?.length > 0 ? (
                resumeData.certifications.map((cert, idx) => (
                  <li key={idx}>
                    <Text>
                      <strong>
                        {cert?.certificationName || 'Certification Name'}
                      </strong>{' '}
                      by {cert?.issuer || 'Issuer'}
                    </Text>
                  </li>
                ))
              ) : (
                <li>
                  <Text>No certifications provided.</Text>
                </li>
              )}
            </ul>
          </Col>
        </Row>
      </Col>
    </Row>
  </Card>
);

export default Layout2;
