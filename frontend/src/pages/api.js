import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

// Create an axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchCustomers = async () => {
  const response = await axiosInstance.get('/customers');
  return response.data;
};

export const fetchVehicles = async () => {
  const response = await axiosInstance.get('/vehicles');
  return response.data;
};
