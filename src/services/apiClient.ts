import axios from 'axios';

// Tạo một axios instance với cấu hình mặc định
const apiClient = axios.create({
  baseURL: 'https://api.example.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (config.headers['Content-Type'] === 'multipart/form-data') {
      // Không cần thêm Content-Type vì axios sẽ tự động thiết lập đúng kiểu khi gửi dữ liệu FormData
      // Xử lý nếu cần trước khi gửi, ví dụ: thêm Authorization Token nếu cần
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor xử lý phản hồi (Response Interceptor)
apiClient.interceptors.response.use(
  (response) => {
    // Xử lý dữ liệu phản hồi nếu cần
    return response;
  },
  (error) => {
    // Xử lý lỗi toàn cục, có thể thêm logic xử lý như thông báo lỗi cho người dùng
    return Promise.reject(error);
  }
);

const sendJsonRequest = async (url: string, method: string, data?: object) => {
  const response = await apiClient({
    method,
    url,
    data, 
  });
  return response.data;
};
const sendFormDataRequest = async (url: string, method: string, formData: FormData) => {
  const response = await apiClient({
    method,
    url,
    data: formData,  
    headers: {
      'Content-Type': 'multipart/form-data',  // Đặt Content-Type cho các tệp tin
    },
  });
  return response.data;
};

export default {
  sendJsonRequest,
  sendFormDataRequest,
};
