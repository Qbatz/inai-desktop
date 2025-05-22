/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Login from './Pages/AccountManagement/Login'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import CreateAccount from './Pages/AccountManagement/CreateAccount';
import ForgotUserName from './Pages/AccountManagement/ForgotUserName';
import Sidebar from './Components/Sidebar';
import ForgotPassword from './Pages/AccountManagement/ForgotPassword';
import SignUp from './Pages/AccountManagement/SignUp'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { decryptData } from './Crypto/crypto';
import { LOG_OUT } from './Utils/Constant'
import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import ResetPassword from './Pages/AccountManagement/ResetPassword';
import Dashboard from './Pages/Dashboard/Dashboard';

function App({ isLogged_In }) {
  const dispatch = useDispatch();
  const cookies = new Cookies();
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
      setSuccessLogin(decryptedData === "true" ? true : false);
    } else {
      setSuccessLogin(false);
    }
  }, [inaiLogin]);

  const [tokenAccessDenied, setTokenAccessDenied] = useState(Number(cookies.get('access-denied-inai') || 0));



  useEffect(() => {
    if (tokenAccessDenied === 206) {
      dispatch({ type: LOG_OUT });
      localStorage.removeItem("inai_login");
      setSuccessLogin(false);
      cookies.set('access-denied-inai', null, { path: '/', expires: new Date(0) });

    }
  }, [tokenAccessDenied]);


  useEffect(() => {
    const interval = setInterval(() => {
      setTokenAccessDenied(Number(cookies.get('access-denied-inai')));
    }, 1000);

    return () => clearInterval(interval);
  }, []);







  return (
    <div>
      <ToastContainer position="bottom-center"
      />

      <Router>
        {
          isLogged_In || successLogin ? (
            <>
              <Sidebar />
            </>
          )
            :
            (
              <Routes>
                <Route path="/:type/:token" element={<Dashboard />} />
                <Route path="/" element={<Login />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/register" element={<CreateAccount />} />
                <Route path="/forgot-user-name" element={<ForgotUserName />} />
                <Route path="/password" element={<ForgotPassword />} />
              </Routes>
            )
        }
      </Router>


    </div>
  );
}


const mapsToProps = (state) => {
  return {
    isLogged_In: state.userInfo.isLoggedIn
  }
}

App.propTypes = {
  isLogged_In: PropTypes.bool.isRequired,
}

export default connect(mapsToProps)(App);