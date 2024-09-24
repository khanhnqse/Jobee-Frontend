import React from 'react';

import { IoIosArrowRoundForward } from 'react-icons/io';

import { animate, motion } from 'framer-motion';
import contact from '../../assets/contact.png';
import landing from '../../assets/landing.png';
import blob from '../../assets/blob.svg';
import bob from '../../assets/bob.png';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export const FadeUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: 'easeInOut',
      },
    },
  };
};

const Hero = () => {
  return (
    <section className="bg-black bg-opacity-85 overflow-hidden relative">
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px]">
        {/* Brand Info */}
        <div className="flex flex-col justify-center py-14 md:py-0 relative z-20">
          <div className="text-center md:text-left space-y-10 lg:max-w-[400px]">
            <motion.h1
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="text-3xl lg:text-5xl font-bold !leading-snug text-white"
            >
              Let's Learn to build a{' '}
              <span className="text-secondary">Resume</span> for your business
            </motion.h1>
            <motion.div
              variants={FadeUp(0.8)}
              initial="initial"
              animate="animate"
              className="flex justify-center md:justify-start"
            >
              <Button
                style={{
                  backgroundColor: '#c94c4b',
                  borderColor: '#c94c4b',
                  width: '120px',
                  height: '40px',
                  color: '#fff',
                }}
                className="primary-btn flex items-center gap-2 group"
              >
                <Link to="/">
                  Get Started
                  <IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
        {/* Hero Image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeInOut' }}
            src={bob}
            alt=""
            className="w-[400px] xl:w-[600px] relative z-10 drop-shadow"
          />
          <motion.img
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeInOut' }}
            src={blob}
            alt=""
            className="absolute -bottom-32 w-[800px] md:w-[1500px] z-[1] hidden md:block"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
