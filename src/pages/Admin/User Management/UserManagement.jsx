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
  Tag,
  Select,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import userService from '@/services/userService';
import moment from 'moment';
import { useAuth } from '@/context/AuthContext';

const { Option } = Select;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const { userRole } = useAuth(); // Get userRole from AuthContext
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [users, searchTerm, roleFilter]);

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
    } catch (error) {
      console.error('Failed to fetch users:', error);
      message.error('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchTerm) {
      filtered = filtered.filter((user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (roleFilter !== 'All') {
      filtered = filtered.filter((user) => user.role === roleFilter);
    }

    if (userRole === 'Employer') {
      filtered = filtered.filter((user) => user.role === 'JobSeeker');
    }

    setFilteredUsers(filtered);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleFilterChange = (value) => {
    setRoleFilter(value);
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
        email: values.email,
        passwordHash: values.passwordHash,
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

  const getRoleTag = (role) => {
    switch (role) {
      case 'Admin':
        return <Tag color="red">Admin</Tag>;
      case 'Employer':
        return <Tag color="blue">Employer</Tag>;
      case 'JobSeeker':
        return <Tag color="green">Job Seeker</Tag>;
      default:
        return <Tag>{role}</Tag>;
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: {
        compare: (a, b) => a.id - b.id,
      },
      defaultSortOrder: 'descend',
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
      render: (role) => getRoleTag(role),
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
      render: (dob) => (dob ? dob.format('DD-MM-YYYY') : 'N/A'),
    },
    // {
    //   title: 'Description',
    //   dataIndex: 'description',
    //   key: 'description',
    //   render: (description) =>
    //     description.length > 50
    //       ? `${description.slice(0, 50)}...`
    //       : description,
    // },
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
    // {
    //   title: 'Created At',
    //   dataIndex: 'createdAt',
    //   key: 'createdAt',
    // },
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
      <h1
        className="text-center text-2xl font-bold mb-6"
        style={{ color: '#3b7b7a' }}
      >
        User Management
      </h1>
      <Space style={{ marginBottom: 16 }}>
        <Input
          placeholder="Search by full name"
          value={searchTerm}
          onChange={handleSearch}
          style={{ width: 200 }}
        />
        <Select
          defaultValue="All"
          style={{ width: 200 }}
          onChange={handleRoleFilterChange}
        >
          <Option value="All">All</Option>
          <Option value="Admin">Admin</Option>
          <Option value="Employer">Employer</Option>
          <Option value="JobSeeker">Job Seeker</Option>
        </Select>
      </Space>
      {userRole === 'Admin' && (
        <Button
          className="ml-4"
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddUser}
          style={{ marginBottom: 16 }}
        >
          Add User
        </Button>
      )}
      <Table
        columns={columns}
        dataSource={filteredUsers}
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
          {!editingUser && (
            <>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please enter the email' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="passwordHash"
                label="Password"
                rules={[
                  { required: true, message: 'Please enter the password' },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </>
          )}
          {editingUser && (
            <>
              <Form.Item
                name="fullName"
                label="Full Name"
                rules={[
                  { required: true, message: 'Please enter the full name' },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[
                  { required: true, message: 'Please enter the address' },
                ]}
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
                rules={[
                  { required: true, message: 'Please enter the job title' },
                ]}
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
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
