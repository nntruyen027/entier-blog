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
import { createBrandStart, deleteBrandStart, getBrandsStart, updateBrandStart } from '~/redux/brand/slice';

const BrandPage = () => {
  const { t } = useTranslation();
  const { brands, pageCount, rowCount } = useSelector((state: RootState) => state.brand);
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
    description: '',
    image: ''
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
    dispatch(getBrandsStart({ size: pagination.pageSize, page: pagination.pageIndex }));
  }, [dispatch, pagination]);

  const handleSave = ({ name, description, image }) => {
    dispatch(createBrandStart({ name, description, image }));
    setOpenCreate(false);
  };

  const handleUpdate = ({ name, description, image }) => {
    dispatch(
      updateBrandStart({
        id: currentUser.id,
        name,
        description,
        image
      })
    );
    setOpenUpdate(false);
  };

  useEffect(() => {
    if (confirmDelete) {
      dispatch(deleteBrandStart(currentUser.id));
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
          value: t('brand')
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
            data={brands.map((value, index) => ({
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

export default BrandPage;
