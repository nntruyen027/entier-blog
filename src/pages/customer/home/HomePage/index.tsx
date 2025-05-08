import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { HeroSection } from './components';
import useParamValue from '~/hooks/useParamValue';
import { PostComponent } from '~/pages/customer/home/ContentPage/components';
import { Empty } from 'antd';
import { useEffect, useState } from 'react';
import { getPostsByNoAdminStart } from '~/redux/post/slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';

const Page = () => {
  const { value } = useParamValue('ownInfo');
  const { posts } = useSelector((state: RootState) => state.post);
  const [pagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getPostsByNoAdminStart({
        page: pagination.pageIndex,
        size: pagination.pageSize
      })
    );
  }, [pagination]);

  return (
    <div className={'relative min-h-screen h-fit'}>
      <DotLottieReact
        className={'fixed top-0 -right-[10%] w-[120%] object-contain'}
        src='https://lottie.host/91709943-e477-4bae-92ce-9a7d1c3e9a35/czVEUka0lS.json'
        loop
        autoplay
      />
      <main className='relative z-1'>
        <HeroSection />
        <div className={'h-[40vh] bg-gray-100 grid grid-cols-8  '}>
          <div className={'col-span-2'}></div>
          <div className={'col-span-4 text-left flex flex-col justify-center'}>
            <h2 className="relative flex items-center before:content-[''] before:inline-block before:w-1 before:h-full before:bg-orange-400 before:mr-2 text-4xl font-extrabold">
              {value?.name || 'ownInfo.name'}
            </h2>
            <div
              className={
                'mt-3 text-3xl font-semibold after:block after:content-[""] after:w-1/2 after:bg-orange-400 after:h-1 after:my-2'
              }
            >
              {value?.slogan || 'ownInfo.slogan'}
            </div>
            <div className={'mt-3 text-justify'}>{value?.description || ' ownInfo.description'}</div>
          </div>
          <div className={'col-span-2'}></div>
        </div>
        <div className={'h-[40vh] bg-[#0d182a] grid grid-cols-8'}>
          <div className={'col-span-2'}></div>
          <div className={'col-span-4 text-left flex flex-col justify-center'}>
            <div className="relative flex items-center before:content-[''] before:inline-block before:w-1 before:h-full before:bg-orange-400 before:mr-2 text-4xl font-semibold text-white">
              Quan điểm làm việc của tôi?
            </div>
            <div className={'mt-3 text-justify text-white'}>
              Trong quá trình làm việc, tôi luôn đặt sự tận tâm và chuyên nghiệp lên hàng đầu. Tôi sẵn sàng từ chối
              những khách hàng nghi ngờ, không tôn trọng mình. Điều này cho thấy tôi không chỉ quan tâm đến việc kiếm
              tiền, mà còn đề cao tinh thần hợp tác và đồng hành cùng khách hàng.
            </div>
          </div>
          <div className={'col-span-2'}></div>
        </div>
        <div>
          {posts?.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {posts.map((post) => (
                <PostComponent key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className='flex items-center justify-center h-64'>
              <Empty description='Không có bài viết' />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
