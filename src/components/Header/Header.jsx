import { Col, Menu, Row } from 'antd';
import logo from '../../assets/artboard-3-copy-2-4x-1.png';
import { Header as AntHeader } from 'antd/es/layout/layout';
import { MenuItems } from '@/constant/menu-data';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const _onLogout = (e) => {
  //   e?.preventDefault();
  //   dispatch(handleLogout())
  //   navigate(PATHS.LOGIN);
  // };

  return (
    <>
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
              onClick={({ key }) => navigate(key)}
              mode="horizontal"
              style={{ backgroundColor: '#3b7b7a', color: 'white' }}
              items={MenuItems}
            />
          </Col>
        </Row>
      </AntHeader>
    </>
  );
};
export default Header;
