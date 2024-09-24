import Paragraph from 'antd/es/skeleton/Paragraph';
import review1 from '../../assets/review1.png';
import review2 from '../../assets/review2.png';
import review3 from '../../assets/review3.png';
import stars from '../../assets/star.png';
import user from '../../assets/user.png';
import { Rate, Typography } from 'antd';

const Reviews = () => {
  const reviews = [
    {
      user: 'John Doe',
      image: review1,
      title: 'Software Engineer',
      text: 'Thanks to this platform, creating a professional resume was quick and easy. It helped me land my dream job!',
      rating: 5,
    },
    {
      user: 'Sarah Johnson',
      image: review2,
      title: 'Marketing Specialist',
      text: 'I was able to design a visually appealing resume in minutes. The templates are modern and customizable.',
      rating: 4.5,
    },
    {
      user: 'Emily Smith',
      image: review3,
      title: 'Graphic Designer',
      text: 'This system made resume-building so simple. I loved the creative templates that showcased my skills perfectly.',
      rating: 4,
    },
  ];

  return (
    <div className="bg-black bg-opacity-85 flex w-full flex-col items-center pb-[10%] pt-[64px]">
      {/* Testimonials Header */}
      <div className="flex flex-col items-center gap-2 text-center">
        <Typography className="font-medium text-white text-[18px] uppercase">
          Testimonials
        </Typography>
        <Typography className="font-bold text-[#3B7B7A] text-[42px]">
          What Our Clients Say
        </Typography>
      </div>

      {/* Reviews Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-[60px] px-4 md:px-[130px]">
        {reviews.map((review) => (
          <div
            className="relative bg-white shadow-lg rounded-xl p-6 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            key={review.title}
          >
            {/* Review Image */}
            <img
              src={review.image}
              alt={review.title}
              className="md:w-fit w-full h-auto rounded-xl transition-transform duration-300 hover:scale-110"
            />

            {/* Review Card */}
            <div className="bg-white absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-4/5 p-6 rounded-xl shadow-md">
              <div className="absolute bg-white rounded-full w-[66px] h-[66px] top-[-25px] left-1/2 transform -translate-x-1/2 grid place-items-center shadow">
                <img
                  src={user}
                  alt="user"
                  className="md:w-full w-full object-cover rounded-full"
                />
              </div>
              <div className="mt-8 flex flex-col items-center">
                <span className="font-bold text-[#1E1E1E] text-[18px] transition-colors duration-300 hover:text-[#3B7B7A]">
                  {review.user}
                </span>
                <span className="text-[#1E1E1E] text-[14px] mb-2 font-semibold">
                  {review.title}
                </span>
                <span className="text-center text-[#1E1E1E] text-[14px] mb-4">
                  {review.text}
                </span>
                <Rate
                  disabled
                  defaultValue={review.rating}
                  character={
                    <img src={stars} alt="stars" className="w-4 h-4" />
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
