import React, { useState } from 'react';
import { Row, Col, Card, Pagination, Button } from 'antd';
import ConfigAntdButton from '../Button/ConfigAntdButton';

const CvList = ({ data }) => {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8; // Number of items per page

  const paginatedData = data.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="px-[172px] w-full mt-10">
      <Row gutter={[24, 24]} className="flex justify-center w-full">
        {paginatedData.map((cv, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  alt={`cv-${index + 1}`}
                  src={cv.img}
                  style={{
                    width: '100%',
                    height: '350px',
                    objectFit: 'fill',
                  }}
                />
              }
              className="w-full h-[530px] rounded-[8px] shadow-lg"
            >
              <Card.Meta title={cv.title} description={cv.description} />
              <ConfigAntdButton>
                <div className="flex justify-center mt-8">
                  <Button type="primary">Try this</Button>
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
        />
      </div>
    </div>
  );
};

export default CvList;
