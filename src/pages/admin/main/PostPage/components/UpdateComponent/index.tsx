import { Backdrop, Button, Divider, Paper, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Dropzone, FileMosaic } from '@files-ui/react';
import { Editor } from '~/components';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: ({ title, content, image }) => void;
  value?: {
    id: number;
    title: string;
    content: string;
    image?: string;
  };
}

const UpdateComponent: React.FC<IProps> = ({ open, setOpen, onSave, value }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (value && open) {
      setTitle(value?.title || '');
      setContent(value?.content || '');
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

    const filetitle = fileToDelete.url.split('/').pop();

    try {
      const response = await fetch(`${import.meta.env.VITE_FILE_SERVICE}/${filetitle}`, {
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
      <Paper sx={{ minWidth: '80rem', maxWidth: '90%' }}>
        <div className='w-full relative top-0 left-0 text-xl font-bold py-3'>
          <h3 className='lowercase first-letter:uppercase'>{t('create', { value: t('post') })}</h3>
          <CloseIcon
            className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 hover:text-red-600'
            onClick={() => setOpen(false)}
          />
        </div>
        <Divider />
        <div className='p-3 w-full flex flex-col gap-3'>
          <div className='flex w-full gap-3'>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              size='small'
              label={t('title')}
            />
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

          <div className='flex w-full h-fit gap-3'>
            <Editor value={content} onChange={(e) => setContent(e.html)} />
          </div>
        </div>
        <Divider />
        <div className='p-3 w-full flex gap-3 justify-end'>
          <Button variant='outlined' onClick={() => onSave({ title, content, image: files?.[0]?.url })}>
            {t('save')}
          </Button>
        </div>
      </Paper>
    </Backdrop>
  );
};

export default UpdateComponent;
