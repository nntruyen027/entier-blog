import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MRT_ColumnDef } from 'material-react-table';
import { RootState } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ConfirmModal, Table } from '~/components';
import { CreateComponent, UpdateComponent } from './components';
import { RowAction } from '~/types';
import { Delete as DeleteIcon, ModeEdit } from '@mui/icons-material';
import { createUserStart, deleteUserStart, getUsersStart, updateUserStart } from '~/redux/user/slice';

const UserPage = () => {
  const { t } = useTranslation();
  const { users, pageCount, rowCount } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>();
  const [currentUser, setCurrentUser] = useState({ id: 0, fullName: '', email: '', phone: '', isMale: false });

  let columns: MRT_ColumnDef<object>[];

  // eslint-disable-next-line prefer-const
  columns = [
    {
      header: '#',
      accessorKey: 'no',
      size: 1
    },
    {
      header: t('name'), // Tên vai trò
      accessorKey: 'fullName',
      enableColumnOrdering: true,
      enableMultiSort: true
    },
    {
      header: t('phone'), // Tên vai trò
      accessorKey: 'phone'
    },
    {
      header: t('Email'), // Tên vai trò
      accessorKey: 'email'
    }
  ];

  const actions: RowAction<object>[] = [
    {
      icon: <ModeEdit className={'text-teal-400'} />,
      onClick: (row) => {
        setCurrentUser(row.original);
        setOpenUpdate(true);
      },
      label: t('edit')
    },
    {
      icon: <DeleteIcon className={'text-red-500'} />,
      onClick: (row) => {
        setCurrentUser(row.original);
        setOpenDelete(true);
      },
      label: t('delete')
    }
  ];

  useEffect(() => {
    dispatch(getUsersStart({ size: pagination.pageSize, page: pagination.pageIndex }));
  }, [dispatch, pagination]);

  const handleSave = ({ fullName, email, phone, isMale, password, username }) => {
    dispatch(createUserStart({ fullName, email, phone, isMale, password, username }));
    setOpenCreate(false);
  };

  const handleUpdate = ({ id, fullName, email, phone, isMale }) => {
    dispatch(
      updateUserStart({
        id,
        body: {
          fullName,
          email,
          phone,
          isMale
        }
      })
    ); // Gửi action cập nhật
    setOpenUpdate(false); // Đóng modal cập nhật
  };

  useEffect(() => {
    if (confirmDelete) {
      dispatch(deleteUserStart(currentUser.id));
    }
  }, [confirmDelete]);

  return (
    <>
      <CreateComponent open={openCreate} setOpen={setOpenCreate} onSave={handleSave} />
      <UpdateComponent open={openUpdate} setOpen={setOpenUpdate} onSave={handleUpdate} value={currentUser} />
      <ConfirmModal
        open={openDelete}
        setOpen={setOpenDelete}
        confirm={confirmDelete}
        setConfirm={setConfirmDelete}
        content={t('confirm-delete', {
          value: t('user')
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
            data={users.map((value, index) => ({
              no: index + 1,
              isMale: value.male,
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

export default UserPage;
