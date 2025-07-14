import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.tareequlshifa.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});
