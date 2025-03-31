import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_POST_SERVICE}/posts`;

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

export const getComments = async ({ id, size, page }) => {
  return await axios.get(`${BASE_URL}/${id}/comments`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    params: {
      size,
      page
    }
  });
};

export const createComment = async ({ id, content }) => {
  return await axios.post(`${BASE_URL}/${id}/comments`, JSON.stringify({ content }), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });
};

export const updateComment = async ({ id, content }) => {
  return await axios.put(`${BASE_URL}/comments/${id}`, JSON.stringify({ content }), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });
};

export const deleteComment = async (id) => {
  return await axios.delete(`${BASE_URL}/comments/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });
};

export const getPostFavorite = async (id) => {
  return await axios.get(`${BASE_URL}/${id}/favorites`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const like = async (id) => {
  return await axios.post(`${BASE_URL}/${id}/like`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const unLike = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}/like`, {
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

export const createOne = async ({ image, content, title }) => {
  return await axios.post(`${BASE_URL}`, JSON.stringify({ content, image, title }), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });
};

export const updateOne = async ({ id, content, image, title }) => {
  return await axios.put(`${BASE_URL}/${id}`, JSON.stringify({ content, image, title }), {
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
