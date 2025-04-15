import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080';

// Create an axios instance with the base URL and basic auth
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  auth: {
    username: 'admin',
    password: 'password'
  }
});

// Fetch all customers
export const fetchCustomers = async () => {
  const response = await axiosInstance.get("/customers");
  return response.data;
};

// Add a new customer
export const addCustomer = async (customerData) => {
  const response = await axiosInstance.post("/customers", customerData);
  return response.data;
};

// Fetch all vehicles
export const fetchVehicles = async () => {
  const response = await axiosInstance.get("/vehicles");
  return response.data;
};

// Add a new customer
export const addVehicle = async (vehicleData) => {
  const response = await axiosInstance.post("/vehicles", vehicleData);
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

// Fetch the latest repair along with its vehicle details
export const fetchLatestRepair = async () => {
  const response = await axiosInstance.get("/repairs/latest");
  return response.data;
};

// Fetch a specific customer by ID
export const fetchCustomerById = async (customerId) => {
  const response = await axiosInstance.get(`/customers/${customerId}`);
  return response.data;
};

// Fetch all vehicles for a specific customer
export const fetchVehiclesByCustomerId = async (customerId) => {
  const response = await axiosInstance.get(`/vehicles/customer/${customerId}`);
  return response.data;
};

// Fetch vehicle details by ID
export const fetchVehicleById = async (vehicleId) => {
  const response = await axiosInstance.get(`/vehicles/${vehicleId}`);
  return response.data;
};

// Fetch repairs for a vehicle by vehicleId
export const fetchRepairsByVehicleId = async (vehicleId) => {
  const response = await axiosInstance.get(`/repairs/vehicle/${vehicleId}`);
  return response.data;
};

// Add a repair to a vehicle (this is only add repair function that should be used)
export const addRepairToVehicle = async (vehicleId, repairData) => {
  const response = await axiosInstance.post(`/repairs/vehicle/${vehicleId}`, repairData);
  return response.data;
};

// Delete a repair by ID
export const removeRepair = async (repairId) => {
  await axiosInstance.delete(`/repairs/${repairId}`);
};