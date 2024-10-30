import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Spin,
  message,
  Button,
  Modal,
  Form,
  Input,
  Card,
  Avatar,
  Divider,
  Tag,
  Empty,
} from 'antd';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import logo from '../../assets/logo-removebg-preview.png';

const ApplicationPage = () => {
  const { applicationId } = useParams();
  const [applications, setApplications] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { userId } = useAuth(); // Get userId from AuthContext

  useEffect(() => {
    if (userId) {
      fetchApplicationDetails();
    }
  }, [userId]);

  const fetchApplicationDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jobeeapi.azurewebsites.net/api/applications/user/${userId}`
      );
      if (response.data.isSuccess) {
        const applicationsWithJobTitles = await Promise.all(
          response.data.results.map(async (application) => {
            const jobResponse = await axios.get(
              `https://jobeeapi.azurewebsites.net/api/jobs/${application.jobId}`
            );
            if (jobResponse.data.isSuccess) {
              application.jobTitle = jobResponse.data.result.title;
            } else {
              application.jobTitle = 'Unknown';
            }
            return application;
          })
        );
        setApplications(applicationsWithJobTitles || []); // Ensure applications is an array
      } else {
        message.error(
          response.data.message || 'Failed to fetch application details.'
        );
      }
    } catch (error) {
      console.error('Failed to fetch application details:', error);
      message.error('Failed to fetch application details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const showEditModal = (application) => {
    setIsEditModalVisible(true);
    form.setFieldsValue(application);
  };

  const handleEditModalOk = () => {
    form.submit();
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.put(
        `https://jobeeapi.azurewebsites.net/api/applications/${applicationId}`,
        values
      );
      if (response.data.isSuccess) {
        message.success('Application updated successfully!');
        setIsEditModalVisible(false);
        fetchApplicationDetails();
      } else {
        message.error(response.data.message || 'Failed to update application.');
      }
    } catch (error) {
      console.error('Failed to update application:', error);
      message.error('Failed to update application. Please try again.');
    }
  };

  const showDeleteModal = (applicationId) => {
    setSelectedApplicationId(applicationId);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteModalOk = async () => {
    try {
      const response = await axios.delete(
        `https://jobeeapi.azurewebsites.net/api/applications/${selectedApplicationId}`
      );
      if (response.data.isSuccess) {
        message.success('Application deleted successfully!');
        fetchApplicationDetails();
      } else {
        message.error(response.data.message || 'Failed to delete application.');
      }
    } catch (error) {
      console.error('Failed to delete application:', error);
      message.error('Failed to delete application. Please try again.');
    } finally {
      setIsDeleteModalVisible(false);
      setSelectedApplicationId(null);
    }
  };

  const handleDeleteModalCancel = () => {
    setIsDeleteModalVisible(false);
    setSelectedApplicationId(null);
  };

  const getStatusTag = (status) => {
    switch (status) {
      case 'Pending':
        return <Tag color="orange">Pending</Tag>;
      case 'Accepted':
        return <Tag color="green">Accepted</Tag>;
      case 'Rejected':
        return <Tag color="red">Rejected</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!applications.length) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <Empty description="No applications found, find your job now" />
        <Button
          type="primary"
          size="large"
          onClick={() => navigate(`/job`)}
          className="mt-4 bg-gradient-to-r from-[#3B7B7A] to-teal-500 text-white"
        >
          Go to Job Page
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-semibold mb-6">Your Application</h1>
      {applications.map((application) => (
        <Card key={application.applicationId} className="mb-6">
          <Card.Meta
            avatar={<Avatar src={logo} />}
            title={`Application ID: ${application.applicationId}`}
            description={`Job Title: ${application.jobTitle}`}
          />
          <Divider />
          <p>
            <strong>Job Seeker ID:</strong> {application.jobSeekerId}
          </p>
          <p>
            <strong>Resume:</strong>{' '}
            <a
              href={application.resume}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#3b7b7a',
              }}
            >
              View Resume
            </a>
          </p>
          <p>
            <strong>Applied At:</strong>{' '}
            {new Date(application.appliedAt).toLocaleString()}
          </p>
          <p>
            <strong>Status:</strong> {getStatusTag(application.status)}
          </p>
          <div className="flex mt-5 justify-start space-x-4">
            <Button
              style={{
                backgroundColor: '#3b7b7a',
                borderColor: '#3b7b7a',
                color: 'white',
              }}
              type="primary"
              size="large"
              onClick={() => showEditModal(application)}
            >
              Edit Application
            </Button>
            <Button
              type="default"
              size="large"
              onClick={() => showDeleteModal(application.applicationId)}
            >
              Delete Application
            </Button>
          </div>
        </Card>
      ))}

      {/* Edit Modal */}
      <Modal
        title="Edit Application"
        visible={isEditModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
        footer={[
          <Button
            style={{
              backgroundColor: '#3b7b7a',
              borderColor: '#3b7b7a',
              color: 'white',
            }}
            key="submit"
            type="primary"
            onClick={handleEditModalOk}
          >
            Submit
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            name="resume"
            label="Resume"
            rules={[{ required: true, message: 'Please upload your resume' }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Paste your resume link here"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Modal */}
      <Modal
        title="Confirm Delete"
        visible={isDeleteModalVisible}
        onOk={handleDeleteModalOk}
        onCancel={handleDeleteModalCancel}
        footer={[
          <Button key="cancel" onClick={handleDeleteModalCancel}>
            Cancel
          </Button>,
          <Button
            style={{
              backgroundColor: '#3b7b7a',
              borderColor: '#3b7b7a',
              color: 'white',
            }}
            key="submit"
            type="primary"
            onClick={handleDeleteModalOk}
          >
            Delete
          </Button>,
        ]}
      >
        <p>
          Deleting this application will also permanently remove your resume and
          any associated documents. This action cannot be undone
        </p>
        <br />
        <p>
          If you’re certain, please confirm below to proceed with the deletion
        </p>
      </Modal>
    </div>
  );
};

export default ApplicationPage;
