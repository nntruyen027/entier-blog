import React, { useEffect, useState } from 'react';
import { Backdrop, Box, Button, Divider, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import CheckboxesTags from '~/components/CheckboxesTags';
import { getRolesStart } from '~/redux/role/slice'; // Đường dẫn chính xác của CheckboxesTags

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: ({ username, roles }) => void;
  value: { fullName: string; id: number; email: string; phone: string; isMale: boolean; roles: RoleType[]; account };
}

interface RoleType {
  id: number;
  roleName: string;
}

const DecentralizeComponent: React.FC<IProps> = ({ open, setOpen, onSave, value }) => {
  const [assignedRoles, setAssignedRoles] = useState<RoleType[]>([]);
  const { t } = useTranslation();
  const { roles } = useSelector((state: RootState) => state.role);
  const dispatch = useDispatch();
  useEffect(() => {
    if (value && Array.isArray(value.account.roles)) {
      setAssignedRoles(value.account.roles);
    } else {
      setAssignedRoles([]);
    }
  }, [value, roles]);

  useEffect(() => {
    dispatch(getRolesStart({}));
  }, []);

  const handleSave = () => {
    onSave({ username: value.account?.username, roles: assignedRoles.map((value) => value.roleName) });
    setOpen(false);
  };

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Paper sx={{ minWidth: '40rem' }}>
        <Box className='relative' sx={{ padding: '6px 0' }}>
          <h3 className='text-xl font-bold'>{t('decentralize')}</h3>
          <CloseIcon
            className='cursor-pointer absolute top-1/2 right-3 -translate-y-1/2 hover:text-red-600'
            onClick={() => setOpen(false)}
          />
        </Box>
        <Divider />
        <Box p={3}>
          <CheckboxesTags<RoleType>
            options={roles}
            onSelectionChange={setAssignedRoles}
            getOptionLabel={(option) => option.roleName}
            label={t('role')}
            placeholder={t('role')}
            defaultChecked={value.account.roles}
          />
        </Box>
        <Divider />
        <Box display='flex' justifyContent='flex-end' gap={2} pt={2}>
          <Button variant='outlined' onClick={handleSave}>
            {t('save')}
          </Button>
        </Box>
      </Paper>
    </Backdrop>
  );
};

export default DecentralizeComponent;
