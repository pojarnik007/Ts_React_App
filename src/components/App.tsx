import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/main';
import Navigation from './features/nav';
import HomePage from './pages/recepiesPage';
import RecipePage from './pages/receiptPage';
import ProtectedRoute from './ProtectedRoute';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { store } from './store/store';
import { finishLoading } from './store/authSlice';

store.dispatch(finishLoading());

function App() {
  const token = useSelector((state: any) => state.auth.token);

  return (
    <div id='cont'>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>}/>
        <Route path="/receipts" element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>}/>

        <Route path="/recipe/:id" element={
            <ProtectedRoute>
              <RecipePage />
            </ProtectedRoute>}/>
      </Routes>

      {token && <Navigation />}
    </div>
  );
}

export default App;
