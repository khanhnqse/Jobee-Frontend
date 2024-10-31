import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
  Popconfirm,
  Dropdown,
  Menu,
  Select,
  Spin,
  Card,
  Avatar,
  Divider,
  Tag,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import applicationService from '@/services/applicationService';
import axios from 'axios';

const { Option } = Select;

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [jobSeekerProfile, setJobSeekerProfile] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const applicationsList = await applicationService.getApplications();
      setApplications(applicationsList);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
      message.error('Failed to fetch applications. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditApplication = (application) => {
    setEditingApplication(application);
    setIsModalVisible(true);
    form.setFieldsValue({
      applicationId: application.applicationId,
      jobId: application.jobId,
      jobSeekerId: application.jobSeekerId,
      resume: application.resume,
      status: application.status,
    });
  };

  const handleDeleteApplication = async (applicationId) => {
    try {
      await applicationService.deleteApplication(applicationId);
      fetchApplications();
      message.success('Application deleted successfully!');
    } catch (error) {
      console.error('Failed to delete application:', error);
      message.error('Failed to delete application. Please try again.');
    }
  };

  const handleFormSubmit = async (values) => {
    setConfirmLoading(true);
    try {
      if (editingApplication) {
        await applicationService.updateApplication(
          editingApplication.applicationId,
          values
        );
        message.success('Application updated successfully!');
      }
      fetchApplications();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Failed to submit form:', error);
      message.error('Failed to submit form. Please try again.');
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleViewProfile = async (jobSeekerId) => {
    setProfileLoading(true);
    try {
      const response = await axios.get(
        `https://jobeeapi.azurewebsites.net/api/Account/${jobSeekerId}`
      );
      if (response.data.isSuccess) {
        setJobSeekerProfile(response.data.result);
        setIsProfileModalVisible(true);
      } else {
        message.error(
          response.data.message || 'Failed to fetch job seeker profile.'
        );
      }
    } catch (error) {
      console.error('Failed to fetch job seeker profile:', error);
      message.error('Failed to fetch job seeker profile. Please try again.');
    } finally {
      setProfileLoading(false);
    }
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item
        key="view"
        icon={<EyeOutlined />}
        onClick={() => handleViewProfile(record.jobSeekerId)}
      >
        View Profile
      </Menu.Item>
      <Menu.Item
        key="edit"
        icon={<EditOutlined />}
        onClick={() => handleEditApplication(record)}
      >
        Edit
      </Menu.Item>
      <Menu.Item key="delete" icon={<DeleteOutlined />}>
        <Popconfirm
          title="Are you sure you want to delete this application?"
          onConfirm={() => handleDeleteApplication(record.applicationId)}
          okText="Yes"
          cancelText="No"
        >
          Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

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

  const columns = [
    {
      title: 'Application ID',
      dataIndex: 'applicationId',
      key: 'applicationId',
    },
    {
      title: 'Job ID',
      dataIndex: 'jobId',
      key: 'jobId',
    },
    {
      title: 'Job Seeker ID',
      dataIndex: 'jobSeekerId',
      key: 'jobSeekerId',
    },
    {
      title: 'Resume',
      dataIndex: 'resume',
      key: 'resume',
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          View Resume
        </a>
      ),
    },
    {
      title: 'Applied At',
      dataIndex: 'appliedAt',
      key: 'appliedAt',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Dropdown overlay={menu(record)} trigger={['click']}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={applications}
        rowKey="applicationId"
        loading={loading}
      />

      <Modal
        title={editingApplication ? 'Edit Application' : 'Add Application'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        confirmLoading={confirmLoading}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item name="applicationId" label="Application ID" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="jobId"
            label="Job ID"
            rules={[{ required: true, message: 'Please enter the job ID' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="jobSeekerId"
            label="Job Seeker ID"
            rules={[
              { required: true, message: 'Please enter the job seeker ID' },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="resume"
            label="Resume"
            rules={[
              { required: true, message: 'Please enter the resume link' },
            ]}
          >
            <Input />
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

      <Modal
        title="Job Seeker Profile"
        visible={isProfileModalVisible}
        onCancel={() => setIsProfileModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsProfileModalVisible(false)}>
            Close
          </Button>,
        ]}
      >
        {profileLoading ? (
          <Spin size="large" />
        ) : jobSeekerProfile ? (
          <Card>
            <Card.Meta
              avatar={
                <Avatar
                  src={jobSeekerProfile.profilePicture}
                  size={100}
                  style={{ borderRadius: '50%' }}
                />
              }
              title={jobSeekerProfile.fullName}
              description={jobSeekerProfile.jobTitle}
            />
            <Divider />
            <p>
              <strong>Email:</strong> {jobSeekerProfile.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {jobSeekerProfile.phoneNumber}
            </p>
            <p>
              <strong>Address:</strong> {jobSeekerProfile.address}
            </p>
            <p>
              <strong>Date of Birth:</strong>{' '}
              {new Date(jobSeekerProfile.dob).toLocaleDateString()}
            </p>
          </Card>
        ) : (
          <p>No profile data available</p>
        )}
      </Modal>
    </div>
  );
};

export default ApplicationManagement;
