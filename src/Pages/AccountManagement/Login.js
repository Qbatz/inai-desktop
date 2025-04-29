/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import LoginImage from '../../Asset/Images/Login_Image.svg';
import InaiLogo from '../../Asset/Images/Inai_Logo.svg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha';
import './ReCaptcha.css'
import { InfoCircle } from "iconsax-react";
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_IN_SAGA, RESET_CODE, LOG_IN } from '../../Utils/Constant'
import Cookies from 'universal-cookie';
import { encryptData } from '../../Crypto/crypto';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


function Login({ message, loginStatusCode }) {

  const navigate = useNavigate()
  const [siteKey, setSiteKey] = useState('')
  const dispatch = useDispatch();
  const state = useSelector(state => state)



  const [clientId, setClientId] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [clientIdError, setClientIdError] = useState('');
  const [userIdError, setUserIdError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [captchaError, setCaptchaError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [loading, setLoading] = useState(false)

  const handleClientIdChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      dispatch({ type: RESET_CODE });
      setClientIdError('');
      setClientId(value);
    }
  };
  const handleUserIdChange = (e) => {
    dispatch({ type: RESET_CODE })
    setUserIdError('');
    setUserId(e.target.value)
  };
  const handlePasswordChange = (e) => {
    dispatch({ type: RESET_CODE })
    setPasswordError('');
    setPassword(e.target.value)
  };



  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;

    if (!clientId.trim()) {
      setClientIdError('Client ID is required');
      valid = false;
    } else if (!/^\d+$/.test(clientId.trim())) {
      setClientIdError('Client ID must be an integer');
      valid = false;
    } else {
      setClientIdError('');
    }

    if (!userId.trim()) {
      setUserIdError('User Name is required');
      valid = false;
    } else {
      setUserIdError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!captchaValue) {
      setCaptchaError('Please complete the CAPTCHA');
      valid = false;
    }

    if (valid) {
      dispatch({ type: SIGN_IN_SAGA, payload: { company_code: clientId, username: userId, password: password } })
      setLoading(true)
    }
  };



  const handleNavigateCreateAccount = () => {
    navigate('./register')
    dispatch({ type: RESET_CODE })

  }



  const handleCaptchaChange = (value) => {
    setCaptchaError('');
    setCaptchaValue(value);

  };



  useEffect(() => {
    if (loginStatusCode) {
      setLoading(false)
      dispatch({ type: LOG_IN })
      const encryptData_Login = encryptData(JSON.stringify(true));
      localStorage.setItem("inai_login", encryptData_Login.toString());
      const token = state.userInfo.token;
      if (token) {
        const cookies = new Cookies();
        cookies.set('inai-token', token, { path: '/' });
      }
      dispatch({ type: RESET_CODE })
    }

  }, [loginStatusCode])


  useEffect(() => {
    if (state.Common.successCode === 200 || state.Common.code === 400 || state.Common.code === 401 || state.Common.code === 402) {
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: RESET_CODE })
      }, 5000)

    }
  }, [state.Common.successCode, state.Common.code]);



  useEffect(() => {
    const hostname = window.location.hostname;
    const selectedKey =
      hostname === "localhost"
        ? process.env.REACT_APP_RECAPTCHA_LOCAL_KEY
        : process.env.REACT_APP_RECAPTCHA_LIVE_KEY;
    setSiteKey(selectedKey)
  }, [])




  return (
    <div className='bg-slate-100 w-screen  min-h-screen flex items-center justify-center p-4 '>
      <div className='bg-white  h-auto max-w-6xl rounded-3xl shadow-lg !mt-[8px] !mb-[10px]'>

        {
          state.Common.successMessage && <label className="block  mb-2 text-start font-Gilroy font-normal text-md text-green-600"> {state.Common.successMessage} </label>
        }



        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
          <div className='Right_Side flex flex-col items-center justify-center xs:order-2 sm:order-2 md:order-1 '>
            <img src={LoginImage} className='w-full h-auto max-w-md object-contain' alt='Login' />
            <div className='text-center mt-4 ps-24 pe-24'>
              <label className='block text-black text-2xl font-bold font-Montserrat mb-3'>Communication is the heart of Business.</label>
              <label className='block text-neutral-600 font-Montserrat text-base'>Stay connected with the Right Supplier and Buyer!</label>
            </div>
          </div>


          <div className='Right_Side m-3 flex flex-col justify-center xs:order-1 sm:order-1 md:order-2 relative'>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
              </div>
            )}
            <div className='flex md:justify-start sm:justify-center xs:justify-center mb-2'>
              <img src={InaiLogo} alt='INAI Logo' className='h-12' />
            </div>

            <div className='flex md:justify-start sm:justify-center xs:justify-center mb-2'>
              <label className='block text-2xl font-semibold font-Gilroy'>Welcome back!</label>
            </div>
            <div className='flex md:justify-start sm:justify-center xs:justify-center mb-2'>
              <label className='block text-neutral-600 font-Montserrat font-normal text-base'>Enter your details below to access your INAI account.</label>
            </div>



            {
              message && <label className='block text-red-600 font-Gilroy font-normal text-sm  mb-1'>{message}</label>
            }


            <div className='w-full max-w-[455px]'>

              <div className='mb-2'>
                <label className='block text-black mb-2 text-start font-Gilroy font-medium text-sm' htmlFor='clientId'>Client ID <span className='text-red-500'>*</span></label>
                <input
                  id='clientId'
                  type='text'
                  value={clientId}
                  onChange={handleClientIdChange}
                  placeholder='Enter your Client ID'
                  className=' w-full px-3 py-2 border rounded-xl focus:outline-none   md:text-md font-Gilroy  font-medium text-neutral-600'
                />
                {clientIdError &&
                  <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                    <InfoCircle size="14" color="#DC2626" /> <p className='text-red-500 text-xs mt-1 font-Gilroy'>{clientIdError}</p>

                  </div>
                }
              </div>


              <div className='mb-2'>
                <label className='block text-black mb-2 text-start font-Gilroy font-medium text-sm' htmlFor='userId'>User Name <span className='text-red-500'>*</span></label>
                <input
                  id='userId'
                  type='text'
                  placeholder='Enter your User Name'
                  value={userId}
                  onChange={handleUserIdChange}
                  className='w-full px-3 py-2 border rounded-xl focus:outline-none  md:text-md font-Gilroy  font-medium text-neutral-600'
                />
                {userIdError &&
                  <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                    <InfoCircle size="14" color="#DC2626" />

                    <p className='text-red-500 text-xs mt-1 font-Gilroy'>{userIdError}</p>
                  </div>}
              </div>
              <div className='mb-2 relative'>
                <label className='block text-black mb-2 text-start font-Gilroy font-medium text-sm' htmlFor='password'>Password <span className='text-red-500'>*</span></label>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  autoComplete='new-password'
                  autoCorrect='off'
                  placeholder='Enter your password'
                  value={password}
                  onChange={handlePasswordChange}
                  className='w-full px-3 py-2 border rounded-xl focus:outline-none  pr-10 md:text-md font-Gilroy  font-medium text-neutral-600'
                />
                <span
                  className='absolute right-3 top-10 cursor-pointer text-gray-500'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>

                {passwordError &&
                  <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                    <InfoCircle size="14" color="#DC2626" />
                    <p className='text-red-500 text-xs mt-1 font-Gilroy'>{passwordError}</p>
                  </div>
                }


              </div>


              <div className='mb-4 flex items-center justify-between' >
                <div> 
                   <input id='staySignedIn' type='checkbox' className='mr-2 bg-white border border-gray-300 rounded shadow-inner ' />
                  <label htmlFor='staySignedIn' className='text-black font-Gilroy text-sm font-medium'>Stay signed in</label>
                  </div>
                <div>
                  <label className="text-[#205DA8] font-Gilroy text-sm font-medium">
                    <span
                      onClick={() => {
                        dispatch({ type: RESET_CODE });
                        navigate("/forgot-user-name")
                      }}
                      className="cursor-pointer hover:underline"
                    >
                      Username / Client ID
                    </span> / {""}
                    <span onClick={() => {
                      dispatch({ type: RESET_CODE });
                      navigate("/password")
                    }
                    } className="cursor-pointer hover:underline">
                      Password?
                    </span>
                  </label>
                </div>
              </div>
              <div className='flex justify-center ms-1 me-1 cursor-pointer'>
                <div
                  className="cursor-pointer font-Gilroy text-lg bg-white flex justify-center lg:[transform:scaleX(1.5)_scaleY(0.9)] sm:[transform:scaleX(1)_scaleY(1)] "

                >
                  {siteKey && (
                    <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaChange} />
                  )}
                </div>

              </div>

              {captchaError &&
                <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                  <InfoCircle size="14" color="#DC2626" /><p className='text-red-500 text-xs mt-1 font-Gilroy'>{captchaError}</p>
                </div>
              }
              <button type='submit'

                onClick={handleSubmit}
                className='mt-2  font-Montserrat font-semibold text-base w-full p-[10px] rounded-xl transition duration-300 sm:text-lg 
                 bg-[#205DA8] text-white cursor-pointer' >
                Sign In
              </button>


              <div className="text-start mt-1">
                <p className="text-black font-Montserrat font-normal text-base">
                  {`Don't have an account?`}&nbsp;

                  <span
                    onClick={handleNavigateCreateAccount}
                    className=" cursor-pointer text-[#205DA8] hover:text-[#205DA8] font-semibold transition duration-300 font-Montserrat"
                  >
                    Create an account
                  </span>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapsToProps = (state) => {
  return {
    message: state.Common.errorMessage,
    loginStatusCode: state.Common.successCode,
  }
}

Login.propTypes = {
  loginStatusCode: PropTypes.number,
  message: PropTypes.string
}



export default connect(mapsToProps)(Login);