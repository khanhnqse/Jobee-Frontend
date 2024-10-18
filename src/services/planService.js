import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jobeewepappapi20241008011108.azurewebsites.net/api/SubscriptionPlan',
});

const getPlansList = async () => {
  return axiosInstance.get('/plans');
};

const createPlan = async (planData) => {
  return axiosInstance.post('/create', planData);
};

const updatePlan = async (planId, planData) => {
  return axiosInstance.patch(`/update`, planData);
};

const deletePlan = async (planId) => {
  return axiosInstance.delete(`/delete/${planId}`);
};

const planService = {
  getPlansList,
  createPlan,
  updatePlan,
  deletePlan,
};

export default planService;