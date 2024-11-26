import React, { useEffect, useState } from 'react';
import {
  Card,
  Rate,
  Typography,
  Spin,
  message,
  Button,
  Modal,
  Form,
  Input,
  Carousel,
  Row,
  Col,
  List,
  Select,
  Pagination,
} from 'antd';
import axios from 'axios';
import './FeedbackPage.css';
import image from '../../assets/Headline.png';
import { LikeOutlined } from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const FeedbackPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [form] = Form.useForm();
  const { userId, jwtToken } = useAuth(); // Get userId and jwtToken from AuthContext
  const [fullName, setFullName] = useState(''); // State to store fullName
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedRating, setSelectedRating] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
    fetchUserProfile();
  }, []);

  useEffect(() => {
    filterFeedbacks();
  }, [feedbacks, selectedRating, currentPage, pageSize]);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://67271c49302d03037e6f6a3b.mockapi.io/feedback'
      );
      const sortedFeedbacks = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setFeedbacks(sortedFeedbacks);
    } catch (error) {
      message.error('Failed to fetch feedbacks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `https://jobeeapi.azurewebsites.net/api/Account/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (response.data.isSuccess) {
        setFullName(response.data.result.fullName);
      } else {
        message.error(response.data.message || 'Failed to fetch user profile.');
      }
    } catch (error) {
      message.error('Failed to fetch user profile.');
    }
  };

  const handleAddFeedback = () => {
    setEditingFeedback(null);
    form.resetFields();
    setIsModalVisible(true);
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
    const feedbackData = {
      ...values,
      userId, // Add userId from AuthContext
      fullName, // Add fullName from user profile
      createdAt: new Date().toISOString(), // Add current timestamp
    };

    try {
      if (editingFeedback) {
        await axios.put(
          `https://67271c49302d03037e6f6a3b.mockapi.io/feedback/${editingFeedback.feedbackId}`,
          feedbackData
        );
        message.success('Feedback updated successfully!');
      } else {
        await axios.post(
          'https://67271c49302d03037e6f6a3b.mockapi.io/feedback',
          feedbackData
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

  const filterFeedbacks = () => {
    let filtered = feedbacks;
    if (selectedRating) {
      filtered = feedbacks.filter(
        (feedback) => feedback.rating === selectedRating
      );
    }
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setFilteredFeedbacks(filtered.slice(startIndex, endIndex));
  };

  const handleRatingChange = (value) => {
    setSelectedRating(value);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  return (
    <div className="feedback-page">
      <img src={image} alt="Background" className="background-image" />
      {/* Header Section */}
      <div className="feedback-header">
        <Title level={2}>User Feedback</Title>
        <Text className="subtitle">
          Your opinions help us improve our platform. Share your thoughts!
        </Text>
        <Button
          type="primary"
          onClick={handleAddFeedback}
          className="add-button"
        >
          Give us feedbacks <LikeOutlined />
        </Button>
      </div>

      {/* Feedback Slider */}
      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Carousel autoplay className="feedback-carousel" arrows>
            {feedbacks.map((feedback, index) => {
              if (index % 3 === 0) {
                return (
                  <div key={index}>
                    <Row gutter={[16, 16]} justify="center">
                      {feedbacks.slice(index, index + 3).map((feedback) => (
                        <Col key={feedback.feedbackId} xs={24} sm={12} md={8}>
                          <Card hoverable className="feedback-card">
                            <div className="card-header">
                              <div className="user-info">
                                <div className="user-avatar">
                                  {feedback.fullName.charAt(0)}
                                </div>
                                <div>
                                  <Title level={5} className="user-name">
                                    {feedback.fullName}
                                  </Title>
                                  <Text type="secondary">
                                    {new Date(
                                      feedback.createdAt
                                    ).toLocaleDateString()}
                                  </Text>
                                </div>
                              </div>
                              <Rate disabled value={feedback.rating} />
                            </div>
                            <div className="card-content">
                              <Text>{feedback.content}</Text>
                            </div>
                            <div className="card-actions">
                              {feedback.userId === userId && (
                                <>
                                  <Button
                                    type="link"
                                    onClick={() => handleEditFeedback(feedback)}
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    type="link"
                                    danger
                                    onClick={() =>
                                      handleDeleteFeedback(feedback.feedbackId)
                                    }
                                  >
                                    Delete
                                  </Button>
                                </>
                              )}
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                );
              }
              return null;
            })}
          </Carousel>

          {/* Feedback List */}
          <div className="feedback-list">
            <Title level={3}>All Feedback</Title>
            <div className="filter-section">
              <Select
                placeholder="Filter by rating"
                onChange={handleRatingChange}
                allowClear
                style={{ width: 200, marginBottom: 16 }}
              >
                <Option value={1}>1 Star</Option>
                <Option value={2}>2 Stars</Option>
                <Option value={3}>3 Stars</Option>
                <Option value={4}>4 Stars</Option>
                <Option value={5}>5 Stars</Option>
              </Select>
            </div>
            <List
              itemLayout="vertical"
              size="large"
              dataSource={filteredFeedbacks}
              renderItem={(feedback) => (
                <List.Item key={feedback.feedbackId}>
                  <Card hoverable className="feedback-card">
                    <div className="card-header">
                      <div className="user-info">
                        <div className="user-avatar">
                          {feedback.fullName.charAt(0)}
                        </div>
                        <div>
                          <Title level={5} className="user-name">
                            {feedback.fullName}
                          </Title>
                          <Text type="secondary">
                            {new Date(feedback.createdAt).toLocaleDateString()}
                          </Text>
                        </div>
                      </div>
                      <Rate disabled value={feedback.rating} />
                    </div>
                    <div className="card-content">
                      <Text>{feedback.content}</Text>
                    </div>
                    <div className="card-actions">
                      {feedback.userId === userId && (
                        <>
                          <Button
                            type="link"
                            onClick={() => handleEditFeedback(feedback)}
                          >
                            Edit
                          </Button>
                          <Button
                            type="link"
                            danger
                            onClick={() =>
                              handleDeleteFeedback(feedback.feedbackId)
                            }
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </div>
                  </Card>
                </List.Item>
              )}
            />
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={feedbacks.length}
              onChange={handlePageChange}
              style={{ marginTop: 16, textAlign: 'center' }}
            />
          </div>
        </>
      )}

      {/* Modal for Feedback Form */}
      <Modal
        title={editingFeedback ? 'Edit Feedback' : 'Add Feedback'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="rating"
            label="Rating"
            rules={[{ required: true, message: 'Please rate the platform' }]}
          >
            <Rate />
          </Form.Item>
          <Form.Item
            name="content"
            label="Feedback"
            rules={[{ required: true, message: 'Please enter your feedback' }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default FeedbackPage;
