import { useState } from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './supabase/supabase';
import Home from './pages/Home';
import Login from './components/authen/Loginform';
import Stash from './pages/Stash';
import Navbar from './components/common/Navbar';
import Layout from './components/layout/MainLayout';
import Treasury from './pages/Treasury';
function App() {
  return (
    <>
      <Router>
       <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/stash" element={<Stash />} />
          <Route path="/treasury-log" element={<Treasury />} />
        </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
