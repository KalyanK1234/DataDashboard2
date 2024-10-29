// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BreweryDetail from './components/BreweryDetail';
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/brewery/:id" element={<BreweryDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
