import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_PRODUCT_SERVICE}/products`;

export const getAll = async ({ productId, size, page }) => {
  return await axios.get(`${BASE_URL}/${productId}/versions`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    params: {
      size,
      page
    }
  });
};

export const getOne = async ({ productId, id }) => {
  return await axios.get(`${BASE_URL}/${productId}/versions/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const createOne = async ({ versionName, product, images, price }) => {
  return await axios.post(`${BASE_URL}/${product}/versions`, JSON.stringify({ versionName, product, images, price }), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });
};

export const updateOne = async ({ id, versionName, product, images, price }) => {
  return await axios.put(
    `${BASE_URL}/${product}/versions/${id}`,
    JSON.stringify({
      versionName,
      product,
      images,
      price
    }),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }
  );
};

export const deleteOne = async ({ product, id }) => {
  return await axios.delete(`${BASE_URL}/${product}/versions/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
