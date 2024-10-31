import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Spin, message } from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
  DollarOutlined,
  HomeOutlined,
  CalendarOutlined,
  IdcardOutlined,
  AppstoreAddOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import userService from '@/services/userService';
import jobService from '@/services/jobService';
import planService from '@/services/planService';
import applicationService from '@/services/applicationService';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const OverviewManagement = () => {
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({ total: 0 });
  const [jobStats, setJobStats] = useState({ total: 0 });
  const [planStats, setPlanStats] = useState({ total: 0 });
  const [applicationStats, setApplicationStats] = useState({ total: 0 });
  const [activeUsers, setActiveUsers] = useState(0);
  const [jobTypeStats, setJobTypeStats] = useState([]);
  const [applicationStatusStats, setApplicationStatusStats] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [mostCommonAddress, setMostCommonAddress] = useState('');
  const [mostCommonAge, setMostCommonAge] = useState('');
  const [mostCommonJobTitle, setMostCommonJobTitle] = useState('');
  const [userRoleStats, setUserRoleStats] = useState([]);
  const [userAgeGroupStats, setUserAgeGroupStats] = useState([]);
  const [userLocationStats, setUserLocationStats] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const usersList = await userService.GetUsersList();
      const jobsList = await jobService.getJobsList();
      const plansList = await planService.getPlansList();
      const applicationsList = await applicationService.getApplications();

      setUserStats({
        total: usersList.length,
      });

      setJobStats({
        total: jobsList.data.results.length,
      });

      setPlanStats({
        total: plansList.length,
      });

      setApplicationStats({
        total: applicationsList.length,
      });

      setActiveUsers(usersList.filter((user) => user.isActive).length);

      const jobTypeCount = {};
      jobsList.data.results.forEach((job) => {
        jobTypeCount[job.jobType] = (jobTypeCount[job.jobType] || 0) + 1;
      });
      setJobTypeStats(
        Object.keys(jobTypeCount).map((key) => ({
          name: key,
          value: jobTypeCount[key],
        }))
      );

      const applicationStatusCount = {};
      applicationsList.forEach((application) => {
        applicationStatusCount[application.status] =
          (applicationStatusCount[application.status] || 0) + 1;
      });
      setApplicationStatusStats(
        Object.keys(applicationStatusCount).map((key) => ({
          name: key,
          value: applicationStatusCount[key],
        }))
      );

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
        {
          name: 'Applications',
          Total: applicationsList.length,
        },
      ]);

      // Compute most common address, age, and job title
      const addressCount = {};
      const ageCount = {};
      const jobTitleCount = {};
      const roleCount = {};
      const ageGroupCount = {};
      const locationCount = {};

      usersList.forEach((user) => {
        addressCount[user.address] = (addressCount[user.address] || 0) + 1;
        const age = calculateAge(user.dob);
        ageCount[age] = (ageCount[age] || 0) + 1;
        jobTitleCount[user.jobTitle] = (jobTitleCount[user.jobTitle] || 0) + 1;
        roleCount[user.role] = (roleCount[user.role] || 0) + 1;
        const ageGroup = getAgeGroup(age);
        ageGroupCount[ageGroup] = (ageGroupCount[ageGroup] || 0) + 1;
        locationCount[user.address] = (locationCount[user.address] || 0) + 1;
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

      setUserRoleStats(
        Object.keys(roleCount).map((key) => ({
          name: key,
          value: roleCount[key],
        }))
      );

      setUserAgeGroupStats(
        Object.keys(ageGroupCount).map((key) => ({
          name: key,
          value: ageGroupCount[key],
        }))
      );

      setUserLocationStats(
        Object.keys(locationCount).map((key) => ({
          name: key,
          value: locationCount[key],
        }))
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

  const getAgeGroup = (age) => {
    if (age < 20) return 'Under 20';
    if (age < 30) return '20-29';
    if (age < 40) return '30-39';
    if (age < 50) return '40-49';
    return '50 and above';
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
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Total Applications"
              value={applicationStats.total}
              prefix={<AppstoreAddOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card>
            <Statistic
              title="Active Users"
              value={activeUsers}
              prefix={<CheckCircleOutlined />}
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
        <Col xs={24} md={12}>
          <Card title="Job Types">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={jobTypeStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {jobTypeStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Application Status">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={applicationStatusStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#82ca9d"
                  label
                >
                  {applicationStatusStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} md={12}>
          <Card title="User Roles">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userRoleStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {userRoleStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="User Age Groups">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={userAgeGroupStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#82ca9d"
                  label
                >
                  {userAgeGroupStats.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24}>
          <Card title="User Locations">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={userLocationStats}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#3b7b7a" />
              </BarChart>
            </ResponsiveContainer>
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
