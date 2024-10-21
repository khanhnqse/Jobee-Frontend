import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  message,
  Dropdown,
  Menu,
  Popconfirm,
  DatePicker,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import userService from '@/services/userService';
import moment from 'moment';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersList = await userService.GetUsersList();
      const formattedUsers = usersList.map((user) => ({
        id: user.userId,
        fullName: user.fullName || 'N/A',
        email: user.email || 'N/A',
        role: user.role || 'N/A',
        address: user.address || 'N/A',
        dob: user.dob ? moment(user.dob) : null,
        description: user.description || 'N/A',
        jobTitle: user.jobTitle || 'N/A',
        phoneNumber: user.phoneNumber || 'N/A',
        profilePicture: user.profilePicture || 'N/A',
        createdAt: user.createdAt
          ? new Date(user.createdAt).toLocaleString()
          : 'N/A',
      }));
      setUsers(formattedUsers);
      message.success('Users fetched successfully!');
    } catch (error) {
      console.error('Failed to fetch users:', error);
      message.error('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalVisible(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...user,
      dob: user.dob ? moment(user.dob) : null,
    });
  };

  const handleDeleteUser = async (userId) => {
    try {
      await userService.DeleteUser(userId);
      fetchUsers();
      message.success('User deleted successfully!');
    } catch (error) {
      console.error('Failed to delete user:', error);
      message.error('Failed to delete user. Please try again.');
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      const updateData = {
        address: values.address,
        dob: values.dob ? values.dob.toISOString() : null,
        description: values.description,
        fullName: values.fullName,
        jobTitle: values.jobTitle,
        phoneNumber: values.phoneNumber,
        profilePicture: values.profilePicture,
      };

      if (editingUser) {
        await userService.UpdateUser(editingUser.id, updateData);
        message.success('User updated successfully!');
      } else {
        await userService.RegisterUser(updateData);
        message.success('User registered successfully!');
      }
      fetchUsers();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Failed to submit form:', error);
      message.error('Failed to submit form. Please try again.');
    }
  };

  const menu = (record) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => handleEditUser(record)}>
        <EditOutlined /> Edit
      </Menu.Item>
      <Menu.Item key="delete">
        <Popconfirm
          title="Are you sure you want to delete this user?"
          onConfirm={() => handleDeleteUser(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined /> Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Date of Birth',
      dataIndex: 'dob',
      key: 'dob',
      render: (dob) => (dob ? dob.format('YYYY-MM-DD') : 'N/A'),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Profile Picture',
      dataIndex: 'profilePicture',
      key: 'profilePicture',
      render: (profilePicture) =>
        profilePicture !== 'N' ? (
          <img
            src={profilePicture}
            alt="Profile"
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
        ) : (
          'N/A'
        ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
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
        onClick={handleAddUser}
        style={{ marginBottom: 16 }}
      >
        Add User
      </Button>
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingUser ? 'Edit User' : 'Add User'}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter the full name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="address"
            label="Address"
            rules={[{ required: true, message: 'Please enter the address' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dob"
            label="Date of Birth"
            rules={[
              { required: true, message: 'Please enter the date of birth' },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Please enter the description' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="jobTitle"
            label="Job Title"
            rules={[{ required: true, message: 'Please enter the job title' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Phone Number"
            rules={[
              { required: true, message: 'Please enter the phone number' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="profilePicture"
            label="Profile Picture"
            rules={[
              {
                required: true,
                message: 'Please enter the profile picture URL',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
