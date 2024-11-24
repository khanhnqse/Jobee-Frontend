import { useState } from 'react';
import {
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
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
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
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
            ,
            'Application Management',
          ].includes(item.label)
        )
      : allItems;

  const handleMenuClick = ({ key }) => {
    navigate(key);
  };

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ background: colorBgContainer }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="light"
          defaultSelectedKeys={['/dashboard/overview']}
          mode="inline"
          items={items}
          onClick={handleMenuClick}
        />
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
              background: colorBgContainer,
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
