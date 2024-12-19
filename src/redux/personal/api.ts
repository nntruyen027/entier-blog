import axios from 'axios';

const BASE_URL = 'http://localhost:8081';

export const getSelf = async () => {
  return await axios.get(`${BASE_URL}/self`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const createSelf = async (body) => {
  return await axios.post(`${BASE_URL}/self`, JSON.stringify(body), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const updateSelf = async (body) => {
  return await axios.put(`${BASE_URL}/self`, JSON.stringify(body), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const createOne = async (body) => {
  return await axios.post(`${BASE_URL}`, JSON.stringify(body), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const updateOne = async (id: string, body) => {
  return await axios.put(`${BASE_URL}/${id}`, JSON.stringify(body), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const deleteOne = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
