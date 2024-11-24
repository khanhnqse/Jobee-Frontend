import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, message } from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
  DollarOutlined,
  HomeOutlined,
  CalendarOutlined,
  IdcardOutlined,
  AppstoreAddOutlined,
} from '@ant-design/icons';
import userService from '@/services/userService';
import jobService from '@/services/jobService';
import planService from '@/services/planService';
import applicationService from '@/services/applicationService';
import axios from 'axios';
import StatisticsCard from '@/components/Statistics Card/StatisticsCard';
import PieChartCard from '@/components/Pie ChartCard/PieChartCard';
import BarChartCard from '@/components/Bar ChartCard/BarChartCard';

const OverviewManagement = () => {
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState({ total: 0 });
  const [jobStats, setJobStats] = useState({ total: 0 });
  const [planStats, setPlanStats] = useState({ total: 0 });
  const [applicationStats, setApplicationStats] = useState({ total: 0 });
  const [orderStats, setOrderStats] = useState({ total: 0, totalAmount: 0 });
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
  const [orderDetailStats, setOrderDetailStats] = useState([]);
  const [acceptedPercentage, setAcceptedPercentage] = useState(0);
  const [rejectedPercentage, setRejectedPercentage] = useState(0);
  const [mostAppliedJob, setMostAppliedJob] = useState('');

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
      const ordersList = await axios.get(
        'https://jobeeapi.azurewebsites.net/api/order'
      );

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

      const totalOrderAmount = ordersList.data.results.reduce(
        (acc, order) => acc + order.amount,
        0
      );
      setOrderStats({
        total: ordersList.data.results.length,
        totalAmount: totalOrderAmount,
      });

      const orderDetailCount = {
        'Standard service': 0,
        'Professional service': 0,
        Other: 0,
      };

      ordersList.data.results.forEach((order) => {
        if (order.amount === 99000) {
          orderDetailCount['Standard service'] += 1;
        } else if (order.amount === 1999000) {
          orderDetailCount['Professional service'] += 1;
        } else {
          orderDetailCount['Other'] += 1;
        }
      });

      setOrderDetailStats(
        Object.keys(orderDetailCount).map((key) => ({
          name: key,
          value: orderDetailCount[key],
        }))
      );

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

      const totalApplications = applicationsList.length;
      const acceptedApplications = applicationsList.filter(
        (application) => application.status === 'Accepted'
      ).length;
      const rejectedApplications = applicationsList.filter(
        (application) => application.status === 'Rejected'
      ).length;

      setAcceptedPercentage(
        ((acceptedApplications / totalApplications) * 100).toFixed(2)
      );
      setRejectedPercentage(
        ((rejectedApplications / totalApplications) * 100).toFixed(2)
      );

      const jobApplicationCount = {};
      applicationsList.forEach((application) => {
        jobApplicationCount[application.jobId] =
          (jobApplicationCount[application.jobId] || 0) + 1;
      });

      const mostAppliedJobId = Object.keys(jobApplicationCount).reduce((a, b) =>
        jobApplicationCount[a] > jobApplicationCount[b] ? a : b
      );

      const mostAppliedJob = jobsList.data.results.find(
        (job) => job.jobId === parseInt(mostAppliedJobId)
      );

      setMostAppliedJob(mostAppliedJob ? mostAppliedJob.title : 'N/A');

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
        {
          name: 'Orders',
          Total: ordersList.data.results.length,
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
          <StatisticsCard
            title="Total Users"
            value={userStats.total}
            prefix={<UserOutlined />}
            backgroundColor="#f0f2f5"
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <StatisticsCard
            title="Total Jobs"
            value={jobStats.total}
            prefix={<FileTextOutlined />}
            backgroundColor="#e6f7ff"
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <StatisticsCard
            title="Total Plans"
            value={planStats.total}
            prefix={<DollarOutlined />}
            backgroundColor="#fff1f0"
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <StatisticsCard
            title="Total Applications"
            value={applicationStats.total}
            prefix={<AppstoreAddOutlined />}
            backgroundColor="#f9f0ff"
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <StatisticsCard
            title="Total Orders"
            value={orderStats.total}
            prefix={<DollarOutlined />}
            backgroundColor="#fffbe6"
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <StatisticsCard
            title="Total Order Amount"
            value={`${orderStats.totalAmount.toLocaleString('vi-VN')} VND`}
            prefix={<DollarOutlined />}
            backgroundColor="#f6ffed"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} sm={12} md={8}>
          <StatisticsCard
            title="Most Common Address"
            value={mostCommonAddress}
            prefix={<HomeOutlined />}
            backgroundColor="#e6fffb"
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <StatisticsCard
            title="Most Common Age"
            value={mostCommonAge}
            prefix={<CalendarOutlined />}
            backgroundColor="#fff0f6"
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <StatisticsCard
            title="Most Common Job Title"
            value={mostCommonJobTitle}
            prefix={<IdcardOutlined />}
            backgroundColor="#f0f5ff"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} sm={12} md={8}>
          <StatisticsCard
            title="Accepted Applications (%)"
            value={`${acceptedPercentage}%`}
            prefix={<AppstoreAddOutlined />}
            backgroundColor="#e6f7ff"
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <StatisticsCard
            title="Rejected Applications (%)"
            value={`${rejectedPercentage}%`}
            prefix={<AppstoreAddOutlined />}
            backgroundColor="#fffbe6"
          />
        </Col>
        <Col xs={24} sm={12} md={8}>
          <StatisticsCard
            title="Most Applied Job"
            value={mostAppliedJob}
            prefix={<FileTextOutlined />}
            backgroundColor="#f9f0ff"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} md={12}>
          <PieChartCard
            title="Job Types"
            data={jobTypeStats}
            backgroundColor="#e6f7ff"
          />
        </Col>
        <Col xs={24} md={12}>
          <PieChartCard
            title="Application Status"
            data={applicationStatusStats}
            backgroundColor="#fffbe6"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} md={12}>
          <PieChartCard
            title="User Roles"
            data={userRoleStats}
            backgroundColor="#f9f0ff"
          />
        </Col>
        <Col xs={24} md={12}>
          <PieChartCard
            title="User Age Groups"
            data={userAgeGroupStats}
            backgroundColor="#fff0f6"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24}>
          <BarChartCard
            title="User Locations"
            data={userLocationStats}
            backgroundColor="#e6fffb"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24}>
          <BarChartCard
            title="Order Details"
            data={orderDetailStats}
            backgroundColor="#fff1f0"
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24}>
          <BarChartCard
            title="Overview Chart"
            data={chartData}
            backgroundColor="#f6ffed"
          />
        </Col>
      </Row>
    </div>
  );
};

export default OverviewManagement;
