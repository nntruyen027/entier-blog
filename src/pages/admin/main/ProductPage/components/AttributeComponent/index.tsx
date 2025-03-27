import { Backdrop, Button, Divider, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import { getProductStart, updateProductAttributeStart } from '~/redux/product/slice';
import { getAttributeValuesStart } from '~/redux/attributeValue/slice';
import { TransferList } from '~/components';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  value?: {
    id: number;
    name: string;
    description: string;
    image?: string;
    type: { id: number; name: string; description: string; image: string };
    brand: { id: number; name: string; description: string; image: string };
  };
}

const UpdateComponent: React.FC<IProps> = ({ open, setOpen, value }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { product } = useSelector((state: RootState) => state.product);
  const [selectedData, setSelectedData] = useState(product?.attributeValues || []);
  const { attributeValues } = useSelector((state: RootState) => state.attributeValue);

  useEffect(() => {
    if (value && open) {
      dispatch(getProductStart(value.id));
      dispatch(getAttributeValuesStart({}));
    }
  }, [value, open, dispatch]);

  const updateAttributeValues = () => {
    dispatch(updateProductAttributeStart({ id: value.id, ids: selectedData?.map((e) => e.id) }));
    setOpen(false);
  };

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Paper sx={{ minWidth: '40rem' }}>
        <div className='w-full relative top-0 left-0 text-xl font-bold py-3'>
          <h3 className='lowercase first-letter:uppercase'>{t('edit', { value: t('attribute-value') })}</h3>
          <CloseIcon
            className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 hover:text-red-600'
            onClick={() => setOpen(false)}
          />
        </div>
        <Divider />
        <div className='p-3 w-full flex flex-col gap-3'>
          <div className='flex w-full h-[80%] gap-3'>
            <TransferList
              dataList={attributeValues}
              selectedData={selectedData}
              setSelectDataList={setSelectedData}
              getId={(item) => item.id}
              getLabel={(item) => item.name}
              height={500}
            />
          </div>
        </div>
        <Divider />
        <div className='p-3 w-full flex gap-3 justify-end'>
          <Button variant='outlined' onClick={updateAttributeValues}>
            {t('save')}
          </Button>
        </div>
      </Paper>
    </Backdrop>
  );
};

export default UpdateComponent;
