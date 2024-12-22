import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';

const Header = () => {
  const { personal } = useSelector((state: RootState) => state.personal);
  return (
    <div className={'relative top-0 left-0 '}>
      <div
        className={
          'w-full h-36 bg-[url("https://img.lovepik.com/background/20211022/medium/lovepik-technology-blue-light-background-picture-image_500606949.jpg")]'
        }
      ></div>
      <div className={'absolute bottom-0 left-1 translate-y-full'}>
        <span className={'text-3xl text-black font-bold translate-y-full'}>{personal?.fullName || 'Họ và tên'}</span>
      </div>
      <Avatar
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, 0)',
          height: 150,
          width: 150
        }}
      >
        {personal?.personal || ''}
      </Avatar>
    </div>
  );
};

export default Header;
