import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout/MainLayout/MainLayout';
import { PATHS } from './constant/path';
import PageNotFound from './pages/PageNotFound/PageNotFound';
import Home from './pages/Homepage/Home';
import Cv from './pages/CV Assistance/Cv';
import Simulated from './pages/Simulated Interview/SimulatedInterview';
import ContactUs from './pages/Contact Us/ContactUs';
import Pricing from './pages/Pricing/Pricing';
import CourseraVideo from './pages/Course Video/CourseVideo';
import LandingPage from './pages/Landing Page/LandingPage';
import VideoPlayerPage from './pages/PlayerVideo/PlayerVideo';
import PolicyPage from './pages/Policy Page/Policy';
import CVMaker from './pages/CV Maker Page/CvMaker';
import LoginPage from './pages/LoginPage/LoginPage';

import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={PATHS.LANDING.INDEX} element={<LandingPage />} />
          <Route
            path={PATHS.CV.INDEX}
            element={
              <PrivateRoute>
                <Cv />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.SIMULATED_INTERVIEW.INDEX}
            element={
              <PrivateRoute>
                <Simulated />
              </PrivateRoute>
            }
          />
          <Route path={PATHS.CONTACT.INDEX} element={<ContactUs />} />
          <Route
            path={PATHS.PRICING.INDEX}
            element={
              <PrivateRoute>
                <Pricing />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.LEARNING.INDEX}
            element={
              <PrivateRoute>
                <CourseraVideo />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.VIDEO_PLAYER.INDEX}
            element={
              <PrivateRoute>
                <VideoPlayerPage />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.POLICY.INDEX}
            element={
              <PrivateRoute>
                <PolicyPage />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.CV_MAKER.INDEX}
            element={
              <PrivateRoute>
                <CVMaker />
              </PrivateRoute>
            }
          />
          <Route path={PATHS.LOGIN} element={<LoginPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
