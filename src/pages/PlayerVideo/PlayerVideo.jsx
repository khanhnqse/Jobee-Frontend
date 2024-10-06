import React, { useState } from 'react';
import { Card, Typography } from 'antd';
import ReactPlayer from 'react-player';
import RecommendedSection from '@/components/RecommendedSection/RecommendedSection';

const VideoPlayerPage = () => {
  // Sample data for recommended videos
  const recommendedVideos = [
    {
      id: 1,
      title:
        'Interview Ready in Minutes: Relax & Refine Your Accent While You Wait!',
      thumbnail: 'https://img.youtube.com/vi/Tt08KmFfIYQ/sddefault.jpg',
      url: 'https://www.youtube.com/watch?v=Tt08KmFfIYQ&ab_channel=JeffSu',
      description:
        'In this video, learn how to prepare for an interview quickly and efficiently while maintaining a calm, composed attitude.',
    },
    {
      id: 2,
      title:
        'Take Charge of Your Interview: 5 Techniques to Get the Info You Need',
      thumbnail: 'https://img.youtube.com/vi/7apj4sVvbro/sddefault.jpg',
      url: 'https://www.youtube.com/watch?v=7apj4sVvbro&ab_channel=AdviceWithErin',
      description:
        'Discover five essential techniques that will help you stay in control during interviews and extract valuable information from your interviewers.',
    },
    {
      id: 3,
      title: 'CV Writing: A Complete Guide PLUS CV Writing with ChatGPT',
      thumbnail: 'https://img.youtube.com/vi/aArb68OBFPg/sddefault.jpg',
      url: 'https://www.youtube.com/watch?v=aArb68OBFPg&ab_channel=Valeria-MindTheGrad',
      description:
        'A step-by-step guide to writing an outstanding CV, including tips on how to use AI tools like ChatGPT for writing assistance.',
    },
    {
      id: 4,
      title: 'How to Write a Resume: The Complete Guide',
      thumbnail: 'https://img.youtube.com/vi/8YX7o1PBoFk/sddefault.jpg',
      url: 'https://www.youtube.com/watch?v=8YX7o1PBoFk&ab_channel=TheFutur',
      description:
        'Learn how to craft a compelling resume that will make you stand out to potential employers.',
    },
    {
      id: 5,
      title: 'How to Ace a Job Interview: 10 Crucial Tips',
      thumbnail: 'https://img.youtube.com/vi/2GQMd7jJgZM/sddefault.jpg',
      url: 'https://www.youtube.com/watch?v=2GQMd7jJgZM&ab_channel=TheFutur',
      description:
        'Ten essential tips to help you prepare for and succeed in your next job interview.',
    },
    {
      id: 6,
      title: 'How to Write a Great Cover Letter: 5 Key Tips',
      thumbnail: 'https://img.youtube.com/vi/4IgZ8k6v7eY/sddefault.jpg',
      url: 'https://www.youtube.com/watch?v=4IgZ8k6v7eY&ab_channel=TheFutur',
      description:
        'Learn how to write a compelling cover letter that will make a strong impression on potential employers',
    },
    {
      id: 7,
      title: 'How to Write a CV (Curriculum Vitae) in 2021 [31+ Examples]',
      thumbnail: 'https://img.youtube.com/vi/3vZ1v7b1QKo/sddefault.jpg',
      url: 'https://www.youtube.com/watch?v=3vZ1v7b1QKo&ab_channel=TheFutur',
      description:
        'A comprehensive guide to writing a CV that will help you land your dream job.',
    },
    {
      id: 8,
      title:
        'How to Write a Cover Letter: 10+ Examples, Tips & Templates to Use',
      thumbnail: 'https://img.youtube.com/vi/4IgZ8k6v7eY/sddefault.jpg',
      url: 'https://www.youtube.com/watch?v=4IgZ8k6v7eY&ab_channel=TheFutur',
      description:
        'Learn how to write a cover letter that will help you stand out from the competition.',
    },
    {
      id: 9,
      title: 'How to Write a Resume: The Complete Guide',
      thumbnail: 'https://img.youtube.com/vi/8YX7o1PBoFk/sddefault.jpg',
      url: 'https://www.youtube.com/watch?v=8YX7o1PBoFk&ab_channel=TheFutur',
      description:
        'Learn how to craft a compelling resume that will make you stand out to potential employers.',
    },
    {
      id: 10,
      title: 'How to Write a CV (Curriculum Vitae) in 2021 [31+ Examples]',
      thumbnail: 'https://img.youtube.com/vi/3vZ1v7b1QKo/sddefault.jpg',
      url: 'https://www.youtube.com/watch?v=3vZ1v7b1QKo&ab_channel=TheFutur',
      description:
        'A comprehensive guide to writing a CV that will help you land your dream job.',
    },
  ];

  // State to track the current video URL and description
  const [currentVideo, setCurrentVideo] = useState(recommendedVideos[0]);

  // Function to update the current video and scroll to the top of the video player
  const handleSelectVideo = (video) => {
    setCurrentVideo(video);

    // Scroll to the top of the page or video section
    window.scrollTo({
      top: 0, // Adjust this value if you want to scroll to a specific point
      behavior: 'smooth', // Smooth scrolling
    });
  };

  return (
    <div className="bg-[#EAE3C3] min-h-screen p-8">
      {/* Video Section */}
      <div className="relative w-full bg-gray-800 p-8 rounded-lg mb-8">
        {/* YouTube Player */}
        <div className="flex justify-center">
          <ReactPlayer
            url={currentVideo.url} // Play the selected video
            controls
            className="rounded-lg overflow-hidden"
            width="100%"
            height="650px"
          />
        </div>
      </div>

      {/* Video Description */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{currentVideo.title}</h2>
        <p className="text-gray-700 mb-6">{currentVideo.description}</p>
      </div>

      {/* Recommended Section */}
      <Typography.Title level={2} className="mt-8">
        Recommended Videos
      </Typography.Title>
      <RecommendedSection
        videos={recommendedVideos}
        onSelectVideo={handleSelectVideo}
      />
    </div>
  );
};

export default VideoPlayerPage;
