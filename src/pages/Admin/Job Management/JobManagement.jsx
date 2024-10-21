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
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import jobService from '@/services/jobService';

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await jobService.getJobsList();
      if (response.data.isSuccess) {
        setJobs(response.data.results);
        message.success('Jobs fetched successfully!');
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
    setIsModalVisible(true);
  };

  const handleEditJob = (job) => {
    setEditingJob(job);
    setIsModalVisible(true);
    form.setFieldsValue(job);
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

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditJob(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this job?"
            onConfirm={() => handleDeleteJob(record.jobId)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
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
        onCancel={() => setIsModalVisible(false)}
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
            <Input />
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
          <Form.Item
            name="jobType"
            label="Job Type"
            rules={[{ required: true, message: 'Please enter the job type' }]}
          >
            <Input />
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
            rules={[{ required: true, message: 'Please enter the job status' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default JobManagement;
