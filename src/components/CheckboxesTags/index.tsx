import React, { useEffect, useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

interface CheckboxesTagsProps<T> {
  options: T[]; // Dữ liệu mảng bất kỳ
  label?: string;
  placeholder?: string;
  getOptionLabel: (option: T) => string; // Hàm lấy nhãn hiển thị
  onSelectionChange?: (selected: T[]) => void; // Hàm xử lý khi thay đổi lựa chọn
  defaultChecked?: T[]; // Các mục được chọn mặc định
  size?: 'small' | 'medium';
}

function CheckboxesTags<T>({
  options,
  label = '',
  placeholder = '',
  getOptionLabel,
  size = 'small',
  onSelectionChange = () => {},
  defaultChecked = []
}: CheckboxesTagsProps<T>): JSX.Element {
  const [selectedValues, setSelectedValues] = useState<T[]>(defaultChecked);

  useEffect(() => {
    setSelectedValues(defaultChecked);
    onSelectionChange(defaultChecked);
  }, [defaultChecked, onSelectionChange]);

  const handleChange = (event: React.SyntheticEvent, value: T[]) => {
    setSelectedValues(value);
    onSelectionChange(value);
  };

  return (
    <Autocomplete
      multiple
      options={options}
      disableCloseOnSelect
      getOptionLabel={getOptionLabel}
      onChange={handleChange}
      value={selectedValues} // Đồng bộ giá trị
      size={size}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;
        const isSelected = selectedValues.some((selected) => JSON.stringify(selected) === JSON.stringify(option));
        return (
          <li key={key} {...optionProps}>
            <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={isSelected} />
            {getOptionLabel(option)}
          </li>
        );
      }}
      style={{ width: 500 }}
      renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} />}
    />
  );
}

export default CheckboxesTags;
