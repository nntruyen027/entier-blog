import { Box, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MRT_ColumnDef } from 'material-react-table';
import { RootState } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ConfirmModal, Table } from '~/components';
import { CreateComponent, UpdateComponent } from './components';
import { RowAction } from '~/types';
import { Delete as DeleteIcon, KeyboardArrowLeft, ModeEdit } from '@mui/icons-material';
import {
  createProductVersionStart,
  deleteProductVersionStart,
  getProductVersionsStart,
  updateProductVersionStart
} from '~/redux/productVersion/slice';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductStart } from '~/redux/product/slice';
import { admin } from '~/config/routes';

const ProductVersionPage = () => {
  const { t } = useTranslation();
  const { productVersions, pageCount, rowCount } = useSelector((state: RootState) => state.productVersion);
  const dispatch = useDispatch();
  const { productId } = useParams();
  const { product } = useSelector((state: RootState) => state.product);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const nav = useNavigate();

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>();
  const [currentVersion, setCurrentVersion] = useState({
    id: 0,
    versionName: '',
    stockQuantity: 0,
    price: 0,
    images: []
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
      accessorKey: 'versionName',
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
      header: t('price'),
      accessorKey: 'price',
      Cell: ({ renderedCellValue }) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {renderedCellValue}
        </div>
      ),
      size: 120
    },
    {
      header: t('quantity'),
      accessorKey: 'stockQuantity',
      enableColumnOrdering: true,
      enableMultiSort: true,
      size: 90
    },
    {
      enableSorting: false,
      header: t('image'),
      accessorKey: 'images',
      size: 90,
      Cell: ({ renderedCellValue }) => {
        if (!renderedCellValue) return <></>;

        let images = [];

        try {
          images = typeof renderedCellValue === 'string' ? JSON.parse(renderedCellValue) : renderedCellValue;
        } catch (error) {
          console.error('Failed to parse images:', error);
          return <></>;
        }

        if (!Array.isArray(images) || images.length === 0) return <></>;

        return (
          <div style={{ maxHeight: '10rem', overflowX: 'auto', display: 'flex', flexDirection: 'row' }}>
            {images.map((src, index) => (
              <img
                key={src.id || index}
                src={src.url}
                style={{ height: '5rem', marginRight: '0.5rem' }}
                alt={src.name || 'Image'}
              />
            ))}
          </div>
        );
      }
    }
  ];

  const actions: RowAction<object>[] = [
    {
      icon: <ModeEdit className={'text-green-500'} />,
      onClick: (row) => {
        setCurrentVersion(row.original);
        setOpenUpdate(true);
      },
      label: t('edit', { value: null })
    },
    {
      icon: <DeleteIcon className={'text-red-500'} />,
      onClick: (row) => {
        setCurrentVersion(row.original);
        setOpenDelete(true);
      },
      label: t('delete', { value: null })
    }
  ];

  useEffect(() => {
    dispatch(getProductVersionsStart({ productId: productId, size: pagination.pageSize, page: pagination.pageIndex }));
    dispatch(getProductStart(productId));
  }, [dispatch, pagination]);

  const handleSave = ({ versionName, price, images }) => {
    dispatch(createProductVersionStart({ product: productId, versionName, price, images }));
    setOpenCreate(false);
  };

  const handleUpdate = ({ versionName, price, images }) => {
    dispatch(
      updateProductVersionStart({
        product: productId,
        id: currentVersion.id,
        versionName,
        price,
        images
      })
    );
  };

  useEffect(() => {
    if (confirmDelete) {
      dispatch(deleteProductVersionStart({ product: productId, id: currentVersion.id }));
      setConfirmDelete(false);
    }
  }, [confirmDelete]);

  return (
    <>
      <CreateComponent open={openCreate} setOpen={setOpenCreate} onSave={handleSave} />
      <UpdateComponent open={openUpdate} setOpen={setOpenUpdate} onSave={handleUpdate} value={currentVersion} />
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
        <div className='flex mb-4 font-bold items-center'>
          <span className={'flex items-center'}>
            <KeyboardArrowLeft
              className={'cursor-pointer'}
              onClick={() => {
                nav(admin.main.product);
              }}
            />
            <h3>{product?.name}</h3>
          </span>
          <Button variant='contained' style={{ marginLeft: 'auto' }} onClick={() => setOpenCreate(true)}>
            {t('add')}
          </Button>
        </div>
        <Box className={'w-full bg-white'}>
          <Table
            columns={columns}
            data={productVersions.map((value, index) => {
              return {
                no: index + 1,
                ...value,
                images: JSON.parse(value?.images)
              };
            })}
            setPagination={setPagination}
            pagination={pagination}
            rowCount={rowCount}
            pageCount={pageCount}
            actions={actions}
          />
        </Box>
      </div>
    </>
  );
};

export default ProductVersionPage;
