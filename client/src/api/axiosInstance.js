import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken")) || "";
    console.log("Access token from sessionStorage:", accessToken);

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log("Added Authorization header:", config.headers.Authorization);
    } else {
      console.warn("No access token found in sessionStorage");
    }

    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosInstance;
