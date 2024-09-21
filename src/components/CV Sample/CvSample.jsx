import React from 'react';
import { Card, Button } from 'antd';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CvSample = ({ samples }) => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4, // Display 4 cards at a time
    slidesToScroll: 1, // Scroll 1 card at a time
    swipeToSlide: true, // Enable swipe gestures
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set the autoplay speed to 3 seconds
    pauseOnHover: true, // Pause autoplay when hovering};
  };
  return (
    <div className="px-[16px] md:px-[173px] mt-10 pb-10">
      <p className="font-poppins font-semibold text-black text-[28px] text-center mb-8">
        CV Samples for Popular Positions
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
                  className="object-cover h-[200px] w-full rounded-t-[8px] transition-transform duration-300"
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
                  <span className="text-center text-sm text-gray-600">
                    Create now
                  </span>
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
