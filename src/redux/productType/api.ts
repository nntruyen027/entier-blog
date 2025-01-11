import axios from 'axios';

const BASE_URL = 'http://localhost:8082/product-types';

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

export const createOne = async ({ name, description, icon, image }) => {
  const form = new FormData();
  form.append('name', name);
  form.append('description', description);
  form.append('icon', icon);
  form.append('image', image);
  return await axios.post(`${BASE_URL}`, form, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const updateOne = async ({ id, name, description, icon, image }) => {
  const form = new FormData();
  form.append('name', name);
  form.append('description', description);
  form.append('icon', icon);
  form.append('image', image);
  return await axios.put(`${BASE_URL}/${id}`, form, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data'
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
