import { Button, Image, Typography } from 'antd';
import useParamValue from '~/hooks/useParamValue';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone, faVenusMars } from '@fortawesome/free-solid-svg-icons';

const Page = () => {
  const { value } = useParamValue('coverPhotoUrl');
  const { account } = useSelector((state: RootState) => state.auth);

  return (
    <div className='grid grid-cols-1 md:grid-cols-12 gap-4 w-full min-h-screen '>
      <div className='hidden md:block md:col-span-2 bg-gray-100' />
      <div className='col-span-1 md:col-span-8 p-4  rounded-lg'>
        <div className='relative bg-white'>
          <div className='w-full aspect-[2.63] overflow-hidden  rounded-lg'>
            <Image src={value} preview={false} className='w-full h-full object-cover' />
          </div>

          <div className='absolute left-4 sm:left-6 md:left-8 -bottom-16 flex items-center space-x-4'>
            <div className='w-20 sm:w-24 h-20 sm:h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white'>
              <img src={account?.avatar} alt='avatar' className='w-full h-full object-cover' />
            </div>
            <Typography.Title className={'relative top-2'} level={3}>
              {account?.fullName}
            </Typography.Title>
          </div>
        </div>

        <div className='mt-20 sm:mt-24' />

        <div className={'flex flex-col items-start px-10 py-5 rounded-xl bg-white'}>
          <Typography.Title level={4}>Giới thiệu</Typography.Title>
          <Typography.Text className={'flex gap-1 items-center'}>
            <FontAwesomeIcon icon={faVenusMars} />
            {account?.isMale ? 'Nam' : 'Nữ'}
          </Typography.Text>
          <Typography.Text className={'flex gap-1 items-center'}>
            <FontAwesomeIcon icon={faEnvelope} />
            {account?.email}
          </Typography.Text>
          <Typography.Text className={'flex gap-1 items-center'}>
            <FontAwesomeIcon icon={faPhone} />
            {account?.phoneNumber}
          </Typography.Text>
          <Typography.Text className={'flex gap-1 items-center'}>
            <FontAwesomeIcon icon={faLocationDot} />
            {account?.address}
          </Typography.Text>
          <div className={'mt-5 flex justify-start items-center gap-6'}>
            <Button>Chỉnh sửa thông tin</Button>
            <Button>Đổi mật khẩu</Button>
          </div>
        </div>

        <div className={'flex flex-col items-start px-10 mt-5 py-5 rounded-xl bg-white'}>
          <Typography.Title level={4}>Bài viết yêu thích</Typography.Title>
        </div>

        <div className={'flex flex-col items-start px-10 mt-5 py-5 rounded-xl bg-white'}>
          <Typography.Title level={4}>Sản phẩm đã xem</Typography.Title>
        </div>
      </div>

      <div className='hidden md:block md:col-span-2 bg-gray-100' />
    </div>
  );
};

export default Page;
