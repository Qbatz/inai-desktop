/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { InfoCircle } from "iconsax-react";
import { Eye, EyeOff } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { RESET_PAGE_API_CALL, RESET_CODE, RESET_PASSWORD_API_CALL, LOG_OUT } from "../../Utils/Constant";
import { useDispatch, useSelector } from 'react-redux';
import InaiLogo from '../../Asset/Images/Inai_Logo.svg';
import LoginImage from '../../Asset/Images/Login_Image.svg';
import { encryptData } from "../../Crypto/crypto";



const ReSetPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const state = useSelector(state => state)

    const [errorMessage, setErrorMessage] = useState(state?.Common?.errorMessage)

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState({});
    const [success, setSuccess] = useState(false);



    const location = useLocation();
    const [hash, setHash] = useState(null);
    const [loading, setLoading] = useState(false);




    useEffect(() => {
        if (state.Common.errorMessage !== "") {
            setErrorMessage(state?.Common?.errorMessage)
        }


    }, [state.Common.errorMessage])






    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const hashValue = queryParams.get("hash");

        if (hashValue) {
            setHash(hashValue);

            try {
                dispatch({ type: RESET_PAGE_API_CALL, payload: { verify_code: hashValue } });
            } catch (error) {
                console.error("Error during dispatch:", error);
            } finally {
                setLoading(false);
            }
        }
    }, [location.search]);


    useEffect(() => {
        if (state.Common.IsVisible === 1) {
            dispatch({ type: LOG_OUT });
            const encryptDataLogin = encryptData(JSON.stringify(false));
            localStorage.setItem("inai_login", encryptDataLogin.toString());
            navigate('/')
        }

    }, [state.Common.IsVisible])





    useEffect(() => {
        if (state.Common.successCode === 200 || state.Common.code === 400 || state.Common.code === 401 || state.Common.code === 402) {
            setLoading(false)
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                dispatch({ type: RESET_CODE })
            }, 5000)

        }
    }, [state.Common.successCode, state.Common.code]);


    const passwordRegex = {
        length: /^.{8,20}$/,
        upperCase: /[A-Z]/,
        number: /[0-9]/,
        specialChar: /[!@#$%^&*(),.?":{}|<>]/
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
        setError((prev) => ({ ...prev, password: "" }));
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
        setError((prev) => ({ ...prev, confirmPassword: "" }));
    };

    const validateForm = () => {
        let newErrors = {};

        if (!password.match(passwordRegex.length))
            newErrors.password = "Password must be 8-20 characters long";
        else if (!password.match(passwordRegex.upperCase))
            newErrors.password = "Password must contain at least one uppercase letter";
        else if (!password.match(passwordRegex.number))
            newErrors.password = "Password must contain at least one number";
        else if (!password.match(passwordRegex.specialChar))
            newErrors.password = "Password must contain at least one special character";

        if (!confirmPassword)
            newErrors.confirmPassword = "Confirm Password is required";
        else if (confirmPassword !== password)
            newErrors.confirmPassword = "Passwords do not match";

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            if (password && confirmPassword) {
                dispatch({ type: RESET_PASSWORD_API_CALL, payload: { password: password, password2: confirmPassword, verify_code: hash } })
                setLoading(true)
            }

            setTimeout(() => {
                setSuccess(false);

            }, 2000);
        }
    };










    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8 relative">


            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                    <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
                </div>
            )}

            {errorMessage ?
                <div className="bg-white  h-full   max-w-3xl w-full rounded-3xl shadow-lg">

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-3'>

                        <div className='flex flex-col items-center justify-center'>
                            <img src={LoginImage} className='w-full h-auto max-w-md object-contain' alt='Login' />
                            <div className="text-center ">
                                <div className="mx-auto w-full max-w-[340px]">
                                    <label className="block text-black text-2xl font-bold font-Montserrat mb-3">
                                        Communication is the heart of Business.
                                    </label>
                                    <label className="block text-neutral-600 font-Montserrat text-base font-normal">
                                        Stay connected with a Right Supplier and Buyer!!
                                    </label>
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-col justify-center items-center relative">

                            <div className='flex justify-start mb-2'>
                                <img src={InaiLogo} alt='INAI Logo' className='h-<fraction> w-<fraction>' />
                            </div>

                            <div className='text-start mb-2'>
                                <label className='block text-28px font-semibold font-Gilroy pt-4'>Reset Password </label>
                            </div>
                            <div className='mt-4'>

                                <p className="text-red-600  font-Gilroy text-lg ">{errorMessage}</p>
                            </div>

                        </div>
                    </div>
                </div>





                :


                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md relative">



                    <h2 className="text-2xl font-semibold text-center text-black mb-6 font-Gilroy">
                        Reset Password
                    </h2>

                    {success && (
                        <p className="text-green-600 font-medium text-sm text-center pb-4 font-Gilroy">
                            Password reset successfully!
                        </p>
                    )}


                    <div className="mb-4 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={handlePassword}
                            className="w-full h-12 px-3 border text-md border-gray-300 font-Gilroy rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                        <div className="absolute left-[84px] top-1 text-red-500 pointer-events-none select-none">
                            *
                        </div>
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                        {error.password && (
                            <p className="text-red-600 font-medium text-sm flex items-center gap-1 pt-2 font-Gilroy">
                                <InfoCircle size="14" color="#DC2626" /> {error.password}
                            </p>
                        )}
                    </div>


                    <div className="mb-4 relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            className="w-full h-12 px-3 border text-md font-Gilroy border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        />
                        <div className="absolute left-[146px] top-1 text-red-500 pointer-events-none select-none">
                            *
                        </div>
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                        {error.confirmPassword && (
                            <p className="text-red-600 font-medium text-sm flex items-center gap-1 pt-2 font-Gilroy">
                                <InfoCircle size="14" color="#DC2626" /> {error.confirmPassword}
                            </p>
                        )}
                    </div>




                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="mt-2 font-semibold text-base w-full p-[10px] rounded-xl transition duration-300 
                    bg-[#205DA8] text-white  cursor-pointer font-Gilroy"
                    >
                        Submit
                    </button>



                </div>
            }


        </div>
    );
};

export default ReSetPassword;
