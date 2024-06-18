import React from 'react';
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const CustomTextField = styled(TextField)(({ theme }) => ({
    width: '100%',
  '& .MuiOutlinedInput-root': {
    width: '100%', // Збільшуємо ширину на весь батьківський контейнер
    backgroundColor: '#2B2B2B', // Фоновий колір
    border: '1px solid #3B3B3B', // Колір рамки та товщина
    '&:hover': {
      backgroundColor: '#3B3B3B', // Колір при наведенні
    },
    '&.Mui-focused': {
      backgroundColor: '#3B3B3B', // Колір при активному стані
    },
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5), // Відступи від тексту
    color: '#858584', // Колір тексту
    fontSize: '1.6rem', // Розмір тексту
    borderRadius: '2rem', // Заокруглені кути
    lineHeight: 1.4, // Висота рядка
    '&::placeholder': {
      color: '#858584', // Колір плейсхолдера
      opacity: 0.7,
    },
  },
}));

export default function SearchTextField({ onChange, defaultValue }) {
  return (
    <CustomTextField
      placeholder="Search your favourite NFTs"
      variant="outlined"
      onChange={(e) => {
        onChange(e);
      }}
      defaultValue={defaultValue}
      InputProps={{
        endAdornment: ( // Зміна місця іконки на право
          <InputAdornment position="end">
            <SearchIcon style={{ color: '#858584' }} />
          </InputAdornment>
        ),
      }}
    />
  );
}
