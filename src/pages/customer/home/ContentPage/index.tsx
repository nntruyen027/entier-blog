import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getPostsByNoAdminStart } from '~/redux/post/slice';
import { RootState } from '~/redux/store';
import { PostComponent } from './components';
import { Empty, Pagination } from 'antd';
import { getParamByKey } from '~/redux/param/api';

const Page = () => {
  const dispatch = useDispatch();
  const { posts, rowCount } = useSelector((state: RootState) => state.post);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });
  const [pageSizeOptions, setPageSizeOptions] = useState<string[]>([]);
  const [defaultPageSize, setDefaultPageSize] = useState<number | null>(null);

  useEffect(() => {
    dispatch(
      getPostsByNoAdminStart({
        page: pagination.pageIndex,
        size: pagination.pageSize
      })
    );
  }, [pagination]);

  useEffect(() => {
    getPageSizeOptions();
    fetchDefaultPageSize();
  }, []);

  useEffect(() => {
    if (defaultPageSize !== null && pagination.pageSize !== defaultPageSize) {
      setPagination({ pageIndex: 0, pageSize: defaultPageSize });
    }
  }, [defaultPageSize]);

  const getPageSizeOptions = async () => {
    try {
      const { value } = await getParamByKey('pageSizeOptions');
      setPageSizeOptions(value);
    } catch (err) {
      setPageSizeOptions(['5', '10', '20', '50', '100']);
    }
  };

  const fetchDefaultPageSize = async () => {
    try {
      const { value } = await getParamByKey('defaultPageSize');
      setDefaultPageSize(value);
    } catch (err) {
      setDefaultPageSize(10);
    }
  };

  return (
    <div className={'relative min-h-screen'}>
      <main className='relative z-1'>
        <div className={'flex gap-3 mb-3'}>
          {posts?.length > 0 ? (
            posts.map((post) => <PostComponent post={post} />)
          ) : (
            <div className={'w-full justify-center'}>
              <Empty />
            </div>
          )}
        </div>
        {posts?.length > 0 && (
          <div className={'flex w-full text-center justify-center'}>
            <Pagination
              current={pagination.pageIndex + 1}
              pageSize={pagination.pageSize}
              total={rowCount}
              showSizeChanger
              pageSizeOptions={pageSizeOptions}
              onChange={(page, pageSize) => setPagination({ pageIndex: page - 1, pageSize })}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Page;
