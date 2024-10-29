import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Spin, message } from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
  DollarOutlined,
  HomeOutlined,
  CalendarOutlined,
  IdcardOutlined,
} from '@ant-design/icons';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import userService from '@/services/userService';
import jobService from '@/services/jobService';
import planService from '@/services/planService';

const OverviewManagement = () => {
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({ total: 0 });
  const [jobStats, setJobStats] = useState({ total: 0 });
  const [planStats, setPlanStats] = useState({ total: 0 });
  const [chartData, setChartData] = useState([]);
  const [mostCommonAddress, setMostCommonAddress] = useState('');
  const [mostCommonAge, setMostCommonAge] = useState('');
  const [mostCommonJobTitle, setMostCommonJobTitle] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const usersList = await userService.GetUsersList();
      const jobsList = await jobService.getJobsList();
      const plansList = await planService.getPlansList();

      setUserStats({
        total: usersList.length,
      });

      setJobStats({
        total: jobsList.data.results.length,
      });

      setPlanStats({
        total: plansList.length,
      });

      setChartData([
        {
          name: 'Users',
          Total: usersList.length,
        },
        {
          name: 'Jobs',
          Total: jobsList.data.results.length,
        },
        {
          name: 'Plans',
          Total: plansList.length,
        },
      ]);

      // Compute most common address, age, and job title
      const addressCount = {};
      const ageCount = {};
      const jobTitleCount = {};

      usersList.forEach((user) => {
        addressCount[user.address] = (addressCount[user.address] || 0) + 1;
        const age = calculateAge(user.dob);
        ageCount[age] = (ageCount[age] || 0) + 1;
        jobTitleCount[user.jobTitle] = (jobTitleCount[user.jobTitle] || 0) + 1;
      });

      setMostCommonAddress(
        Object.keys(addressCount).reduce((a, b) =>
          addressCount[a] > addressCount[b] ? a : b
        )
      );
      setMostCommonAge(
        Object.keys(ageCount).reduce((a, b) =>
          ageCount[a] > ageCount[b] ? a : b
        )
      );
      setMostCommonJobTitle(
        Object.keys(jobTitleCount).reduce((a, b) =>
          jobTitleCount[a] > jobTitleCount[b] ? a : b
        )
      );
    } catch (error) {
      console.error('Failed to fetch data:', error);
      message.error('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

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
        Overview Dashboard
      </h1>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Total Users"
              value={userStats.total}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Total Jobs"
              value={jobStats.total}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Total Plans"
              value={planStats.total}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Most Common Address"
              value={mostCommonAddress}
              prefix={<HomeOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Most Common Age"
              value={mostCommonAge}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Most Common Job Title"
              value={mostCommonJobTitle}
              prefix={<IdcardOutlined />}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24}>
          <Card title="Overview Chart">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Total" fill="#3b7b7a" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OverviewManagement;
