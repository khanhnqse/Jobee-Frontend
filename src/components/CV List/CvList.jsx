import React, { useState } from 'react';
import { Row, Col, Card, Pagination, Button, message } from 'antd';
import ConfigAntdButton from '../Button/ConfigAntdButton';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const CvList = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Number of items per page
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleButtonClick = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      message.warning('Please log in to access this feature.');
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-[172px] w-full mt-10">
      <Row gutter={[24, 24]} justify="center" className="w-full">
        {paginatedData.map((cv, index) => (
          <Col
            key={index}
            xs={24} // Full width on extra small screens
            sm={12} // Two cards per row on small screens
            md={8} // Three cards per row on medium screens
            lg={6} // Four cards per row on large screens
          >
            <Card
              hoverable
              cover={
                <img
                  alt={`cv-${index + 1}`}
                  src={cv.img}
                  style={{
                    width: '100%',
                    height: '330px', // Set a flexible height for responsiveness
                    objectFit: 'cover', // Keep image aspect ratio
                  }}
                />
              }
              className="w-full h-auto rounded-[8px] shadow-lg"
            >
              <Card.Meta title={cv.title} description={cv.description} />
              <ConfigAntdButton>
                <div className="flex justify-center mt-8">
                  <Button
                    type="primary"
                    style={{
                      width: '100px', // Fixed width to prevent shifting
                    }}
                    onClick={() => handleButtonClick('/cv-maker')}
                  >
                    Try this
                  </Button>
                </div>
              </ConfigAntdButton>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Pagination Component */}
      <div className="flex justify-center mt-6">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={handlePageChange}
          showSizeChanger={false} // Optionally hide size changer
        />
      </div>
    </div>
  );
};

export default CvList;
