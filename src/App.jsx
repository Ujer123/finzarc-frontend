import React from 'react'
import Auth from './components/Auth';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';

const App = () => {  



  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    
    </Router>
  )
}

export default App
