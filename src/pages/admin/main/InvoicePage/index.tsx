import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { MRT_ColumnDef } from 'material-react-table';
import { RootState } from '~/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { ConfirmModal, Table } from '~/components';
import { CreateComponent, UpdateComponent } from './components';
import { Invoice, RowAction } from '~/types';
import { Category, Delete as DeleteIcon, ModeEdit, PictureAsPdf } from '@mui/icons-material';
import { createInvoiceStart, deleteInvoiceStart, getInvoicesStart, updateInvoiceStart } from '~/redux/invoice/slice';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '~/utils/currency';
import { generatePdf } from '~/redux/invoice/api';

const InvoicePage = () => {
  const { t } = useTranslation();
  const { invoices, pageCount, rowCount } = useSelector((state: RootState) => state.invoice);
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
  const [currentInvoice, setCurrentUser] = useState<Invoice>();

  const columns: MRT_ColumnDef<object>[] = [
    {
      header: '#',
      accessorKey: 'no',
      size: 1,
      enableSorting: false,
      Cell: ({ renderedCellValue }) => <div className='text-center'>{renderedCellValue}</div>
    },
    {
      header: t('customer'),
      accessorKey: 'tenKh',
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
      header: t('customer-address'),
      accessorKey: 'diaChiKh',
      size: 80,
      Cell: ({ renderedCellValue }) => (
        <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', overflowWrap: 'break-word' }}>
          {renderedCellValue}
        </div>
      )
    },
    {
      enableSorting: false,
      header: t('customer-phone'),
      accessorKey: 'sdtKh',
      size: 50,
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
    }
  ];

  const actions: RowAction<object>[] = [
    {
      icon: <Category className='text-blue-500' />,
      onClick: (row) => {
        nav(`${row.original.id}`);
      },
      label: t('invoice-detail', { value: null })
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
    },
    {
      icon: <PictureAsPdf className='text-orange-500' />,
      onClick: async (row) => {
        const response = await generatePdf(row.original.id);
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);

        window.open(pdfUrl, '_blank'); // Mở trong tab mới
      },
      label: t('export-to-pdf', { value: null })
    }
  ];

  useEffect(() => {
    dispatch(getInvoicesStart({ size: pagination.pageSize, page: pagination.pageIndex }));
  }, [dispatch, pagination]);

  const handleSave = ({ items, sdtCuaHang, sdtKh, tenKh, diaChiCuaHang, diaChiKh }: Invoice) => {
    dispatch(
      createInvoiceStart({
        sdtKh,
        sdtCuaHang,
        items,
        tenKh,
        diaChiCuaHang,
        diaChiKh
      })
    );
    setOpenCreate(false);
  };

  const handleUpdate = ({ sdtKh, sdtCuaHang, items, tenKh, diaChiCuaHang, diaChiKh }: Invoice) => {
    if (currentInvoice) {
      dispatch(
        updateInvoiceStart({
          id: currentInvoice.id,
          sdtKh,
          sdtCuaHang,
          items,
          tenKh,
          diaChiCuaHang,
          diaChiKh
        })
      );
      setOpenUpdate(false);
    }
  };

  useEffect(() => {
    if (confirmDelete && currentInvoice) {
      dispatch(deleteInvoiceStart(currentInvoice.id));
      setConfirmDelete(false);
    }
  }, [confirmDelete, currentInvoice, dispatch]);

  return (
    <>
      <CreateComponent open={openCreate} setOpen={setOpenCreate} onSave={handleSave} />
      <UpdateComponent open={openUpdate} setOpen={setOpenUpdate} onSave={handleUpdate} value={currentInvoice} />
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
              invoices?.map((value, index) => ({
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

export default InvoicePage;
