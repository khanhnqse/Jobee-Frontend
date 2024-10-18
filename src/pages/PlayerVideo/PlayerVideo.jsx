import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { Spin, Typography } from 'antd';
import ReactPlayer from 'react-player';
import RecommendedSection from '@/components/RecommendedSection/RecommendedSection';
import axios from 'axios';

const VideoPlayerPage = () => {
  const location = useLocation(); // Get location object from router
  const { video } = location.state || {}; // Get video data from location state

  // Sample recommended videos (could be passed as props or fetched from API)
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
      thumbnail: 'https://img.youtube.com/vi/MfyvABzuhbA/sddefault.jpg',
      url: 'https://www.youtube.com/watch?v=MfyvABzuhbA&t=351s&ab_channel=CVGenius',
      description:
        'Ten essential tips to help you prepare for and succeed in your next job interview.',
    },
    {
      id: 6,
      title: 'How to Write a Great Cover Letter: 5 Key Tips',
      thumbnail: 'https://img.youtube.com/vi/Lk5ju74lG7Y/sddefault.jpg',
      url: 'https://www.youtube.com/watch?v=Lk5ju74lG7Y&ab_channel=ResumeGenius',
      description:
        'Learn how to write a compelling cover letter that will make a strong impression on potential employers',
    },
    {
      id: 7,
      title: 'How to Write a CV (Curriculum Vitae) in 2021 [31+ Examples]',
      thumbnail: 'https://img.youtube.com/vi/3agP4x8LYFM/sddefault.jpg',
      url: 'https://www.youtube.com/watch?v=3agP4x8LYFM&ab_channel=CareerVidz',
      description:
        'A comprehensive guide to writing a CV that will help you land your dream job.',
    },
    {
      id: 8,
      title:
        'How to Write a Cover Letter: 10+ Examples, Tips & Templates to Use',
      thumbnail: 'https://img.youtube.com/vi/u75hUSShvnc/sddefault.jpg',
      url: 'https://www.youtube.com/watch?v=u75hUSShvnc&ab_channel=ThomasFrank',
      description:
        'Learn how to write a cover letter that will help you stand out from the competition.',
    },
    {
      id: 9,
      title: 'How to Write a Resume: The Complete Guide',
      thumbnail: 'https://img.youtube.com/vi/NUhDP30IRKk/sddefault.jpg',
      url: 'https://www.youtube.com/watch?v=NUhDP30IRKk&ab_channel=JeffSu',
      description:
        'Learn how to craft a compelling resume that will make you stand out to potential employers.',
    },
    {
      id: 10,
      title: 'How to Write a CV (Curriculum Vitae) in 2021 [31+ Examples]',
      thumbnail: 'https://img.youtube.com/vi/udC8gCBTsxs/sddefault.jpg',
      url: 'https://www.youtube.com/watch?v=udC8gCBTsxs&ab_channel=Ren%C3%A9Delescen',
      description:
        'A comprehensive guide to writing a CV that will help you land your dream job.',
    },
  ];
  const apiVideo = 'https://66ee8e6d3ed5bb4d0bf14a30.mockapi.io/video';
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
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

  // State to track the current video URL and description
  const [currentVideo, setCurrentVideo] = useState(video || videos[0]);

  const handleSelectVideo = (selectedVideo) => {
    setCurrentVideo(selectedVideo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#EAE3C3] min-h-screen p-8">
      <div className="relative w-full bg-gray-800 p-8 rounded-lg mb-8">
        <div className="flex justify-center">
          <ReactPlayer
            url={currentVideo.url}
            controls
            className="rounded-lg overflow-hidden"
            width="100%"
            height="650px"
          />
        </div>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{currentVideo.title}</h2>
        <p className="text-gray-700 mb-6">{currentVideo.description}</p>
      </div>

      <Typography.Title level={2} className="mt-8">
        Recommended Videos
      </Typography.Title>
      {loading ? (
        <div className="flex justify-center items-center my-10">
          <Spin size="large" />
        </div>
      ) : (
        <RecommendedSection videos={videos} onSelectVideo={handleSelectVideo} />
      )}
    </div>
  );
};

export default VideoPlayerPage;
