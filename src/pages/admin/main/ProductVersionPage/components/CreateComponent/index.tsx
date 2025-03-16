import { Backdrop, Button, Divider, Paper, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Dropzone, FileMosaic } from '@files-ui/react';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: ({ versionName, price, images }: { versionName: string; price: number; images: string }) => void;
}

const CreateComponent: React.FC<IProps> = ({ open, setOpen, onSave }) => {
  const [versionName, setVersionName] = useState('');
  const [price, setPrice] = useState(0);
  const [files, setFiles] = useState([]);
  const { t } = useTranslation();

  const updateFiles = async (incomingFiles) => {
    if (incomingFiles.length === 0) return;

    try {
      const uploadedFiles = await Promise.all(
        incomingFiles.map(async (fileObj) => {
          const formData = new FormData();
          formData.append('files', fileObj.file);

          const response = await fetch(import.meta.env.VITE_FILE_SERVICE, {
            method: 'POST',
            body: formData
          });

          if (!response.ok) throw new Error(`Upload failed for ${fileObj.file.name}`);

          const data = await response.json();

          return {
            ...fileObj,
            url: data.files[0].url
          };
        })
      );

      setFiles(uploadedFiles);
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

      setFiles(files.filter((x) => x.id !== id));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  useEffect(() => {
    if (!open) {
      setVersionName('');
      setPrice(0);
      setFiles([]);
    }
  }, [open]);

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Paper sx={{ minWidth: '40rem' }}>
        <div className='w-full relative top-0 left-0 text-xl font-bold py-3'>
          <h3 className='lowercase first-letter:uppercase'>{t('create', { value: t('product') })}</h3>
          <CloseIcon
            className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 hover:text-red-600'
            onClick={() => setOpen(false)}
          />
        </div>
        <Divider />
        <div className='p-3 w-full flex flex-col gap-3'>
          <div className='flex w-full gap-3'>
            <TextField
              value={versionName}
              onChange={(e) => setVersionName(e.target.value)}
              fullWidth
              size='small'
              label={t('name')}
            />
            <TextField
              value={price}
              onChange={(e) => setPrice(Number.parseInt(e.target.value))}
              fullWidth
              size='small'
              type='number'
              label={t('price')}
            />
          </div>
          <div className='flex w-full gap-3'>
            <Dropzone
              onChange={updateFiles}
              value={files}
              accept='image/*'
              maxFileSize={100 * 1024 * 1024}
              maxFiles={10}
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
          <Button variant='outlined' onClick={() => onSave({ versionName, price, images: JSON.stringify(files) })}>
            {t('save')}
          </Button>
        </div>
      </Paper>
    </Backdrop>
  );
};

export default CreateComponent;
