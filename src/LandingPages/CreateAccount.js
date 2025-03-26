import React, { useState } from 'react';
import LoginImage from '../Images/Login_Image.svg';
import InaiLogo from '../Images/Inai_Logo.svg';
import {useNavigate} from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha';
import { InfoCircle } from "iconsax-react";

function CreateAccount() {

    const [email, setEmail] = useState("");
    const [formError, setFormError] = useState({ email: "", captcha: "" });
    const [captchaValue, setCaptchaValue] = useState(null);

    const handleEmailChange = (e) => {
        const value = e.target.value.toLowerCase();
        setEmail(value);
        setFormError((prevErrors) => ({ ...prevErrors, email: "" })); 

        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
        if (value && !emailRegex.test(value)) {
            setFormError((prevErrors) => ({
                ...prevErrors,
                email: "Invalid email format (allowed: .com, .org, .net, .in)",
            }));
        }
    };

    const handleCaptchaChange = (value) => {
        console.log(value, "value");

        setCaptchaValue(value);
        setFormError((prevErrors) => ({ ...prevErrors, captcha: "" })); 
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = { email: "", captcha: "" };

      
        if (!email) {
            errors.email = "Email is required.";
        } else {
            const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
            if (!emailRegex.test(email)) {
                errors.email = "Invalid email format ";
            }
        }


        if (!captchaValue) {
            errors.captcha = "Please verify that you are not a robot.";
        }


        if (errors.email || errors.captcha) {
            setFormError(errors);
            return;
        }

        alert("Form submitted successfully!");
    };const navigate =  useNavigate()


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
                        </div>

                        <div className="w-full max-w-[450px]">
                            <div className="mb-2">
                                <label className="block text-black mb-2 text-start font-Gilroy font-normal text-sm" htmlFor="userId">
                                    Verify Your Email
                                </label>
                                <input
                                    id="userId"
                                    type="text"
                                    name="username"
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

                                <ReCAPTCHA
                                    sitekey='6LcBN_4qAAAAAMYr7-fAVE1Xe-P1q1_ZD1dA3u7k'
                                    onChange={handleCaptchaChange}
                                />


                                {formError.captcha && (
                                    <div className="mt-2 w-full text-center">
                                        <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center justify-center gap-1">
                                            <InfoCircle size="14" color="#DC2626" /> {formError.captcha}
                                        </p>
                                    </div>
                                )}
                            </div>


                            <button
                                type="submit"
                                className="mt-6 font-Montserrat font-semibold text-base w-full bg-[#205DA8] text-white p-[14px] rounded-xl hover:bg-blue-700 transition duration-300 sm:text-lg"
                                onClick={handleSubmit}>
                                Submit
                            </button>

                            <div className="text-start mt-4">
                                <p className="text-black font-Montserrat font-normal text-base">
                                    Already have an account?{' '}
                                    <span onClick={() => navigate("/")} className="cursor-pointer text-blue-500 hover:text-[#205DA8] font-semibold transition duration-300 font-Montserrat">
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

export default CreateAccount;