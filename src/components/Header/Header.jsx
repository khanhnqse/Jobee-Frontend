import { Col, Menu, Row } from 'antd';
import logo from '../../assets/artboard-3-copy-2-4x-1.png';
import { Header as AntHeader } from 'antd/es/layout/layout';

const Header = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

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
              mode="horizontal"
              theme="dark"
              style={{ backgroundColor: '#3b7b7a' }}
            >
              <Menu.Item key="home">Home</Menu.Item>
              <Menu.Item key="cv">CV Assistance</Menu.Item>
              <Menu.Item key="interview">Simulated Interview</Menu.Item>
              <Menu.Item key="learning">Learning</Menu.Item>
              <Menu.Item key="pricing">Pricing</Menu.Item>
              <Menu.Item key="contact">Contact us</Menu.Item>
            </Menu>
          </Col>
        </Row>
      </AntHeader>
    </>
  );
};
export default Header;
