// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/main';
import { Counter } from './features/counter/counter';
import '../styles.css'
import Navigation from './features/nac';
import HomePage from './pages/recepiesPage';

function App() {
  return (
    <div id='cont'>
      <Navigation />
      <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/count" element={<Counter />} />
          <Route path="/receipts" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;