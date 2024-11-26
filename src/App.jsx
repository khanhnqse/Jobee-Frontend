import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Checkout from './components/Checkout/Checkout';
import Profile from './pages/Profile/Profile';
import GradeResume from './pages/GradeResume/GradeResume';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
import UserManagement from './pages/Admin/User Management/UserManagement';
import JobManagement from './pages/Admin/Job Management/JobManagement';
import PlanManagement from './pages/Admin/Plan Management/PlanManagement';
import InterviewAI from './pages/InterviewAI/InterviewAI';
import PaymentSuccess from './pages/PaymentStatus/PaymentSuccess';
import PaymentFail from './pages/PaymentStatus/PaymentFail';
import JobPage from './pages/JobPage/JobPage/JobPage';
import JobDetailPage from './pages/JobPage/JobPageDetail/JobPageDetail';
import OverviewManagement from './pages/Admin/OverViewManagement/Overview';
import ApplicationPage from './pages/ApplicationPage/ApplicationPage';
import ApplicationManagement from './pages/Admin/ApplicationManagement/ApplicationManagement';
import OrderManagement from './pages/Admin/OrderManagement/OderManagement';
import MyOrder from './pages/My Oder/MyOrder';
import FeedbackPage from './pages/Feedback Page/Feedback';
import FeedbackManagement from './pages/Admin/Feedback Management/FeedbackManagement';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path={PATHS.LANDING.INDEX} element={<LandingPage />} />
          <Route path={PATHS.CV.INDEX} element={<Cv />} />
          <Route
            path={PATHS.SIMULATED_INTERVIEW.INDEX}
            element={<Simulated />}
          />
          <Route path={PATHS.CONTACT.INDEX} element={<ContactUs />} />
          <Route path={PATHS.PRICING.INDEX} element={<Pricing />} />
          <Route path={PATHS.LEARNING.INDEX} element={<CourseraVideo />} />
          <Route
            path={PATHS.VIDEO_PLAYER.INDEX}
            element={<VideoPlayerPage />}
          />
          <Route
            path={PATHS.CHECKOUT.INDEX}
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            }
          />
          <Route path={PATHS.POLICY.INDEX} element={<PolicyPage />} />
          <Route
            path={PATHS.MY_ORDERS.INDEX}
            element={
              <PrivateRoute>
                <MyOrder />
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
          <Route path={PATHS.REGISTER} element={<RegisterPage />} />
          <Route
            path={PATHS.PROFILE}
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.GRADE_RESUME}
            element={
              <PrivateRoute>
                <GradeResume />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.FEEDBACK.INDEX}
            element={
              <PrivateRoute>
                <FeedbackPage />
              </PrivateRoute>
            }
          />
          <Route
            path={PATHS.DASHBOARD.INDEX}
            element={
              <PrivateRoute roles={['Admin', 'Employer']}>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route
              path={PATHS.DASHBOARD.CHILDREN.USER}
              element={<UserManagement />}
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.JOB}
              element={<JobManagement />}
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.PLAN}
              element={<PlanManagement />}
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.OVERVIEW}
              element={<OverviewManagement />}
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.APPLICATION}
              element={<ApplicationManagement />}
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.ORDER}
              element={<OrderManagement />}
            />
            <Route
              path={PATHS.DASHBOARD.CHILDREN.FEEDBACK}
              element={<FeedbackManagement />}
            />
          </Route>
          <Route path={PATHS.INTERVIEW} element={<InterviewAI />} />
          <Route path={PATHS.SUCCESS} element={<PaymentSuccess />} />
          <Route path={PATHS.FAIL} element={<PaymentFail />} />
          <Route path="/job" element={<JobPage />} />
          <Route path="/job/:jobId" element={<JobDetailPage />} />
          <Route path={PATHS.APPLICATION} element={<ApplicationPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
