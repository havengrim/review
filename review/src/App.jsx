import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styles from "./style";
import Home from "./components/Home";
import Index from "./components/Index";
import Greetings from './components/Greetings';
import Form from './components/Form';
import Dashboard from './components/Dashboard';
import Signin from './components/Signin';
import NotFoundPage from './components/NotFoundPage';


const App = () => (
  <Router>
    <div className="bg-gray-100 w-full overflow-hidden">
      <Routes> 
        <Route path="/404" element={<NotFoundPage />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/sign-in" element={<Signin />} /> 
        <Route path="/greetings/:schoolCode" element={<Greetings />} /> 
        <Route path="/:schoolCode/:logo/support-evaluation" element={<Home />} /> 
        <Route path="/:schoolCode/:logo/school-evaluation" element={<Index />} /> 
        <Route path="/:schoolCode/evaluation" element={<Form />} /> 
        <Route path='*' element={<Navigate to='/404' />} />
      </Routes>
    </div>
  </Router>
);

export default App;
