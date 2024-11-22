import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { Backdrop, FormControl, FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material';
import { useState } from 'react';
import { Divider } from '~/components';

interface ConsigneeModal {
  show: boolean;
  setShow: (show: boolean) => void;
}

const ConsigneeModal: React.FC<ConsigneeModal> = ({ show, setShow }) => {
  const { t } = useTranslation();
  const [isMale, setIsMale] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  return (
    show && (
      <Backdrop
        open={show}
        sx={{
          zIndex: 10001
        }}
      >
        <div className={'fixed z-20 w-screen h-screen top-0 left-0'}>
          <div
            className={'absolute top-1/2 left-1/2 w-1/3 h-[90%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg'}
          >
            <div className={'relative top-0 left-0 p-3'}>
              <span className={'text-black font-bold'}>{t('consignee-info')}</span>
              <FontAwesomeIcon
                onClick={() => setShow(false)}
                className={'absolute right-4 top-4 cursor-pointer'}
                icon={faClose}
              />
            </div>
            <Divider />
            <div className={'text-left p-3 text-sm'}>
              <FormControl
                sx={{
                  fontSize: '14px' // Cách này không áp dụng trực tiếp lên các con bên trong
                }}
                fullWidth
              >
                <span className={'font-bold text-sm'} style={{ fontSize: '14px' }}>
                  {t('user-info')}
                </span>
                <RadioGroup
                  row
                  value={isMale}
                  onChange={(e) => setIsMale(e.target.value == 'true')}
                  sx={{
                    fontSize: '14px' // Điều chỉnh kích thước chữ trên các RadioGroup
                  }}
                >
                  <FormControlLabel value={true} control={<Radio />} label={t('mr')} sx={{ fontSize: '14px' }} />
                  <FormControlLabel value={false} control={<Radio />} label={t('ms')} sx={{ fontSize: '14px' }} />
                </RadioGroup>
                <TextField
                  sx={{
                    marginTop: '10px',
                    '& .MuiInputBase-input': {
                      fontSize: '14px' // Điều chỉnh kích thước chữ trong TextField
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '14px' // Điều chỉnh kích thước chữ của nhãn
                    }
                  }}
                  size={'small'}
                  label={t('full-name')}
                  value={name}
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                />
                <TextField
                  sx={{
                    marginTop: '15px',
                    '& .MuiInputBase-input': {
                      fontSize: '14px'
                    },
                    '& .MuiInputLabel-root': {
                      fontSize: '14px'
                    }
                  }}
                  size={'small'}
                  label={t('phone')}
                  value={phone}
                  fullWidth
                  onChange={(e) => setPhone(e.target.value)}
                />
              </FormControl>
            </div>
            <Divider bold={8} />
            <div>{/* TODO: develop address */}</div>
          </div>
        </div>
      </Backdrop>
    )
  );
};

export default ConsigneeModal;
