import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from "./style";
import Home from "./components/Home";
import Index from "./components/Index";

const App = () => (
  <Router>
    <div className="bg-primary w-full overflow-hidden">
      <Routes> {/* Use Routes as the container for your routes */}
        <Route path="/home" element={<Home />} /> {/* Use 'element' prop to specify the component */}
        <Route path="/index" element={<Index />} /> {/* Use 'element' prop to specify the component */}
      </Routes>
    </div>
  </Router>
);

export default App;
