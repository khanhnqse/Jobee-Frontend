import React, { useEffect, useState } from 'react';
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
  Rate,
} from 'antd';
import { EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import axios from 'axios';
import TextArea from 'antd/es/input/TextArea';

const { Option } = Select;

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://67271c49302d03037e6f6a3b.mockapi.io/feedback'
      );
      setFeedbacks(response.data);
    } catch (error) {
      message.error('Failed to fetch feedbacks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditFeedback = (feedback) => {
    setEditingFeedback(feedback);
    form.setFieldsValue(feedback);
    setIsModalVisible(true);
  };

  const handleDeleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(
        `https://67271c49302d03037e6f6a3b.mockapi.io/feedback/${feedbackId}`
      );
      message.success('Feedback deleted successfully!');
      fetchFeedbacks();
    } catch (error) {
      message.error('Failed to delete feedback. Please try again.');
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      if (editingFeedback) {
        await axios.put(
          `https://67271c49302d03037e6f6a3b.mockapi.io/feedback/${editingFeedback.feedbackId}`,
          values
        );
        message.success('Feedback updated successfully!');
      } else {
        await axios.post(
          'https://67271c49302d03037e6f6a3b.mockapi.io/feedback',
          values
        );
        message.success('Feedback added successfully!');
      }
      fetchFeedbacks();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to submit feedback. Please try again.');
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
        onClick={() => handleEditFeedback(record)}
      >
        Edit
      </Menu.Item>
      <Menu.Item key="delete" icon={<DeleteOutlined />}>
        <Popconfirm
          title="Are you sure you want to delete this feedback?"
          onConfirm={() => handleDeleteFeedback(record.feedbackId)}
          okText="Yes"
          cancelText="No"
        >
          Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const getRatingTag = (rating) => {
    let color;
    switch (rating) {
      case 1:
        color = 'red';
        break;
      case 2:
        color = 'orange';
        break;
      case 3:
        color = 'yellow';
        break;
      case 4:
        color = 'blue';
        break;
      case 5:
        color = 'green';
        break;
      default:
        color = 'gray';
    }
    return <Tag color={color}>{rating} Stars</Tag>;
  };

  const columns = [
    {
      title: 'Feedback ID',
      dataIndex: 'feedbackId',
      key: 'feedbackId',
      sorter: {
        compare: (a, b) => a.feedbackId - b.feedbackId,
      },
      defaultSortOrder: 'descend',
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
      ellipsis: {
        showTitle: false,
      },
      render: (content) => (
        <Tooltip placement="topLeft" title={content}>
          {content}
        </Tooltip>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => getRatingTag(rating),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => new Date(text).toLocaleString(),
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
      <h1
        className="text-center text-2xl font-bold mb-6"
        style={{ color: '#3b7b7a' }}
      >
        Feedback Management
      </h1>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Add Feedback
      </Button>
      <Table
        columns={columns}
        dataSource={feedbacks}
        rowKey="feedbackId"
        loading={loading}
      />

      <Modal
        title={editingFeedback ? 'Edit Feedback' : 'Add Feedback'}
        visible={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter your full name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: 'Please rate the platform' }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true, message: 'Please enter your feedback' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FeedbackManagement;
