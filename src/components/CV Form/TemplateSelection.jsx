import React from 'react';
import { Row, Col, Card, Pagination, Typography } from 'antd';

const CvTemplates = ({
  templates,
  selectedLayout,
  handleLayoutChange,
  currentPage,
  templatesPerPage,
  handlePageChange,
}) => {
  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = templates.slice(
    indexOfFirstTemplate,
    indexOfLastTemplate
  );

  return (
    <>
      <Typography.Title level={4}>Change CV Template</Typography.Title>
      <Row gutter={[16, 16]}>
        {currentTemplates.map((template) => (
          <Col span={24} key={template.id}>
            <Card
              hoverable
              onClick={() => handleLayoutChange(template.id)}
              cover={
                <img
                  alt={template.title}
                  src={template.imageUrl}
                  style={{
                    height: '250px',
                    objectFit: 'cover',
                    marginBottom: '-19px',
                  }}
                />
              }
              className={selectedLayout === template.id ? 'selected' : ''}
              style={{
                width: '100%',
                height: '280px',
                border:
                  selectedLayout === template.id ? '2px solid #1890ff' : 'none',
                borderRadius: '8px',
              }}
            >
              <Card.Meta title={template.title} />
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        pageSize={templatesPerPage}
        total={templates.length}
        onChange={handlePageChange}
        style={{ marginTop: '16px', textAlign: 'center' }}
      />
    </>
  );
};

export default CvTemplates;
