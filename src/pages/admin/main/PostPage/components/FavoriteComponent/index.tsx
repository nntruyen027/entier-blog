import { Backdrop, Divider, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFavoritesStart } from '~/redux/post/slice';
import { RootState } from '~/redux/store';
import { formatToFullTime } from '~/utils/date';

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
  const dispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    console.log(value);
    if (value && open) {
      dispatch(getFavoritesStart(value.id));
    }
  }, [value, open]);

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={open}>
      <Paper sx={{ minWidth: '30rem' }}>
        <div className='w-full relative top-0 left-0 text-xl font-bold py-3'>
          <h3 className='lowercase first-letter:uppercase'>{value.title}</h3>
          <CloseIcon
            className='cursor-pointer absolute top-1/2 -translate-y-1/2 right-3 hover:text-red-600'
            onClick={() => setOpen(false)}
          />
        </div>
        <Divider />
        <div className={'w-full text-left max-h-48 h-fit scroll-auto'}>
          {favorites && favorites.length > 0
            ? favorites.map((item) => {
                return (
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
                    <div>{formatToFullTime(item.createdAt)}</div>
                  </a>
                );
              })
            : null}
        </div>
      </Paper>
    </Backdrop>
  );
};

export default DetailComponent;
