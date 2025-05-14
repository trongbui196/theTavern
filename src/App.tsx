import { useState } from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './supabase/supabase';
import Home from './components/dashboard/Home';
import Login from './components/authen/Loginform';

function App() {
  return (
    <>
      <Router>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/stash" element={<Home />} />
          <Route path="/treasury-log" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
