import React from 'react';
import { Card, Row, Col, Typography, Divider } from 'antd';

const { Title, Text } = Typography;

const ResumePreview = ({ resumeData }) => (
  <Card
    id="resume-preview"
    className="w-full max-w-4xl bg-white p-6 mt-6 rounded-lg shadow-md"
  >
    <Row gutter={16}>
      {/* Left Column */}
      <Col span={8} style={{ backgroundColor: '#f5f5f5', padding: '20px' }}>
        <div>
          <img
            src="https://via.placeholder.com/100" // Placeholder for photo
            alt="Profile"
            className="mb-4"
            style={{
              borderRadius: '50%',
              width: '100px',
              height: '100px',
            }}
          />
          <Text strong>Contact</Text>
          <Divider />
          <Text>{resumeData.address}</Text>
          <br />
          <Text>{resumeData.email}</Text>
          <br />
          <Text>{resumeData.phoneNumber}</Text>
          <Divider />
          <Text strong>Communication</Text>
          <Text block>
            {/* Customize communication section */}I have received several
            awards for my outstanding communication skills.
          </Text>
          <Divider />
          <Text strong>Leadership</Text>
          <Text block>
            {/* Customize leadership section */}I have led several projects in
            various teams with excellent outcomes.
          </Text>
        </div>
      </Col>

      {/* Right Column */}
      <Col span={16}>
        <Title level={2}>{resumeData.fullName}</Title>
        <Title level={5}>Professional Title</Title>
        <Divider />
        <Text strong>Education</Text>
        <ul>
          {resumeData.education?.map((edu, idx) => (
            <li key={idx}>
              <Text>
                {edu.degree} at {edu.institution},{' '}
                {new Date(edu.startDate).toLocaleDateString()} -{' '}
                {new Date(edu.endDate).toLocaleDateString()}
              </Text>
            </li>
          ))}
        </ul>

        <Divider />

        <Text strong>Experience</Text>
        <ul>
          {resumeData.experience?.map((exp, idx) => (
            <li key={idx}>
              <Text>
                {exp.position} at {exp.company},{' '}
                {new Date(exp.startDate).toLocaleDateString()} -{' '}
                {new Date(exp.endDate).toLocaleDateString()}
              </Text>
            </li>
          ))}
        </ul>

        <Divider />

        <Text strong>Skills</Text>
        <ul>
          {resumeData.skills?.map((skill, idx) => (
            <li key={idx}>
              <Text>{skill.skill}</Text>
            </li>
          ))}
        </ul>
      </Col>
    </Row>
  </Card>
);

export default ResumePreview;
