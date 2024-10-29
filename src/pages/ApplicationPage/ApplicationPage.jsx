import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spin, message, Button, Modal, Form, Input, Select } from 'antd';
import axios from 'axios';

const { Option } = Select;

const ApplicationPage = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplicationDetails();
  }, [applicationId]);

  const fetchApplicationDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jobeeapi.azurewebsites.net/api/applications/${applicationId}`
      );
      if (response.data.isSuccess) {
        setApplication(response.data.result);
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

  const showEditModal = () => {
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

  const handleDeleteApplication = async () => {
    try {
      const response = await axios.delete(
        `https://jobeeapi.azurewebsites.net/api/applications/${applicationId}`
      );
      if (response.data.isSuccess) {
        message.success('Application deleted successfully!');
        navigate('/applications'); // Redirect to applications list page
      } else {
        message.error(response.data.message || 'Failed to delete application.');
      }
    } catch (error) {
      console.error('Failed to delete application:', error);
      message.error('Failed to delete application. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!application) {
    return <div className="text-center mt-10">Application not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-semibold mb-6">Application Details</h1>
      <div className="mb-6">
        <p>
          <strong>Application ID:</strong> {application.applicationId}
        </p>
        <p>
          <strong>Job ID:</strong> {application.jobId}
        </p>
        <p>
          <strong>Job Seeker ID:</strong> {application.jobSeekerId}
        </p>
        <p>
          <strong>Resume:</strong>{' '}
          <a
            href={application.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Resume
          </a>
        </p>
        <p>
          <strong>Applied At:</strong>{' '}
          {new Date(application.appliedAt).toLocaleString()}
        </p>
        <p>
          <strong>Status:</strong> {application.status}
        </p>
      </div>
      <div className="flex justify-start space-x-4">
        <Button
          style={{
            backgroundColor: '#3b7b7a',
            borderColor: '#3b7b7a',
            color: 'white',
          }}
          type="primary"
          size="large"
          onClick={showEditModal}
        >
          Edit Application
        </Button>
        <Button type="default" size="large" onClick={handleDeleteApplication}>
          Delete Application
        </Button>
      </div>

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
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status' }]}
          >
            <Select placeholder="Select status">
              <Option value="Pending">Pending</Option>
              <Option value="Accepted">Accepted</Option>
              <Option value="Rejected">Rejected</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ApplicationPage;
