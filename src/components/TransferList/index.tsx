import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export interface TransferListProps<T> {
  // Tất cả dữ liệu có sẵn
  dataList: T[];
  // Dữ liệu đã được chọn (hiển thị ở bên phải)
  selectedData: T[];
  // Hàm cập nhật danh sách dữ liệu đã chọn
  setSelectDataList: (selected: T[]) => void;
  // Hàm lấy id duy nhất của item (dùng để so sánh)
  getId: (item: T) => number | string;
  // Hàm lấy label hiển thị của item
  getLabel: (item: T) => string;
  width?: number;
  height?: number;
}

export default function TransferList<T>(props: TransferListProps<T>) {
  const { dataList, selectedData, setSelectDataList, getId, getLabel, height, width } = props;

  // Tính toán danh sách bên trái (chưa được chọn) dựa vào dataList và selectedData
  const left = dataList.filter((item) => !selectedData.some((sel) => getId(sel) === getId(item)));
  const right = selectedData;

  // State lưu trữ danh sách id của các item đang được check
  const [checked, setChecked] = React.useState<(number | string)[]>([]);

  // Lấy các phần tử đã được check ở bên trái và bên phải
  const leftChecked = left.filter((item) => checked.includes(getId(item)));
  const rightChecked = right.filter((item) => checked.includes(getId(item)));

  // Hàm xử lý chọn bỏ (toggle) một item
  const handleToggle = (item: T) => () => {
    const id = getId(item);
    if (checked.includes(id)) {
      setChecked(checked.filter((x) => x !== id));
    } else {
      setChecked([...checked, id]);
    }
  };

  // Chuyển tất cả các item bên trái sang bên phải
  const handleAllRight = () => {
    setSelectDataList(dataList);
    setChecked([]);
  };

  // Chuyển các item được check ở bên trái sang bên phải
  const handleCheckedRight = () => {
    const newSelected = [...selectedData, ...leftChecked];
    setSelectDataList(newSelected);
    // Bỏ chọn các item vừa chuyển
    setChecked(checked.filter((id) => !leftChecked.some((item) => getId(item) === id)));
  };

  // Chuyển các item được check ở bên phải về bên trái (tức là bỏ chọn)
  const handleCheckedLeft = () => {
    const newSelected = selectedData.filter((item) => !rightChecked.some((sel) => getId(sel) === getId(item)));
    setSelectDataList(newSelected);
    setChecked(checked.filter((id) => !rightChecked.some((item) => getId(item) === id)));
  };

  // Chuyển tất cả các item bên phải về bên trái
  const handleAllLeft = () => {
    setSelectDataList([]);
    setChecked([]);
  };

  // Component hiển thị danh sách (có thể dùng cho cả bên trái và bên phải)
  const customList = (items: T[]) => (
    <Paper sx={{ width: width || 200, height: height || 230, overflow: 'auto' }}>
      <List dense component='div' role='list'>
        {items.map((item) => {
          const id = getId(item);
          const label = getLabel(item);
          const labelId = `transfer-list-item-${id}-label`;

          return (
            <ListItemButton key={id} role='listitem' onClick={handleToggle(item)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.includes(id)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={label} />
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} sx={{ justifyContent: 'center', alignItems: 'center' }}>
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction='column' sx={{ alignItems: 'center' }}>
          <Button
            sx={{ my: 0.5 }}
            variant='outlined'
            size='small'
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label='move all right'
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant='outlined'
            size='small'
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label='move selected right'
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant='outlined'
            size='small'
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label='move selected left'
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant='outlined'
            size='small'
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label='move all left'
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
}
