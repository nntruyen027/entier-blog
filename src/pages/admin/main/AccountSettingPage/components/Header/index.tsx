import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { Avatar } from '@files-ui/react';
import { updateAvatarStart } from '~/redux/personal/slice';

const Header = () => {
  const { personal } = useSelector((state: RootState) => state.personal);
  const dispatch = useDispatch();
  const handleChangeAvatar = (avatar) => {
    dispatch(updateAvatarStart(avatar));
  };
  return (
    <div className={'relative top-0 left-0'}>
      <div
        className={
          'w-full h-36 bg-[url("https://img.lovepik.com/background/20211022/medium/lovepik-technology-blue-light-background-picture-image_500606949.jpg")] bg-no-repeat bg-cover'
        }
      ></div>
      <div className={'absolute top-1/2 left-1/2 transform -translate-x-1/2'}>
        <Avatar
          src={`${import.meta.env.VITE_USER_SERVICE}/${personal?.avatar}`}
          label={personal?.fullName}
          changeLabel={personal?.fullName}
          variant='circle'
          onChange={handleChangeAvatar}
        />
      </div>
    </div>
  );
};

export default Header;
