import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spin, message, Button, Modal } from 'antd';
import axios from 'axios';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);

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
        `https://jobeewepappapi20241008011108.azurewebsites.net/api/Job/job/${jobId}`
      );
      if (response.data.isSuccess) {
        setJob(response.data.result);
        message.success('Job details fetched successfully!');
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
    </div>
  );
};

export default JobDetailPage;
