import { Paper } from '@mui/material';

interface MultiTabListProps {
  title: string;
  data: [
    {
      sub_title: string;
      items: [
        {
          name: string;
          img: string;
          originalPrice: number;
          price: number;
          gift: string;
          star: number;
        }
      ];
    }
  ];
}

const MultiTabList: React.FC<MultiTabListProps> = ({ title, data }) => {
  console.log(data);
  return (
    <div>
      <div className={'first-letter:uppercase font-bold text-2xl text-left'}>{title}</div>
      <Paper></Paper>
    </div>
  );
};

export default MultiTabList;
