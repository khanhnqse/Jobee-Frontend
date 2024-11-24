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
  Tooltip,
  Tag,
  Select,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import jobService from '@/services/jobService';
import { useAuth } from '@/context/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Option } = Select;

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { userId, userRole } = useAuth(); // Ensure userRole is retrieved from AuthContext

  useEffect(() => {
    fetchJobs();
  }, [userRole, userId]); // Ensure fetchJobs is called when userRole or userId changes

  const fetchJobs = async () => {
    setLoading(true);
    try {
      let response;
      if (userRole === 'Employer') {
        response = await jobService.getJobsByUserId(userId);
      } else {
        response = await jobService.getJobsList();
      }

      if (response.data.isSuccess) {
        setJobs(response.data.results);
      } else {
        message.error(response.data.message || 'Failed to fetch jobs.');
      }
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      message.error('Failed to fetch jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddJob = () => {
    setEditingJob(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    form.setFieldsValue(job);
    setIsModalVisible(true);
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await jobService.deleteJob(jobId);
      fetchJobs();
      message.success('Job deleted successfully!');
    } catch (error) {
      console.error('Failed to delete job:', error);
      message.error('Failed to delete job. Please try again.');
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      const jobData = {
        title: values.title,
        description: values.description,
        location: values.location,
        jobType: values.jobType,
        salaryRange: values.salaryRange,
        status: values.status,
      };

      if (editingJob) {
        await jobService.updateJob(editingJob.jobId, jobData);
        message.success('Job updated successfully!');
      } else {
        await jobService.createJob(jobData);
        message.success('Job created successfully!');
      }
      fetchJobs();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Failed to submit form:', error);
      message.error('Failed to submit form. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item
        key="edit"
        icon={<EditOutlined />}
        onClick={() => handleEditJob(record)}
      >
        Edit
      </Menu.Item>
      <Menu.Item key="delete" icon={<DeleteOutlined />}>
        <Popconfirm
          title="Are you sure you want to delete this job?"
          onConfirm={() => handleDeleteJob(record.jobId)}
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
      case 'Active':
        return <Tag color="green">Active</Tag>;
      case 'Closed':
        return <Tag color="red">Closed</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const getJobTypeTag = (jobType) => {
    switch (jobType) {
      case 'Full-time':
        return <Tag color="blue">Full-time</Tag>;
      case 'Part-time':
        return <Tag color="purple">Part-time</Tag>;
      case 'Contract':
        return <Tag color="gold">Contract</Tag>;
      default:
        return <Tag>{jobType}</Tag>;
    }
  };

  const truncateDescription = (description, maxLength = 100) => {
    if (description.length <= maxLength) {
      return description;
    }
    return `${description.slice(0, maxLength)}...`;
  };

  const columns = [
    {
      title: 'Job ID',
      dataIndex: 'jobId',
      key: 'jobId',
      sorter: {
        compare: (a, b) => a.jobId - b.jobId,
      },
      defaultSortOrder: 'descend',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: {
        showTitle: false,
      },
      render: (description) => (
        <Tooltip placement="topLeft" title={description}>
          <div
            dangerouslySetInnerHTML={{
              __html: truncateDescription(description),
            }}
          />
        </Tooltip>
      ),
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Job Type',
      dataIndex: 'jobType',
      key: 'jobType',
      render: (jobType) => getJobTypeTag(jobType),
    },
    {
      title: 'Salary Range',
      dataIndex: 'salaryRange',
      key: 'salaryRange',
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
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddJob}
        style={{ marginBottom: 16 }}
      >
        Add Job
      </Button>
      <Table
        columns={columns}
        dataSource={jobs}
        rowKey="jobId"
        loading={loading}
      />

      <Modal
        title={editingJob ? 'Edit Job' : 'Add Job'}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please enter the job title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Please enter the job description' },
            ]}
          >
            <ReactQuill theme="snow" />
          </Form.Item>
          <Form.Item
            name="location"
            label="Location"
            rules={[
              { required: true, message: 'Please enter the job location' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="jobType" label="Job Type">
            <Select placeholder="Select Job Type">
              <Option value="Full-time">Full-time</Option>
              <Option value="Part-time">Part-time</Option>
              <Option value="Internship">Internship</Option>
              <Option value="Contract">Contract</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="salaryRange"
            label="Salary Range"
            rules={[
              { required: true, message: 'Please enter the salary range' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[
              { required: true, message: 'Please select the job status' },
            ]}
          >
            <Select placeholder="Select status">
              <Option value="Pending">Pending</Option>
              <Option value="Active">Active</Option>
              <Option value="Closed">Closed</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default JobManagement;
