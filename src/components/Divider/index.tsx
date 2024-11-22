import { Divider } from '@mui/material';

interface DividerProps {
  bold?: number;
}

const CustomDivider: React.FC<DividerProps> = ({ bold = 1 }) => {
  return (
    <>
      {Array.from({ length: bold }).map((_, index) => (
        <Divider key={index} />
      ))}
    </>
  );
};

export default CustomDivider;
