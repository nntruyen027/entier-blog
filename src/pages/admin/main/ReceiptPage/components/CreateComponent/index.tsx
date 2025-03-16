import { Backdrop, Button, Divider, Paper, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getTypesStart } from '~/redux/productType/slice';
import { getBrandsStart } from '~/redux/brand/slice';
import { ReceiptItem } from '~/types';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: ({
    bbNgay,
    ngayGiao,
    nguoiGiao,
    items,
    bbSoHieu,
    khoTen,
    khoDiaChi,
    nhaCungCap
  }: {
    bbNgay: string;
    ngayGiao: string;
    nguoiGiao: string;
    items: ReceiptItem[];
    bbSoHieu: string;
    khoTen: string;
    khoDiaChi: string;
    nhaCungCap: string;
  }) => void;
}

const CreateComponent: React.FC<IProps> = ({ open, setOpen, onSave }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  // Các trường dữ liệu cho receipt
  const [nguoiGiao, setNguoiGiao] = useState('');
  const [ngayGiao, setNgayGiao] = useState('');
  const [bbSoHieu, setBbSoHieu] = useState('');
  const [bbNgay, setBbNgay] = useState('');
  const [nhaCungCap, setNhaCungCap] = useState('');
  const [khoTen, setKhoTen] = useState('');
  const [khoDiaChi, setKhoDiaChi] = useState('');
  // Mảng items, bạn có thể triển khai thêm giao diện quản lý chi tiết nếu cần
  const [items, setItems] = useState<ReceiptItem[]>([]);

  useEffect(() => {
    if (!open) {
      // Reset form khi đóng modal
      setNguoiGiao('');
      setNgayGiao('');
      setBbSoHieu('');
      setBbNgay('');
      setNhaCungCap('');
      setKhoTen('');
      setKhoDiaChi('');
      setItems([]);
    } else {
      // Nếu cần load dữ liệu tham chiếu, ví dụ types và brands (có thể bỏ nếu không dùng)
      dispatch(getTypesStart({}));
      dispatch(getBrandsStart({}));
    }
  }, [open, dispatch]);

  const handleSubmit = () => {
    onSave({
      bbNgay,
      ngayGiao,
      nguoiGiao,
      items,
      bbSoHieu,
      khoTen,
      khoDiaChi,
      nhaCungCap
    });
    setOpen(false);
  };

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Paper sx={{ minWidth: '40rem', padding: '1rem' }}>
        <div className='w-full relative top-0 left-0 text-xl font-bold py-3'>
          <h3 className='lowercase first-letter:uppercase'>{t('create', { value: t('receipt') })}</h3>
          <CloseIcon
            className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 hover:text-red-600'
            onClick={() => setOpen(false)}
          />
        </div>
        <Divider />
        <div className='p-3 w-full flex flex-col gap-3'>
          <TextField
            value={nguoiGiao}
            onChange={(e) => setNguoiGiao(e.target.value)}
            fullWidth
            size='small'
            label={t('nguoi-giao')}
          />
          <TextField
            value={ngayGiao}
            onChange={(e) => setNgayGiao(e.target.value)}
            fullWidth
            size='small'
            label={t('ngay-giao')}
            type='date'
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            value={bbSoHieu}
            onChange={(e) => setBbSoHieu(e.target.value)}
            fullWidth
            size='small'
            label={t('so-bien-ban')}
          />
          <TextField
            value={bbNgay}
            onChange={(e) => setBbNgay(e.target.value)}
            fullWidth
            size='small'
            label={t('bien-ban-ngay')}
            type='date'
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            value={nhaCungCap}
            onChange={(e) => setNhaCungCap(e.target.value)}
            fullWidth
            size='small'
            label={t('nha-cung-cap')}
          />
          <TextField
            value={khoTen}
            onChange={(e) => setKhoTen(e.target.value)}
            fullWidth
            size='small'
            label={t('kho-ten')}
          />
          <TextField
            value={khoDiaChi}
            onChange={(e) => setKhoDiaChi(e.target.value)}
            fullWidth
            size='small'
            label={t('kho-dia-chi')}
          />
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

export default CreateComponent;
