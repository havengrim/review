import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from "./style";
import Home from "./components/Home";
import Index from "./components/Index";
import Greetings from './components/Greetings';
import Form from './components/Form';
import Dashboard from './components/Dashboard';
import Signin from './components/Signin';


const App = () => (
  <Router>
    <div className="bg-gray-100 w-full overflow-hidden">
      <Routes> 
  
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/sign-in" element={<Signin />} /> 
        <Route path="/greetings" element={<Greetings />} /> 
        <Route path="/home" element={<Home />} /> 
        <Route path="/index" element={<Index />} /> 
        <Route path="/:schoolCode" element={<Form />} /> 
      </Routes>
    </div>
  </Router>
);

export default App;
