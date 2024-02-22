import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from "./style";
import Home from "./components/Home";
import Index from "./components/Index";
import Greetings from './components/Greetings';

const App = () => (
  <Router>
    <div className="bg-primary w-full overflow-hidden">
      <Routes> 
        <Route path="/greetings" element={<Greetings />} /> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/" element={<Index />} /> 
      </Routes>
    </div>
  </Router>
);

export default App;
