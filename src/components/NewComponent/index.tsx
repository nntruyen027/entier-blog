import { ShortNew } from '~/types';
import { Link } from 'react-router-dom';

interface NewComponentProps {
  item: ShortNew;
}

const NewComponent: React.FC<NewComponentProps> = ({ item }) => {
  return (
    <Link to={item.url}>
      <div className={'text-left'}>
        <img className={'w-[280px] h-[162px] rounded-b'} src={item.img} alt={item.title} />
        <span className={'text-wrap text-sm text-left w-4/5 text-black'}>{item.title}</span>
      </div>
    </Link>
  );
};
export default NewComponent;
