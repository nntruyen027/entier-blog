import { Spin } from 'antd';

const LoadingPage = () => (
  <div className='flex items-center justify-center min-h-screen bg-white'>
    <Spin size='large' />
  </div>
);

export default LoadingPage;
