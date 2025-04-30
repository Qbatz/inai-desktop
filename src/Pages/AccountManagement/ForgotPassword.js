/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import LoginImage from '../../Asset/Images/Login_Image.svg';
import InaiLogo from '../../Asset/Images/Inai_Logo.svg';
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha';
import { InfoCircle } from "iconsax-react";
import { useDispatch, useSelector } from 'react-redux';
import { FORGOT_PASSWORD_API_CALL, RESET_CODE } from "../../Utils/Constant";

function ClientIDChange() {

    const dispatch = useDispatch();
    const state = useSelector(state => state)
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(state?.Common?.errorMessage)
    const [siteKey, setSiteKey] = useState('')
    const resetPassword = useSelector(state => state?.Common?.resetPassword);
    const [email, setEmail] = useState("");
    const [formError, setFormError] = useState({ email: "", captcha: "" });
    const [captchaValue, setCaptchaValue] = useState(null);

    useEffect(() => {

        setErrorMessage(state?.Common?.errorMessage)


    }, [state.Common.errorMessage])

    const handleEmailChange = (e) => {
        const value = e.target.value.toLowerCase();
        setEmail(value);
        setFormError((prevErrors) => ({ ...prevErrors, email: "" }));

        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
        if (value && !emailRegex.test(value)) {
            setFormError((prevErrors) => ({
                ...prevErrors,
                email: "Invalid email format ",
            }));
        }
    };

    const handleCaptchaChange = (value) => {


        setCaptchaValue(value);
        setFormError((prevErrors) => ({ ...prevErrors, captcha: "" }));
    };
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = { email: "", captcha: "" };
        if (email && captchaValue) {
            dispatch({ type: FORGOT_PASSWORD_API_CALL, payload: { email: email, recaptcha: captchaValue } })
            setLoading(true)
        }

        if (!email) {
            errors.email = "Email is required";
        } else {
            const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
            if (!emailRegex.test(email)) {
                errors.email = "Invalid email format ";
            }
        }


        if (!captchaValue) {
            errors.captcha = "Please verify that you are not a robot";
        }


        if (errors.email || errors.captcha) {
            setFormError(errors);
            return;
        }
    };

    useEffect(() => {
        if (resetPassword) {
            setEmail("");
            setCaptchaValue(null);
            setFormError({ email: "", captcha: "" });

            const timer = setTimeout(() => {
                dispatch({ type: RESET_CODE });
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [resetPassword, dispatch]);


    useEffect(() => {
        const hostname = window.location.hostname;
        const selectedKey =
            hostname === "localhost"
                ? process.env.REACT_APP_RECAPTCHA_LOCAL_KEY
                : process.env.REACT_APP_RECAPTCHA_LIVE_KEY;
        setSiteKey(selectedKey)

    }, [])





    useEffect(() => {
        if (state.Common.successCode === 200 || state.Common.code === 400 || state.Common.code === 401 || state.Common.code === 402) {
            setLoading(false)
            setTimeout(() => {
                dispatch({ type: RESET_CODE })
            }, 5000)

        }
    }, [state.Common.successCode, state.Common.code]);







    return (
        <div className='bg-slate-100 w-screen  min-h-screen flex items-center justify-center '>

            <div className='bg-white  h-full   max-w-6xl w-full rounded-3xl shadow-lg'>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-10'>

                    <div className='flex flex-col items-center justify-center'>
                        <img src={LoginImage} className='w-full h-auto max-w-md object-contain' alt='Login' />
                        <div className="text-center ">
                            <div className="mx-auto w-full max-w-[340px]">
                                <label className="block text-black text-3xl font-bold font-Montserrat mb-3">
                                    Communication is the heart of Business.
                                </label>
                                <label className="block text-neutral-600 font-Montserrat text-base font-normal">
                                    Stay connected with a Right Supplier and Buyer!!
                                </label>
                            </div>
                        </div>

                    </div>


                    <div className='Right_Side m-3 flex flex-col justify-center relative'>

                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                                <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
                            </div>
                        )}

                        {
                            state.Common.successMessage && <label className="block  mb-4 text-start font-Gilroy font-normal text-md text-green-600"> {state.Common.successMessage} </label>
                        }

                        <div className='flex justify-start mb-2'>
                            <img src={InaiLogo} alt='INAI Logo' className='h-<fraction> w-<fraction>' />
                        </div>

                        <div className='text-start mb-2'>
                            <label className='block text-28px font-semibold font-Gilroy pt-4'>Forgot Password </label>
                        </div>


                        <div className='w-full max-w-[455px]'>




                            <div className='mb-2'>
                                <label className='block text-black mb-2 text-start font-Gilroy font-normal text-sm' htmlFor='userId'>Verify Your Email</label>
                                <input
                                    id='userId'
                                    type='text'
                                    name='username'
                                    autoComplete='username'
                                    onChange={handleEmailChange}
                                    autoCorrect='off'
                                    placeholder='Enter Verify Your Email'
                                    className='w-full h-14 px-3 py-2 border rounded-xl focus:outline-none  text-sm font-Gilroy  font-medium text-neutral-600'
                                />
                                {formError.email && (
                                    <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                        <span><InfoCircle size="14" color="#DC2626" /></span> {formError.email} </p>)}
                            </div>

                            <div className="mt-6 flex flex-col items-center justify-center">

                                <div
                                    className=" font-Gilroy text-lg bg-white flex justify-center lg:[transform:scaleX(1.5)_scaleY(0.9)] sm:[transform:scaleX(1)_scaleY(1)] "

                                >
                                    {siteKey && (
                                        <ReCAPTCHA sitekey={siteKey} onChange={handleCaptchaChange} />
                                    )}
                                </div>


                                {formError.captcha && (
                                    <div className="mt-2 w-full text-start">
                                        <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center  gap-1">
                                            <InfoCircle size="14" color="#DC2626" /> {formError.captcha}
                                        </p>
                                    </div>
                                )}
                            </div>
                            {resetPassword && (
                                <div className="mt-4 text-green-800 font-Gilroy font-medium text-sm flex items-center  gap-1">

                                    {resetPassword}
                                </div>
                            )}
                            {errorMessage && (
                                <div className="mt-4 text-red-600 font-Gilroy font-medium text-sm flex items-center justify-center gap-1">
                                    <InfoCircle size="14" color="#DC2626" />
                                    {errorMessage}
                                </div>
                            )}
                            <button type='submit' className='mt-6 font-Montserrat font-semibold text-base w-full bg-[#205DA8] text-white p-[14px] rounded-xl  transition duration-300 sm:text-lg'
                                onClick={handleSubmit}>
                                Submit
                            </button>


                            <div className="text-start mt-4">
                                <p className="text-black font-Montserrat font-normal text-base">
                                    Already have an account?{' '}
                                    <span onClick={() => { navigate("/"); dispatch({ type: RESET_CODE }); }}
                                        className="cursor-pointer text-[#205DA8] hover:text-[#205DA8] font-semibold transition duration-300 font-Montserrat"
                                    >
                                        Sign In
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

export default ClientIDChange;