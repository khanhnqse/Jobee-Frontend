import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'antd';

const CvSample = ({ samples }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pageSize = 4; // Number of samples to display at a time

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + pageSize, samples.length - pageSize)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - pageSize, 0));
  };

  const displayedSamples = samples.slice(currentIndex, currentIndex + pageSize);

  return (
    <div className="px-[16px] md:px-[173px] mt-10 pb-10">
      <p className="font-poppins font-semibold text-black text-[28px] text-center mb-8">
        CV Samples for Popular Positions
      </p>

      <Row gutter={[16, 24]} className="flex justify-center">
        {displayedSamples.map((sample, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={
                <img
                  alt={`cv-sample-${index + 1}`}
                  src={sample.img}
                  className="object-cover h-[200px] w-full rounded-t-[8px] transition-transform duration-300"
                />
              }
              className="rounded-[8px] shadow-lg transition-transform transform hover:scale-105"
              style={{ backgroundColor: '#ffffff' }}
            >
              <Card.Meta
                title={
                  <span className="text-center text-lg font-medium">
                    {sample.title}
                  </span>
                }
                description={
                  <span className="text-center text-sm text-gray-600">
                    Create now
                  </span>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <div className="flex justify-between mt-4">
        <Button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="bg-[#3B7B7A] text-white transition-all duration-300 hover:bg-[#2b4f4a]"
        >
          Previous
        </Button>
        <Button
          onClick={handleNext}
          disabled={currentIndex + pageSize >= samples.length}
          className="bg-[#3B7B7A] text-white transition-all duration-300 hover:bg-[#2b4f4a]"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default CvSample;
