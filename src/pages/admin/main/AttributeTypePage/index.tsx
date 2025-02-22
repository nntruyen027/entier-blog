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
import {
  createAttributeTypeStart,
  deleteAttributeTypeStart,
  getAttributeTypesStart,
  updateAttributeTypeStart
} from '~/redux/attributeType/slice';

const AttributeTypePage = () => {
  const { t } = useTranslation();
  const { attributeTypes, pageCount, rowCount } = useSelector((state: RootState) => state.attributeType);
  const dispatch = useDispatch();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>();
  const [currentUser, setCurrentUser] = useState({
    id: 0,
    name: '',
    description: ''
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
      header: t('name'),
      accessorKey: 'name',
      enableColumnOrdering: true,
      enableMultiSort: true
    },
    {
      header: t('description'),
      accessorKey: 'description'
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
    dispatch(getAttributeTypesStart({ size: pagination.pageSize, page: pagination.pageIndex }));
  }, [dispatch, pagination]);

  const handleSave = ({ name, description }) => {
    dispatch(createAttributeTypeStart({ name, description }));
    setOpenCreate(false);
  };

  const handleUpdate = ({ name, description }) => {
    dispatch(
      updateAttributeTypeStart({
        id: currentUser.id,
        name,
        description
      })
    );
    setOpenUpdate(false);
  };

  useEffect(() => {
    if (confirmDelete) {
      dispatch(deleteAttributeTypeStart(currentUser.id));
      setConfirmDelete(false);
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
          value: t('attribute-type')
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
            data={attributeTypes.map((value, index) => ({
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

export default AttributeTypePage;
