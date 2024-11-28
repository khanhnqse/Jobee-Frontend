import { Button, Row, Col, Typography, Input, Checkbox, Card } from 'antd';
import resumeImage from '../../assets/resume.png';
import heroSectionImage from '../../assets/Banner2.png';
import onlineImage from '../../assets/online.png';
import videoImage from '../../assets/video.png';
import image61 from '../../assets/Banner3.png';
import video4 from '../../assets/untitled-design-10-1-1.png';
import { GoogleOutlined } from '@ant-design/icons';

import { useEffect, useState } from 'react';
import axios from 'axios';
import TopVideos from '@/components/Video List/VideoList';
import ConfigAntdButton from '@/components/Button/ConfigAntdButton';
import { Link } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Home = () => {
  const apiVideo = 'https://66ee8e6d3ed5bb4d0bf14a30.mockapi.io/video';
  const [videos, setVideos] = useState([]);
  const fetchVideos = async () => {
    const response = await axios.get(apiVideo);
    console.log(response.data);
    setVideos(response.data);
  };

  useEffect(() => {
    fetchVideos();
  }, []);
  return (
    <>
      <div
        style={{ position: 'relative', textAlign: 'center', color: 'white' }}
      >
        <img
          src={heroSectionImage}
          alt="Untitled design"
          style={{ width: '100%', height: '533px', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Row justify="center" align="middle" style={{ height: '100%' }}>
            <Col span={12}>
              <Title style={{ color: 'white' }}>
                Nail your interview. Land your dream job.
              </Title>
              <Paragraph style={{ color: 'white', padding: '15px' }}>
                Unleash the power of AI to streamline your job hunting and
                unlock better opportunities.
              </Paragraph>
              <ConfigAntdButton>
                <Link to="/register">
                  <Button
                    type="primary"
                    size="large"
                    style={{ marginRight: 16 }}
                  >
                    Sign up now
                  </Button>
                </Link>
              </ConfigAntdButton>
              <Button size="large" icon={<GoogleOutlined />}>
                Sign up using Google
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <Row justify="center" style={{ marginTop: 64 }}>
        <Col
          span={8}
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={resumeImage}
            alt="Resume"
            style={{
              width: 124,
              height: 125,
              marginBottom: 24,
              marginLeft: 24,
            }}
          />
          <Title level={4}>CV Assistance</Title>
          <Paragraph>Craft a CV that reflects your unique value.</Paragraph>
        </Col>
        <Col
          span={8}
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={onlineImage}
            alt="Online"
            style={{ width: 124, height: 125, marginBottom: 24 }}
          />
          <Title level={4}>Simulated Interview</Title>
          <Paragraph>
            Practice with realistic simulations and conquer your anxieties.
          </Paragraph>
        </Col>
        <Col
          span={8}
          style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src={videoImage}
            alt="Video"
            style={{ width: 124, height: 125, marginBottom: 24 }}
          />
          <Title level={4}>Learning</Title>
          <Paragraph>
            Level up your soft skills with engaging video tutorials.
          </Paragraph>
        </Col>
      </Row>

      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          color: 'white',
          marginTop: 64,
        }}
      >
        <img
          src={image61}
          alt="Untitled design"
          style={{ width: '100%', height: '728px', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Row
            justify="end"
            align="middle"
            style={{
              height: '100vh',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
              }}
            />
            <Col
              className="pb-16 pr-24"
              span={12}
              style={{ zIndex: 1, textAlign: 'left' }}
            >
              <Title style={{ color: 'white', fontSize: '48px' }}>
                Stress less
                <br />
                Impress more with AI CV Assistance
              </Title>
              <Paragraph className="text-white text-lg">
                <div className="py-2">
                  Targeted CV Creation: AI crafts a perfect CV for each
                  opportunity, highlighting your strengths.
                </div>
                <div className="py-2">
                  Smart Error Detection: Eliminate mistakes with AI scanning and
                  get personalized suggestions for a powerful resume.
                </div>
                <div className="py-2">
                  Network Expansion: AI connects you with ideal clients and
                  companies seeking your skills.
                </div>
              </Paragraph>
              <ConfigAntdButton>
                <Link to="/cv">
                  <Button size="large">More information</Button>
                </Link>
              </ConfigAntdButton>
            </Col>
          </Row>
        </div>
      </div>

      <Row justify="center" style={{ marginTop: 64 }}>
        <Col span={12} style={{ textAlign: 'center' }}>
          <Title level={2}>Our top videos</Title>
        </Col>
      </Row>

      {/* Top video */}
      <TopVideos videos={videos} itemsPerPage={3} />

      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          background: 'white',
          marginTop: 64,
        }}
      >
        <img
          src={video4}
          alt="Untitled design"
          style={{ width: '100%', height: '625px', objectFit: 'cover' }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#0f1110cc',
          }}
        >
          <Row justify="center" align="middle" style={{ height: '100%' }}>
            <Col span={12}>
              <Title style={{ color: 'white', padding: '10px' }}>
                Interview Ready in Minutes! Simulate the Real Deal &amp; Conquer
                Fear.
              </Title>
              <Paragraph style={{ color: 'white', padding: '10px' }}>
                Explore our groundbreaking AI technology and unlock new
                possibilities with Simulated Interview.
              </Paragraph>
              <ConfigAntdButton>
                <Link to="/simulated-interview">
                  <Button
                    className="text-white bg-red-700"
                    type="primary"
                    size="large"
                    style={{ width: '160px' }}
                  >
                    Try it now
                  </Button>
                </Link>
              </ConfigAntdButton>
            </Col>
          </Row>
        </div>
      </div>
      <Row justify="center" style={{ marginTop: 64, marginBottom: 64 }}>
        <Col
          span={12}
          style={{
            textAlign: 'center',
            padding: '40px',
            borderRadius: '8px',
          }}
        >
          <Title level={2} style={{ color: '#000000', fontWeight: 'bold' }}>
            Ready to get started?
          </Title>
          <Paragraph className="p-4" style={{ color: '#333333' }}>
            Sign in now for more offer from us
          </Paragraph>
          <Input
            placeholder="Mail or username"
            style={{
              marginBottom: 16,
              borderColor: '#d9886a',
              borderWidth: '2px',
              borderRadius: '8px',
              color: '#d9886a',
              padding: '10px',
              width: '450px',
            }}
          />
          <Input.Password
            placeholder="Password"
            style={{
              marginBottom: 16,
              borderColor: '#d9886a',
              borderWidth: '2px',
              borderRadius: '8px',
              color: '#d9886a',
              padding: '10px',
              width: '450px',
            }}
          />

          <br />
          <Link to="/login">
            <Button
              type="primary"
              size="large"
              style={{
                backgroundColor: '#d9886a',
                borderColor: '#d9886a',
                width: '150px',
                borderRadius: '8px',
              }}
            >
              Sign up
            </Button>
          </Link>
        </Col>
      </Row>
    </>
  );
};

export default Home;
