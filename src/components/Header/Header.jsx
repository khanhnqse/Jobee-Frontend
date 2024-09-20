import { Col, Menu, Row } from 'antd';
import logo from '../../assets/artboard-3-copy-2-4x-1.png';
import { Header as AntHeader } from 'antd/es/layout/layout';
import { MenuItems } from '@/constant/menu-data';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';
const Header = () => {
  const navigate = useNavigate();
  const [selectedKey, setSelectedKey] = useState(MenuItems[0].key); // Set default selected key

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
            }} // Adjust the minWidth as needed
            items={MenuItems}
          />
        </Col>
      </Row>
    </AntHeader>
  );
};

export default Header;
