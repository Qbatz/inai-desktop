/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { InfoCircle } from "iconsax-react";
import { Eye, EyeOff } from "lucide-react";
import { OTP_SEND_SAGA, OTP_VERIFY_SAGA, ACCOUNT_REGISTER_SAGA, RESET_CODE, OTP_SEND_REDUCER_REMOVE } from '../../Utils/Constant'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


export default function SignUp() {

  const dispatch = useDispatch();
  const state = useSelector(state => state)

  const navigate = useNavigate()



  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState("");

  const [error, setError] = useState('');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [showMobile, setShowMobile] = useState(true)
  const [showOtp, setShowOtp] = useState(false)
  const [mobileError, setMobileError] = useState('')
  const [showSignUp, setShowSignUp] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleFirstName = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]+$/.test(value) || value === "") {
      setFirstName(value);
      setError((prevErrors) => ({ ...prevErrors, firstName: "" }));
    }
  };


  const handleLastName = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]+$/.test(value) || value === "") {
      setLastName(value)
      setError((prevErrors) => ({ ...prevErrors, lastName: "" }));
    }
  };

  const handleUserId = (e) => {
    setError((prevErrors) => ({ ...prevErrors, userId: "" }));
    setUserId(e.target.value);
  };


  const handleMobile = (e) => {
    setMobileError("")
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value) || value === "") {
      setMobile(value);
      setError((prevErrors) => ({ ...prevErrors, mobile: "" }));
    }
  };

  const handlePassword = (e) => {
    setError((prevErrors) => ({ ...prevErrors, password: "" }));
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setError((prevErrors) => ({ ...prevErrors, confirmPassword: "" }));
    setConfirmPassword(e.target.value);
  };


  const passwordRegex = {
    length: /^.{8,20}$/,
    upperCase: /[A-Z]/,
    number: /[0-9]/,
    specialChar: /[!@#$%^&*(),.?":{}|<>]/,
  };

  console.log("state", state)

  const handleSENDOTP = () => {
    if (!mobile.match(/^[0-9]{10}$/)) {
      setMobileError("Mobile number must be 10 digits")
      return;
    }
    if (mobile) {
      dispatch({ type: OTP_SEND_SAGA, payload: { mobile: mobile, email: state?.userInfo?.emailId } })
      setLoading(true)
    }



  };

  const handleOtpChange = (e) => {

    dispatch({ type: RESET_CODE })
    const value = e.target.value;

    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setOtpError("");
    }
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      setOtpError("Please Enter Otp");
    } else {
      setOtpError("");
      dispatch({ type: OTP_VERIFY_SAGA, payload: { mobile: mobile, otp: otp } })
      setLoading(true)
    }
  };

  useEffect(() => {
    if (state.userInfo?.otpValue && state.userInfo?.otpValue !== '') {
      setLoading(false)
      setShowOtp(true);
      setShowMobile(false);
    }
  }, [state.userInfo?.otpValue]);


  useEffect(() => {
    if (state.Common.successCode === 200) {
      setLoading(false)
      setShowOtp(false);
      setShowMobile(false);
      setShowSignUp(true)

    }

  }, [state.Common.successCode])

  const validateForm = () => {
    let newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!userId.trim()) newErrors.userId = "User ID is required";
    if (!mobile.match(/^[0-9]{10}$/)) newErrors.mobile = "Mobile number must be 10 digits";

    if (!password.match(passwordRegex.length))
      newErrors.password = "Password must be 8-20 characters long";
    else if (!password.match(passwordRegex.upperCase))
      newErrors.password = "Password must contain at least one uppercase letter";
    else if (!password.match(passwordRegex.number))
      newErrors.password = "Password must contain at least one number";
    else if (!password.match(passwordRegex.specialChar))
      newErrors.password = "Password must contain at least one special character";

    if (confirmPassword !== password)
      newErrors.confirmPassword = "Passwords do not match";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      setLoading(true)
      dispatch({
        type: ACCOUNT_REGISTER_SAGA,
        payload: {
          email: state?.userInfo?.emailId,
          email_verify_token: state.userInfo?.verifyCode || '',
          first_name: firstName,
          last_name: lastName,
          password: password,
          password2: confirmPassword,
          phone: mobile,
          mobile: mobile,
          otp: state.userInfo?.otpValue || '',
          sent_otp: 1,
          otp_verified: 1,
          username: userId
        }
      })

    }

  }




  useEffect(() => {

    if (state.userInfo.isTrue) {
        dispatch({ type: RESET_CODE })
      setLoading(false)
      setShowOtp(false);
      setShowMobile(false);
      setShowSignUp(false)
      navigate('/register')
     

    } else {
      setLoading(false)
    }
  }, [state.userInfo.isTrue])



  useEffect(() => {
    if (state.Common.successCode === 200 || state.Common.code === 400 || state.Common.code === 401 || state.Common.code === 402) {
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: RESET_CODE })
      }, 4000)
    }
  }, [state.Common.successCode, state.Common.code]);


  useEffect(() => {
    if (state.userInfo.otpSendSuccessCode === 200) {
      setTimeout(() => {
        dispatch({ type: RESET_CODE })
        dispatch({ type: OTP_SEND_REDUCER_REMOVE })
      }, 3000)

    }

  }, [state.userInfo.otpSendSuccessCode])



  useEffect(() => {
    if (showSignUp) {
      setShowOtp(false);
    }
  }, [showSignUp])






  return (
    <div className="flex items-center justify-center h-auto  w-full">
      <div className="w-full max-w-md bg-white pt-4 rounded-lg ">

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
          </div>
        )}


        {
          state.Common.successMessage && <label className="block  mb-2 text-start font-Gilroy font-normal text-md text-green-600"> {state.Common.successMessage} </label>
        }
        {state?.Common?.errorMessage && <label className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 mb-3">{state?.Common?.errorMessage}</label>}

        {
          showMobile &&
          <>

            <div className="mb-4">
              <label className="block text-gray-700 font-Gilroy mb-1">
                Mobile <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                placeholder="Mobile"
                value={mobile}
                maxLength={10}
                onChange={handleMobile}
                className="w-full h-12 px-3  font-Gilroy border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {mobileError && (
                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                  <span><InfoCircle size="14" color="#DC2626" /></span> {mobileError} </p>)}
            </div>


            <button
              className="w-32 h-10 bg-[#205DA8] text-white font-semibold rounded-lg hover:bg-[#205DA8] transition "
              onClick={handleSENDOTP}
            >
              SEND OTP
            </button>
          </>

        }

        {

          showOtp &&
          <>
            <label className="block text-gray-700 font-Gilroy mb-1">
              OTP <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
              className='w-full h-12 px-3 font-Gilroy border rounded-md focus:outline-none focus:ring-2 text-start  mb-4 border-gray-300 focus:ring-blue-500'
            />
            {otpError && (
              <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 mb-3">
                <span><InfoCircle size="14" color="#DC2626" /></span> {otpError} </p>)}



            <button
              className="w-32 h-10 bg-green-600 font-Gilroy text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition"
              onClick={handleVerifyOtp}
            >
              VERIFY OTP
            </button>

          </>

        }




        {
          showSignUp && <>

            <h2 className="text-2xl font-semibold text-center text-black mb-6 font-Gilroy">
              Signup
            </h2>

            <div className="mb-4">
              <input
                type="text"
                placeholder="First Name *"
                value={firstName}
                onChange={handleFirstName}
                className="w-full h-12 px-3 font-Gilroy border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error.firstName && (
                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                  <span><InfoCircle size="14" color="#DC2626" /></span> {error.firstName} </p>)}

            </div>


            <div className="mb-4">
              <input
                type="text"
                value={lastName}
                onChange={handleLastName}
                placeholder="Last Name *"
                className="w-full h-12 px-3 font-Gilroy  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error.lastName && (
                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                  <span><InfoCircle size="14" color="#DC2626" /></span> {error.lastName} </p>)}
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="User Name"
                value={userId}
                onChange={handleUserId}
                className="w-full h-12 px-3 font-Gilroy  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {error.userId && (
                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                  <span><InfoCircle size="14" color="#DC2626" /></span> {error.userId}
                </p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="text"
                disabled
                autoComplete="new-email"
                autoCorrect="off"
                value={state?.userInfo?.emailId}
                placeholder="Email ID*"
                className="w-full h-12 px-3 font-Gilroy  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            </div>



            <div className="mb-4 relative">
              <input
                autoComplete="new-password"
                autoCorrect="off"

                type={showPassword ? "text" : "password"}
                placeholder="Password *"
                value={password}
                onChange={handlePassword}
                className="w-full h-12 px-3 font-Gilroy  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />


              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>


              {error.password && (
                <p className="text-red-600 font-medium text-sm flex items-center gap-1 pt-2 font-Gilroy">
                  <span><InfoCircle size="14" color="#DC2626" /></span> {error.password}
                </p>
              )}
            </div>

            <div className="mb-4 relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password *"
                value={confirmPassword}
                onChange={handleConfirmPassword}
                className="w-full h-12 px-3 border font-Gilroy  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
              {error.confirmPassword && (
                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                  <span>
                    <InfoCircle size="14" color="#DC2626" />
                  </span>{" "}
                  {error.confirmPassword}
                </p>
              )}
            </div>
            <div className="flex flex-col items-center gap-3">

              <button onClick={handleRegister} className="w-32 h-10 bg-[#205DA8] text-white font-semibold rounded-lg  transition">
                REGISTER
              </button>
            </div>

          </>
        }

      </div>
    </div>
  );
}
