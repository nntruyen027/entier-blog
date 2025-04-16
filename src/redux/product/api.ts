import axios from 'axios';

const BASE_URL = 'http://localhost:8085/products';

export const getAll = async (params) => {
  return await axios.get(`${BASE_URL}`, {
    params: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const getAllByAdmin = async (params) => {
  return await axios.get(`${BASE_URL}/admin`, {
    params: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const getOne = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const createOne = async (body) => {
  return await axios.post(`${BASE_URL}/admin`, JSON.stringify(body), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });
};

export const updateOne = async ({ id, body }) => {
  return await axios.put(`${BASE_URL}/admin/${id}`, JSON.stringify(body), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });
};

export const deleteOne = async (id) => {
  return await axios.delete(`${BASE_URL}/admin/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
