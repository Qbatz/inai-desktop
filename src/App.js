import React from 'react'
import Login from './LandingPages/Login'
import FormDisplay from './FormBuilderComponent/FormDisplay';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddCustomer from './CustomerComponent/AddCustomer';
import CreateAccount from './LandingPages/CreateAccount';
import ForgotUserName from './LandingPages/ForgotUserName';
import Sidebar from './Components/Sidebar';
import CustomerDetails from './CustomerComponent/CustomerDetails';
import ForgotClientId from './LandingPages/ForgotClientId'
import ForgotPassword from './LandingPages/ForgotPassword';
import SignUp from  './LandingPages/SignUp'

function App() {

 return (
    <div>

      <Router>  
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
          <Route path="/form-display" element={<FormDisplay />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/sidebar" element={<Sidebar/>} />
          <Route path="/customer-details" element={<CustomerDetails />} />
          <Route path="/forgot-user-name" element={<ForgotUserName />} />
          <Route path="/forgot-client-id" element={<ForgotClientId />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
