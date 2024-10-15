import React from 'react';
import { Row, Col, Card, Typography, Pagination } from 'antd';

const { Title } = Typography;

const TemplateSelection = ({
  currentTemplates,
  selectedLayout,
  handleLayoutChange,
  currentPage,
  templatesPerPage,
  totalTemplates,
  handlePageChange,
}) => (
  <>
    <Title level={4}>Change CV Template</Title>
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
      total={totalTemplates}
      onChange={handlePageChange}
      style={{ marginTop: '16px', textAlign: 'center' }}
    />
  </>
);

export default TemplateSelection;
