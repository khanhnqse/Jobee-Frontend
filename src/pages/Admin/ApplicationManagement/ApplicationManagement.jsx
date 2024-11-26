import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
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
  Space,
  Progress,
  Steps,
  Collapse,
  Typography,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  EyeOutlined,
  UploadOutlined,
  FilePdfOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import applicationService from '@/services/applicationService';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';

const { Option } = Select;
const { Step } = Steps;
const { Panel } = Collapse;

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false);
  const [isGradeModalVisible, setIsGradeModalVisible] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [jobSeekerProfile, setJobSeekerProfile] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [form] = Form.useForm();
  const [statusFilter, setStatusFilter] = useState('All');
  const [file, setFile] = useState(null);
  const [responseBody, setResponseBody] = useState(null);
  const [isHtmlResponse, setIsHtmlResponse] = useState(false);
  const [progress, setProgress] = useState(0);
  const { jwtToken } = useAuth();

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    filterApplicationsByStatus(statusFilter);
  }, [applications, statusFilter]);

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

  const filterApplicationsByStatus = (status) => {
    if (status === 'All') {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(
        applications.filter((application) => application.status === status)
      );
    }
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
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

  const handleViewProfile = async (jobSeekerId, jobId) => {
    setProfileLoading(true);
    try {
      const [profileResponse, jobResponse] = await Promise.all([
        axios.get(
          `https://jobeeapi.azurewebsites.net/api/Account/${jobSeekerId}`
        ),
        axios.get(`https://jobeeapi.azurewebsites.net/api/jobs/${jobId}`),
      ]);

      if (profileResponse.data.isSuccess && jobResponse.data.isSuccess) {
        setJobSeekerProfile(profileResponse.data.result);
        setJobTitle(jobResponse.data.result.title);
        setIsProfileModalVisible(true);
      } else {
        message.error(
          profileResponse.data.message || 'Failed to fetch job seeker profile.'
        );
      }
    } catch (error) {
      console.error('Failed to fetch job seeker profile:', error);
      message.error('Failed to fetch job seeker profile. Please try again.');
    } finally {
      setProfileLoading(false);
    }
  };

  const handleGradeCv = (application) => {
    setEditingApplication(application);
    setIsGradeModalVisible(true);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      message.error('Please select a valid PDF file.');
    }
  };

  const handlePostFile = async () => {
    if (!file) {
      message.error('Please upload a PDF file.');
      return;
    }

    setLoading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('pdfFile', file);

    try {
      const response = await axios.post(
        `https://jobeeapi.azurewebsites.net/api/Account/review-cv/${editingApplication.jobId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percentCompleted);
          },
        }
      );

      message.success('PDF file uploaded successfully!');
      setResponseBody(response.data);

      setIsHtmlResponse(/<\/?[a-z][\s\S]*>/i.test(response.data));
    } catch (error) {
      message.error('Failed to upload PDF file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatResponseBody = (text) => {
    const formattedText = text
      .replace(/\n\n/g, '<br/><br/>')
      .replace(/\* \*\*(.*?)\*\*/g, '<strong>$1</strong>');

    return formattedText;
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item
        key="view"
        icon={<EyeOutlined />}
        onClick={() => handleViewProfile(record.jobSeekerId, record.jobId)}
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
      <Menu.Item
        key="grade"
        icon={<UploadOutlined />}
        onClick={() => handleGradeCv(record)}
      >
        Analysis CV
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
      sorter: {
        compare: (a, b) => a.applicationId - b.applicationId,
      },
      defaultSortOrder: 'descend',
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
      <Space style={{ marginBottom: 16 }}>
        <Select
          defaultValue="All"
          style={{ width: 200 }}
          onChange={handleStatusFilterChange}
        >
          <Option value="All">All</Option>
          <Option value="Pending">Pending</Option>
          <Option value="Accepted">Accepted</Option>
          <Option value="Rejected">Rejected</Option>
        </Select>
      </Space>
      <Table
        columns={columns}
        dataSource={filteredApplications}
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
              <strong>Job Title:</strong> {jobTitle}
            </p>
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

      <Modal
        title="Grade CV"
        visible={isGradeModalVisible}
        onCancel={() => setIsGradeModalVisible(false)}
        footer={null}
      >
        <div>
          <Collapse className="mb-10">
            <Panel header="How to Use Jobee AI" key="1">
              <Steps direction="vertical" size="small" current={-1}>
                <Step
                  title="Select a PDF file"
                  description="Choose a gradeFile from your device by clicking the 'Choose File' button."
                  icon={<FilePdfOutlined />}
                />
                <Step
                  title="Ensure the file is valid"
                  description="Make sure the file is a valid PDF document."
                  icon={<CheckCircleOutlined />}
                />
                <Step
                  title="Upload the PDF"
                  description="Click the 'Upload PDF' button to submit the file."
                  icon={<UploadOutlined />}
                />
                <Step
                  title="Wait for analysis"
                  description="Wait for the file to be uploaded and analyzed by Jobee AI."
                  icon={loading ? <LoadingOutlined /> : <CheckCircleOutlined />}
                />
                <Step
                  title="View the results"
                  description="View the generated suggestions in the response section below."
                  icon={<CheckCircleOutlined />}
                />
              </Steps>
            </Panel>
          </Collapse>

          <h2>Upload PDF File</h2>

          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ marginBottom: '20px' }}
          />

          <div style={{ textAlign: 'center' }}>
            <Button
              style={{
                backgroundColor: '#3b7b7a',
                borderColor: '#3b7b7a',
                color: 'white',
              }}
              type="primary"
              onClick={handlePostFile}
              disabled={!file || loading}
            >
              {loading
                ? 'Please wait, Jobee is analyzing your CV'
                : 'Upload PDF'}
            </Button>
          </div>

          {loading && (
            <div style={{ marginTop: '20px' }}>
              <Progress percent={progress} />
            </div>
          )}
          {responseBody && (
            <div style={{ marginTop: '30px' }}>
              <Card title="Jobee AI" bordered={false}>
                <Typography>
                  <Title level={4}>This is the result for you</Title>

                  {isHtmlResponse ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: formatResponseBody(responseBody),
                      }}
                    />
                  ) : (
                    <Paragraph>{responseBody}</Paragraph>
                  )}
                </Typography>
              </Card>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ApplicationManagement;
