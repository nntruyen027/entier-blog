import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { Paper } from '@mui/material';

const colorList = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#d888d8', '#a4de6c', '#d0ed57'];

const Component = ({ lines, data, name }) => {
  return (
    <Paper className={'py-3 cursor-pointer'}>
      <LineChart width={730} height={250} data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='month' />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines.map((product, index) => (
          <Line key={product} type='monotone' dataKey={product} stroke={colorList[index % colorList.length]} />
        ))}
      </LineChart>
      <h3 className={'uppercase font-bold mt-6'}>{name}</h3>
    </Paper>
  );
};

export default Component;
