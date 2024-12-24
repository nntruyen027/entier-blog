import axios from 'axios';

const BASE_URL = 'http://localhost:8081';

export const getSelf = async () => {
  return await axios.get(`${BASE_URL}/self`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const updateAvatar = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return await axios.put(`${BASE_URL}/avatar`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const createSelf = async (body) => {
  return await axios.post(`${BASE_URL}/self`, JSON.stringify(body), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });
};

export const updateSelf = async (body) => {
  return await axios.put(`${BASE_URL}/self`, JSON.stringify(body), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });
};
