import axios from 'axios';
import { Receipt } from '~/types';

const BASE_URL = `${import.meta.env.VITE_WAREHOUSE_SERVICE}/receipts`;

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

export const createOne = async ({
  nguoiGiao,
  ngayGiao,
  bbSoHieu,
  bbNgay,
  nhaCungCap,
  khoTen,
  khoDiaChi,
  items,
  totalAmount
}: Receipt) => {
  return await axios.post(
    `${BASE_URL}`,
    JSON.stringify({
      nguoiGiao,
      ngayGiao,
      bbSoHieu,
      bbNgay,
      nhaCungCap,
      khoTen,
      khoDiaChi,
      items,
      totalAmount
    }),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }
  );
};

export const updateOne = async ({
  id,
  nguoiGiao,
  ngayGiao,
  bbSoHieu,
  bbNgay,
  nhaCungCap,
  khoTen,
  khoDiaChi,
  items,
  totalAmount,
  thoiGianTao
}: Receipt) => {
  return await axios.put(
    `${BASE_URL}/${id}`,
    JSON.stringify({
      nguoiGiao,
      ngayGiao,
      bbSoHieu,
      bbNgay,
      nhaCungCap,
      khoTen,
      khoDiaChi,
      items,
      totalAmount,
      thoiGianTao
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
  return await axios.post(`${BASE_URL}/${id}/report`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
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
