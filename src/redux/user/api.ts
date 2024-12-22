import axios from 'axios';

const BASE_URL = 'http://localhost:8081';

export const getAll = async (page, size) => {
  return await axios.get(`${BASE_URL}`, {
    params: {
      page,
      size
    },
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const getSelf = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`, {
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
