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
import { useAuth } from '../../context/AuthContext';

const { Title, Paragraph } = Typography;

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { userId, jwtToken } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jobeeapi.azurewebsites.net/api/order/userid/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
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
      <Title
        level={2}
        style={{ textAlign: 'center', marginBottom: '20px', padding: '50px' }}
      >
        My Orders
      </Title>
      {loading ? (
        <div className="flex justify-center items-center my-10">
          <Spin size="large" />
        </div>
      ) : (
        <Table
          className="pb-52"
          columns={columns}
          dataSource={orders}
          rowKey="paymentId"
        />
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
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyOrder;
