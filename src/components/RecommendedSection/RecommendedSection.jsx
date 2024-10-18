import React from 'react';
import { Card } from 'antd';
import Slider from 'react-slick/lib/slider';

const RecommendedSection = ({ videos, onSelectVideo }) => {
  const sliderSettings = {
    dots: false, // Show navigation dots
    infinite: true, // Infinite looping
    speed: 500,
    slidesToShow: 3, // Show 3 videos at a time
    slidesToScroll: 1, // Scroll one video at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 2000, // Set the autoplay speed to 3 seconds
    pauseOnHover: true, // Pause autoplay when hovering};
    swipeToSlide: true, // Enable swipe gestures
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Show 2 videos on medium screens
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Show 1 video on small screens
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-8">
      <Slider {...sliderSettings}>
        {videos.map((video) => (
          <div key={video.id} className="p-2">
            {' '}
            {/* Add padding for spacing */}
            <Card
              hoverable
              className="rounded-lg"
              cover={<img alt={video.title} src={video.thumbnail} />}
              onClick={() => onSelectVideo(video)}
            >
              <Card.Meta title={video.title} />
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RecommendedSection;
