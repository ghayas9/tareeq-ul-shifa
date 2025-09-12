import axios from 'axios';

export const api = axios.create({
  // baseURL: 'http://localhost:4000/api/v1',
  baseURL: 'https://api.tareequlshifa.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10 * 60 * 1000, // 10 minutes in milliseconds
});
