import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

// Create an axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

// Fetch all customers
export const fetchCustomers = async () => {
  const response = await axiosInstance.get("/customers");
  return response.data;
};

// Fetch all vehicles
export const fetchVehicles = async () => {
  const response = await axiosInstance.get("/vehicles");
  return response.data;
};

// Fetch total customers count
export const fetchCustomersCount = async () => {
  const response = await axiosInstance.get("/customers/count");
  return response.data; // assuming it's just a number
};

// Fetch total vehicles count
export const fetchVehiclesCount = async () => {
  const response = await axiosInstance.get("/vehicles/count");
  return response.data; // assuming it's just a number
};
