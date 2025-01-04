import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MRT_ColumnDef } from 'material-react-table';
import { RootState } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { createRoleStart, deleteRoleStart, getRolesStart, updateRoleStart } from '~/redux/role/slice';
import { ConfirmModal, Table } from '~/components';
import { CreateComponent, UpdateComponent } from './components';
import { RowAction } from '~/types';
import { Delete as DeleteIcon, ModeEdit } from '@mui/icons-material';

const RolePage = () => {
  const { t } = useTranslation();
  const { roles, pageCount, rowCount } = useSelector((state: RootState) => state.role);
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>();
  const [currentRole, setCurrentRole] = useState({ id: 0, roleName: '' });

  const columns: MRT_ColumnDef<object>[] = [
    {
      header: '#',
      accessorKey: 'no',
      size: 1
    },
    {
      header: t('name'), // Tên vai trò
      accessorKey: 'roleName',
      enableColumnOrdering: true,
      enableMultiSort: true
    }
  ];

  const actions: RowAction<object>[] = [
    {
      icon: <ModeEdit className={'text-green-500'} />,
      onClick: (row) => {
        setCurrentRole(row.original);
        setOpenUpdate(true);
      },
      label: t('edit', { value: null })
    },
    {
      icon: <DeleteIcon className={'text-red-500'} />,
      onClick: (row) => {
        setCurrentRole(row.original);
        setOpenDelete(true);
      },
      label: t('delete', { value: null })
    }
  ];

  useEffect(() => {
    dispatch(getRolesStart({})); // Gửi action để lấy danh sách vai trò
  }, [dispatch]);

  const handleSave = ({ roleName }) => {
    dispatch(createRoleStart({ roleName }));
    setOpenCreate(false);
  };

  const handleUpdate = ({ id, roleName }) => {
    dispatch(
      updateRoleStart({
        id,
        body: {
          roleName
        }
      })
    ); // Gửi action cập nhật
    setOpenUpdate(false); // Đóng modal cập nhật
  };

  useEffect(() => {
    if (confirmDelete) {
      dispatch(deleteRoleStart(currentRole.id));
    }
  }, [confirmDelete]);

  return (
    <>
      <CreateComponent open={openCreate} setOpen={setOpenCreate} onSave={handleSave} />
      <UpdateComponent open={openUpdate} setOpen={setOpenUpdate} onSave={handleUpdate} value={currentRole} />
      <ConfirmModal
        open={openDelete}
        setOpen={setOpenDelete}
        confirm={confirmDelete}
        setConfirm={setConfirmDelete}
        content={t('confirm-delete', {
          value: t('role')
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
            data={roles.map((value, index) => ({
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

export default RolePage;
