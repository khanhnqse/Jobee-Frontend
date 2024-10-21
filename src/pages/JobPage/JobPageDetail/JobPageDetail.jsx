import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Descriptions, Spin, message, Button, Card } from 'antd';
import axios from 'axios';
import moment from 'moment';

const JobDetailPage = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const fetchJobDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jobeewepappapi20241008011108.azurewebsites.net/api/Job/job/${jobId}`
      );
      if (response.data.isSuccess) {
        setJob(response.data.result);
        message.success('Job details fetched successfully!');
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

  if (loading) {
    return (
      <div className="flex justify-center items-center my-96">
        <Spin size="large" />
      </div>
    );
  }

  if (!job) {
    return <div className="text-center mt-10">Job not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Card className="shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
          <p className="text-gray-600">
            {job.location} - {job.jobType}
          </p>
        </div>

        <Descriptions bordered column={1} className="mt-8">
          <Descriptions.Item label="Employer ID">
            {job.employerId}
          </Descriptions.Item>
          <Descriptions.Item label="Job Title">{job.title}</Descriptions.Item>
          <Descriptions.Item label="Job Description">
            {job.description}
          </Descriptions.Item>
          <Descriptions.Item label="Location">{job.location}</Descriptions.Item>
          <Descriptions.Item label="Created At">
            {moment(job.createAt).format('YYYY-MM-DD HH:mm:ss')}
          </Descriptions.Item>
          <Descriptions.Item label="Job Type">{job.jobType}</Descriptions.Item>
          <Descriptions.Item label="Salary Range">
            {job.salaryRange}
          </Descriptions.Item>
          <Descriptions.Item label="Status">{job.status}</Descriptions.Item>
        </Descriptions>

        <div className="flex justify-end mt-6 space-x-4">
          <Button type="primary" size="large">
            Apply Now
          </Button>
          <Button type="default" size="large">
            Share Job
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default JobDetailPage;
