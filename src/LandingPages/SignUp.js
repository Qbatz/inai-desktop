import React, { useState } from "react";
import { InfoCircle } from "iconsax-react";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userId, setUserId] = useState("");
  const [emailId, setEmailId] = useState("");
  const [error, setError] = useState('');
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otpError, setOtpError] = useState("");
  const [otpSuccess, setOtpSuccess] = useState("");


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

  const handleEmail = (e) => {
    setError((prevErrors) => ({ ...prevErrors, emailId: "" }));
    setEmailId(e.target.value);
  };

  const handleMobile = (e) => {
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

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|in)$/;
  const passwordRegex = {
    length: /^.{8,20}$/,
    upperCase: /[A-Z]/,
    number: /[0-9]/,
    specialChar: /[!@#$%^&*(),.?":{}|<>]/,
  };

  const validateForm = () => {
    let newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!userId.trim()) newErrors.userId = "User ID is required.";
    if (!emailId.match(emailRegex)) newErrors.emailId = "Invalid email format.";
    if (!mobile.match(/^[0-9]{10}$/)) newErrors.mobile = "Mobile number must be 10 digits.";

    if (!password.match(passwordRegex.length))
      newErrors.password = "Password must be 8-20 characters long.";
    else if (!password.match(passwordRegex.upperCase))
      newErrors.password = "Password must contain at least one uppercase letter.";
    else if (!password.match(passwordRegex.number))
      newErrors.password = "Password must contain at least one number.";
    else if (!password.match(passwordRegex.specialChar))
      newErrors.password = "Password must contain at least one special character.";

    if (confirmPassword !== password)
      newErrors.confirmPassword = "Passwords do not match.";

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSENDOTP = () => {
    if (validateForm()) {
      setOtpSent(true);
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;

    if (/^\d{0,6}$/.test(value)) {
      setOtp(value);
      setOtpError("");
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length !== 6) {
      setOtpError("OTP must be exactly 6 digits.");
      setOtpSuccess("");
    } else {
      setOtpError("");
      setOtpSuccess("OTP Verified Successfully! ");
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-black mb-6">
          Sign Up
        </h2>


        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name *"
            value={firstName}
            onChange={handleFirstName}
            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error.lastName && (
            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
              <span><InfoCircle size="14" color="#DC2626" /></span> {error.lastName} </p>)}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="User ID*"
            value={userId}
            onChange={handleUserId}
            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            value={emailId}
            onChange={handleEmail}
            placeholder="Email ID*"
            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error.emailId && (
            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
              <span><InfoCircle size="14" color="#DC2626" /></span> {error.emailId}
            </p>
          )}
        </div>



        <div className="mb-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password *"
            value={password}
            onChange={handlePassword}
            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />


          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>


          {error.password && (
            <p className="text-red-600 font-medium text-sm flex items-center gap-1 pt-2">
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
            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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


        <div className="mb-4">
          <input
            type="tel"
            placeholder="Mobile *"
            value={mobile}
            onChange={handleMobile}
            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error.mobile && (
            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
              <span><InfoCircle size="14" color="#DC2626" /></span> {error.mobile} </p>)}
        </div>


        <div className="flex flex-col items-center gap-3">

          {otpSent && (
            <p className="text-green-600 font-medium text-sm flex items-center gap-1">
              OTP sent successfully!
            </p>
          )}


          {!otpSent ? (
            <button
              className="w-32 h-10 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              onClick={handleSENDOTP}
            >
              SEND OTP
            </button>
          ) : (
            <button
              className="w-32 h-10 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
              onClick={handleSENDOTP}
            >
              RESEND OTP
            </button>
          )}


          {otpSent && (
            <>
              <input
                type="text"
                placeholder="Enter OTP *"
                value={otp}
                onChange={handleOtpChange}
                className={`w-full h-12 px-3 border rounded-md focus:outline-none focus:ring-2 text-start 
    ${otpError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
              />


              {otpError && (
                <p className="text-red-600 font-medium text-sm flex items-center gap-1 pt-2">
                  <span><InfoCircle size="14" color="#DC2626" /></span> {otpError}
                </p>
              )}

              <button
                className="w-32 h-10 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition"
                onClick={handleVerifyOtp}
              >
                VERIFY OTP
              </button>
              {otpSuccess && (
                <p className="text-green-600 font-medium text-sm flex items-center gap-1 pt-2">
                  {otpSuccess}
                </p>
              )}
            </>
          )}


          <button className="w-32 h-10 bg-blue-400 text-white font-semibold rounded-lg hover:bg-blue-500 transition">
            REGISTER
          </button>
        </div>






      </div>
    </div>
  );
}
