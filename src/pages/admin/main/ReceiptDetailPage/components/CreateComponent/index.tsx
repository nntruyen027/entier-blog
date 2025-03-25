import { Backdrop, Button, Divider, Paper, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { getProductVersionsStart } from '~/redux/productVersion/slice';
import { ItemType, ReceiptItem } from '~/types';
import DropdownList from 'react-widgets/DropdownList';
import { getProductsStart } from '~/redux/product/slice';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: ({
    id,
    name,
    quantity,
    donViTinh,
    price,
    type
  }: {
    id: number;
    name: string;
    quantity: number;
    donViTinh: string;
    price: number;
    type: ItemType;
  }) => void;
}

const CreateComponent: React.FC<IProps> = ({ open, setOpen, onSave }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { productVersions } = useSelector((state: RootState) => state.productVersion);
  const { products } = useSelector((state: RootState) => state.product);

  // Các trường dữ liệu cho receipt
  const [selectedProduct, setSelectedProduct] = useState<{ id: number; name: string }>();
  const [selectedProductVersion, setSelectedProductVersion] = useState<ReceiptItem>();
  const [quantity, setQuantity] = useState(0);
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (!open) {
      setSelectedProduct(null);
      setSelectedProductVersion(null);
      setQuantity(0);
      setUnit('');
      setPrice(0);
    } else {
      dispatch(getProductsStart({}));
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (selectedProduct) dispatch(getProductVersionsStart({ productId: selectedProduct.id }));
  }, [selectedProduct]);

  const handleSubmit = () => {
    onSave({
      id: selectedProductVersion.id,
      name: selectedProductVersion.versionName,
      quantity: quantity,
      donViTinh: unit,
      price: price,
      type: selectedProduct
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
          <div className={'flex gap-2'}>
            <DropdownList
              className={'text-left'}
              data={products}
              onChange={(value) => setSelectedProduct(value)}
              value={selectedProduct}
              dataKey='id'
              textField='name'
              placeholder={t('product')}
              defaultValue={1}
            />
            <DropdownList
              className={'text-left'}
              data={productVersions}
              onChange={(value) => setSelectedProductVersion(value)}
              value={selectedProductVersion}
              dataKey='id'
              textField='versionName'
              placeholder={t('name')}
              defaultValue={1}
            />
          </div>
          <div className={'flex gap-2'}>
            <TextField
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              fullWidth
              size='small'
              type='number'
              label={t('quantity')}
            />
            <TextField
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              fullWidth
              size='small'
              label={t('unit')}
            />
            <TextField
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              fullWidth
              size='small'
              label={t('price')}
              type='number'
              InputLabelProps={{ shrink: true }}
            />
          </div>
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
