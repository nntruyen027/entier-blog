import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MRT_ColumnDef } from 'material-react-table';
import { RootState } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ConfirmModal, Table } from '~/components';
import { CommentComponent, CreateComponent, FavoriteComponent, UpdateComponent } from './components';
import { RowAction } from '~/types';
import { createPostStart, deletePostStart, getPostsStart, updatePostStart } from '~/redux/post/slice';
import DetailComponent from '~/pages/admin/main/PostPage/components/DetailComponent';

const PostPage = () => {
  const { t } = useTranslation();
  const { posts, pageCount, rowCount } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [openFavorite, setOpenFavorite] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>();
  const [currentPost, setCurrentPost] = useState({
    id: 0,
    title: '',
    content: '',
    image: '',
    likeCount: 0
  });

  let columns: MRT_ColumnDef<{ name: string }>[];

  // eslint-disable-next-line prefer-const
  columns = [
    {
      header: '#',
      accessorKey: 'no',
      size: 1,
      enableSorting: false
    },
    {
      header: t('title'),
      accessorKey: 'title',
      enableColumnOrdering: true,
      enableMultiSort: true,
      Cell: ({ renderedCellValue }) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {renderedCellValue}
        </div>
      ),
      size: 90
    },
    {
      enableSorting: false,
      header: t('image'),
      accessorKey: 'image',
      size: 90,
      Cell: ({ renderedCellValue, row }) => (
        <img
          src={`${renderedCellValue}`}
          style={{
            height: '5rem'
          }}
          alt={'' + row.original?.name}
        />
      )
    },
    {
      header: t('like'),
      accessorKey: 'likeCount',
      enableColumnOrdering: true,
      enableMultiSort: true,
      size: 90
    }
  ];

  const actions: RowAction<object>[] = [
    {
      icon: null,
      onClick: (row) => {
        setCurrentPost(row.original);
        setOpenDetail(true);
      },
      label: t('post', { value: null })
    },
    {
      icon: null,
      onClick: (row) => {
        setCurrentPost(row.original);
        setOpenUpdate(true);
      },
      label: t('edit', { value: null })
    },
    {
      icon: null,
      onClick: (row) => {
        setCurrentPost(row.original);
        setOpenDelete(true);
      },
      label: t('delete', { value: null })
    },
    {
      icon: null,
      onClick: (row) => {
        setCurrentPost(row.original);
        setOpenFavorite(true);
      },
      label: t('like')
    },
    {
      icon: null,
      onClick: (row) => {
        setCurrentPost(row.original);
        setOpenComment(true);
      },
      label: t('comment')
    }
  ];

  useEffect(() => {
    dispatch(getPostsStart({ size: pagination.pageSize, page: pagination.pageIndex }));
  }, [dispatch, pagination]);

  const handleSave = ({ title, content, image }) => {
    dispatch(createPostStart({ title, content, image }));
    setOpenCreate(false);
  };

  const handleUpdate = ({ title, content, image }) => {
    dispatch(
      updatePostStart({
        id: currentPost.id,
        title,
        content,
        image
      })
    );
    setOpenUpdate(false);
  };

  useEffect(() => {
    if (confirmDelete) {
      dispatch(deletePostStart(currentPost.id));
      setConfirmDelete(false);
    }
  }, [confirmDelete]);

  return (
    <>
      <CreateComponent open={openCreate} setOpen={setOpenCreate} onSave={handleSave} />
      <UpdateComponent open={openUpdate} setOpen={setOpenUpdate} onSave={handleUpdate} value={currentPost} />
      <DetailComponent open={openDetail} setOpen={setOpenDetail} value={currentPost} />
      <FavoriteComponent open={openFavorite} setOpen={setOpenFavorite} value={currentPost} />
      <CommentComponent open={openComment} setOpen={setOpenComment} value={currentPost} />
      <ConfirmModal
        open={openDelete}
        setOpen={setOpenDelete}
        confirm={confirmDelete}
        setConfirm={setConfirmDelete}
        content={t('confirm-delete', {
          value: t('type')
        })}
      />
      <div className={'w-full p-3'}>
        <div className='flex mb-4'>
          <Button variant='contained' style={{ marginLeft: 'auto' }} onClick={() => setOpenCreate(true)}>
            {t('add')}
          </Button>
        </div>
        <div className={'w-full'}>
          <Table
            columns={columns}
            data={posts?.map((value, index) => ({
              no: index + 1,
              ...value
            }))}
            setPagination={setPagination}
            pagination={pagination}
            rowCount={rowCount}
            pageCount={pageCount}
            actions={actions}
          />
        </div>
      </div>
    </>
  );
};

export default PostPage;
