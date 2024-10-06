// src/components/PolicyPage.js
import React from 'react';
import { Typography, Divider } from 'antd';

const { Title, Paragraph } = Typography;

// The policy data as a constant
const policyData = [
  {
    title: '1. CV Optimization:',
    content:
      'Jobsea provides tools to assist in creating optimized CVs, including CV templates tailored to different industries or job types. Suggestions for improving the CV layout, formatting, and content are provided based on industry trends.',
  },
  {
    title: '2. Job Search Assistance:',
    content:
      'Jobsea partners with recruitment and other job platforms to expand job opportunities for users. These recommendations are based on user data to provide relevant job listings and opportunities that match their career path.',
  },
  {
    title: '3. Notifications & Reminders:',
    content:
      'Users receive notifications about recommended roles, pending applications, and important platform updates. Users can manage notification settings from their account.',
  },
  {
    title: '4. Skills Support:',
    content:
      'Jobsea offers online courses, virtual classrooms, and video tutorials on transferrable skills, from leadership to technical development. These learning materials are free for certain users based on their subscription plans.',
  },
  {
    title: '5. Community Forum:',
    content:
      'Jobsea provides a community feature that allows users to share experiences, learning insights, and support each other in their career paths. Users can interact with one another in the forum or through direct messages.',
  },
  {
    title: '6. General Liability:',
    content:
      'Jobsea is not responsible for the employment relationships between users and applicants. Users are advised to perform their own research before entering any employment contract.',
  },
  {
    title: '7. Dispute Resolution:',
    content:
      'Any dispute related to the use of Jobsea services will be resolved in accordance with the laws of the country in which the services are being used.',
  },
];

const PolicyPage = () => {
  return (
    <div className="min-h-screen bg-[#f8eec9] p-8 flex justify-center items-center">
      <div className="bg-white max-w-4xl rounded-lg shadow-lg p-8">
        <Title level={2} className="text-center">
          Policy & Term of Service
        </Title>
        <Paragraph className="text-center">
          For User & Personal accounts
        </Paragraph>
        <Divider />

        {/* Mapping through policyData to render each section */}
        <div className="space-y-6">
          {policyData.map((policy, index) => (
            <div key={index}>
              <Title level={4}>{policy.title}</Title>
              <Paragraph>{policy.content}</Paragraph>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
