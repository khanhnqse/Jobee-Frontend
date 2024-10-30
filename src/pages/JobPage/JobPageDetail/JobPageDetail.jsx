import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, message, Button, Modal, Form, Input } from 'antd';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook

const JobDetailPage = () => {
  const { jobId } = useParams(); // Retrieve jobId from URL parameters
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [isApplyModalVisible, setIsApplyModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { userId } = useAuth(); // Get userId from AuthContext

  // Constants for email and phone
  const name = 'Cong Ty TNHH ABC';
  const email = 'contact@example.com';
  const phone = '+1234567890';

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jobeeapi.azurewebsites.net/api/jobs/${jobId}`
      );
      if (response.data.isSuccess) {
        setJob(response.data.result);
      } else {
        message.error(response.data.message || 'Failed to fetch job details.');
      }
    } catch (error) {
      console.error('Failed to fetch job details:', error);
      message.error('Failed to fetch job details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const showContactModal = () => {
    setIsContactModalVisible(true);
  };

  const handleContactModalOk = () => {
    setIsContactModalVisible(false);
  };

  const handleContactModalCancel = () => {
    setIsContactModalVisible(false);
  };

  const showApplyModal = () => {
    setIsApplyModalVisible(true);
  };

  const handleApplyModalOk = () => {
    form.submit();
  };

  const handleApplyModalCancel = () => {
    setIsApplyModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    const applicationData = {
      jobId: jobId, // Ensure jobId is accessible here
      jobSeekerId: userId,
      resume: values.resume,
      status: 'Pending',
    };

    try {
      const response = await axios.post(
        'https://jobeeapi.azurewebsites.net/api/applications',
        applicationData
      );
      if (response.data.isSuccess) {
        message.success(
          'Application submitted successfully! Employer will contact you soon.'
        );
        setIsApplyModalVisible(false);
        form.resetFields();
      } else {
        message.error(response.data.message || 'Failed to submit application.');
      }
    } catch (error) {
      console.error('Failed to submit application:', error);
      message.error('Failed to submit application. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!job) {
    return <div className="text-center mt-10">Job not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      {/* Header Section */}
      <div className="border-b pb-4 mb-6">
        <h1 className="text-4xl font-semibold mb-2">{job.title}</h1>
        <p className="text-lg text-gray-500 mb-2">
          Employer ID: {job.employerId} • {job.location}
        </p>
        <p className="text-gray-600">
          {job.jobType} • {job.salaryRange}
        </p>
        <p className="text-gray-600">
          Created At: {new Date(job.createAt).toLocaleString()}
        </p>
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">Job Description</h2>
        <p className="text-gray-700 leading-relaxed">{job.description}</p>
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-md font-medium">Job Type</h3>
          <p className="text-gray-600">{job.jobType}</p>
        </div>
        <div>
          <h3 className="text-md font-medium">Salary</h3>
          <p className="text-gray-600">{job.salaryRange}</p>
        </div>
        <div>
          <h3 className="text-md font-medium">Location</h3>
          <p className="text-gray-600">{job.location}</p>
        </div>
        <div>
          <h3 className="text-md font-medium">Status</h3>
          <p className="text-gray-600">{job.status}</p>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="flex justify-start space-x-4">
        <Button
          style={{
            backgroundColor: '#3b7b7a',
            borderColor: '#3b7b7a',
            color: 'white',
          }}
          type="primary"
          size="large"
          onClick={showApplyModal}
        >
          Apply Now
        </Button>
        <Button type="default" size="large" onClick={showContactModal}>
          Contact
        </Button>
      </div>

      {/* Contact Modal */}
      <Modal
        title="Contact Information"
        visible={isContactModalVisible}
        onOk={handleContactModalOk}
        onCancel={handleContactModalCancel}
        footer={[
          <Button
            style={{
              backgroundColor: '#3b7b7a',
              borderColor: '#3b7b7a',
              color: 'white',
            }}
            key="ok"
            type="primary"
            onClick={handleContactModalOk}
          >
            OK
          </Button>,
        ]}
      >
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <p>Company: {name}</p>
      </Modal>

      {/* Apply Modal */}
      <Modal
        title="Apply for Job"
        visible={isApplyModalVisible}
        onOk={handleApplyModalOk}
        onCancel={handleApplyModalCancel}
        footer={[
          <Button
            style={{
              backgroundColor: '#3b7b7a',
              borderColor: '#3b7b7a',
              color: 'white',
            }}
            key="submit"
            type="primary"
            onClick={handleApplyModalOk}
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <p>Please submit your resume by pasting the link below.</p>
          <Form.Item
            name="resume"
            label="Resume"
            rules={[
              { required: true, message: 'Please upload your resume' },
              { type: 'url', message: 'Please enter a valid URL' },
            ]}
          >
            <Input placeholder="Paste the URL of your resume here" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default JobDetailPage;
