import axios from 'axios';

const API_URL = 'https://jobeeapi.azurewebsites.net/api/applications';

const getApplications = async () => {
  const response = await axios.get(API_URL);
  return response.data.results; 
};

const updateApplication = async (applicationId, applicationData) => {
  const response = await axios.put(`${API_URL}/${applicationId}`, applicationData);
  return response.data;
};

const deleteApplication = async (applicationId) => {
  const response = await axios.delete(`${API_URL}/${applicationId}`);
  return response.data;
};

const applicationService = {
  getApplications,
  updateApplication,
  deleteApplication,
};

export default applicationService;