import {
  Backdrop,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  TextField
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: ({ id, fullName, email, phone, isMale }) => void;
  value: { fullName: string; id: number; email: string; phone: string; isMale: boolean };
}

const UpdateComponent: React.FC<IProps> = ({ open, setOpen, onSave, value }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isMale, setIsMale] = useState(true);
  const [email, setEmail] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    console.log(value);
    setFullName(value?.fullName);
    setPhone(value?.phone);
    setEmail(value?.email);
    setIsMale(value?.isMale);
  }, [value]);

  useEffect(() => {
    if (!open) return;
  }, [open]);

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Paper
        sx={{
          minWidth: '40rem'
        }}
      >
        <div className={'w-full relative top-0 left-0 text-xl font-bold py-3'}>
          <h3 className={'lowercase first-letter:uppercase'}>{t('update', { value: t('role') })}</h3>
          <CloseIcon
            className={'cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 hover:text-red-600'}
            onClick={() => setOpen(false)}
          />
        </div>
        <Divider />
        <div className={'p-3 w-full flex flex-col gap-3'}>
          <div className={'flex w-full gap-3'}>
            <TextField
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              fullWidth
              size={'small'}
              label={t('name')}
            />
            <TextField
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              size={'small'}
              label={t('phone')}
            />
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              size={'small'}
              label={t('email')}
            />
          </div>
          <div>
            <FormControl
              fullWidth
              size={'small'}
              sx={{
                textAlign: 'left'
              }}
            >
              <FormLabel id='demo-row-radio-buttons-group-label'>{t('gender')}</FormLabel>
              <RadioGroup
                onChange={(e) => setIsMale(e.target.value == 'true')}
                value={isMale?.toString()}
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                sx={{
                  display: 'flex',
                  justifyContent: 'left',
                  gap: '3rem'
                }}
              >
                <FormControlLabel value={'false'} control={<Radio />} label={t('female')} />
                <FormControlLabel value={'true'} control={<Radio />} label={t('male')} />
              </RadioGroup>
            </FormControl>
          </div>
        </div>
        <Divider />
        <div className={'p-3 w-full flex gap-3 justify-end'}>
          <Button variant={'outlined'} onClick={() => onSave({ id: value.id, fullName, email, phone, isMale })}>
            {t('save')}
          </Button>
        </div>
      </Paper>
    </Backdrop>
  );
};

export default UpdateComponent;
