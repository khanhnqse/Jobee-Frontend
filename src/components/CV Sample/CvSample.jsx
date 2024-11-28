import React from 'react';
import { Card, Button, message } from 'antd';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const CvSample = ({ samples }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      message.warning('Please log in to access this feature.');
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  return (
    <div className="px-[16px] md:px-[173px] mt-10 pb-10">
      <p className="font-poppins font-semibold text-black text-[28px] text-center mb-8">
        Find your job now
      </p>

      <Slider {...settings}>
        {samples.map((sample, index) => (
          <div key={index} className="px-2">
            <Card
              hoverable
              cover={
                <img
                  alt={`cv-sample-${index + 1}`}
                  src={sample.img}
                  className="object-cover h-[280px] w-full rounded-t-[8px] transition-transform duration-300"
                />
              }
              style={{ backgroundColor: '#ffffff' }}
            >
              <Card.Meta
                title={
                  <span className="text-center text-lg font-medium">
                    {sample.title}
                  </span>
                }
                description={
                  <Button
                    type="link"
                    onClick={() => handleButtonClick('/job')}
                    style={{ padding: 0 }}
                  >
                    Create now
                  </Button>
                }
              />
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CvSample;
