import { Button, Row, Col, Typography, Input, Checkbox, Card } from 'antd';
import resumeImage from '../../assets/resume.png';
import heroSectionImage from '../../assets/untitled-design-5-1.png';
import onlineImage from '../../assets/online.png';
import videoImage from '../../assets/video.png';
import image61 from '../../assets/untitled-design-6-1.png';
import video1 from '../../assets/untitled-design-7-2.png';
import video2 from '../../assets/untitled-design-8-1.png';
import video3 from '../../assets/untitled-design-9-1.png';
import video4 from '../../assets/untitled-design-10-1-1.png';
import { GoogleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home = () => {
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
            backgroundColor: '#0f1110cc',
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
              <Button
                type="primary"
                size="large"
                style={{ marginRight: 16, background: '#C94C4B' }}
              >
                Sign up now
              </Button>
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
            style={{ width: 124, height: 125 }}
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
            style={{ width: 124, height: 125 }}
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
            style={{ width: 124, height: 125 }}
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
          style={{ width: '100%', height: '744px', objectFit: 'cover' }}
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
          <Row
            justify="end"
            align="middle"
            style={{
              height: '100vh', // Chiều cao toàn màn hình
              // Đường dẫn đến hình ảnh của bạn
              backgroundSize: 'cover', // Phủ kín khung hình
              backgroundPosition: 'center',
              position: 'relative',
            }}
          >
            {/* Overlay với hiệu ứng gradient */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)', // Tạo lớp phủ tối
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
                  • Targeted CV Creation: AI crafts a perfect CV for each
                  opportunity, highlighting your strengths.
                </div>
                <div className="py-2">
                  • Smart Error Detection: Eliminate mistakes with AI scanning
                  and get personalized suggestions for a powerful resume.
                </div>
                <div className="py-2">
                  • Network Expansion: AI connects you with ideal clients and
                  companies seeking your skills.
                </div>
              </Paragraph>
              <Button
                type="default"
                size="large"
                style={{ border: '1px solid white', color: 'black' }}
              >
                More information
              </Button>
            </Col>
          </Row>
        </div>
      </div>
      <Row justify="center" style={{ marginTop: 64 }}>
        <Col span={12} style={{ textAlign: 'center' }}>
          <Title level={2}>Our top videos</Title>
        </Col>
      </Row>
      <Row justify="center" gutter={[16, 16]} style={{ marginTop: 32 }}>
        <Col span={8}>
          <Card
            hoverable
            cover={
              <img
                src={video1}
                alt="Video 1"
                style={{ width: '100%', height: '320px' }}
              />
            }
          >
            <Title level={4}>
              Take Charge of Your Interview: 5 Techniques to Get the Info You
              Need
            </Title>
            <Paragraph>
              Turn silence into an advantage: Utilize open-ended questions to
              encourage the interviewer to elaborate.
            </Paragraph>
            <Button
              style={{ marginRight: 16, background: '#C94C4B' }}
              type="primary"
              size="large"
            >
              Watch now
            </Button>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            hoverable
            cover={
              <img
                src={video2}
                alt="Video 2"
                style={{ width: '100%', height: '320px' }}
              />
            }
          >
            <Title level={4}>
              Negotiate Salary Like a Pro: Learn proven techniques for a smooth
              conversation.
            </Title>
            <Paragraph>
              Nail your salary negotiation! Learn pro tips for a stress-free
              talk and land your dream job with the pay you deserve.
            </Paragraph>
            <Button
              style={{ marginRight: 16, background: '#C94C4B' }}
              type="primary"
              size="large"
            >
              Watch now
            </Button>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            hoverable
            cover={
              <img
                src={video3}
                alt="Video 3"
                style={{ width: '100%', height: '320px' }}
              />
            }
          >
            <Title level={4}>
              Interview Ready in Minutes: Relax &amp; Refine Your Accent While
              You Wait!
            </Title>
            <Paragraph>
              Pre-interview anxiety holding you back? Calm nerves &amp; speak
              clearly to transform interview jitters into confident
              communication.
            </Paragraph>
            <Button
              style={{ marginRight: 16, background: '#C94C4B' }}
              type="primary"
              size="large"
            >
              Watch now
            </Button>
          </Card>
        </Col>
      </Row>

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
              <Button
                className="text-white bg-red-700"
                type="primary"
                size="large"
                style={{ width: '160px', background: '#C94C4B' }}
              >
                Try it now
              </Button>
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
            Sign up now for more offer from us
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
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <Checkbox style={{ color: '#d9886a' }}>
              Agree with our policies
            </Checkbox>
          </div>
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
        </Col>
      </Row>
    </>
  );
};

export default Home;
