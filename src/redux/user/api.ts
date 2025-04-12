import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export const createUser = async (user) => {
  return await axios.post(`${BASE_URL}/register`, user, {
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
export const getAll = async (params) => {
  return await axios.get(`${BASE_URL}/users`, {
    params: params,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const updateOne = async ({ id, user }) => {
  return await axios.put(`${BASE_URL}/${id}`, user, {
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

export const assignRolesToUser = async ({ username, roles }) => {
  return await axios.post(
    `${BASE_URL}/${username}/roles`,
    roles?.map((role) => role.roleName),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }
  );
};
