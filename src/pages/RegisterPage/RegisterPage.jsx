import React, { useState } from 'react';
import { Button, Input, message, Spin, Form, Checkbox } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import axios from 'axios';
import logo from '../../assets/logo-removebg-preview.png';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://jobeeapi.azurewebsites.net/api/Account/signin',
        {
          email: values.email,
          passwordHash: values.password,
        }
      );
      message.success('Registration successful!');
      navigate('/login');
    } catch (error) {
      message.error('Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div
        className="bg-white shadow-lg rounded-lg flex overflow-hidden"
        style={{ width: '900px' }}
      >
        {/* Left section (Register form) */}
        <div className="w-2/3 p-10">
          <div className="text-left mb-8">
            <img src={logo} alt="Logo" className="h-12 mb-4" />
            <h2 className="text-3xl font-bold mb-2">Create Your Account</h2>
            <p className="text-gray-500">Register using social networks</p>
          </div>

          {/* Social register buttons */}
          <div className="flex space-x-4 mb-6">
            <Button
              icon={<GoogleOutlined />}
              className="w-full flex items-center justify-center rounded-full shadow-lg"
              style={{
                backgroundColor: '#a6382e',
                color: '#fff',
                border: 'none',
                fontSize: '16px',
              }}
            >
              Sign up with Google
            </Button>
          </div>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-2 text-gray-400">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Email, Password, and Confirm Password Input */}
          <Form
            name="register"
            layout="vertical"
            onFinish={handleRegister}
            className="space-y-4"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input
                placeholder="Email"
                size="large"
                className="p-2 rounded-md"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password
                placeholder="Password"
                size="large"
                className="p-2 rounded-md"
              />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('The two passwords do not match!')
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm Password"
                size="large"
                className="p-2 rounded-md"
              />
            </Form.Item>

            {/* Policies Checkbox */}
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error('You must agree to the policies!')
                        ),
                },
              ]}
            >
              <Checkbox>
                I agree to the <a href="/policy">policies</a>
              </Checkbox>
            </Form.Item>

            {/* Register Button */}
            <Form.Item>
              <Button
                type="primary"
                size="large"
                className="w-full mt-6 bg-gradient-to-r from-[#3B7B7A] to-teal-500"
                htmlType="submit"
                loading={loading}
              >
                {loading ? <Spin /> : 'Register'}
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Right section (Login prompt) */}
        <div className="w-1/3 bg-gradient-to-r from-[#3B7B7A] to-teal-500 p-10 text-white text-center flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-4">Already Have an Account?</h2>
          <p className="mb-6">
            Login and discover a great amount of new opportunities!
          </p>
          <Link to="/login">
            <Button
              type="ghost"
              size="large"
              className="bg-white text-teal-500 font-semibold rounded-full"
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
