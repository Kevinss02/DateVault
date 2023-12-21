import axios from 'axios';

import { API } from '../config';

const api = axios.create({
  baseURL: API,
  withCredentials: true,
});

export default api;
