import { Avatar, Empty, Image, Typography } from 'antd';
import { formatDate } from '~/utils/date';
import { HeartOutlined } from '@ant-design/icons';
import { QuillContent } from '~/components';
import React from 'react';

const Component = ({ post }) => {
  return (
    <div className='w-full grid col-span-8 max-w-screen-lg px-3 bg-white'>
      {post?.image ? (
        <div className='w-full aspect-[3] overflow-hidden  rounded-lg'>
          <Image src={post?.image} preview={false} className='w-full h-full object-cover' />
        </div>
      ) : (
        <Empty />
      )}
      <Typography.Title className='my-3 text-left' level={2}>
        {post?.title}
      </Typography.Title>
      <div className='w-full flex justify-start text-left py-3 italic text-wrap break-words'>{post?.description}</div>
      <div className='w-full flex items-center justify-between'>
        <div className={'flex items-center gap-3 text-left py-3 italic mb-6'}>
          <Avatar src={post?.author?.avatar} size={'large'} />
          <div className={'flex flex-col'}>
            <span className={'font-bold'}>{post?.author?.fullName}</span>
            <span>{post?.createAt && formatDate(post?.createAt, 'DD/MM/YYYY')}</span>
          </div>
        </div>
        <div className={'flex items-center gap-2 text-left py-3 mb-6'}>
          <span className={'text-2xl'}>{post?.likeCount || 0}</span>
          <HeartOutlined className={`text-2xl  text-red-500`} />
        </div>
      </div>
      <QuillContent content={post?.content} showToc={false} />
      <div className={'flex gap-1 my-2'}>
        {post?.hashtags?.map((e) => <span className={'p-2 bg-gray-100 italic'}>{e}</span>)}
      </div>
    </div>
  );
};

export default Component;
