// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/main';
import '../styles.css'
import Navigation from './features/nav';
import HomePage from './pages/recepiesPage';
import RecipePage from './pages/receiptPage';
import Layout from './features/layout';

function App() {
  return (
    <div id='cont'>
      <Routes>
        <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/receipts" element={<HomePage />} />
        </Route>
          {/* <Route path="/login" element={<LoginPage />} /> */}
          <Route path="/recipe/:id" element={<RecipePage />} />
      </Routes>
      <Navigation />
    </div>
  );
}

export default App;