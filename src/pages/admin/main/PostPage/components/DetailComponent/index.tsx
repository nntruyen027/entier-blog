import { Backdrop, Divider, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';

interface IProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  value?: {
    id: number;
    title: string;
    content: string;
    image?: string;
  };
}

const DetailComponent: React.FC<IProps> = ({ open, setOpen, value }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (value && open) {
      setTitle(value?.title || '');
      setContent(value?.content || '');
    }
  }, [value, open]);

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Paper sx={{ minWidth: '80rem' }}>
        <div className='w-full relative top-0 left-0 text-xl font-bold py-3'>
          <h3 className='lowercase first-letter:uppercase'>{title}</h3>
          <CloseIcon
            className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 hover:text-red-600'
            onClick={() => setOpen(false)}
          />
        </div>
        <Divider />
        <iframe
          sandbox=''
          style={{ width: '100%', height: '500px', border: 'none' }}
          srcDoc={`<!DOCTYPE html>
        <html lang="vi-VN">
        <head>
          <style>
            body { font-size: 16px; color: black; line-height: 1.5; padding: 10px; }
          </style>
        </head>
        <body>${content}</body>
        </html>`}
        />
      </Paper>
    </Backdrop>
  );
};

export default DetailComponent;
