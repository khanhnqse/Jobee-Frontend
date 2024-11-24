import { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Button,
  Select,
  Card,
  Spin,
  Input,
  AutoComplete,
  message,
} from 'antd';
import SearchBar from '@/components/Search bar/Search-bar';
import ConfigAntdButton from '@/components/Button/ConfigAntdButton';
import CvList from '@/components/CV List/CvList';
import axios from 'axios';
import CvSample from '@/components/CV Sample/CvSample';
import hero from '../../assets/brown-minimalist-work-planning-presentation-1-1.png';
import { Link, useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { useAuth } from '@/context/AuthContext';

const { Option } = Select;

const Cv = () => {
  const api = 'https://66ed3226380821644cdbe120.mockapi.io/cv';
  const apiSample = 'https://66ed3226380821644cdbe120.mockapi.io/sample';
  const [samples, setSamples] = useState([]);
  const [cv, setCv] = useState([]);
  const [loadingCv, setLoadingCv] = useState(true);
  const [loadingSamples, setLoadingSamples] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const fetchCv = async () => {
    try {
      const response = await axios.get(api);
      setCv(response.data);
    } catch (error) {
      console.error('Error fetching CVs:', error);
    } finally {
      setLoadingCv(false);
    }
  };

  const fetchSample = async () => {
    try {
      const response = await axios.get(apiSample);
      setSamples(response.data);
    } catch (error) {
      console.error('Error fetching samples:', error);
    } finally {
      setLoadingSamples(false);
    }
  };

  useEffect(() => {
    fetchCv();
    fetchSample();
  }, []);

  const handleSearch = (value) => {
    setSearchQuery(value);
    const filteredSuggestions = cv
      .map((item) => item.title)
      .filter((title) => title.toLowerCase().includes(value.toLowerCase()));
    setSuggestions(filteredSuggestions);
  };

  const handleSelect = (value) => {
    setSearchQuery(value);
  };

  const handleButtonClick = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      message.warning('Please log in to access this feature.');
    }
  };

  const filteredCv = searchQuery
    ? cv.filter((item) =>
        item.title?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : cv;

  return (
    <div className="bg-[#eae3c3] flex justify-center w-full">
      <div className="bg-[#eae3c3] w-full relative">
        {/* Header Section */}
        <div className="relative w-full h-[469px] flex items-center">
          <img
            src={hero}
            alt="Header Background"
            className="absolute inset-0 object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-[#0f1110cc]" />
          <div className="relative flex flex-col justify-center items-start px-[216px] z-10">
            <p className="font-poppins font-medium text-white text-[48px] leading-[83px]">
              List of job application samples
            </p>
            <p className="mt-4 font-poppins font-light text-white text-[20px] leading-[29.2px]">
              Increase your chances of finding a job and create your CV with one
              of our professionally designed CV templates. Curious to find out
              how these templates can work for you? Scroll down and check out
              the different CV examples we've made to inspire you.
            </p>
            <div className="flex space-x-4 mt-6">
              <ConfigAntdButton>
                <Button
                  type="primary"
                  className="w-[245px] h-[72px] rounded-[12px]"
                  onClick={() => handleButtonClick('/cv-maker')}
                >
                  <span className="font-poppins font-medium text-[25px] leading-[36.5px] text-white">
                    Create your CV
                  </span>
                </Button>
              </ConfigAntdButton>
              <Select defaultValue="Language" className="w-[246px] h-[47px]">
                <Option value="Language">Language</Option>
                <Option value="English">English</Option>
                <Option value="Vietnamese">Vietnamese</Option>
              </Select>
              <Select defaultValue="All design" className="w-[254px] h-[47px]">
                <Option value="All design">All design</Option>
                <Option value="Marketing">Marketing</Option>
                <Option value="Information Technology">
                  Information Technology
                </Option>
              </Select>
            </div>
          </div>
        </div>

        <div className="px-[216px] mt-10">
          <AutoComplete
            options={suggestions.map((suggestion) => ({ value: suggestion }))}
            onSearch={handleSearch}
            onSelect={handleSelect}
            style={{ width: '100%' }}
          >
            <Input.Search
              placeholder="Search your CV"
              enterButton={
                <Button
                  type="primary"
                  style={{ backgroundColor: '#3b7b7a', borderColor: '#3b7b7b' }}
                >
                  <SearchOutlined />
                </Button>
              }
              size="large"
            />
          </AutoComplete>
        </div>

        {/* CV List Section */}
        <div
          className="mt-10 py-10"
          style={{
            background:
              'linear-gradient(to right, rgba(59, 123, 122, 0.8), rgba(234, 227, 195, 0.8))', // Transparent gradient background
          }}
        >
          {loadingCv ? (
            <div className="flex justify-center items-center my-10">
              <Spin size="large" />
            </div>
          ) : (
            <CvList data={filteredCv} />
          )}
        </div>

        {/* Advertising Section */}
        <div className="mt-20 bg-[#0f1110cc] py-10">
          <div className="text-center text-white font-poppins font-medium text-[56px]">
            Advertising
          </div>
        </div>

        {/* CV Samples Section */}
        {loadingSamples ? (
          <div className="flex justify-center items-center my-10">
            <Spin size="large" />
          </div>
        ) : (
          <CvSample samples={samples} />
        )}
      </div>
    </div>
  );
};

export default Cv;
