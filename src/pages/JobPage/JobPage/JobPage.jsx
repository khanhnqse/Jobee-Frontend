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
} from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './JobPage.css';

const { Meta } = Card;
const { Option } = Select;

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState(''); // State for location filter
  const [suggestions, setSuggestions] = useState([]);
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
      console.error('Failed to fetch jobs:', error);
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

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (jobTypeFilter === '' ||
        jobTypeFilter === 'All' ||
        job.jobType === jobTypeFilter) &&
      (locationFilter === '' ||
        locationFilter === 'All' ||
        job.location === locationFilter)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // Extract unique locations for the location filter
  const uniqueLocations = [...new Set(jobs.map((job) => job.location))];

  return (
    <div className="px-4 py-8">
      <h1
        className="text-center text-2xl font-bold mb-6"
        style={{ color: '#3b7b7a' }}
      >
        Job Listings
      </h1>
      <Space direction="vertical" style={{ width: '100%' }} className="mb-6">
        <AutoComplete
          options={suggestions}
          onSearch={handleSearch}
          onSelect={handleSearch}
          style={{ width: '100%', maxWidth: '350px', margin: '0 auto' }}
        >
          <Input.Search placeholder="Search jobs" enterButton />
        </AutoComplete>
        <Select
          placeholder="Filter by job type"
          onChange={handleJobTypeChange}
          style={{ width: '100%', maxWidth: '350px', margin: '0 auto' }}
          allowClear
        >
          <Option value="All">All</Option>
          <Option value="Full-time">Full-time</Option>
          <Option value="Part-time">Part-time</Option>
          <Option value="Contract">Contract</Option>
          <Option value="Internship">Internship</Option>
        </Select>
        <Select
          placeholder="Filter by location"
          onChange={handleLocationChange}
          style={{ width: '100%', maxWidth: '350px', margin: '0 auto' }}
          allowClear
        >
          <Option value="All">All</Option>
          {uniqueLocations.map((location) => (
            <Option key={location} value={location}>
              {location}
            </Option>
          ))}
        </Select>
      </Space>
      <Row gutter={[16, 16]}>
        {filteredJobs.map((job) => (
          <Col key={job.jobId} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              onClick={() => navigate(`/job/${job.jobId}`)}
              cover={
                <img
                  alt="job"
                  src={job.image || 'https://i.postimg.cc/59BPgYhX/JOBEE-2.png'}
                  style={{ height: '150px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://i.postimg.cc/59BPgYhX/JOBEE-2.png';
                  }}
                />
              }
              className="rounded-lg overflow-hidden"
            >
              <Meta
                title={job.title}
                description={
                  <>
                    <p>
                      <strong>Location:</strong> {job.location}
                    </p>
                    <p>
                      <strong>Job Type:</strong> {job.jobType}
                    </p>
                    <p>
                      <strong>Salary Range:</strong> {job.salaryRange}
                    </p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default JobPage;
