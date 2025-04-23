// import React from 'react';

import { Button, Result } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const nav = useNavigate();
  const location = useLocation();
  const handleNavigate = () => {
    if (location.pathname.includes('admin')) nav('/admin');
    else nav(`/`);
  };

  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Button variant={'solid'} onClick={handleNavigate}>
          Back Home
        </Button>
      }
    />
  );
};

export default NotFoundPage;
