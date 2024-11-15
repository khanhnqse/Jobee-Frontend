import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jobeeapi.azurewebsites.net/api',
});


axiosInstance.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const getJobsList = async () => {
  return axiosInstance.get('/jobs');
};

const createJob = async (jobData) => {
  return axiosInstance.post('/jobs', jobData);
};

const updateJob = async (jobId, jobData) => {
  return axiosInstance.put(`/jobs/${jobId}`, jobData);
};

const deleteJob = async (jobId) => {
  return axiosInstance.delete(`/jobs/delete/${jobId}`);
};

const jobService = {
  getJobsList,
  createJob,
  updateJob,
  deleteJob,
};

export default jobService;