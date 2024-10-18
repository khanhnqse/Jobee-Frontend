import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jobeewepappapi20241008011108.azurewebsites.net/api/Account',
});

const GetUsersList = async () => {
  return axiosInstance.get('/users');
};

const RegisterUser = async (userData) => {
  return axiosInstance.post('/users', userData);
};

const UpdateUser = async (userId, userData) => {
  return axiosInstance.put(`/users/${userId}`, userData);
};

const DeleteUser = async (userId) => {
  return axiosInstance.delete(`/users/${userId}`);
};

const userService = {
  GetUsersList,
  RegisterUser,
  UpdateUser,
  DeleteUser,
};

export default userService;