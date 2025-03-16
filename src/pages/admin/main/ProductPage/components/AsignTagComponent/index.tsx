import React, { useEffect, useState } from 'react';
import { Backdrop, Box, Button, Divider, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/redux/store';
import CheckboxesTags from '~/components/CheckboxesTags';
import { getTagsStart } from '~/redux/tag/slice';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: ({ id, tags }: { id: number; tags: string }) => void;
  value: {
    id: number;
    name: string;
    description: string;
    image: string;
    type: any;
    brand: any;
    tags: any[];
  };
}

interface Tag {
  id: number;
  name: string;
}

const DecentralizeComponent: React.FC<IProps> = ({ open, setOpen, onSave, value }) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const { t } = useTranslation();
  const { tags } = useSelector((state: RootState) => state.tag);
  const dispatch = useDispatch();

  useEffect(() => {
    if (value && Array.isArray(value.tags)) {
      setSelectedTags(value.tags);
    } else {
      setSelectedTags([]);
    }
  }, [value]); // ✅ Chỉ chạy lại khi `value` thay đổi

  useEffect(() => {
    dispatch(getTagsStart({}));
  }, [dispatch]); // ✅ Chỉ gọi API một lần khi component mount

  const handleSave = () => {
    onSave({ id: value.id, tags: selectedTags.map((i) => i.id).join(', ') });
    setOpen(false);
  };

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Paper sx={{ minWidth: '40rem' }}>
        <Box className='relative' sx={{ padding: '6px 0' }}>
          <h3 className='text-xl font-bold'>{t('assign-tag')}</h3>
          <CloseIcon
            className='cursor-pointer absolute top-1/2 right-3 -translate-y-1/2 hover:text-red-600'
            onClick={() => setOpen(false)}
          />
        </Box>
        <Divider />
        <Box p={3}>
          <CheckboxesTags<Tag>
            options={tags}
            onSelectionChange={setSelectedTags}
            getOptionLabel={(option) => option.name}
            label={t('tag')}
            placeholder={t('tag')}
            defaultChecked={selectedTags}
          />
        </Box>
        <Divider />
        <Box display='flex' justifyContent='flex-end' gap={2} p={2}>
          <Button variant='outlined' onClick={handleSave}>
            {t('save')}
          </Button>
        </Box>
      </Paper>
    </Backdrop>
  );
};

export default DecentralizeComponent;
