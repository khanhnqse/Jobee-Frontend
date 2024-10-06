// src/components/PolicyPage.js
import React from 'react';
import { Typography, Divider } from 'antd';

const { Title, Paragraph } = Typography;

// The policy data as a constant
const policyData = [
  {
    title: '1. CV Optimization:',
    content: `Jobee provides tools to assist in creating optimized CVs, including CV templates tailored to specific industries and suggestions for editing and improving CVs.
      Jobee strives to ensure the accuracy and up-to-date nature of CV templates, but is not responsible for the completeness and suitability of CVs created by users.
      Users are responsible for ensuring that the information in their CV is accurate, truthful, and complete.`,
  },
  {
    title: '2. Job Search Assistance:',
    content: `Jobee partners with recruiters and other job platforms to expand job opportunities for users.
      Jobee provides job search features, direct application to recruiters, and direct communication through the platform.
      Jobee strives to ensure the accuracy and up-to-date nature of job information, but is not responsible for the accuracy, completeness, or suitability of information provided by recruiters.
      Users are responsible for evaluating and verifying the accuracy of job information before applying.`,
  },
  {
    title: '3. Notifications & Reminders:',
    content: `Jobee provides notification features to remind users of new job opportunities, application deadlines, interview times, and other preparations.
      Jobee strives to ensure that notifications are sent to users accurately and promptly, but is not responsible for delays or omissions in sending notifications.
      Users are responsible for checking their inbox and notifications regularly to avoid missing job opportunities.`,
  },
  {
    title: '4. Skills Support:',
    content: `Jobee offers online courses, virtual classrooms, and video lectures on interview skills, communication skills, and other essential soft skills.
      Jobee creates a simulated interview environment with AI feedback or connects users with others for feedback and development.
      Jobee strives to ensure the quality of training content, but is not responsible for the learning outcomes and success of users in their job search.
      Users are responsible for participating in learning seriously and proactively to improve their skills.`,
  },
  {
    title: '5. Community Forum:',
    content: `Jobee provides a community forum for users to share experiences in learning and job hunting.
      Jobee is responsible for managing the forum and ensuring that posted content complies with community guidelines.
      Jobee is not responsible for personal opinions or user sharing on the forum.
      Users are responsible for ensuring that information shared on the forum is accurate, truthful, and does not infringe on the rights of others.`,
  },
  {
    title: '6. Job Posting:',
    content: `Employers are allowed to post job openings and screen applicants according to their desired criteria.
      Jobee strives to ensure the accuracy and up-to-date nature of job posting information, but is not responsible for the accuracy, completeness, or suitability of information provided by employers.
      Employers are responsible for ensuring that job posting information is accurate, truthful, and complete.
      Jobee is not responsible for the employment relationship between employers and applicants.`,
  },
  {
    title: '7. General Liability:',
    content: `Jobee is not responsible for any damages, including direct, indirect, incidental, or consequential damages arising from the use of Jobee's services, except in cases of willful misconduct or gross negligence on the part of Jobee.
      Jobee reserves the right to change, add to, or modify this Disclaimer at any time without prior notice.
      Users are responsible for regularly updating this Disclaimer.
      Use of Jobee's services constitutes acceptance of this Disclaimer.`,
  },
  {
    title: '8. Dispute Resolution:',
    content: `Any dispute related to the use of Jobee's services will be resolved in accordance with Vietnamese law.
      Users and Jobee agree to choose the Hanoi People's Court as the competent court to resolve disputes.`,
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
