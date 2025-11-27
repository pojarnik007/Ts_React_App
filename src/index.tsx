import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const theme = createTheme();


const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <ThemeProvider theme={theme}> 
      <App />
    </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );
} else {
  console.error('Не удалось найти корневой элемент #root');
}