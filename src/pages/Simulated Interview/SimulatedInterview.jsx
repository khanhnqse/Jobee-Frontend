import React from 'react';
import { Row, Col, Button, message } from 'antd';
import ConfigAntdButton from '@/components/Button/ConfigAntdButton';
import simulateImage from '../../assets/untitled-design-10-1-1.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Simulated = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    if (isAuthenticated) {
      navigate(path);
    } else {
      message.warning('Please log in to access this feature.');
    }
  };

  return (
    <Row justify="center" style={{ backgroundColor: '#eae3c3', width: '100%' }}>
      <Col
        style={{
          backgroundColor: '#eae3c3',
          overflow: 'hidden',
          width: '100%',
        }}
      >
        <Row
          style={{
            position: 'relative',
            maxWidth: '1622px',
            margin: '0 auto',
            height: '670px',
          }}
        >
          <Col
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',
            }}
          >
            <img
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.7)',
              }}
              alt="Untitled design"
              src={simulateImage}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(15, 17, 16, 0.8)',
              }}
            />
          </Col>
          <Col
            style={{
              paddingTop: '100px',
              position: 'absolute',
              width: '100%',
              top: '25%',
              textAlign: 'center',
              color: 'white',
              fontFamily: "'Poppins-Medium', Helvetica",
              fontSize: '3rem',
              lineHeight: '1.2',
            }}
          >
            Simulated Interview
          </Col>
          <p
            style={{
              paddingTop: '100px',
              position: 'absolute',
              width: '100%',
              top: '35%',
              textAlign: 'center',
              color: 'white',
              fontFamily: "'Poppins-Light', Helvetica",
              fontWeight: '300',
              fontSize: '1.5rem',
              lineHeight: '1.5',
            }}
          >
            Power Up Your Interview Skills in a Flash!
          </p>

          <Col
            style={{
              paddingTop: '520px',
              position: 'absolute',
              width: '100%',
              top: '25%',
              textAlign: 'center',
              color: 'white',
              fontFamily: "'Poppins-Medium', Helvetica",
              fontSize: '3rem',
              lineHeight: '1.2',
            }}
          >
            <ConfigAntdButton>
              <Button
                type="primary"
                style={{
                  position: 'absolute',
                  width: '213px',
                  height: '59px',
                  top: '45%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: '#c94c4b',
                  borderRadius: '10px',
                  fontFamily: "'Poppins-Medium', Helvetica",
                  fontWeight: '500',
                  fontSize: '1.25rem',
                  lineHeight: '36.5px',
                }}
                onClick={() => handleButtonClick('/interview')}
              >
                Try now
              </Button>
            </ConfigAntdButton>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Simulated;
