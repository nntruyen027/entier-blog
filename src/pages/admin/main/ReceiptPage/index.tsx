import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MRT_ColumnDef } from 'material-react-table';
import { RootState } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ConfirmModal, Table } from '~/components';
import { CreateComponent, UpdateComponent } from './components';
import { Receipt, RowAction } from '~/types';
import { Category, Delete as DeleteIcon, ModeEdit } from '@mui/icons-material';
import { createReceiptStart, deleteReceiptStart, getReceiptsStart, updateReceiptStart } from '~/redux/receipt/slice';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '~/utils/date';
import { formatCurrency } from '~/utils/currency';

const ReceiptPage = () => {
  const { t } = useTranslation();
  const { receipts, pageCount, rowCount } = useSelector((state: RootState) => state.receipt);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10
  });

  const [openCreate, setOpenCreate] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>();
  const [currentReceipt, setCurrentUser] = useState<Receipt>();

  const columns: MRT_ColumnDef<object>[] = [
    {
      header: '#',
      accessorKey: 'no',
      size: 1,
      enableSorting: false,
      Cell: ({ renderedCellValue }) => <div className='text-center'>{renderedCellValue}</div>
    },
    {
      header: t('so-bien-ban'),
      accessorKey: 'bbSoHieu',
      enableColumnOrdering: true,
      enableMultiSort: true,
      size: 80,
      Cell: ({ renderedCellValue }) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {renderedCellValue}
        </div>
      )
    },
    {
      header: t('nha-cung-cap'),
      accessorKey: 'nhaCungCap',
      size: 80,
      Cell: ({ renderedCellValue }) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {renderedCellValue}
        </div>
      )
    },
    {
      enableSorting: false,
      header: t('date'),
      accessorKey: 'bbNgay',
      size: 50,
      Cell: ({ renderedCellValue }) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {formatDate(String(renderedCellValue))}
        </div>
      )
    },
    {
      enableSorting: false,
      header: t('warehouse'),
      accessorKey: 'khoTen',
      size: 90,
      Cell: ({ renderedCellValue }) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {renderedCellValue}
        </div>
      )
    },
    {
      enableSorting: false,
      header: t('total-amount'),
      accessorKey: 'totalAmount',
      size: 50,
      Cell: ({ renderedCellValue }) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {formatCurrency(Number(renderedCellValue))}
        </div>
      )
    },
    {
      enableSorting: false,
      header: t('ngay-giao'),
      accessorKey: 'ngayGiao',
      size: 90,
      Cell: ({ renderedCellValue }) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {formatDate(String(renderedCellValue))}
        </div>
      )
    }
  ];

  const actions: RowAction<object>[] = [
    {
      icon: <Category className='text-blue-500' />,
      onClick: (row) => {
        nav(`${row.original.id}`);
      },
      label: t('receipt-version', { value: null })
    },
    {
      icon: <ModeEdit className='text-green-500' />,
      onClick: (row) => {
        setCurrentUser(row.original);
        setOpenUpdate(true);
      },
      label: t('edit', { value: null })
    },
    {
      icon: <DeleteIcon className='text-red-500' />,
      onClick: (row) => {
        setCurrentUser(row.original);
        setOpenDelete(true);
      },
      label: t('delete', { value: null })
    }
  ];

  useEffect(() => {
    dispatch(getReceiptsStart({ size: pagination.pageSize, page: pagination.pageIndex }));
  }, [dispatch, pagination]);

  const handleSave = ({ bbNgay, ngayGiao, nguoiGiao, items, bbSoHieu, khoTen, khoDiaChi, nhaCungCap }: Receipt) => {
    dispatch(
      createReceiptStart({
        bbNgay: `${bbNgay}T00:00:00`,
        ngayGiao,
        nguoiGiao,
        items,
        bbSoHieu,
        khoTen,
        khoDiaChi,
        nhaCungCap
      })
    );
    setOpenCreate(false);
  };

  const handleUpdate = ({
    bbNgay,
    ngayGiao,
    nguoiGiao,
    items,
    bbSoHieu,
    khoTen,
    khoDiaChi,
    nhaCungCap,
    thoiGianTao,
    totalAmount
  }: Receipt) => {
    if (currentReceipt) {
      dispatch(
        updateReceiptStart({
          id: currentReceipt.id,
          bbNgay: `${bbNgay}T00:00:00`,
          ngayGiao,
          nguoiGiao,
          items,
          bbSoHieu,
          khoTen,
          khoDiaChi,
          nhaCungCap,
          thoiGianTao,
          totalAmount
        })
      );
      setOpenUpdate(false);
    }
  };

  useEffect(() => {
    if (confirmDelete && currentReceipt) {
      dispatch(deleteReceiptStart(currentReceipt.id));
      setConfirmDelete(false);
    }
  }, [confirmDelete, currentReceipt, dispatch]);

  return (
    <>
      <CreateComponent open={openCreate} setOpen={setOpenCreate} onSave={handleSave} />
      <UpdateComponent open={openUpdate} setOpen={setOpenUpdate} onSave={handleUpdate} value={currentReceipt} />
      <ConfirmModal
        open={openDelete}
        setOpen={setOpenDelete}
        confirm={confirmDelete}
        setConfirm={setConfirmDelete}
        content={t('confirm-delete', { value: t('type') })}
      />
      <div className='w-full p-3'>
        <div className='flex mb-4'>
          <Button variant='contained' style={{ marginLeft: 'auto' }} onClick={() => setOpenCreate(true)}>
            {t('add')}
          </Button>
        </div>
        <div className='w-full'>
          <Table
            columns={columns}
            data={
              receipts?.map((value, index) => ({
                no: index + 1,
                ...value
              })) || []
            }
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

export default ReceiptPage;
