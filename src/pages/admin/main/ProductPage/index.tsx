import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MRT_ColumnDef } from 'material-react-table';
import { RootState } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ConfirmModal, Table } from '~/components';
import { AssignTagComponent, AttributeComponent, CreateComponent, UpdateComponent } from './components';
import { RowAction } from '~/types';
import { Attribution, Category, Delete as DeleteIcon, ModeEdit, Sell } from '@mui/icons-material';
import {
  createProductStart,
  deleteProductStart,
  getProductsStart,
  updateProductStart,
  updateProductTagStart
} from '~/redux/product/slice';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const { t } = useTranslation();
  const { products, pageCount, rowCount } = useSelector((state: RootState) => state.product);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openAttribute, setOpenAttribute] = useState(false);
  const [openAssign, setOpenAsign] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>();
  const [currentProduct, setCurrentUser] = useState({
    id: 0,
    name: '',
    description: '',
    image: '',
    brand: null,
    type: null,
    tags: []
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
      enableMultiSort: true,
      Cell: ({ renderedCellValue }) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {renderedCellValue}
        </div>
      ),
      size: 90
    },
    {
      header: t('description'),
      accessorKey: 'description',
      Cell: ({ renderedCellValue }) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {renderedCellValue}
        </div>
      ),
      size: 120
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
      header: t('type'),
      accessorKey: 'type.name',
      enableColumnOrdering: true,
      enableMultiSort: true,
      size: 90
    },
    {
      header: t('brand'),
      accessorKey: 'brand.name',
      enableColumnOrdering: true,
      enableMultiSort: true,
      size: 90
    }
  ];

  const actions: RowAction<object>[] = [
    {
      icon: <Category className={'text-blue-500'} />,
      onClick: (row) => {
        nav(`${row.original.id}/versions`);
      },
      label: t('product-version', { value: null })
    },
    {
      icon: <Attribution className={'text-orange-500'} />,
      onClick: (row) => {
        setCurrentUser(row.original);
        setOpenAttribute(true);
      },
      label: t('attribute', { value: null })
    },
    {
      icon: <ModeEdit className={'text-green-500'} />,
      onClick: (row) => {
        setCurrentUser(row.original);
        setOpenUpdate(true);
      },
      label: t('edit', { value: null })
    },
    {
      icon: <Sell className={'text-yellow-500'} />,
      onClick: (row) => {
        setCurrentUser(row.original);
        setOpenAsign(true);
      },
      label: t('tag', { value: null })
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
    dispatch(getProductsStart({ size: pagination.pageSize, page: pagination.pageIndex }));
  }, [dispatch, pagination]);

  const handleSave = ({ name, description, image, type, brand }) => {
    dispatch(createProductStart({ name, description, type, brand, image }));
    setOpenCreate(false);
  };

  const handleUpdate = ({ name, description, image, type, brand }) => {
    dispatch(
      updateProductStart({
        id: currentProduct.id,
        name,
        description,
        image,
        type,
        brand
      })
    );
    setOpenUpdate(false);
  };

  const handleAssign = ({ tags }) => {
    dispatch(
      updateProductTagStart({
        id: currentProduct.id,
        tags
      })
    );
    setOpenAsign(false);
  };

  useEffect(() => {
    if (confirmDelete) {
      dispatch(deleteProductStart(currentProduct.id));
      setConfirmDelete(false);
    }
  }, [confirmDelete]);

  return (
    <>
      <CreateComponent open={openCreate} setOpen={setOpenCreate} onSave={handleSave} />
      <AssignTagComponent open={openAssign} setOpen={setOpenAsign} onSave={handleAssign} value={currentProduct} />
      <UpdateComponent open={openUpdate} setOpen={setOpenUpdate} onSave={handleUpdate} value={currentProduct} />
      <AttributeComponent open={openAttribute} setOpen={setOpenAttribute} value={currentProduct} />
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
            data={products?.map((value, index) => ({
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

export default ProductPage;
