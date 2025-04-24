import axios from 'axios';

const BASE_URL = 'http://localhost:8084/posts';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getAllNoAdmin = async (params) => {
  return await axios.get(`${BASE_URL}/public`, {
    params,
    headers: getAuthHeaders()
  });
};

export const getAll = async (params) => {
  return await axios.get(`${BASE_URL}/admin`, {
    params,
    headers: getAuthHeaders()
  });
};

export const getOne = async (id) => {
  return await axios.get(`${BASE_URL}/${id}`, {
    headers: getAuthHeaders()
  });
};

export const createOne = async (body) => {
  return await axios.post(`${BASE_URL}`, JSON.stringify(body), {
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    }
  });
};

export const createComment = async ({ id, body }) => {
  return await axios.post(`${BASE_URL}/${id}/comments`, JSON.stringify(body), {
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    }
  });
};

export const updateComment = async ({ id, body }) => {
  return await axios.put(`${BASE_URL}/comments/${id}`, JSON.stringify(body), {
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    }
  });
};

export const updateOne = async ({ id, body }) => {
  return await axios.put(`${BASE_URL}/admin/${id}`, JSON.stringify(body), {
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    }
  });
};

export const asignTag = async ({ id, body }) => {
  return await axios.post(`${BASE_URL}/admin/${id}/tags`, body, {
    headers: {
      ...getAuthHeaders(),
      'Content-Type': 'application/json'
    }
  });
};

export const deleteOne = async (id) => {
  return await axios.delete(`${BASE_URL}/admin/${id}`, {
    headers: getAuthHeaders()
  });
};

export const deleteComment = async (id) => {
  return await axios.delete(`${BASE_URL}/comments/${id}`, {
    headers: getAuthHeaders()
  });
};

export const likeOne = async (id) => {
  return await axios.post(`${BASE_URL}/${id}/like`, null, {
    headers: getAuthHeaders()
  });
};

export const unlikeOne = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}/unlike`, {
    headers: getAuthHeaders()
  });
};
