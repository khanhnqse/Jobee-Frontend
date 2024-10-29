import axios from 'axios';


const jwtToken = localStorage.getItem('jwtToken');
const axiosInstance = axios.create({
  baseURL: 'https://jobeeapi.azurewebsites.net/api/Job',
  headers: {
    Authorization: `Bearer ${jwtToken}`,
  },
});

const getJobsList = async () => {
  return axiosInstance.get('/jobs');
};

const createJob = async (jobData) => {
  return axiosInstance.post('', jobData);
};

const updateJob = async (jobId, jobData) => {
  return axiosInstance.put(`/${jobId}`, jobData);
};

const deleteJob = async (jobId) => {
  return axiosInstance.delete(`/delete/${jobId}`);
};

const jobService = {
  getJobsList,
  createJob,
  updateJob,
  deleteJob,
};

export default jobService;