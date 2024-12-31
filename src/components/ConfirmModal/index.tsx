import { Backdrop, Button, Divider, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  confirm: boolean;
  setConfirm: (confirm: boolean) => void;
  content: string;
}

const Confirm: React.FC<IProps> = ({ open, setOpen, setConfirm, content }) => {
  const { t } = useTranslation();

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Paper
        sx={{
          minWidth: '40rem'
        }}
      >
        <div className={'w-full relative top-0 left-0 text-xl font-bold py-3'}>
          <h3 className={'lowercase first-letter:uppercase'}>{t('confirm')}</h3>
          <CloseIcon
            className={'cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 hover:text-red-600'}
            onClick={() => setOpen(false)}
          />
        </div>
        <Divider />
        <div className={'p-3 w-full text-left'}>{content}</div>
        <Divider />
        <div className={'p-3 w-full flex gap-3 justify-end'}>
          <Button
            variant={'outlined'}
            color={'error'}
            onClick={() => {
              setConfirm(true);
              setOpen(false);
            }}
          >
            {t('yes')}
          </Button>
          <Button
            variant={'outlined'}
            color={'info'}
            onClick={() => {
              setConfirm(false);
              setOpen(false);
            }}
          >
            {t('cancel')}
          </Button>
        </div>
      </Paper>
    </Backdrop>
  );
};

export default Confirm;
