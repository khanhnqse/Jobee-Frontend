import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Spin,
  message,
  Button,
  Modal,
  Form,
  Input,
  Tag,
  Card,
  Row,
  Col,
} from 'antd';
import {
  EnvironmentOutlined,
  DollarOutlined,
  CalendarOutlined,
  FileTextOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

const { Meta } = Card;

const JobDetailPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isContactModalVisible, setIsContactModalVisible] = useState(false);
  const [isApplyModalVisible, setIsApplyModalVisible] = useState(false);
  const [form] = Form.useForm();
  const { userId, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const name = 'Jobee Job';
  const email = ' jobee.officialvn@gmail.com';
  const phone = '+84334363339';

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  useEffect(() => {
    if (job) {
      fetchRelatedJobs();
    }
  }, [job]);

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

  const fetchRelatedJobs = async () => {
    try {
      const response = await axios.get(
        `https://jobeeapi.azurewebsites.net/api/jobs?jobType=${job.jobType}&location=${job.location}`
      );
      if (response.data.isSuccess) {
        setRelatedJobs(
          response.data.results.filter(
            (relatedJob) => relatedJob.jobId !== job.jobId
          )
        );
      } else {
        message.error(response.data.message || 'Failed to fetch related jobs.');
      }
    } catch (error) {
      console.error('Failed to fetch related jobs:', error);
      message.error('Failed to fetch related jobs. Please try again.');
    }
  };

  const showContactModal = () => {
    if (isAuthenticated) {
      setIsContactModalVisible(true);
    } else {
      message.warning('Please log in to access this feature.');
    }
  };

  const handleContactModalOk = () => {
    setIsContactModalVisible(false);
  };

  const handleContactModalCancel = () => {
    setIsContactModalVisible(false);
  };

  const showApplyModal = () => {
    if (isAuthenticated) {
      setIsApplyModalVisible(true);
    } else {
      message.warning('Please log in to access this feature.');
    }
  };

  const handleApplyModalOk = () => {
    form.submit();
  };

  const handleApplyModalCancel = () => {
    setIsApplyModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    const applicationData = {
      jobId: jobId,
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
      case 'Internship':
        return <Tag color="cyan">Internship</Tag>;
      default:
        return <Tag>{jobType}</Tag>;
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
          <UserOutlined /> Employer ID: {job.employerId} • {job.location}
        </p>
        <p className="text-gray-600">
          <FileTextOutlined /> {getJobTypeTag(job.jobType)} • {job.salaryRange}
        </p>
        <p className="text-gray-600">
          <CalendarOutlined /> Created At:{' '}
          {new Date(job.createAt).toLocaleString()}
        </p>
      </div>

      {/* Job Description */}
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">Job Description</h2>
        <div
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: job.description }}
        />
      </div>

      {/* Job Details */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-md font-medium">
            <FileTextOutlined /> Job Type
          </h3>
          <p className="text-gray-600">{getJobTypeTag(job.jobType)}</p>
        </div>
        <div>
          <h3 className="text-md font-medium">
            <DollarOutlined /> Salary
          </h3>
          <p className="text-gray-600">{job.salaryRange}</p>
        </div>
        <div>
          <h3 className="text-md font-medium">
            <EnvironmentOutlined /> Location
          </h3>
          <p className="text-gray-600">{job.location}</p>
        </div>
        <div>
          <h3 className="text-md font-medium">
            <FileTextOutlined /> Status
          </h3>
          <p className="text-gray-600">{getStatusTag(job.status)}</p>
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
        <p>
          <MailOutlined /> Email: {email}
        </p>
        <p>
          <PhoneOutlined /> Phone: {phone}
        </p>
        <p>
          <UserOutlined /> Company: {name}
        </p>
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

      {/* Related Jobs Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-medium mb-4">Related Jobs</h2>
        <Row gutter={[16, 16]}>
          {relatedJobs.slice(0, 3).map((relatedJob) => (
            <Col key={relatedJob.jobId} xs={24} sm={12} md={8}>
              <Card
                hoverable
                onClick={() => navigate(`/job/${relatedJob.jobId}`)}
                cover={
                  <img
                    alt="job"
                    src={
                      relatedJob.image ||
                      'https://i.postimg.cc/59BPgYhX/JOBEE-2.png'
                    }
                    style={{ height: '150px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://i.postimg.cc/59BPgYhX/JOBEE-2.png';
                    }}
                  />
                }
                className="rounded-lg overflow-hidden job-card"
              >
                <Meta
                  title={<span className="font-bold">{relatedJob.title}</span>}
                  description={
                    <div>
                      <p className="truncate">
                        <strong>Location:</strong> {relatedJob.location}
                      </p>
                      <p>
                        <strong>Job Type:</strong> {relatedJob.jobType}
                      </p>
                      <p>
                        <strong>Salary:</strong> {relatedJob.salaryRange}
                      </p>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default JobDetailPage;
