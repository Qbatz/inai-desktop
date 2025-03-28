import React, { useState, useEffect } from 'react'
import Login from './LandingPages/Login'
import FormDisplay from './FormBuilderComponent/FormDisplay';
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import AddCustomer from './CustomerComponent/AddCustomer';
import CreateAccount from './LandingPages/CreateAccount';
import ForgotUserName from './LandingPages/ForgotUserName';
import Sidebar from './Components/Sidebar';
import CustomerDetails from './CustomerComponent/CustomerDetails';
import ForgotClientId from './LandingPages/ForgotClientId'
import ForgotPassword from './LandingPages/ForgotPassword';
import SignUp from './LandingPages/SignUp'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { decryptData } from './Crypto/crypto';
import ResetPassword from './LandingPages/ResetPassword';

function App({ isLogged_In }) {

  const [successLogin, setSuccessLogin] = useState(null)
  const [inaiLogin, setInaiLogin] = useState(localStorage.getItem("inai_login"));

  useEffect(() => {
    const interval = setInterval(() => {
      const newLoginValue = localStorage.getItem("inai_login");
      setInaiLogin(newLoginValue);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (inaiLogin) {
      const decryptedData = decryptData(inaiLogin);
        setSuccessLogin(decryptedData);
    }
  }, [inaiLogin]);

  return (
    <div>
      <ToastContainer position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        style={{ fontFamily: "Gilroy", fontSize: "16px" }} />
      <Router>
        <Routes>

          {
            isLogged_In === true || successLogin === true ? (
              <>
                <Route path="/" element={<Sidebar />} />
                <Route path="/form-display" element={<FormDisplay />} />
                <Route path="/add-customer" element={<AddCustomer />} />
                <Route path="/customer-details" element={<CustomerDetails />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </>
            )
              :
              (
                <>
                  <Route path="/" element={<Login />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/sign-up" element={<SignUp />} />
                  <Route path="/create-account" element={<CreateAccount />} />
                  <Route path="/forgot-user-name" element={<ForgotUserName />} />
                  <Route path="/forgot-client-id" element={<ForgotClientId />} />
                  <Route path="/password" element={<ForgotPassword />} />
                  <Route path="*" element={<Navigate to="/" replace />} />

                </>
              )
          }



        </Routes>
      </Router>
    </div>
  );
}


const mapsToProps = (state) => {
  return {
    isLogged_In: state.signIn.isLoggedIn
  }
}

App.propTypes = {
  isLogged_In: PropTypes.bool.isRequired,
}

export default connect(mapsToProps)(App);
