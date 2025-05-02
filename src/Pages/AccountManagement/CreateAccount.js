/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import LoginImage from '../../Asset/Images/Login_Image.svg';
import InaiLogo from '../../Asset/Images/Inai_Logo.svg';
import { useNavigate } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha';
import { InfoCircle } from "iconsax-react";
import { useDispatch, useSelector } from 'react-redux';
import { CREATE_ACCOUNT_API_CALL, RESET_CODE, SIGN_UP_VERIFICATION_SAGA, STORE_VERIFY_CODE, REMOVE_ACCOUNT_REDUCER } from "../../Utils/Constant";
import SignUp from './SignUp';



function CreateAccount() {

    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(state?.Common?.errorMessage)
    const emailid = useSelector(state => state?.Common?.emailid)
    const [email, setEmail] = useState("");
    const [formError, setFormError] = useState({ email: "", captcha: "" });
    const [captchaValue, setCaptchaValue] = useState(null);
    const [loading, setLoading] = useState(false)
    const [siteKey, setSiteKey] = useState('')
    const [message, setMessage] = useState(false);
    const [emailVerifyMessage, setEmailVerifyMessage] = useState(false)

    const handleEmailChange = (e) => {
        setErrorMessage('')
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
        setErrorMessage('')
        setCaptchaValue(value);
        setFormError((prevErrors) => ({ ...prevErrors, captcha: "" }));
    };

    const handleSubmit = (e) => {
        setErrorMessage('')
        e.preventDefault();
        let errors = { email: "", captcha: "" };
        if (email && captchaValue) {
            dispatch({ type: CREATE_ACCOUNT_API_CALL, payload: { email: email, recaptcha: captchaValue } })
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
        if (emailid) {

            setLoading(false)
            setErrorMessage('')
            setCaptchaValue(null);
            const timer = setTimeout(() => {
                dispatch({ type: RESET_CODE });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [emailid]);



    useEffect(() => {
        if (state.Common.successCode === 200 || state.Common.code === 400 || state.Common.code === 401 || state.Common.code === 402) {
            setLoading(false)
            setEmail('')
            setTimeout(() => {
                dispatch({ type: RESET_CODE })
            }, 8000)
        }
    }, [state.Common.successCode, state.Common.code]);




    useEffect(() => {
        if (state.Common?.isTriggerMessage === 1) {
            setEmailVerifyMessage(true)
        } else if (state.Common.errorMessage) {
            setErrorMessage(state?.Common?.errorMessage)
            setEmailVerifyMessage(false)
        }

    }, [state.Common?.isTriggerMessage, state.Common?.errorMessage])


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const verifyCode = params.get('verify_code');
        if (verifyCode) {
            dispatch({ type: SIGN_UP_VERIFICATION_SAGA, payload: { verify_code: verifyCode } })
            dispatch({ type: STORE_VERIFY_CODE, payload: verifyCode })
        }
    }, []);


    useEffect(() => {
        const hostname = window.location.hostname;
        const selectedKey =
            hostname === "localhost"
                ? process.env.REACT_APP_RECAPTCHA_LOCAL_KEY
                : process.env.REACT_APP_RECAPTCHA_LIVE_KEY;
        setSiteKey(selectedKey)

    }, [])


    useEffect(() => {
        if (state.userInfo.isTrue) {
            setMessage(true);


        }
    }, [state.userInfo.isTrue])


    return (
        <div className='bg-slate-100 w-screen  min-h-screen flex items-center justify-center p-4'>

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                    <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
                </div>
            )}
            <div className='bg-white  h-auto max-w-6xl rounded-3xl shadow-lg !mt-[8px] !mb-[10px]'>









                {emailVerifyMessage && (
                    <div className="p-6 text-center font-Gilroy">
                        <h2 className="text-[#0AEB7A] font-Gilroy"> <span className="text-[#77DAA9] text-lg font-semibold font-Gilroy me-1">Success!</span>

                            Check your email <span className="font-bold font-Gilroy">{emailid}</span> to complete the registration
                            Check your Junk/Spam folder
                            Add <span className="font-semibold font-Gilroy">noreply@inaippl.com</span> to your address book.to avoid notification emails going to the spam folder
                        </h2>

                    </div>)}

                {message &&
                    <div className="my-4 text-start flex flex-col mx-4 justify-start">
                        <p className="text-green-600 font-Gilroy font-semibold text-base mb-2">
                            Mail Verified
                        </p>
                        <p className="text-green-600 font-Gilroy font-medium text-sm ">
                            Successfully, we have created a unique Client ID.

                            Please check your registered email and log in to proceed with registration.
                        </p>
                    </div>

                }

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-6 py-2'>


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
                    <div className="flex flex-col items-center justify-center m-3">





                        <div className="flex flex-col items-start">


                            <div className="flex justify-start items-start mb-2">
                                <img src={InaiLogo} alt="INAI Logo" className="h-auto w-auto" />
                            </div>

                            <div className="text-start mb-2 w-full">
                                <label className="block text-28px font-semibold font-Gilroy pt-4">Welcome back!</label>
                                <label className="block text-neutral-600 font-Montserrat font-normal text-base pt-4">
                                    Enter your details below to get onto your INAI account.
                                </label>
                            </div>


                            {state.userInfo.is_verified === null ? <>

                                <div className="w-full max-w-[455px]">
                                    <div className="mb-2">
                                        <label className="block text-slate-700 mb-2 text-start font-Gilroy font-normal text-sm" htmlFor="userId">
                                            Verify Your Email
                                        </label>
                                        <input
                                            id="userId"
                                            type="text"
                                            name="username"
                                            value={email}
                                            onChange={handleEmailChange}
                                            autoComplete="username"
                                            autoCorrect="off"
                                            placeholder="Enter Verify Your Email"
                                            className="w-full h-14 px-3 py-2 border rounded-xl focus:outline-none text-sm font-Gilroy font-medium text-neutral-600"
                                        />
                                        {formError.email && (
                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                <span><InfoCircle size="14" color="#DC2626" /></span> {formError.email} </p>)}
                                    </div>



                                    <div className="mt-6 flex flex-col items-center justify-center">

                                        <div
                                            className="cursor-pointer font-Gilroy text-lg bg-white flex justify-center lg:[transform:scaleX(1.3)_scaleY(0.9)] sm:[transform:scaleX(1)_scaleY(1)] "

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

                                    {errorMessage && (
                                        <div className="mt-4 text-red-600 font-Gilroy font-medium text-sm flex items-center  gap-1">
                                            <InfoCircle size="14" color="#DC2626" />
                                            {errorMessage}
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        className="mt-6 font-Montserrat font-semibold text-base w-full bg-[#205DA8] text-white p-[14px] rounded-xl  transition duration-300 sm:text-lg"
                                        onClick={handleSubmit}>
                                        Submit
                                    </button>





                                    <div className="text-start mt-4">
                                        <p className="text-black font-Montserrat font-normal text-base">
                                            Already have an account?{' '}
                                            <span onClick={() => { navigate("/"); dispatch({ type: REMOVE_ACCOUNT_REDUCER }) }} className="cursor-pointer  text-[#205DA8] font-semibold transition duration-300 font-Montserrat">
                                                Sign In
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </>
                                : state.userInfo?.is_verified === 0 ?
                                    <>
                                        <SignUp />
                                    </>
                                    :
                                    <label className="text-red-600 font-Gilroy font-medium text-md text-start gap-1 pt-2">{state.userInfo.is_verified === 1 && "Email is already Verified"}</label>
                            }



                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CreateAccount;