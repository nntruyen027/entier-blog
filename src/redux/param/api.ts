import axios from 'axios';

const BASE_URL = 'http://localhost:3001/params';

export const getAll = async (params) => {
  return await axios.get(`${BASE_URL}`, {
    params: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const getParamByKey = async (key) => {
  const { data } = await axios.get(`${BASE_URL}/key/${key}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });

  return data;
};

export const createOne = async (body) => {
  return await axios.post(`${BASE_URL}`, JSON.stringify(body), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });
};

export const updateOne = async ({ _id, body }) => {
  return await axios.put(`${BASE_URL}/${_id}`, JSON.stringify(body), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });
};

export const deleteOne = async (_id) => {
  return await axios.delete(`${BASE_URL}/${_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
