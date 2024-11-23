import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

interface NumberStepperProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
}

const NumberStepper: React.FC<NumberStepperProps> = ({ value = 0, min = 0, max = 100, step = 1, onChange }) => {
  const [currentValue, setCurrentValue] = useState<number>(value);

  const handleIncrement = () => {
    if (currentValue + step <= max) {
      const newValue = currentValue + step;
      setCurrentValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleDecrement = () => {
    if (currentValue - step >= min) {
      const newValue = currentValue - step;
      setCurrentValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = parseInt(event.target.value, 10);
    if (isNaN(newValue)) {
      newValue = min;
    }
    newValue = Math.max(min, Math.min(max, newValue));
    setCurrentValue(newValue);
    onChange?.(newValue);
  };

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      sx={{
        border: '1px solid #e0e0e0',
        borderRadius: '6px', // Nhỏ bo góc hơn
        overflow: 'hidden',
        width: 'fit-content'
      }}
    >
      <Button
        size='small'
        sx={{
          minWidth: '20px', // Giảm kích thước nút
          height: '20px', // Giảm chiều cao nút
          borderRadius: 0,
          borderRight: '1px solid #e0e0e0',
          fontSize: '14px', // Nhỏ chữ trong nút
          padding: 0
        }}
        variant='text'
        onClick={handleDecrement}
        disabled={currentValue <= min}
      >
        -
      </Button>
      <TextField
        type='text'
        size='small'
        value={currentValue}
        onChange={handleInputChange}
        inputProps={{
          style: {
            textAlign: 'center',
            fontSize: '14px' // Nhỏ chữ trong input
          }
        }}
        sx={{
          width: '40px', // Giảm chiều rộng input
          '& .MuiInputBase-root': {
            height: '20px' // Giảm chiều cao input
          },
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none'
          }
        }}
      />
      <Button
        size='small'
        sx={{
          minWidth: '20px', // Giảm kích thước nút
          height: '20px', // Giảm chiều cao nút
          borderRadius: 0,
          borderLeft: '1px solid #e0e0e0',
          fontSize: '14px', // Nhỏ chữ trong nút
          padding: 0
        }}
        variant='text'
        onClick={handleIncrement}
        disabled={currentValue >= max}
      >
        +
      </Button>
    </Box>
  );
};

export default NumberStepper;
