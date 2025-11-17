import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { store } from './components/store/store';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  );
} else {
  console.error('Не удалось найти корневой элемент #root');
}