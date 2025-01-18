import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_PRODUCT_SERVICE}/brands`;

export const getAll = async ({ size, page }) => {
  return await axios.get(BASE_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    params: {
      size,
      page
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

export const createOne = async ({ name, description, image }) => {
  return await axios.post(`${BASE_URL}`, JSON.stringify({ name, description, image }), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });
};

export const updateOne = async ({ id, name, description, image }) => {
  return await axios.put(`${BASE_URL}/${id}`, JSON.stringify({ name, description, image }), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
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
