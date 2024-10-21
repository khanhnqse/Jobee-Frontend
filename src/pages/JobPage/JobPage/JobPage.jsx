import React, { useEffect, useState } from 'react';
import { Card, Row, Col, message, Spin, Input, Select, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './JobPage.css';

const { Meta } = Card;
const { Search } = Input;
const { Option } = Select;

const JobPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://jobeewepappapi20241008011108.azurewebsites.net/api/Job/jobs'
      );
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

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleJobTypeChange = (value) => {
    setJobTypeFilter(value);
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (jobTypeFilter ? job.jobType === jobTypeFilter : true)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="px-4 py-8">
      <h1
        className="text-center text-2xl font-bold mb-6"
        style={{ color: '#3b7b7a' }}
      >
        Job Listings
      </h1>
      <Space direction="vertical" style={{ width: '100%' }} className="mb-6">
        <Search
          placeholder="Search jobs"
          enterButton
          onSearch={handleSearch}
          style={{ width: '100%', maxWidth: '350px', margin: '0 auto' }}
        />
        <Select
          placeholder="Filter by job type"
          onChange={handleJobTypeChange}
          style={{ width: '100%', maxWidth: '350px', margin: '0 auto' }}
          allowClear
        >
          <Option value="Full-time">Full-time</Option>
          <Option value="Part-time">Part-time</Option>
          <Option value="Contract">Contract</Option>
          <Option value="Internship">Internship</Option>
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
                  src={
                    job.image ||
                    'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/461591299_122110542386522467_1333278165059898220_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEv_KqamgNYp0SgPtGsHMolA86DYidu0csDzoNiJ27RyzH4OJs8EFQCATZGrml3tUMsDVMlCCDURopCyLXrY8IU&_nc_ohc=YvoE6HWnCpIQ7kNvgHWDFvy&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=AxfKuSU46g3ztU_TTJuYDxy&oh=00_AYDFRByhjGU3C1EwmKQfkzK0e3TzCT2Phcim891Tz3rf4Q&oe=671C7E78'
                  }
                  style={{ height: '150px', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      'https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/461591299_122110542386522467_1333278165059898220_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEv_KqamgNYp0SgPtGsHMolA86DYidu0csDzoNiJ27RyzH4OJs8EFQCATZGrml3tUMsDVMlCCDURopCyLXrY8IU&_nc_ohc=YvoE6HWnCpIQ7kNvgHWDFvy&_nc_zt=23&_nc_ht=scontent.fsgn2-6.fna&_nc_gid=AxfKuSU46g3ztU_TTJuYDxy&oh=00_AYDFRByhjGU3C1EwmKQfkzK0e3TzCT2Phcim891Tz3rf4Q&oe=671C7E78';
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
