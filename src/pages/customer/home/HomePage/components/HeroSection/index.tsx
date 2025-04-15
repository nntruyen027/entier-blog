import useParamValue from '~/hooks/useParamValue';
import { useEffect, useState } from 'react';
import { Typography } from 'antd';

const { Text, Title } = Typography;

const Page = () => {
  const [name, setName] = useState('');
  const [slogan, setSlogan] = useState('');
  const { value: nameParam } = useParamValue('name');
  const { value: sloganParam } = useParamValue('slogan');
  useEffect(() => {
    if (nameParam) {
      setName(nameParam);
    }
    if (sloganParam) setSlogan(sloganParam);
  }, [nameParam, sloganParam]);

  return (
    <div className='w-screen h-[calc(100vh-20rem)] flex flex-col items-center justify-center text-center px-4'>
      <Title
        level={1}
        style={{
          fontFamily: 'Sacramento, cursive',
          fontSize: '10rem',
          lineHeight: 1,
          textAlign: 'center',
          marginBottom: '1rem',
          color: 'white'
        }}
      >
        {name}
      </Title>

      <Text style={{ fontStyle: 'italic', fontSize: '2rem', color: 'black' }}>"{slogan}"</Text>
    </div>
  );
};

export default Page;
