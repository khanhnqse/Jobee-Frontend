import React from 'react';
import { Row, Col, Button } from 'antd';
import ConfigAntdButton from '@/components/Button/ConfigAntdButton';

const Simulated = () => {
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
                filter: 'brightness(0.7)', // Dim the background image for better text contrast
              }}
              alt="Untitled design"
              src="./src/assets/untitled-design-10-1-1.png"
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(15, 17, 16, 0.8)', // Adjusted for better visibility
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
              fontSize: '3rem', // Responsive font size
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
              fontSize: '1.5rem', // Responsive font size
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
              fontSize: '3rem', // Responsive font size
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
                  transform: 'translateX(-50%)', // Center the button
                  backgroundColor: '#c94c4b',
                  borderRadius: '10px',
                  fontFamily: "'Poppins-Medium', Helvetica",
                  fontWeight: '500',
                  fontSize: '1.25rem', // Responsive font size
                  lineHeight: '36.5px',
                }}
              >
                Let’s go
              </Button>
            </ConfigAntdButton>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Simulated;
