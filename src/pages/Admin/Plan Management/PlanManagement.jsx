import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
  Popconfirm,
  Dropdown,
  Menu,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import planService from '@/services/planService';

const PlanManagement = () => {
  const [plans, setPlans] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const plansList = await planService.getPlansList();
      setPlans(plansList);
      message.success('Plans fetched successfully!');
    } catch (error) {
      console.error('Failed to fetch plans:', error);
      message.error('Failed to fetch plans. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddPlan = () => {
    setEditingPlan(null);
    setIsModalVisible(true);
  };

  const handleEditPlan = (plan) => {
    setEditingPlan(plan);
    setIsModalVisible(true);
    form.setFieldsValue({
      planId: plan.planId,
      planName: plan.planName,
      price: plan.price,
      duration: plan.duration,
    });
  };

  const handleDeletePlan = async (planId) => {
    try {
      await planService.deletePlan(planId);
      fetchPlans();
      message.success('Plan deleted successfully!');
    } catch (error) {
      console.error('Failed to delete plan:', error);
      message.error('Failed to delete plan. Please try again.');
    }
  };

  const handleFormSubmit = async (values) => {
    setConfirmLoading(true);
    try {
      if (editingPlan) {
        await planService.updatePlan(editingPlan.planId, values);
        message.success('Plan updated successfully!');
      } else {
        await planService.createPlan(values);
        message.success('Plan created successfully!');
      }
      fetchPlans();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Failed to submit form:', error);
      message.error('Failed to submit form. Please try again.');
    } finally {
      setConfirmLoading(false);
    }
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item
        key="edit"
        icon={<EditOutlined />}
        onClick={() => handleEditPlan(record)}
      >
        Edit
      </Menu.Item>
      <Menu.Item key="delete" icon={<DeleteOutlined />}>
        <Popconfirm
          title="Are you sure you want to delete this plan?"
          onConfirm={() => handleDeletePlan(record.planId)}
          okText="Yes"
          cancelText="No"
        >
          Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'Plan ID',
      dataIndex: 'planId',
      key: 'planId',
    },
    {
      title: 'Plan Name',
      dataIndex: 'planName',
      key: 'planName',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Dropdown overlay={menu(record)} trigger={['click']}>
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAddPlan}
        style={{ marginBottom: 16 }}
      >
        Add Plan
      </Button>
      <Table
        columns={columns}
        dataSource={plans}
        rowKey="planId"
        loading={loading}
      />

      <Modal
        title={editingPlan ? 'Edit Plan' : 'Add Plan'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        confirmLoading={confirmLoading}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item name="planId" label="Plan ID" hidden>
            <Input />
          </Form.Item>
          <Form.Item
            name="planName"
            label="Plan Name"
            rules={[{ required: true, message: 'Please enter the plan name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter the price' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="duration"
            label="Duration"
            rules={[{ required: true, message: 'Please enter the duration' }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PlanManagement;
