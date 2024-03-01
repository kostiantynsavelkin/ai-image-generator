import React from 'react';
import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

const CustomTextField = styled((props: any) => <TextField {...props} multiline
  rows={5} />)(({ theme }) => ({
  '& .MuiOutlinedInput-input::-webkit-input-placeholder': {
    color: "white",
    opacity: '0.8',
  },
  '& .MuiOutlinedInput-input.Mui-disabled::-webkit-input-placeholder': {
    color: "white",
    opacity: '1',
  },
  '& .Mui-disabled .MuiOutlinedInput-notchedOutline': {
    borderColor: "white",
  },
  '& .MuiOutlinedInput-input': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    border: '1px solid white',
    borderRadius: '4px'
  },
  '& .MuiOutlinedInput-root.Mui-focused': {
    border: '1px solid white !important',
    borderRadius: '4px'
  }
}));

export default CustomTextField;
