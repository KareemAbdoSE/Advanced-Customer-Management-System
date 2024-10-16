// API service functions for interacting with the backend
import axios from 'axios';

// Get authorization headers with JWT token
const getAuthConfig = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
});

// Fetch all customers
export const getCustomers = async () => {
    return await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`,
        getAuthConfig()
    );
};

// Save a new customer
export const saveCustomer = async (customer) => {
    return await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers`,
        customer
    );
};

// Update an existing customer
export const updateCustomer = async (id, update) => {
    return await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}`,
        update,
        getAuthConfig()
    );
};

// Delete a customer
export const deleteCustomer = async (id) => {
    return await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/customers/${id}`,
        getAuthConfig()
    );
};

// Login function to authenticate user
export const login = async (usernameAndPassword) => {
    return await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/login`,
        usernameAndPassword
    );
};
