import { useEffect, useState } from 'react';
import { Row, Col, Button, Select, Card } from 'antd';
import SearchBar from '@/components/Search bar/Search-bar';
import ConfigAntdButton from '@/components/Button/ConfigAntdButton';
import CvList from '@/components/CV List/CvList';
import axios from 'axios';
import CvSample from '@/components/CV Sample/CvSample';
const { Option } = Select;

const Cv = () => {
  const api = 'https://66ed3226380821644cdbe120.mockapi.io/cv';
  const apiSample = 'https://66ed3226380821644cdbe120.mockapi.io/sample';
  const [samples, setSamples] = useState([]);
  const [cv, setCv] = useState([]);
  const fetchCv = async () => {
    const response = await axios.get(api);
    console.log(response.data);
    setCv(response.data);
  };

  const fetchSample = async () => {
    const response = await axios.get(apiSample);
    console.log(response.data);
    setSamples(response.data);
  };

  useEffect(() => {
    fetchCv();
    fetchSample();
  }, []);

  return (
    <div className="bg-[#eae3c3] flex justify-center w-full">
      <div className="bg-[#eae3c3] w-full relative">
        {/* Phần Header */}
        <div
          className="relative w-full h-[469px] bg-cover bg-center flex items-center"
          style={{
            backgroundImage:
              "url('./src/assets/brown-minimalist-work-planning-presentation-1-1.png')",
          }}
        >
          <div className="absolute inset-0 bg-[#0f1110cc]" />
          <div className="relative flex flex-col justify-center items-start px-[216px]">
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
                <Option value="Infomation Technology">
                  Infomation Technology
                </Option>
              </Select>
            </div>
          </div>
        </div>

        <SearchBar />

        {/* Phần CV list */}
        {/* Gọi component CvList và truyền dữ liệu */}
        <CvList data={cv} />

        {/* Phần quảng cáo */}
        <div className="mt-20 bg-[#0f1110cc] py-10">
          <div className="text-center text-white font-poppins font-medium text-[56px]">
            Advertising
          </div>
        </div>

        {/* Phần CV mẫu */}
        <CvSample samples={samples} />
        {/* <div className="px-[173px] mt-10 pb-10">
          <p className="font-poppins font-medium text-black text-[24px] text-center mb-8">
            CV sample for applying for popular positions
          </p>
          <Row gutter={[24, 24]} className="flex justify-center">
            {['Software engineer', 'Clerk', 'English teacher', 'Intern'].map(
              (title, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={
                      <img
                        alt={`image-${index + 18}`}
                        src={`image-${index + 18}.png`}
                      />
                    }
                    className="w-full h-[236px] rounded-[8px] shadow-lg"
                  >
                    <Card.Meta title={title} description="Create now" />
                  </Card>
                </Col>
              )
            )}
          </Row>
        </div> */}
      </div>
    </div>
  );
};

export default Cv;
