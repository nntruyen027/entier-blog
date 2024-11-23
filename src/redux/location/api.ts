import axios from 'axios';

const BASE_URL = 'https://esgoo.net/api-tinhthanh';

export const getProvinces = async () => {
  const response = await axios.get(`${BASE_URL}/1/0.htm`);
  return response.data;
};

export const getDistricts = async (provinceId: string) => {
  const response = await axios.get(`${BASE_URL}/2/${provinceId}.htm`);
  return response.data;
};

export const getWards = async (districtId: string) => {
  const response = await axios.get(`${BASE_URL}/3/${districtId}.htm`);
  return response.data;
};
