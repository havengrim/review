import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from "./style";
import Home from "./components/Home";
import Index from "./components/Index";
import Greetings from './components/Greetings';
import Form from './components/Form';
import Dashboard from './components/Dashboard';

const App = () => (
  <Router>
    <div className="bg-primary w-full overflow-hidden">
      <Routes> 
      <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/greetings" element={<Greetings />} /> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/index" element={<Index />} /> 
        <Route path="/" element={<Form />} /> 
      </Routes>
    </div>
  </Router>
);

export default App;
