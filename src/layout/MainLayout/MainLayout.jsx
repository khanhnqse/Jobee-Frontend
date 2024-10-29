import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { MainContextProvider } from '../../context/MainContext';
import { useAuth } from '../../context/AuthContext';

const MainLayout = () => {
  const { userRole } = useAuth();

  return (
    <>
      <MainContextProvider>
        <Layout style={{ overflowX: 'hidden' }}>
          <Header />
          <Layout>
            <Content style={{ backgroundColor: '#eae4c4' }}>
              <Outlet />
            </Content>
          </Layout>
          {userRole !== 'Admin' && <Footer />}
        </Layout>
      </MainContextProvider>
    </>
  );
};

export default MainLayout;
