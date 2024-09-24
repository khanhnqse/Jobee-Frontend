import React from 'react';
import { FaBell } from 'react-icons/fa';
import BgImage from '../../assets/bg.png';
import { motion } from 'framer-motion';
import { Button } from 'antd';

const bgStyle = {
  backgroundImage: `url(${BgImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

const Subscribe = () => {
  return (
    <section className="bg-[#f7f7f7] ">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        style={bgStyle}
        className="container py-24 md:py-48"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="flex flex-col justify-center"
        >
          <div className="text-center space-y-4 lg:max-w-[430px] mx-auto">
            <h1 className="text-[#3B7B7A] text-4xl font-bold !leading-snug">
              50K+ Resume are making from us
            </h1>
            <p>
              With a premium subscription, you’ll enjoy a range of exclusive
              benefits that are thoughtfully crafted to not only elevate your
              overall experience but also provide you with significant added
              value.
            </p>
            <Button
              style={{
                backgroundColor: '#c94c4b',
                borderColor: '#c94c4b',
                height: '50px',

                color: '#fff',
              }}
              className="primary-btn !mt-8 inline-flex items-center gap-4 group"
            >
              Subscribe Now
              <FaBell className="group-hover:animate-bounce group-hover:text-lg duration-200" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Subscribe;
