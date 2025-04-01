/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { InfoCircle } from "iconsax-react";
import { Eye, EyeOff } from "lucide-react";
import { useLocation } from "react-router-dom";
import { RESET_PAGE_API_CALL, RESET_CODE, RESET_PASSWORD_API_CALL } from "../../Utils/Constant";
import { useDispatch, useSelector } from 'react-redux';

const ReSetPassword = () => {

    const dispatch = useDispatch();

    const state = useSelector(state => state)

    const [errorResetMessage, setErrorResetMessage] = useState(state?.Common?.errorMessage)
    const resetverify = useSelector(state => state?.Common?.resetverify)


    const [errorMessage, setErrorMessage] = useState(state?.Common?.errorMessage)

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState({});
    const [success, setSuccess] = useState(false);
    const [verifycode, setverifycode] = useState('')


    const location = useLocation();
    const [hash, setHash] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasherror, sethashError] = useState("");

 

    useEffect(() => {

        setErrorMessage(state?.Common?.errorMessage)
        setTimeout(() => {
            dispatch({ type: RESET_CODE });
        }, 1000);

    }, [state.Common.errorMessage, dispatch])

    useEffect(() => {

        setErrorResetMessage(state?.Common?.errorMessage)
        setTimeout(() => {
            dispatch({ type: RESET_CODE });
        }, 1000);
    }, [state.Common.errorMessage, dispatch])


    

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const hashValue = queryParams.get("hash");
    
        if (hashValue) {
            setHash(hashValue);
            setLoading(true); 
            sethashError(""); 
    
            try {
                dispatch({ type: RESET_PAGE_API_CALL, payload: { verify_code: hashValue } });
            } catch (error) {
                sethashError("Error verifying link. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    }, [location.search]);
    
    
    






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
            newErrors.password = "Password must be 8-20 characters long.";
        else if (!password.match(passwordRegex.upperCase))
            newErrors.password = "Password must contain at least one uppercase letter.";
        else if (!password.match(passwordRegex.number))
            newErrors.password = "Password must contain at least one number.";
        else if (!password.match(passwordRegex.specialChar))
            newErrors.password = "Password must contain at least one special character.";

        if (!confirmPassword)
            newErrors.confirmPassword = "Confirm Password is required.";
        else if (confirmPassword !== password)
            newErrors.confirmPassword = "Passwords do not match.";

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        

        if (validateForm()) {
            if (password && confirmPassword) {
                            dispatch({ type: RESET_PASSWORD_API_CALL, payload: { password: password, password2: confirmPassword, verify_code: hash } })

            }
           
            setTimeout(() => {
                setSuccess(false);
                setPassword("");
                setConfirmPassword("");
            }, 2000);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-8">



            {loading && <p className="text-blue-500 text-center">Verifying link...</p>}
            {hasherror && <p className="text-red-600 text-center">{errorMessage}</p>}

            {!loading && !hasherror && hash && (


                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-center text-black mb-6">
                        Reset Password
                    </h2>

                    {success && (
                        <p className="text-green-600 font-medium text-sm text-center pb-4">
                            Password reset successfully!
                        </p>
                    )}

                    <div className="mb-4 relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password *"
                            value={password}
                            onChange={handlePassword}
                            className="w-full h-12 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-3 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                        {error.password && (
                            <p className="text-red-600 font-medium text-sm flex items-center gap-1 pt-2">
                                <InfoCircle size="14" color="#DC2626" /> {error.password}
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
                            {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                        </button>
                        {error.confirmPassword && (
                            <p className="text-red-600 font-medium text-sm flex items-center gap-1 pt-2">
                                <InfoCircle size="14" color="#DC2626" /> {error.confirmPassword}
                            </p>
                        )}
                    </div>
                    {resetverify && (
                        <div className="mt-4 text-green-800 font-Gilroy font-medium text-sm flex items-center justify-center gap-1">

                            {resetverify}
                        </div>
                    )}
                    {errorResetMessage && (
                        <div className="mt-4 text-red-600 font-Gilroy font-medium text-sm flex items-center justify-center gap-1">
                            <InfoCircle size="14" color="#DC2626" />
                            {errorResetMessage}
                        </div>
                    )}

                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="mt-2 font-semibold text-base w-full p-[10px] rounded-xl transition duration-300 
                    bg-[#205DA8] text-white hover:bg-blue-700 cursor-pointer"
                    >
                        Submit
                    </button>



                </div>
            )}

        </div>
    );
};

export default ReSetPassword;
