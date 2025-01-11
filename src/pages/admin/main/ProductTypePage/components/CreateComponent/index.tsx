import { Backdrop, Button, Divider, Paper, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { Dropzone, FileMosaic } from '@files-ui/react';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: ({ name, description, icon, image }) => void;
}

const CreateComponent: React.FC<IProps> = ({ open, setOpen, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [files, setFiles] = useState([]);
  const { t } = useTranslation();

  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };
  const removeFile = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };

  useEffect(() => {
    if (!open) {
      setName('');
      setDescription('');
      setIcon('');
      setFiles([]);
    }
  }, [open]);

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Paper
        sx={{
          minWidth: '40rem'
        }}
      >
        <div className={'w-full relative top-0 left-0 text-xl font-bold py-3'}>
          <h3 className={'lowercase first-letter:uppercase'}>{t('create', { value: t('product-type') })}</h3>
          <CloseIcon
            className={'cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 hover:text-red-600'}
            onClick={() => setOpen(false)}
          />
        </div>
        <Divider />
        <div className={'p-3 w-full flex flex-col gap-3'}>
          <div className={'flex w-full gap-3'}>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              size={'small'}
              label={t('name')}
            />
            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              size={'small'}
              label={t('description')}
            />
            <TextField
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              fullWidth
              size={'small'}
              label={t('icon')}
            />
          </div>
          <div className={'flex w-full gap-3'}>
            <Dropzone
              onChange={updateFiles}
              value={files}
              accept={'image/*'}
              maxFileSize={100 * 1024 * 1024}
              maxFiles={1}
              actionButtons={{ uploadButton: {}, abortButton: {} }}
              uploadConfig={{
                url: 'https://www.myawsomeserver.com/upload',
                method: 'POST',
                headers: {
                  Authorization: 'bearer HTIBI/IBYG/&GU&/GV%&G/&IC%&V/Ibi76bfh8g67gg68g67i6g7G&58768&/(&/(FR&G/&H%&/'
                },
                cleanOnUpload: true
              }}
              fakeUpload
            >
              {files.map((file) => (
                <FileMosaic key={file.id} {...file} onDelete={removeFile} info preview />
              ))}
            </Dropzone>
          </div>
        </div>
        <Divider />
        <div className={'p-3 w-full flex gap-3 justify-end'}>
          <Button variant={'outlined'} onClick={() => onSave({ name, description, icon, image: files?.[0].file })}>
            {t('save')}
          </Button>
        </div>
      </Paper>
    </Backdrop>
  );
};

export default CreateComponent;
