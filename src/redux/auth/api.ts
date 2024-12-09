import axios from 'axios';

const BASE_URL = 'http://localhost:8080/auth';

export const login = async ({ username, password }) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  return await axios.post(`${BASE_URL}/login`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data' // Xác định kiểu dữ liệu là FormData
    }
  });
};

export const getSelf = async () => {
  return await axios.get(`${BASE_URL}/self`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
