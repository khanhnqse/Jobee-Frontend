import React, { useState } from 'react';
import { Button, message, Card, Typography } from 'antd';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // Assuming you are using AuthContext for user info

const { Title, Paragraph } = Typography;

const GradeResume = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [responseBody, setResponseBody] = useState(null);
  const [isHtmlResponse, setIsHtmlResponse] = useState(false); // For checking if the response is HTML
  const { jwtToken } = useAuth(); // Assuming you have JWT token from context

  // Handles file upload
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      message.error('Please select a valid PDF file.');
    }
  };

  const handlePostFile = async () => {
    if (!file) {
      message.error('Please upload a PDF file.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('pdfFile', file); // Append the PDF file to the FormData object

    try {
      const response = await axios.post(
        'https://jobeewepappapi20241008011108.azurewebsites.net/api/Account/grade', // Update the API endpoint if necessary
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`, // Add token for authentication
            'Content-Type': 'multipart/form-data', // Specify content type for file upload
          },
        }
      );

      message.success('PDF file uploaded successfully!');
      setResponseBody(response.data);

      // Check if response is HTML or plain text
      setIsHtmlResponse(/<\/?[a-z][\s\S]*>/i.test(response.data)); // Simple check for HTML tags
    } catch (error) {
      message.error('Failed to upload PDF file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Function to format responseBody to display properly
  const formatResponseBody = (text) => {
    // Replace new lines and format markdown-like bold with HTML
    const formattedText = text
      .replace(/\n\n/g, '<br/><br/>') // Replace double newlines with paragraph breaks
      .replace(/\* \*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Replace * **text** with <strong>text</strong>

    return formattedText;
  };

  return (
    <div
      style={{
        padding: '30px',
        maxWidth: '600px',
        height: '600px',
        margin: '0 auto',
      }}
    >
      <h2>Upload PDF File</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ marginBottom: '20px' }}
      />

      <div style={{ textAlign: 'center' }}>
        <Button
          style={{
            backgroundColor: '#3b7b7a',
            borderColor: '#3b7b7a',
            color: 'white',
          }}
          type="primary"
          onClick={handlePostFile}
          loading={loading}
          disabled={!file}
        >
          {loading ? 'Please wait, Jobee is analyzing your CV' : 'Upload PDF'}
        </Button>
      </div>

      {responseBody && (
        <div style={{ marginTop: '30px' }}>
          <Card title="Jobee AI" bordered={false}>
            <Typography>
              <Title level={4}>This is the suggestion for you</Title>
              {/* Render based on whether the response is HTML or plain text */}
              {isHtmlResponse ? (
                <div
                  dangerouslySetInnerHTML={{
                    __html: formatResponseBody(responseBody),
                  }}
                />
              ) : (
                <Paragraph>{responseBody}</Paragraph> // Regular text rendering
              )}
            </Typography>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GradeResume;
