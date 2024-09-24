import { Col, Menu, Row } from 'antd';
import logo from '../../assets/artboard-3-copy-2-4x-1.png';
import { Header as AntHeader } from 'antd/es/layout/layout';
import { MenuItems } from '@/constant/menu-data';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);

  useEffect(() => {
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    navigate(key);
  };

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
        <Col xs={24} sm={24} md={12}>
          <Menu
            theme="dark"
            onClick={handleMenuClick}
            mode="horizontal"
            selectedKeys={[selectedKey]}
            style={{
              backgroundColor: '#3b7b7a ',
              color: 'white',
              width: '100%',
              justifyContent: 'space-around', // Center menu items on small screens
            }}
            items={MenuItems}
          />
        </Col>
      </Row>
    </AntHeader>
  );
};

export default Header;
