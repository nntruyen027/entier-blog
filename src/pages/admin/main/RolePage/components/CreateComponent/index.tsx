import { Backdrop, Button, Divider, Paper, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: ({ roleName }) => void;
}

const UpdateComponent: React.FC<IProps> = ({ open, setOpen, onSave }) => {
  const [roleName, setRoleName] = useState('');
  const { t } = useTranslation();

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Paper
        sx={{
          minWidth: '40rem'
        }}
      >
        <div className={'w-full relative top-0 left-0 text-xl font-bold py-3'}>
          <h3 className={'lowercase first-letter:uppercase'}>{t('create', { value: t('role') })}</h3>
          <CloseIcon
            className={'cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 hover:text-red-600'}
            onClick={() => setOpen(false)}
          />
        </div>
        <Divider />
        <div className={'p-3 w-full flex gap-3'}>
          <TextField
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            fullWidth
            size={'small'}
            label={t('name')}
          />
          <Button variant={'outlined'} onClick={() => onSave({ roleName })}>
            {t('save')}
          </Button>
        </div>
      </Paper>
    </Backdrop>
  );
};

export default UpdateComponent;
