import { useState } from 'react';
import {
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Switch, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook

const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const allItems = [
  getItem('Overview', '/dashboard/overview', <PieChartOutlined />),
  getItem('User Management', '/dashboard/user', <MenuFoldOutlined />),
  getItem('Job Management', '/dashboard/job', <DesktopOutlined />),
  getItem('Plan Management', '/dashboard/plan', <UserOutlined />),
  getItem(
    'Application Management',
    '/dashboard/application',
    <IoPaperPlaneOutline />
  ),
  getItem('Order Management', '/dashboard/order', <DesktopOutlined />),
  getItem('Feedback Management', '/dashboard/feedback', <UserOutlined />),
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const { userRole } = useAuth(); // Get userRole from AuthContext

  // Filter items based on user role
  const items =
    userRole === 'Employer'
      ? allItems.filter((item) =>
          [
            'User Management',
            'Job Management',
            'Application Management',
          ].includes(item.label)
        )
      : allItems;

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
        background: darkMode ? '#1f1f1f' : colorBgContainer,
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ background: darkMode ? '#141414' : colorBgContainer }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme={darkMode ? 'dark' : 'light'}
          defaultSelectedKeys={['/dashboard/overview']}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
        <div style={{ padding: '10px', textAlign: 'center' }}>
          <span style={{ color: darkMode ? '#fff' : '#000' }}>Dark Mode</span>
          <Switch
            checked={darkMode}
            onChange={toggleDarkMode}
            style={{ marginLeft: '10px' }}
          />
        </div>
      </Sider>
      <Layout>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: darkMode ? '#1f1f1f' : colorBgContainer,
              color: darkMode ? '#fff' : '#000',
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
