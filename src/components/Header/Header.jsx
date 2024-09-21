import { Col, Menu, Row } from 'antd';
import logo from '../../assets/artboard-3-copy-2-4x-1.png';
import { Header as AntHeader } from 'antd/es/layout/layout';
import { MenuItems } from '@/constant/menu-data';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { useEffect, useState } from 'react';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Lấy location hiện tại
  const [selectedKey, setSelectedKey] = useState(location.pathname); // Set key dựa trên pathname

  useEffect(() => {
    setSelectedKey(location.pathname); // Cập nhật selectedKey khi pathname thay đổi
  }, [location.pathname]);

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    navigate(key);
  };

  return (
    <AntHeader style={{ backgroundColor: '#3b7b7a' }}>
      <Row justify="space-between" align="middle">
        <Col>
          <img
            src={logo}
            alt="Artboard copy"
            style={{ width: 148, height: 58 }}
          />
        </Col>
        <Col>
          <Menu
            theme="dark"
            onClick={handleMenuClick}
            mode="horizontal"
            selectedKeys={[selectedKey]}
            style={{
              backgroundColor: '#3b7b7a',
              color: 'white',
              width: 'auto',
              minWidth: '680px',
            }}
            items={MenuItems}
          />
        </Col>
      </Row>
    </AntHeader>
  );
};

export default Header;
