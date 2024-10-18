import React from 'react';
import { Card, Row, Col, Typography, Divider, Progress } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  TrophyOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Layout5 = ({ resumeData }) => (
  <Card
    id="resume-preview"
    className="w-full max-w-4xl bg-white p-6 mt-6 rounded-lg shadow-md"
    style={{
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: 'url("")', // Add your background image here
      backgroundSize: 'cover', // Cover the entire card
      backgroundPosition: 'center', // Center the background image
    }}
  >
    {/* Decorative Circular Element */}
    <div
      style={{
        position: 'absolute',
        top: '10px',
        right: '-40px',
        width: '150px',
        height: '150px',
        backgroundColor: '#f0f0f0',
        borderRadius: '50%',
        zIndex: -1,
      }}
    />
    {/* Decorative Diagonal Lines */}
    <div
      style={{
        position: 'absolute',
        bottom: '-20px',
        left: '0',
        width: '200px',
        height: '200px',
        background:
          'repeating-linear-gradient(45deg, #d1d1d1, #d1d1d1 10px, #fff 10px, #fff 20px)',
        zIndex: -1,
      }}
    />

    <Row>
      {/* Left Column */}
      <Col
        span={8}
        style={{
          backgroundColor: '#2c3e50',
          padding: '20px',
          color: '#fff',
          position: 'relative',
        }}
      >
        {/* Circular Accent */}
        <div
          style={{
            position: 'absolute',
            top: '-30px',
            left: '-30px',
            width: '120px',
            height: '120px',
            backgroundColor: '#f0f0f0',
            borderRadius: '50%',
            zIndex: -1,
          }}
        />

        {/* Profile Picture */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img
            src={resumeData.profilePicture || 'https://via.placeholder.com/100'}
            alt="Profile"
            style={{
              borderRadius: '50%',
              width: '100px',
              height: '100px',
            }}
          />
        </div>

        {/* About Me Section */}
        <div>
          <Title level={4} style={{ color: '#fff' }}>
            About Me
          </Title>
          <p>{resumeData.aboutMe || 'No summary provided.'}</p>
        </div>

        {/* Contact Information */}
        <div style={{ marginTop: '20px' }}>
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

        {/* Languages */}
        <div style={{ marginTop: '20px' }}>
          <Title level={4} style={{ color: '#fff' }}>
            Languages
          </Title>
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
        </div>

        {/* Expertise */}
        <div style={{ marginTop: '20px' }}>
          <Title level={4} style={{ color: '#fff' }}>
            Expertise
          </Title>
          <ul>
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
      </Col>

      {/* Right Column */}
      <Col span={16} style={{ padding: '20px', position: 'relative' }}>
        {/* Name and Title */}
        <Title level={2}>{resumeData.fullName}</Title>
        <Title level={4}>{resumeData.professionalTitle}</Title>

        {/* Experience Section */}
        <Divider />
        <Title level={4}>Experience</Title>
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

        {/* Education Section */}
        <Divider />
        <Title level={4}>Education</Title>
        <ul>
          {resumeData.education &&
            resumeData.education.map(
              (edu, idx) =>
                edu && (
                  <li key={idx}>
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

        {/* Skills Summary with Progress */}
        <Divider />
        <Title level={4}>Skills Summary</Title>
        <ul>
          {resumeData.certifications &&
            resumeData.certifications.length > 0 && (
              <li>
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
              </li>
            )}
        </ul>
      </Col>
    </Row>
  </Card>
);

export default Layout5;
