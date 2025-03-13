import React, { useState } from 'react'
import Login from './Landing_Page/Login'
import FormDisplay from './FormBuilderComponent/FormDisplay';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {







  return (
    <div>

      <Router>
        <Routes>
          <Route path="/" element={<FormDisplay />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
