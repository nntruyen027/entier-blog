import axios from 'axios';
import { Invoice } from '~/types';

const BASE_URL = `${import.meta.env.VITE_WAREHOUSE_SERVICE}/phieu-xuat`;

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

export const createOne = async ({ sdtKh, sdtCuaHang, items, tenKh, diaChiCuaHang, diaChiKh }: Invoice) => {
  return await axios.post(
    `${BASE_URL}`,
    JSON.stringify({
      sdtKh,
      sdtCuaHang,
      items,
      tenKh,
      diaChiCuaHang,
      diaChiKh
    }),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }
  );
};

export const updateOne = async ({ id, sdtKh, sdtCuaHang, items, tenKh, diaChiCuaHang, diaChiKh }: Invoice) => {
  return await axios.put(
    `${BASE_URL}/${id}`,
    JSON.stringify({
      sdtKh,
      sdtCuaHang,
      items,
      tenKh,
      diaChiCuaHang,
      diaChiKh
    }),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }
  );
};

export const deleteOne = async (id) => {
  return await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const generatePdf = async (id) => {
  return await axios.post(`${BASE_URL}/${id}/report`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    responseType: 'blob'
  });
};

export const doStatistics = async ({
  ids,
  startDate,
  endDate
}: {
  ids: [number];
  startDate: string;
  endDate: string;
}) => {
  return await axios.post(
    `${BASE_URL}/statistics`,
    JSON.stringify({
      ids,
      startDate,
      endDate
    }),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
  );
};

export const doQuarterlyStatistics = async ({ nam }: { nam: number }) => {
  return await axios.post(`${BASE_URL}/statistics/year/${nam}/quarters`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};

export const doMonthlyStatistics = async ({ nam }: { nam: number }) => {
  return await axios.post(`${BASE_URL}/statistics/year/${nam}/months`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
};
