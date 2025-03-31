import { Backdrop, Divider, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCommentsStart } from '~/redux/post/slice';
import { RootState } from '~/redux/store';
import { formatToFullTime } from '~/utils/date';
import Tooltip from '@mui/material/Tooltip';

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

const CommentComponent: React.FC<IProps> = ({ open, setOpen, value }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    if (value && open) {
      dispatch(getCommentsStart({ id: value.id }));
    }
  }, [value, open]);

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Paper sx={{ minWidth: '50rem' }}>
        <div className='w-full relative top-0 left-0 text-xl font-bold py-3'>
          <h3 className='lowercase first-letter:uppercase'>{value.title}</h3>
          <CloseIcon
            className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 hover:text-red-600'
            onClick={() => setOpen(false)}
          />
        </div>
        <Divider />
        <div className={'w-full text-left max-h-48 h-fit scroll-auto'}>
          {comments && comments.length > 0 ? (
            comments.map((item) => {
              return (
                <Tooltip title={item.content} arrow>
                  <a
                    className={
                      'cursor-pointer text-black p-3 h-fit flex gap-3 items-center justify-between hover:bg-gray-200'
                    }
                  >
                    <div className='h-fit flex gap-3 items-center'>
                      <img
                        className='h-10 rounded-3xl'
                        src={`${import.meta.env.VITE_USER_SERVICE}/${item?.user?.avatar}`}
                        alt={`${item.user.fullName}`}
                      />
                      <span>{item?.user?.fullName}</span>
                    </div>
                    <div className={'flex'}>
                      <span className='block w-full max-w-[220px] truncate'>{item.content}</span>
                      <span>{formatToFullTime(item.createdAt)}</span>
                    </div>
                  </a>
                </Tooltip>
              );
            })
          ) : (
            <i className={'p-3'}>Không có bình luận</i>
          )}
        </div>
      </Paper>
    </Backdrop>
  );
};

export default CommentComponent;
