import axios from 'axios';

const BASE_URL = 'http://localhost:8081';

export const getSelf = async () => {
  return await axios.get(`${BASE_URL}/self`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
