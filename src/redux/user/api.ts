import axios from 'axios';

const BASE_URL = 'http://localhost:8081';

export const getAll = async ({ page, size }) => {
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

export const getById = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const createOne = async (body) => {
  return await axios.post(`${BASE_URL}`, JSON.stringify(body), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });
};

export const updateOne = async ({ id, body }) => {
  return await axios.put(`${BASE_URL}/${id}`, JSON.stringify(body), {
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

export const assignRolesToUser = async ({ username, roles }) => {
  return await axios.post(`${'http://localhost:8080'}/${username}/roles`, JSON.stringify(roles), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });
};

export const resetPassword = async (id) => {
  const form = new FormData();
  form.append('newPassword', 'Congnghe@2024');
  form.append('oldPassword', 'Congnghe@2024');

  return await axios.put(`${'http://localhost:8080'}/${id}/password`, form, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};
