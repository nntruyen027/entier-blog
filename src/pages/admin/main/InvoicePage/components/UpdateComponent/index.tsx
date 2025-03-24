import { Backdrop, Button, Divider, Paper, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Invoice, InvoiceItem } from '~/types';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: (data: {
    tenKh: string;
    sdtKh: string;
    diaChiKh: string;
    sdtCuaHang: string;
    diaChiCuaHang: string;
    items: InvoiceItem[];
  }) => void;
  value?: Invoice;
}

const UpdateComponent: React.FC<IProps> = ({ open, setOpen, onSave, value }) => {
  const { t } = useTranslation();

  // Khai báo state cho các trường của invoice
  const [tenKh, setTenKh] = useState('');
  const [sdtKh, setSdtKh] = useState('');
  const [diaChiKh, setDiaChiKh] = useState('');
  const [sdtCuaHang, setSdtCuaHang] = useState('');
  const [diaChiCuaHang, setDiaChiCuaHang] = useState('');
  const [items, setItems] = useState<InvoiceItem[]>([]);

  useEffect(() => {
    if (open && value) {
      setTenKh(value.tenKh || '');
      setSdtKh(value.sdtKh || '');
      setDiaChiKh(value.diaChiKh || '');
      setSdtCuaHang(value.sdtCuaHang || '');
      setDiaChiCuaHang(value.diaChiCuaHang || '');
      setItems(value.items || []);
    }
  }, [open, value]);

  const handleSubmit = () => {
    onSave({
      tenKh,
      sdtKh,
      diaChiKh,
      sdtCuaHang,
      diaChiCuaHang,
      items
    });
    setOpen(false);
  };

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Paper sx={{ minWidth: '40rem', padding: '1rem' }}>
        <div className='w-full relative top-0 left-0 text-xl font-bold py-3'>
          <h3 className='lowercase first-letter:uppercase'>{t('edit', { value: t('invoice') })}</h3>
          <CloseIcon
            className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 hover:text-red-600'
            onClick={() => setOpen(false)}
          />
        </div>
        <Divider />
        <div className='p-3 w-full flex flex-col gap-3'>
          <TextField
            value={tenKh}
            onChange={(e) => setTenKh(e.target.value)}
            fullWidth
            size='small'
            label={t('ten-khach-hang')}
          />
          <TextField
            value={sdtKh}
            onChange={(e) => setSdtKh(e.target.value)}
            fullWidth
            size='small'
            label={t('sdt-khach-hang')}
          />
          <TextField
            value={diaChiKh}
            onChange={(e) => setDiaChiKh(e.target.value)}
            fullWidth
            size='small'
            label={t('dia-chi-khach-hang')}
          />
          <TextField
            value={sdtCuaHang}
            onChange={(e) => setSdtCuaHang(e.target.value)}
            fullWidth
            size='small'
            label={t('sdt-cua-hang')}
          />
          <TextField
            value={diaChiCuaHang}
            onChange={(e) => setDiaChiCuaHang(e.target.value)}
            fullWidth
            size='small'
            label={t('dia-chi-cua-hang')}
          />
          {/* Nếu cần, bổ sung giao diện quản lý items của invoice */}
        </div>
        <Divider />
        <div className='p-3 w-full flex gap-3 justify-end'>
          <Button variant='outlined' onClick={handleSubmit}>
            {t('save')}
          </Button>
        </div>
      </Paper>
    </Backdrop>
  );
};

export default UpdateComponent;
