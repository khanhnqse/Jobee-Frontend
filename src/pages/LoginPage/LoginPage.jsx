import React from 'react';
import { Button, Input } from 'antd';
import {
  FacebookOutlined,
  GoogleOutlined,
  LinkedinOutlined,
} from '@ant-design/icons';
import logo from '../../assets/logo-removebg-preview.png';
import { Link } from 'react-router-dom';
const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="bg-white shadow-lg rounded-lg flex overflow-hidden"
        style={{ width: '900px' }}
      >
        {/* Left section (Login form) */}
        <div className="w-2/3 p-10">
          <div className="text-left mb-8">
            <img src={logo} alt="Logo" className="h-12 mb-4" />{' '}
            {/* Replace with your logo */}
            <h2 className="text-3xl font-bold mb-2">Login to Your Account</h2>
            <p className="text-gray-500">Login using social networks</p>
          </div>

          {/* Social login buttons */}
          <div className="flex space-x-4 mb-6">
            <Button
              icon={<FacebookOutlined />}
              className="w-1/3 flex items-center justify-center"
              style={{ backgroundColor: '#3b5998', color: '#fff' }}
            >
              Facebook
            </Button>
            <Button
              icon={<GoogleOutlined />}
              className="w-1/3 flex items-center justify-center"
              style={{ backgroundColor: '#db4437', color: '#fff' }}
            >
              Google
            </Button>
            <Button
              icon={<LinkedinOutlined />}
              className="w-1/3 flex items-center justify-center"
              style={{ backgroundColor: '#0077b5', color: '#fff' }}
            >
              LinkedIn
            </Button>
          </div>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-400">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Email and Password Input */}
          <div className="space-y-4">
            <Input
              placeholder="Email"
              size="large"
              className="p-2 rounded-md"
            />
            <Input.Password
              placeholder="Password"
              size="large"
              className="p-2 rounded-md"
            />
          </div>

          {/* Sign In Button */}
          <Link to="/landing-page">
            <Button
              type="primary"
              size="large"
              className="w-full mt-6"
              style={{ backgroundColor: '#2BB673', borderColor: '#2BB673' }}
            >
              Sign In
            </Button>
          </Link>
          {/* Forgot Password */}
        </div>

        {/* Right section (Sign up prompt) */}
        <div className="w-1/3 bg-gradient-to-r from-green-400 to-teal-500 p-10 text-white text-center flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">New Here?</h2>
          <p className="mb-6">
            Sign up and discover a great amount of new opportunities!
          </p>
          <Button
            type="ghost"
            size="large"
            className="bg-white text-green-500 font-semibold"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
