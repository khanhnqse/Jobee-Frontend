import React, { useEffect, useState } from 'react';
import {
  Card,
  Row,
  Col,
  message,
  Spin,
  Input,
  Select,
  Space,
  AutoComplete,
  Button,
  Divider,
  Typography,
  Carousel,
  Pagination,
  Tag,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './JobPage.css';

const { Meta } = Card;
const { Option } = Select;
const { Title, Text } = Typography;

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6); // Set the number of jobs per page
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://jobeeapi.azurewebsites.net/api/jobs'
      );
      if (response.data.isSuccess) {
        setJobs(response.data.results);
      } else {
        message.error(response.data.message || 'Failed to fetch jobs.');
      }
    } catch (error) {
      message.error('Failed to fetch jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filteredSuggestions = jobs
      .filter((job) => job.title.toLowerCase().includes(value.toLowerCase()))
      .map((job) => ({ value: job.title }));
    setSuggestions(filteredSuggestions);
  };

  const handleJobTypeChange = (value) => {
    setJobTypeFilter(value);
  };

  const handleLocationChange = (value) => {
    setLocationFilter(value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredJobs = jobs
    .filter((job) => {
      return (
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (jobTypeFilter === '' ||
          jobTypeFilter === 'All' ||
          job.jobType === jobTypeFilter) &&
        (locationFilter === '' ||
          locationFilter === 'All' ||
          job.location === locationFilter)
      );
    })
    .sort((a, b) => b.jobId - a.jobId); // Sort jobs by jobId in descending order

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  const uniqueLocations = [...new Set(jobs.map((job) => job.location))];

  return (
    <div className="job-page-container px-6 py-8">
      {/* Page Header */}
      <Title level={2} className="text-center" style={{ color: '#3b7b7a' }}>
        Discover Your Next Opportunity
      </Title>
      <Text type="secondary" className="text-center block mb-8">
        Find and apply for jobs that match your skills and interests.
      </Text>

      {/* Image Slider */}
      <Carousel autoplay className="mb-8">
        <div>
          <img
            src="https://i.ibb.co/cY2gwQN/banner2.png"
            alt="Job Opportunity 1"
            style={{ width: '100%', height: '450px', objectFit: 'cover' }}
          />
        </div>
        <div>
          <img
            src="https://i.ibb.co/BzrcKF6/banner3.png"
            alt="Job Opportunity 2"
            style={{ width: '100%', height: '450px', objectFit: 'cover' }}
          />
        </div>
        <div>
          <img
            src="https://i.ibb.co/bbzhCVT/banner1.png"
            alt="Job Opportunity 3"
            style={{ width: '100%', height: '450px', objectFit: 'cover' }}
          />
        </div>
      </Carousel>

      {/* Featured Jobs Section */}
      <div className="featured-jobs mb-10">
        <Title level={3} style={{ color: '#3b7b7a' }}>
          Featured Jobs
        </Title>
        <Row gutter={[16, 16]}>
          {jobs.slice(0, 3).map((job) => (
            <Col key={job.jobId} xs={24} sm={12} md={8}>
              <Card
                hoverable
                onClick={() => navigate(`/job/${job.jobId}`)}
                cover={
                  <img
                    alt="job"
                    src={
                      job.image || 'https://i.postimg.cc/59BPgYhX/JOBEE-2.png'
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
                  title={<span className="font-bold">{job.title}</span>}
                  description={
                    <div>
                      <p className="truncate">
                        <strong>Location:</strong> {job.location}
                      </p>
                      <p>
                        <strong>Job Type:</strong> {job.jobType}
                      </p>
                      <p>
                        <strong>Salary:</strong>{' '}
                        <Tag color="orange">{job.salaryRange}</Tag>
                      </p>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Divider />

      {/* Job Filter Section */}
      <div className="job-filter-section">
        <Title level={4} style={{ color: 'white' }}>
          FIND A JOB NOW
        </Title>
        <Space direction="vertical" style={{ width: '100%' }} className="mb-8">
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={8} md={6}>
              <AutoComplete
                options={suggestions}
                onSearch={handleSearch}
                onSelect={handleSearch}
                style={{ width: '100%' }}
              >
                <Input.Search placeholder="Search by job title" enterButton />
              </AutoComplete>
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Select
                placeholder="Filter by job type"
                onChange={handleJobTypeChange}
                style={{ width: '100%' }}
                allowClear
              >
                <Option value="All">All</Option>
                <Option value="Full-time">Full-time</Option>
                <Option value="Part-time">Part-time</Option>
                <Option value="Contract">Contract</Option>
                <Option value="Internship">Internship</Option>
              </Select>
            </Col>
            <Col xs={24} sm={8} md={6}>
              <Select
                placeholder="Filter by location"
                onChange={handleLocationChange}
                style={{ width: '100%' }}
                allowClear
              >
                <Option value="All">All</Option>
                {uniqueLocations.map((location) => (
                  <Option key={location} value={location}>
                    {location}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Space>
      </div>

      {/* Job Listings Section */}
      <Title level={4} className="mt-10" style={{ color: '#3b7b7a' }}>
        All Job Listings
      </Title>
      <Row gutter={[16, 16]}>
        {paginatedJobs.map((job) => (
          <Col key={job.jobId} xs={24} sm={24} md={12} lg={8}>
            <Card
              hoverable
              onClick={() => navigate(`/job/${job.jobId}`)}
              className="job-listing-card"
            >
              <Row>
                <Col span={8}>
                  <img
                    alt="job"
                    src={
                      job.image || 'https://i.postimg.cc/59BPgYhX/JOBEE-2.png'
                    }
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        'https://i.postimg.cc/59BPgYhX/JOBEE-2.png';
                    }}
                  />
                </Col>
                <Col span={16}>
                  <Meta
                    className="p-3"
                    title={<span className="font-bold">{job.title}</span>}
                    description={
                      <div>
                        <p className="truncate">
                          <strong>Location:</strong> {job.location}
                        </p>
                        <p>
                          <strong>Job Type:</strong> {job.jobType}
                        </p>
                        <p>
                          <strong>Salary:</strong>{' '}
                          <Tag color="orange">{job.salaryRange}</Tag>
                        </p>
                        <Button
                          type="primary"
                          block
                          style={{
                            marginTop: '10px',
                            backgroundColor: '#3b7b7a',
                            borderColor: '#3b7b7a',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/job/${job.jobId}`);
                          }}
                        >
                          View Job
                        </Button>
                      </div>
                    }
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination */}
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredJobs.length}
        onChange={handlePageChange}
        style={{ marginTop: '16px', textAlign: 'center' }}
      />
    </div>
  );
};

export default JobPage;
