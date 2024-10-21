import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://jobeewepappapi20241008011108.azurewebsites.net/api/Job',
});

const getJobsList = async () => {
  return axiosInstance.get('/jobs');
};

const createJob = async (jobData) => {
  return axiosInstance.post('', jobData);
};

const updateJob = async (jobId, jobData) => {
  return axiosInstance.patch(`/jobs/${jobId}`, jobData);
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