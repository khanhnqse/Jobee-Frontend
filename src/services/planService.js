import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jobeeapi.azurewebsites.net/api/subcription-plan',
});

const getPlansList = async () => {
  const response = await axiosInstance.get();
  if (response.data.isSuccess) {
    return response.data.results;
  } else {
    throw new Error(response.data.message || 'Failed to fetch plans');
  }
};

const createPlan = async (planData) => {
  const response = await axiosInstance.post('', planData);
  if (response.data.isSuccess) {
    return response.data.result;
  } else {
    throw new Error(response.data.message || 'Failed to create plan');
  }
};

const updatePlan = async (planId, planData) => {
  const response = await axiosInstance.patch(`/update/${planId}`, { planId, ...planData });
  if (response.data.isSuccess) {
    return response.data.result;
  } else {
    throw new Error(response.data.message || 'Failed to update plan');
  }
};

const deletePlan = async (planId) => {
  const response = await axiosInstance.delete(`/delete/${planId}`);
  if (response.data.isSuccess) {
    return response.data.result;
  } else {
    throw new Error(response.data.message || 'Failed to delete plan');
  }
};

const planService = {
  getPlansList,
  createPlan,
  updatePlan,
  deletePlan,
};

export default planService;