import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Pagination, Tag, Spin } from 'antd';
import video4 from '../../assets/untitled-design-10-1-1.png';
import heroSection from '../../assets/Hero.png';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';
import axios from 'axios';
import SearchBar from '@/components/Search bar/Search-bar';
import featuredImage from '../../assets/untitled-design-9-1.png';
import courseImage1 from '../../assets/image 23.png';
import courseImage2 from '../../assets/image 22.png';
import TopVideos from '@/components/Video List/VideoList';

const { Meta } = Card;

const CourseraVideo = () => {
  const apiVideo = 'https://66ee8e6d3ed5bb4d0bf14a30.mockapi.io/video';
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchVideos = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const response = await axios.get(apiVideo);
      setVideos(response.data);
    } catch (error) {
      console.error('Failed to fetch videos:', error);
    } finally {
      setLoading(false); // Set loading to false after fetching is complete
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <>
      <div
        style={{ position: 'relative', textAlign: 'center', color: 'white' }}
      >
        <img
          src={heroSection}
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
                Learn something new everyday
              </Title>
              <Paragraph style={{ color: 'white', padding: '15px' }}>
                Become professional with our courses. We provide high quality
              </Paragraph>
            </Col>
          </Row>
        </div>
      </div>
      <Row justify="center" style={{ marginTop: 64 }}>
        <Col span={12} style={{ textAlign: 'center' }}>
          <Title level={2}>Browse Our Top Courses</Title>
        </Col>
      </Row>
      <SearchBar style={{ paddingRight: '72px' }} placeholder="Search video" />
      {/* Top video */}
      {/* Loading spinner */}
      <div
        style={{
          backgroundColor: '#0f1110cc',
          padding: '16px',
          paddingTop: '32px',
          marginTop: '32px',
        }}
      >
        {loading ? (
          <div className="flex justify-center items-center my-10">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <TopVideos
              videos={videos}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      {/* Phần quảng cáo */}
      <div className="mt-20 bg-[#0f1110cc] py-10">
        <div className="text-center text-white font-poppins font-medium text-[56px]">
          Advertising
        </div>
      </div>

      <Row justify="center" style={{ marginTop: 64 }}>
        <Col span={12} style={{ textAlign: 'center' }}>
          <Title level={2}>Browse Our Top Courses</Title>
        </Col>
      </Row>
      <Row
        gutter={[16, 32]}
        justify="center"
        style={{ padding: '40px 0', paddingLeft: '175px' }}
      >
        {/* Featured Course */}
        <Col xs={24} md={10}>
          <Card
            hoverable
            style={{
              borderRadius: '10px',
              overflow: 'hidden',
              height: '100%',
              maxWidth: '600px',
              margin: '0 auto',
            }}
            cover={
              <img
                alt="Masterclass in Design Thinking"
                src={featuredImage}
                style={{
                  height: '350px',
                  objectFit: 'cover',
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                }}
              />
            }
          >
            <Meta
              title="Masterclass in Design Thinking, Innovation & Creativity"
              description="Ana Kurosova"
              style={{
                textAlign: 'center',
                fontSize: '18px',
                fontWeight: '500',
                paddingTop: '16px',
              }}
            />
          </Card>
        </Col>

        {/* Smaller Courses */}
        <Col xs={24} md={10}>
          <Row gutter={[0, 24]}>
            <Col span={16}>
              <Card
                hoverable
                style={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  height: '100%',
                  maxWidth: '350px',
                  margin: '0 auto',
                }}
                cover={
                  <img
                    alt="CV Writing Guide"
                    src={courseImage1}
                    style={{
                      height: '150px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '10px',
                      borderTopRightRadius: '10px',
                    }}
                  />
                }
              >
                <Meta
                  title="CV Writing: A Complete Guide"
                  description="12 Videos Completed"
                  style={{
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: '500',
                    paddingTop: '12px',
                  }}
                />
              </Card>
            </Col>

            <Col span={16}>
              <Card
                hoverable
                style={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  height: '100%',
                  maxWidth: '350px',
                  margin: '0 auto',
                }}
                cover={
                  <img
                    alt="CV Writing with ChatGPT"
                    src={courseImage2}
                    style={{
                      height: '150px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '10px',
                      borderTopRightRadius: '10px',
                    }}
                  />
                }
              >
                <Meta
                  title="CV Writing with ChatGPT"
                  description="33 Videos Completed"
                  style={{
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: '500',
                    paddingTop: '12px',
                  }}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Premium */}
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
          style={{ width: '100%', height: '472px', objectFit: 'cover' }}
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
                Get premium now to get 35% off
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
                Get premium
              </Button>
            </Col>
          </Row>
        </div>
      </div>

      {/* Tip */}
      <Row justify="center" style={{ marginTop: 69 }}>
        <Col span={12} style={{ textAlign: 'center' }}>
          <Title level={2}>Tips to write a good CV</Title>
        </Col>
      </Row>
      <Row justify="center" className="pb-10 pt-20">
        <Col span={16}>
          <div
            style={{
              backgroundColor: '#3D3D3D', // Dark background for the content
              padding: '36px',
              borderRadius: '8px',
              color: 'white',
              textAlign: 'left',
            }}
          >
            <Paragraph className="text-white">
              <b>1. Choose clear, legible fonts.</b> <br />
              Go for one of the standard <a href="#">CV typefaces</a>: Arial,
              Tahoma, or Helvetica if you prefer sans-serif fonts, and Times New
              Roman or Bookman Old Style if serif fonts are your usual pick. Use
              11 to 12 pt font size and single spacing. For your name and
              section titles, pick a 14 to 16-pt font size.
            </Paragraph>

            <Paragraph className="text-white">
              <b>2. Be consistent with your CV layout.</b> <br />
              Set one-inch margins for all four sides. Make sure your CV
              headings are uniform—make them larger and bold, but go easy on
              italics and underlining. Stick to a single date format on your CV:
              11-2017 or November 2017.
            </Paragraph>

            <Paragraph className="text-white">
              <b>3. Don’t cram your CV with gimmicky graphics.</b> <br />
              Less is more. <a href="#">White space</a> is your
              friend—recruiters need some breathing room! Plus, most of the
              time, after you send out your CV, it will be printed in black ink
              on white paper. Too many graphics might make it illegible.
            </Paragraph>

            <Paragraph className="text-white">
              <b>4. Get photos off of your CV.</b> <br />
              Unless you're explicitly asked to{' '}
              <a href="#">include your photograph</a> in the job ad, use a
              professional-looking picture, but not as official as an ID photo.
            </Paragraph>

            <Paragraph className="text-white">
              <b>5. Make your CV brief and relevant.</b> <br />
              Don’t include every single detail of your work experience and
              education. Stick only to the facts that are relevant to potential
              employers.
            </Paragraph>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default CourseraVideo;
