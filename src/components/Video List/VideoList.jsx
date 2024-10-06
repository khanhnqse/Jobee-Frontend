import React from 'react';
import { Row, Col, Card, Typography, Button, Tag, Pagination } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import ConfigAntdButton from '../Button/ConfigAntdButton';

const { Title, Paragraph } = Typography;

const VideoList = ({
  videos,
  itemsPerPage = 3,
  currentPage = 1,
  onPageChange,
}) => {
  const navigate = useNavigate(); // Hook for navigation

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedVideos = videos.slice(startIndex, startIndex + itemsPerPage);

  // Function to handle navigation
  const handleVideoClick = (video) => {
    navigate('/video-player', { state: { video } });
  };

  return (
    <div style={{ padding: '0 16px' }}>
      <Row justify="center" gutter={[32, 32]} style={{ marginTop: 32 }}>
        {paginatedVideos.map((video, index) => (
          <Col
            key={index}
            span={8}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'tween', stiffness: 300 }}
              onClick={() => handleVideoClick(video)} // Navigate on click
            >
              <Card
                hoverable
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '380px',
                  width: '360px',
                  borderRadius: '8px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s',
                }}
                cover={
                  <img
                    src={video.thumbnail}
                    alt={`Video ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '160px',
                      objectFit: 'cover',
                      borderTopLeftRadius: '8px',
                      borderTopRightRadius: '8px',
                    }}
                  />
                }
              >
                <div style={{ flex: '1', padding: '16px' }}>
                  <Title
                    level={4}
                    style={{
                      fontSize: '1.1em',
                      margin: '0 0 8px 0',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {video.title}
                  </Title>
                  <Paragraph
                    ellipsis={{ rows: 1, expandable: false }}
                    style={{
                      margin: '0',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      paddingBottom: '8px',
                    }}
                  >
                    {video.description}
                  </Paragraph>
                  <Tag color="blue">{video.duration}</Tag>
                </div>
                <ConfigAntdButton>
                  <Button
                    type="primary"
                    shape="round"
                    icon={<HeartOutlined />}
                    style={{
                      width: '180px',
                      marginLeft: '64px',
                      marginTop: '20px',
                      backgroundColor: '#3b7b7a',
                      borderColor: '#3b7b7a',
                    }}
                  >
                    Watch now
                  </Button>
                </ConfigAntdButton>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
      {onPageChange && (
        <Pagination
          style={{ marginTop: 34, textAlign: 'center' }}
          total={videos.length}
          pageSize={itemsPerPage}
          current={currentPage}
          onChange={onPageChange}
        />
      )}
    </div>
  );
};

export default VideoList;
