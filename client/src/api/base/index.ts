import axios from 'axios';
import { refreshToken } from '../auth';

export const baseApi = axios.create({
  baseURL:
    'https://aps-task-management-backend-kcyek8exb-sina-shafiee.vercel.app/api',
  withCredentials: true
});

baseApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalReq = error?.config;
    if (error?.response?.status === 403 && !originalReq?._retry) {
      originalReq._retry = true;

      // request for new access token
      try {
        const token = await refreshToken();
        baseApi.defaults.headers.common.Authorization = `Bearer ${token}`;
        return baseApi(originalReq);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);
