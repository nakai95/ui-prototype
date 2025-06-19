import axios from 'axios';

import { NetworkException, WebApiException } from '@/domain/errors';

import type { AxiosError } from 'axios';

// Base URL設定 - 環境変数から取得、デフォルトは開発用
axios.defaults.baseURL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
axios.defaults.paramsSerializer = { indexes: null };

axios.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config;
});

axios.interceptors.response.use(null, (error: AxiosError) => {
  if (error.response) {
    throw new WebApiException(
      error.response.status,
      error.response.statusText,
      error.response.data
    );
  } else {
    throw new NetworkException(error.message);
  }
});

export default axios;
