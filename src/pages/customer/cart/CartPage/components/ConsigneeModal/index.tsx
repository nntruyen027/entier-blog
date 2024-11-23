import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import {
  Backdrop,
  Button,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Divider } from '~/components';
import { useDispatch, useSelector } from 'react-redux';
import { getDistrictsStart, getProvincesStart, getWardsStart } from '~/redux/location/slice';
import { RootState } from '~/redux/store';
import { Address, Consignee } from '~/types';

interface ConsigneeModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  consignee: Consignee;
  setConsignee: (consignee: Consignee) => void;
}

const ConsigneeModal: React.FC<ConsigneeModalProps> = ({ show, setShow, consignee, setConsignee }) => {
  const { t } = useTranslation();
  const [isMale, setIsMale] = useState<boolean>(consignee.isMale);
  const [name, setName] = useState<string>(consignee.name);
  const [phone, setPhone] = useState<string>(consignee.phone);
  const [province, setProvince] = useState<string>(consignee.address.province.id || '');
  const [district, setDistrict] = useState<string>(consignee.address.district.id || '');
  const [ward, setWard] = useState<string>(consignee.address.ward.id || '');
  const [detail, setDetail] = useState<string>(consignee.address?.detail || '');

  const dispatch = useDispatch();
  const { provinces, districts, wards } = useSelector((state: RootState) => state.location);

  useEffect(() => {
    dispatch(getProvincesStart());
  }, [dispatch]);

  useEffect(() => {
    if (province) {
      dispatch(getDistrictsStart(province));
    }
  }, [province, dispatch]);

  useEffect(() => {
    if (district) {
      dispatch(getWardsStart(district));
    }
  }, [district, dispatch]);

  const handleProvinceChange = (newProvince: string) => {
    setProvince(newProvince);
    setDistrict('');
    setWard('');
  };

  const handleDistrictChange = (newDistrict: string) => {
    setDistrict(newDistrict);
    setWard('');
  };

  const onConfirm = () => {
    const updatedAddress: Address = {
      province: provinces.find((p) => p.id == province) || { id: '', name: '' },
      district: districts.find((d) => d.id == district) || { id: '', name: '' },
      ward: wards.find((w) => w.id == ward) || { id: '', name: '' },
      detail
    };
    console.log(province, district, ward, updatedAddress);

    setConsignee({
      ...consignee,
      name,
      phone,
      isMale,
      address: updatedAddress
    });

    setShow(false);
  };

  return (
    show && (
      <Backdrop open={show} sx={{ zIndex: 1001 }}>
        <div className='fixed z-20 w-screen h-screen top-0 left-0'>
          <div className='absolute top-1/2 left-1/2 w-1/3 h-[90%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg'>
            <div className='relative top-0 left-0 p-3'>
              <span className='text-black font-bold inline-block lowercase first-letter:uppercase'>
                {t('consignee-info')}
              </span>
              <FontAwesomeIcon
                onClick={() => setShow(false)}
                className='absolute right-4 top-4 cursor-pointer'
                icon={faClose}
              />
            </div>
            <Divider />
            <div className='text-left p-3 text-sm'>
              <FormControl fullWidth>
                <span className='font-bold text-sm inline-block lowercase first-letter:uppercase'>
                  {t('user-info')}
                </span>
                <RadioGroup row value={isMale} onChange={(e) => setIsMale(e.target.value === 'true')}>
                  <FormControlLabel value={true} control={<Radio />} label={t('mr')} />
                  <FormControlLabel value={false} control={<Radio />} label={t('ms')} />
                </RadioGroup>
                <TextField
                  size='small'
                  label={t('full-name')}
                  value={name}
                  fullWidth
                  onChange={(e) => setName(e.target.value)}
                  sx={{ marginTop: '10px' }}
                />
                <TextField
                  size='small'
                  label={t('phone')}
                  value={phone}
                  fullWidth
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{ marginTop: '15px' }}
                />
              </FormControl>
            </div>
            <Divider bold={8} />
            <div className='text-left p-3 text-sm'>
              <FormControl fullWidth>
                <span className='font-bold inline-block lowercase first-letter:uppercase'>{t('address')}</span>
                <div className='flex justify-between gap-3 mt-2'>
                  <Select
                    value={province}
                    onChange={(e) => handleProvinceChange(e.target.value)}
                    displayEmpty
                    size='small'
                    fullWidth
                    sx={{ maxWidth: '30%' }}
                  >
                    <MenuItem value='' disabled>
                      {t('province')}
                    </MenuItem>
                    {provinces.map((prov) => (
                      <MenuItem key={prov.id} value={prov.id}>
                        {prov.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Select
                    value={district}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    displayEmpty
                    size='small'
                    fullWidth
                    sx={{ maxWidth: '30%' }}
                    disabled={!province}
                  >
                    <MenuItem value='' disabled>
                      {t('district')}
                    </MenuItem>
                    {districts.map((dist) => (
                      <MenuItem key={dist.id} value={dist.id}>
                        {dist.name}
                      </MenuItem>
                    ))}
                  </Select>
                  <Select
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                    displayEmpty
                    size='small'
                    fullWidth
                    sx={{ maxWidth: '30%' }}
                    disabled={!district}
                  >
                    <MenuItem value='' disabled>
                      {t('ward')}
                    </MenuItem>
                    {wards.map((ward) => (
                      <MenuItem key={ward.id} value={ward.id}>
                        {ward.name}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <TextField
                  size='small'
                  label={t('detail')}
                  value={detail}
                  fullWidth
                  onChange={(e) => setDetail(e.target.value)}
                  sx={{ marginTop: '15px' }}
                />
              </FormControl>
            </div>
            <Divider bold={8} />
            <div className='absolute bottom-0 w-full left-0 p-3 '>
              <Button
                sx={{
                  textTransform: 'lowercase',
                  display: 'inline-block',
                  ':first-letter': {
                    textTransform: 'uppercase'
                  }
                }}
                fullWidth
                variant='contained'
                onClick={onConfirm}
              >
                {t('confirm')}
              </Button>
            </div>
          </div>
        </div>
      </Backdrop>
    )
  );
};

export default ConsigneeModal;
