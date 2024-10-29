import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jobeeapi.azurewebsites.net/api/Account',
});

const GetUsersList = async () => {
  const response = await axiosInstance.get('/user');
  if (response.data.isSuccess) {
    return response.data.results;
  } else {
    throw new Error(response.data.message || 'Failed to fetch users');
  }
};

const RegisterUser = async (userData) => {
  const response = await axiosInstance.post('/user', userData);
  if (response.data.isSuccess) {
    return response.data.result;
  } else {
    throw new Error(response.data.message || 'Failed to register user');
  }
};

const UpdateUser = async (userId, userData) => {
  const response = await axiosInstance.put(`/${userId}`, userData);
  if (response.data.isSuccess) {
    return response.data.result;
  } else {
    throw new Error(response.data.message || 'Failed to update user');
  }
};

const DeleteUser = async (userId) => {
  const response = await axiosInstance.delete(`/user/${userId}`);
  if (response.data.isSuccess) {
    return response.data.result;
  } else {
    throw new Error(response.data.message || 'Failed to delete user');
  }
};

const userService = {
  GetUsersList,
  RegisterUser,
  UpdateUser,
  DeleteUser,
};

export default userService;