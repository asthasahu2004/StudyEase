import axios from "axios";

// ✅ Always send cookies with requests (for auth)
export const axiosInstance = axios.create({
  withCredentials: true,
});

export const apiConnector = (method, url, bodyData, headers, params) => {
  const config = {
    method,
    url,
    withCredentials: true, // optional here, already in axiosInstance
  };

  if (bodyData) config.data = bodyData;
  if (headers) config.headers = headers;
  if (params) config.params = params;

  return axiosInstance(config);
};
