import axios from "axios";

// Create axios instance with default credentials
const axiosInstance = axios.create({
  withCredentials: true,
});

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("✓ API Response:", response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error(
      "❌ API Error:",
      error.response?.status,
      error.config?.url,
      error.response?.data?.message,
    );
    return Promise.reject(error);
  },
);

// Add request interceptor to log outgoing requests
axiosInstance.interceptors.request.use(
  (config) => {
    console.log("→ API Request:", config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
