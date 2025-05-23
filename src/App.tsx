import { useState } from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import { supabase } from './supabase/supabase';
import Home from './pages/Home';
import Login from './pages/Auth';
import Stash from './pages/Stash';
import Layout from './components/layout/MainLayout';
import Treasury from './pages/Treasury';
import ProtectedRoute from './components/auth/ProtectedRoute';

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/auth';

  return (
    <>
      {isAuthPage ? (
        <Routes>
          <Route path="/auth" element={<Login />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stash"
              element={
                <ProtectedRoute>
                  <Stash />
                </ProtectedRoute>
              }
            />
            <Route
              path="/treasury-log"
              element={
                <ProtectedRoute>
                  <Treasury />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
