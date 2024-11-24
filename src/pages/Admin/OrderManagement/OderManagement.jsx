import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Typography,
  message,
  Spin,
  Tag,
  Descriptions,
} from 'antd';
import axios from 'axios';
import moment from 'moment';

const { Title, Paragraph } = Typography;

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://jobeeapi.azurewebsites.net/api/order'
      );
      console.log('Response data:', response.data); // Log the response data
      if (response.data.isSuccess && Array.isArray(response.data.results)) {
        setOrders(response.data.results);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      message.error('Failed to fetch orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const renderStatusTag = (status) => {
    let color;
    switch (status) {
      case 'PAID':
        color = 'green';
        break;
      case 'PENDING':
        color = 'orange';
        break;
      case 'FAILED':
        color = 'red';
        break;
      default:
        color = 'blue';
    }
    return <Tag color={color}>{status}</Tag>;
  };

  const columns = [
    {
      title: 'Payment ID',
      dataIndex: 'paymentId',
      key: 'paymentId',
      sorter: (a, b) => a.paymentId - b.paymentId,
      defaultSortOrder: 'descend',
    },
    {
      title: 'User ID',
      dataIndex: ['user', 'userId'],
      key: 'userId',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `${amount.toLocaleString('vi-VN')} VND`,
    },
    {
      title: 'Payment Date',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (paymentDate) =>
        moment(paymentDate).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderStatusTag(status),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button onClick={() => handleViewDetails(record)}>View Details</Button>
      ),
    },
  ];

  return (
    <div>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Order Management
      </Title>
      {loading ? (
        <div className="flex justify-center items-center my-10">
          <Spin size="large" />
        </div>
      ) : (
        <Table columns={columns} dataSource={orders} rowKey="paymentId" />
      )}

      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Close
          </Button>,
        ]}
      >
        {selectedOrder && (
          <div>
            <Title level={4}>Order Information</Title>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Payment ID">
                {selectedOrder.paymentId}
              </Descriptions.Item>
              <Descriptions.Item label="Amount">{`${selectedOrder.amount.toLocaleString(
                'vi-VN'
              )} VND`}</Descriptions.Item>
              <Descriptions.Item label="Payment Date">
                {moment(selectedOrder.paymentDate).format(
                  'YYYY-MM-DD HH:mm:ss'
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Payment Method">
                {selectedOrder.paymentMethod}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {renderStatusTag(selectedOrder.status)}
              </Descriptions.Item>
            </Descriptions>

            <Title level={4} style={{ marginTop: '20px' }}>
              User Information
            </Title>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="User ID">
                {selectedOrder.user.userId}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedOrder.user.email}
              </Descriptions.Item>
              <Descriptions.Item label="Role">
                {selectedOrder.user.role}
              </Descriptions.Item>
              <Descriptions.Item label="Full Name">
                {selectedOrder.user.fullName || 'none'}
              </Descriptions.Item>
              <Descriptions.Item label="Job Title">
                {selectedOrder.user.jobTitle || 'none'}
              </Descriptions.Item>
              <Descriptions.Item label="Phone Number">
                {selectedOrder.user.phoneNumber || 'none'}
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                {selectedOrder.user.address || 'none'}
              </Descriptions.Item>
              <Descriptions.Item label="Date of Birth">
                {moment(selectedOrder.user.dob).format('YYYY-MM-DD')}
              </Descriptions.Item>
              <Descriptions.Item label="Profile Picture">
                <img
                  src={selectedOrder.user.profilePicture || 'none'}
                  alt="Profile"
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                  }}
                />
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default OrderManagement;
