import { Backdrop, Button, Divider, Paper, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Dropzone, FileMosaic } from '@files-ui/react';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: ({ name, description, icon, image }) => void;
  value?: { id: number; name: string; description: string; icon: string; image?: string };
}

const UpdateComponent: React.FC<IProps> = ({ open, setOpen, onSave, value }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [files, setFiles] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (value && open) {
      setName(value.name || '');
      setDescription(value.description || '');
      setIcon(value.icon || '');
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
          <h3 className='lowercase first-letter:uppercase'>{t('edit', { value: t('product-type') })}</h3>
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
            <TextField
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              fullWidth
              size='small'
              label={t('icon')}
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
          <Button variant='outlined' onClick={() => onSave({ name, description, icon, image: files?.[0]?.url })}>
            {t('save')}
          </Button>
        </div>
      </Paper>
    </Backdrop>
  );
};

export default UpdateComponent;
