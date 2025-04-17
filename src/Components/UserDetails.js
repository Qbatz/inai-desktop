/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, connect } from 'react-redux';
import { MdError } from 'react-icons/md';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import imageCompression from 'browser-image-compression';
import { GET_USER_INFO_SAGA } from '../Utils/Constant';




const UserDetails = ({state}) => {

    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState("editProfile");
    const [selectedImage, setSelectedImage] = useState(null);
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
            dispatch({ type: GET_USER_INFO_SAGA,  payload: formData});
        }

    };

    const handleImageChange = async (event) => {
        const fileImage = event.target.files[0];
        if (fileImage) {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 800,
                useWebWorker: true,
            };
            try {
                const compressedFile = await imageCompression(fileImage, options);

                if (compressedFile instanceof Blob) {
                    setSelectedImage(URL.createObjectURL(compressedFile));
                } else {
                    console.error("Compressed file is not a Blob:", compressedFile);
                }
            } catch (error) {
                console.error("Image compression error:", error);
            }
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


    const handleUpdateClick = () => {
        document.getElementById('image-upload').click();
    };

    return (
        <div className=" bg-white p-4 flex flex-col items-start">
            <p className="font-Gilroy font-semibold text-2xl leading-none tracking-normal mb-6 -mt-5 ml-5">Account settings</p>

            <div className="flex items-center gap-6  w-full">
                <img
                    src={selectedImage || state.Profile}
                    alt="Profile"
                    className="w-[120px] h-[120px] rounded-full object-cover object-top"
                />


                <div className="flex flex-col text-start">

                    <p className="font-Gilroy font-semibold text-xl tracking-normal mb-2 whitespace-nowrap">
                        {state?.firstName} {state?.lastName}
                    </p>

                    <p className="font-Gilroy font-medium text-xs tracking-normal text-gray-500">
                        JPG or PNG up to 5MB
                    </p>
                    <button
                        className="text-[#205DA8] mt-2 text-start font-Gilroy font-semibold text-base"
                        onClick={handleUpdateClick}
                    >
                        Update image
                    </button>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/jpeg, image/png"
                        className="hidden"
                        onChange={handleImageChange}
                    />
                </div>
            </div>

            <div className="border-b mb-2 mt-4 w-full">
                <button
                    className={`font-Gilroy font-semibold text-base pb-2 mr-6 ${activeTab === "editProfile"
                        ? "text-[#205DA8] border-b-2 border-[#205DA8] px-4"
                        : "text-gray-500"
                        }`}
                    onClick={() => setActiveTab("editProfile")}
                >
                    Edit Profile
                </button>
                <button
                    className={`font-Gilroy font-semibold text-base pb-2 ${activeTab === "accountSettings"
                        ? "text-[#205DA8] border-b-2 border-[#205DA8] px-4"
                        : "text-gray-500"
                        }`}
                    onClick={() => setActiveTab("accountSettings")}
                >
                    Account Settings
                </button>
            </div>

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

                            <input
                                type="tel"
                                name="mobileNo"
                                value={formData.mobileNo}
                                onChange={(e) => {
                                    let value = e.target.value.replace(/\D/g, "");
                                    if (!value.startsWith("91")) {
                                        value = "+ 91" + value;
                                    }
                                    if (value.length <= 12) {
                                        handleChange({ target: { name: "mobileNo", value: `+${value}` } });
                                    }
                                }}
                                className="font-Gilroy font-medium text-xs border rounded-xl p-3 w-full max-w-sm"
                            />


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




