import axios from "axios";

// ✅ Always send cookies with requests (for auth)
export const axiosInstance = axios.create({
  withCredentials: true,
});

export const apiConnector = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
