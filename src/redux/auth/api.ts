import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

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

export const updatePassword = async ({ oldpass, newpass }) => {
  const formData = new FormData();
  formData.append('oldPassword', oldpass);
  formData.append('newPassword', newpass);
  return await axios.put(`${BASE_URL}/self/password`, formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};
