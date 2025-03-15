import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MRT_ColumnDef } from 'material-react-table';
import { RootState } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ConfirmModal, Table } from '~/components';
import { CreateComponent, DecentralizeComponent, UpdateComponent } from './components';
import { RowAction } from '~/types';
import { Delete as DeleteIcon, Group as GroupIcon, ModeEdit, RotateLeft } from '@mui/icons-material';
import {
  assignRolesStart,
  createUserStart,
  deleteUserStart,
  getUsersStart,
  resetPassStart,
  resetStateStart,
  updateUserStart
} from '~/redux/user/slice';
import { enqueueSnackbar } from 'notistack';

const UserPage = () => {
  const { t } = useTranslation();
  const { users, pageCount, rowCount, resetSuccess } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openDecentralize, setOpenDecentralize] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>();
  const [currentUser, setCurrentUser] = useState({
    id: 0,
    fullName: '',
    email: '',
    phone: '',
    isMale: false,
    roles: [],
    account: {}
  });

  let columns: MRT_ColumnDef<object>[];

  useEffect(() => {
    if (resetSuccess == true) {
      enqueueSnackbar(t('success', { value: t('reset-password') }), { variant: 'success' });
      dispatch(resetStateStart());
    }
  }, [resetSuccess, dispatch, t]);

  // eslint-disable-next-line prefer-const
  columns = [
    {
      header: '#',
      accessorKey: 'no',
      size: 1
    },
    {
      header: t('name'),
      accessorKey: 'fullName',
      enableColumnOrdering: true,
      enableMultiSort: true
    },
    {
      header: t('phone'),
      accessorKey: 'phone'
    },
    {
      header: t('Email'),
      accessorKey: 'email'
    }
  ];

  const actions: RowAction<object>[] = [
    {
      icon: <ModeEdit className={'text-green-500'} />,
      onClick: (row) => {
        setCurrentUser(row.original);
        setOpenUpdate(true);
      },
      label: t('edit', { value: null })
    },
    ,
    {
      icon: <GroupIcon className={'text-blue-500'} />,
      onClick: (row) => {
        setCurrentUser(row.original);
        setOpenDecentralize(true);
      },
      label: t('decentralize')
    },
    {
      icon: <RotateLeft className={'black-500'} />,
      onClick: (row) => {
        setCurrentUser(row.original);
        dispatch(resetPassStart(row.original.account.id));
      },
      label: t('reset-password')
    },
    {
      icon: <DeleteIcon className={'text-red-500'} />,
      onClick: (row) => {
        setCurrentUser(row.original);
        setOpenDelete(true);
      },
      label: t('delete', { value: null })
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

  const handleDecentralize = ({ username, roles }) => {
    dispatch(
      assignRolesStart({
        username,
        roles
      })
    ); // Gửi action cập nhật
    setOpenDecentralize(false); // Đóng modal cập nhật
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
      <DecentralizeComponent
        open={openDecentralize}
        setOpen={setOpenDecentralize}
        onSave={handleDecentralize}
        value={currentUser}
      />
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
