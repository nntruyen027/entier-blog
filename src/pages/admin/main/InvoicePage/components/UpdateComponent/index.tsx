import { Backdrop, Button, Divider, Paper, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Dropzone, FileMosaic } from '@files-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import DropdownList from 'react-widgets/DropdownList';
import { getTypesStart } from '~/redux/productType/slice';
import { getBrandsStart } from '~/redux/brand/slice';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: ({ name, description, image, type, brand }) => void;
  value?: {
    id: number;
    name: string;
    description: string;
    image?: string;
    type: { id: number; name: string; description: string; image: string };
    brand: { id: number; name: string; description: string; image: string };
  };
}

const UpdateComponent: React.FC<IProps> = ({ open, setOpen, onSave, value }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState([]);
  const [type, setType] = useState<{ id: number; name: string; image: string; description: string }>();
  const [brand, setBrand] = useState<{ id: number; name: string; image: string; description: string }>();
  const { t } = useTranslation();
  const { types } = useSelector((state: RootState) => state.productType);
  const { brands } = useSelector((state: RootState) => state.brand);
  const dispatch = useDispatch();

  useEffect(() => {
    if (value && open) {
      setName(value.name || '');
      setDescription(value.description || '');
      setBrand(value.brand);
      setType(value.type);
      setFiles(
        value.image
          ? [
              {
                id: 'saved',
                name: 'Current Image',
                url: value.image,
                preview: value.image,
                imageUrl: value.image
              }
            ]
          : []
      );
    }
    dispatch(getTypesStart({}));
    dispatch(getBrandsStart({}));
  }, [value, open]);

  const updateFiles = async (incomingFiles) => {
    if (incomingFiles.length === 0) return;

    const file = incomingFiles[0].file;
    const formData = new FormData();
    formData.append('files', file);

    try {
      const response = await fetch(import.meta.env.VITE_FILE_SERVICE, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      setFiles([{ ...incomingFiles[0], url: data.files[0].url, imageUrl: data.files[0].url }]);
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const removeFile = async (id) => {
    const fileToDelete = files.find((file) => file.id === id);
    if (!fileToDelete || !fileToDelete.url) return;

    const filename = fileToDelete.url.split('/').pop();

    try {
      const response = await fetch(`${import.meta.env.VITE_FILE_SERVICE}/${filename}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Delete failed');

      setFiles([]);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Paper sx={{ minWidth: '40rem' }}>
        <div className='w-full relative top-0 left-0 text-xl font-bold py-3'>
          <h3 className='lowercase first-letter:uppercase'>{t('edit', { value: t('product') })}</h3>
          <CloseIcon
            className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 hover:text-red-600'
            onClick={() => setOpen(false)}
          />
        </div>
        <Divider />
        <div className='p-3 w-full flex flex-col gap-3'>
          <div className='flex w-full gap-3'>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              size='small'
              label={t('name')}
            />
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              size='small'
              label={t('description')}
            />
          </div>

          <div className='flex w-full gap-3'>
            <DropdownList
              className={'text-left'}
              data={types}
              onChange={(value) => setType(value)}
              value={type}
              dataKey='id'
              textField='name'
              placeholder={t('type')}
              defaultValue={1}
            />
            <DropdownList
              className={'text-left'}
              data={brands}
              onChange={(value) => setBrand(value)}
              value={brand}
              dataKey='id'
              textField='name'
              placeholder={t('brand')}
              defaultValue={1}
            />
          </div>
          <div className='flex w-full gap-3'>
            <Dropzone
              onChange={updateFiles}
              value={files}
              accept='image/*'
              maxFileSize={100 * 1024 * 1024}
              maxFiles={1}
              actionButtons={{ uploadButton: {}, abortButton: {} }}
            >
              {files.map((file) => (
                <FileMosaic key={file.id} {...file} onDelete={removeFile} info preview />
              ))}
            </Dropzone>
          </div>
        </div>
        <Divider />
        <div className='p-3 w-full flex gap-3 justify-end'>
          <Button
            variant='outlined'
            onClick={() => onSave({ name, description, image: files?.[0]?.url, brand: brand.id, type: type.id })}
          >
            {t('save')}
          </Button>
        </div>
      </Paper>
    </Backdrop>
  );
};

export default UpdateComponent;
