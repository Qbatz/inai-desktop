/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';
import { MdError } from 'react-icons/md';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { GET_USER_INFO_SAGA } from '../../Utils/Constant';
import Activities from './Activities';



const UserDetails = ({ state }) => {

    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState("editProfile");

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNo: '',
        id: 0
    });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        mobileNo: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setNewShowPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [noChangesMessage, setNoChangesMessage] = useState('');
    const [passwordErrors, setPasswordErrors] = useState({
        currentPassword: '',
        newPassword: '',
        bothPassword: '',
    });
    const [activeTabs, setActiveTabs] = useState(1);

    useEffect(() => {
        dispatch({ type: GET_USER_INFO_SAGA });
    }, []);


    useEffect(() => {
        if (state) {
            setFormData({
                firstName: state.firstName || '',
                lastName: state.lastName || '',
                email: state.email || '',
                mobileNo: state.mobileNo || '',
                id: state.userId || 0,
            });
        }
    }, [state]);





    useEffect(() => {
        setNoChangesMessage("");
    }, [activeTab]);


    const validate = () => {
        let tempErrors = { ...errors };
        let isValid = true;

        if (!formData.firstName) {
            tempErrors.firstName = 'First name is required';
            isValid = false;
        } else {
            tempErrors.firstName = '';
        }

        if (!formData.lastName) {
            tempErrors.lastName = 'Last name is required';
            isValid = false;
        } else {
            tempErrors.lastName = '';
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!formData.email || !emailPattern.test(formData.email)) {
            tempErrors.email = 'Please enter a valid email address';
            isValid = false;
        } else {
            tempErrors.email = '';
        }

        const mobileNoPattern = /^[0-9]{10}$/;
        if (!formData.mobileNo || !mobileNoPattern.test(formData.mobileNo)) {
            tempErrors.mobileNo = 'Please enter a valid 10-digit mobile number';
            isValid = false;
        } else {
            tempErrors.mobileNo = '';
        }

        setErrors(tempErrors);
        return isValid;
    };


    const validatePasswords = () => {
        let tempErrors = { ...passwordErrors };
        let isValid = true;

        if (!currentPassword) {
            tempErrors.currentPassword = 'Current password is required';
            isValid = false;
        } else {
            tempErrors.currentPassword = '';
        }

        if (!newPassword) {
            tempErrors.newPassword = 'New password is required';
            isValid = false;
        } else {
            tempErrors.newPassword = '';
        }

        if (newPassword === currentPassword) {
            tempErrors.bothPassword = 'New password cannot be the same as the current password';
            isValid = false;
        } else {
            tempErrors.bothPassword = '';
        }

        setPasswordErrors(tempErrors);
        return isValid;
    };



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: '',
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let tempErrors = {};

        if (!formData.firstName) {
            tempErrors.firstName = 'First name is required';
        }
        if (!formData.lastName) {
            tempErrors.lastName = 'Last name is required';
        }
        if (!formData.email) {
            tempErrors.email = 'Email address is required';
        }
        if (!formData.mobileNo) {
            tempErrors.mobileNo = 'Mobile number is required';
        }

        if (Object.keys(tempErrors).length > 0) {
            setErrors(tempErrors);
            return;
        }
        if (validate()) {
            dispatch({ type: GET_USER_INFO_SAGA, payload: formData });
        }

    };



    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleNewPasswordVisibility = () => {
        setNewShowPassword(!showNewPassword);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        if (validatePasswords()) {
            const PasswordPayload = {
                old_password: currentPassword,
                new_password: newPassword,
            };
            dispatch({ type: 'UPDATEPASSWORD', payload: PasswordPayload });
        }
        setCurrentPassword("")
        setNewPassword("")
    };

    const handleCurrentPasswordChange = (e) => {
        const newCurrentPassword = e.target.value.trim();
        setCurrentPassword(newCurrentPassword);
        setPasswordErrors((prev) => ({ ...prev, currentPassword: "", bothPassword: "" }));

    };

    const handleNewPasswordChange = (e) => {
        const newPasswordValue = e.target.value.trim();
        setNewPassword(newPasswordValue);
        setPasswordErrors((prev) => ({ ...prev, newPassword: "", bothPassword: "" }));

        if (!newPasswordValue) {
            setPasswordErrors((prev) => ({ ...prev, newPassword: 'New password is required.' }));
        }
    };




    const tabs = [
        { id: 1, label: "Profile" },
        { id: 2, label: "Activities" },

    ];

    const handleTabClick = (id) => {
        setActiveTabs(id)

    }


    return (
        <div className="bg-slate-100  w-full rounded-t-2xl p-2 sm:p-2 md:p-2 lg:p-4">
            <p className="font-Gilroy font-semibold text-2xl leading-none tracking-normal mb-4 ps-4">Account settings</p>

            <div className="flex items-center gap-6  w-full">



                <div className="flex flex-col text-start ps-4">

                    <p className="font-Gilroy font-semibold text-xl tracking-normal  whitespace-nowrap">
                        {state?.firstName} {state?.lastName}
                    </p>


                </div>
            </div>


            <div className="sticky top-0  z-10 overflow-x-auto bg-slate-100 p-2 sm:p-2 md:p-2 lg:p-4">
                <div className="flex flex-col sm:flex-row gap-8    border-gray-300">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`px-0 py-2 font-Gilroy  text-base
                                 ${activeTabs === tab.id
                                    ? "border-b-4 border-[#205DA8] text-[#205DA8] font-semibold text-base"
                                    : "text-gray-500 border-neutral-400 border-b-4 text-base"
                                } transition-all duration-300 text-left sm:text-center`}
                            onClick={() => handleTabClick(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="p-2 sm:p-2 md:p-2 lg:p-4 bg-white  rounded-2xl max-w-5xl">

                {
                    activeTabs === 1 && <div>
                        <div className="w-full p-2 sm:p-2 md:p-2 lg:p-4">
                            <button
                                className={`font-Gilroy font-semibold text-base pb-2 mr-6 ${activeTab === "editProfile"
                                    ? "text-[#205DA8] border-b-4 border-[#205DA8] px-0 text-base"
                                    : "text-gray-500 border-neutral-300 border-b-4 text-base"
                                    }`}
                                onClick={() => setActiveTab("editProfile")}
                            >
                                Edit Profile
                            </button>
                            <button
                                className={`font-Gilroy font-semibold text-base pb-2 ${activeTab === "accountSettings"
                                    ? "text-[#205DA8] border-b-4 border-[#205DA8] px-0 text-base"
                                    : "text-gray-500 border-neutral-300 border-b-4 text-base"
                                    }`}
                                onClick={() => setActiveTab("accountSettings")}
                            >
                                Account Settings
                            </button>
                        </div>
                        <div className="p-2 sm:p-2 md:p-2 lg:p-4 bg-white  rounded-2xl max-w-3xl">
                            {activeTab === "editProfile" && (
                                <>
                                    <h3 className="font-Gilroy font-semibold text-lg mb-4">Profile details</h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-4 w-full max-w-2xl">
                                        <div>
                                            <label className="block font-Gilroy text-sm mb-2">First Name</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                className="font-Gilroy font-medium text-xs border rounded-xl p-3 w-full max-w-md"
                                            />
                                            {errors.firstName && (
                                                <p className="text-red-500 text-xs flex items-center font-Gilroy mt-1">
                                                    <MdError className="mr-1" />
                                                    {errors.firstName}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block font-Gilroy text-sm mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                className="font-Gilroy font-medium text-sm border rounded-xl p-3 w-full max-w-md"
                                            />
                                            {errors.lastName && (
                                                <p className="text-red-500 text-xs flex items-center font-Gilroy mt-1">
                                                    <MdError className="mr-1" />
                                                    {errors.lastName}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block font-Gilroy text-sm mb-2">Email address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="font-Gilroy font-medium text-xs border rounded-xl p-3 w-full max-w-md"
                                            />
                                            {errors.email && (
                                                <p className="text-red-500 text-xs flex items-center font-Gilroy mt-1">
                                                    <MdError className="mr-1" />
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block font-Gilroy text-sm mb-2">Mobile number</label>
                                            <div className="relative w-full max-w-sm">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-500">
                                                    +91
                                                </span>
                                                <input
                                                    type="tel"
                                                    name="mobileNo"
                                                    value={formData.mobileNo}
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/\D/g, "");
                                                        if (value.length <= 10) {
                                                            handleChange({ target: { name: "mobileNo", value } });
                                                        }
                                                    }}
                                                    className="pl-14 pr-4 py-[10px] border border-gray-300 rounded-full w-full text-sm text-gray-700 placeholder-gray-400 focus:outline-none"
                                                    placeholder="Enter mobile number"
                                                />
                                            </div>
                                            {errors.mobileNo && (
                                                <p className="text-red-500 text-xs flex items-center font-Gilroy mt-1">
                                                    <MdError className="mr-1" />
                                                    {errors.mobileNo}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {noChangesMessage && (
                                        <div className="flex items-center text-red-500 text-xs mb-4 font-Gilroy">
                                            <MdError className="mr-1" />
                                            {noChangesMessage}
                                        </div>
                                    )}
                                    <button className="bg-[#205DA8] border-b-2 text-white font-Gilroy font-medium text-base py-2 px-4 rounded-3xl mb-6"
                                        onClick={handleSubmit}
                                    >Save changes</button>
                                </>
                            )}

                            {activeTab === "accountSettings" && (
                                <>
                                    <h3 className="font-Gilroy font-semibold text-lg mb-5">Account Settings</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6 w-full max-w-2xl">
                                        <div>
                                            <label className="block font-Gilroy text-sm mb-2">Current Password</label>
                                            <div className="relative">
                                                <input
                                                    autoComplete="new-password"
                                                    autoCorrect="off"
                                                    className="font-Gilroy font-medium text-xs border rounded-xl p-3 w-full max-w-md pr-10"
                                                    data-testid="input-password"
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="********"
                                                    value={currentPassword}
                                                    onChange={handleCurrentPasswordChange}
                                                />
                                                <span
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                                    onClick={togglePasswordVisibility}
                                                >
                                                    {showPassword ? (
                                                        <EyeIcon className="w-5 h-5 text-gray-500" />
                                                    ) : (
                                                        <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                                                    )}
                                                </span>
                                            </div>
                                            {passwordErrors.currentPassword && (
                                                <p className="text-red-500 text-xs flex items-center font-Gilroy mt-1">
                                                    <MdError className="mr-1" />
                                                    {passwordErrors.currentPassword}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block font-Gilroy text-sm mb-2">New Password</label>
                                            <div className="relative">
                                                <input
                                                    className="font-Gilroy font-medium text-xs border rounded-xl p-3 w-full max-w-md pr-10"
                                                    data-testid="input-password"
                                                    type={showNewPassword ? "text" : "password"}
                                                    placeholder="********"
                                                    value={newPassword}
                                                    onChange={handleNewPasswordChange}
                                                />
                                                <span
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                                                    onClick={toggleNewPasswordVisibility}
                                                >
                                                    {showNewPassword ? (
                                                        <EyeIcon className="w-5 h-5 text-gray-500" />
                                                    ) : (
                                                        <EyeSlashIcon className="w-5 h-5 text-gray-500" />
                                                    )}
                                                </span>
                                            </div>
                                            {passwordErrors.newPassword && (
                                                <p className="text-red-500 text-xs flex items-center font-Gilroy mt-1">
                                                    <MdError className="mr-1" />
                                                    {passwordErrors.newPassword}
                                                </p>
                                            )}
                                            {passwordErrors.bothPassword && (
                                                <p className="text-red-500 text-xs flex items-center font-Gilroy mt-1">
                                                    <MdError className="mr-1 text-sm mb-4i]'
                                    " />
                                                    {passwordErrors.bothPassword}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <button className="bg-[#205DA8] text-white font-Gilroy font-medium text-base py-2 px-4 rounded-3xl mb-6"
                                        onClick={handlePasswordSubmit}
                                    >Save changes</button>
                                </>
                            )}
                        </div>

                    </div>
                }

                {
                    activeTabs === 2 && <Activities />
                }

            </div>
        </div>
    );
};

const mapsToProps = (stateInfo) => {
    return {
        state: stateInfo.userInfo.userDetails

    }
}
UserDetails.propTypes = {
    state: PropTypes.object,
};
export default connect(mapsToProps)(UserDetails)




