import { Col, Menu, Row, Button, Dropdown, message, Avatar, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import logo from '../../assets/artboard-3-copy-2-4x-1.png';
import { Header as AntHeader } from 'antd/es/layout/layout';
import { MenuItems } from '@/constant/menu-data';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const { isAuthenticated, logout, userId, jwtToken, userRole } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (isAuthenticated && userId && jwtToken) {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://jobeeapi.azurewebsites.net/api/Account/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );
          if (response.data.isSuccess) {
            setUserData(response.data.result);
          } else {
            message.error(
              response.data.message || 'Failed to fetch user data.'
            );
          }
        } catch (error) {
          message.error('Failed to fetch user data.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserData();
  }, [isAuthenticated, userId, jwtToken]);

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    navigate(key);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogoutClick = () => {
    logout();
    message.success('You have successfully logged out.');
    navigate('/login');
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => navigate('/profile')}>
        Profile
      </Menu.Item>
      <Menu.Item key="application" onClick={() => navigate('/application')}>
        Your application
      </Menu.Item>
      <Menu.Item key="order" onClick={() => navigate('/my-orders')}>
        Your order
      </Menu.Item>
      <Menu.Item key="feedback" onClick={() => navigate('/feedback')}>
        Rate and review
      </Menu.Item>
      <Menu.Item key="logout" onClick={handleLogoutClick}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <AntHeader style={{ backgroundColor: '#3b7b7a' }}>
      <Row justify="space-between" align="middle">
        <Col>
          <a href="/landing-page">
            <img
              src={logo}
              alt="Artboard copy"
              style={{ width: 148, height: 58 }}
            />
          </a>
        </Col>
        {userRole !== 'Admin' && (
          <Col xs={24} sm={24} md={12}>
            <Menu
              theme="dark"
              onClick={handleMenuClick}
              mode="horizontal"
              selectedKeys={[selectedKey]}
              style={{
                backgroundColor: '#3b7b7a',
                color: 'white',
                width: '100%',
                justifyContent: 'space-around', // Center menu items on small screens
              }}
              items={MenuItems}
            />
          </Col>
        )}
        <Col>
          {isAuthenticated ? (
            <Dropdown overlay={profileMenu} trigger={['click']}>
              <Button
                style={{
                  backgroundColor: '#3b7b7a',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                }}
                type="primary"
              >
                {loading ? (
                  <Spin size="small" />
                ) : (
                  <>
                    <Avatar
                      src={userData?.profilePicture}
                      icon={<UserOutlined />}
                      style={{ marginRight: 8 }}
                    />
                    {userRole === 'Admin'
                      ? 'Welcome, Admin'
                      : userData?.fullName}
                  </>
                )}
              </Button>
            </Dropdown>
          ) : (
            <Button
              className="login-button"
              type="primary"
              onClick={handleLoginClick}
            >
              Login now
            </Button>
          )}
        </Col>
        {(userRole === 'Admin' || userRole === 'Employer') && (
          <Col>
            <Button
              type="primary"
              onClick={() => navigate('/dashboard')}
              style={{
                marginLeft: 16,
                backgroundColor: '#ed8125',
                color: 'white',
              }}
            >
              Dashboard
            </Button>
          </Col>
        )}
      </Row>
    </AntHeader>
  );
};

export default Header;
