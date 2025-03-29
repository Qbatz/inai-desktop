import React, { useState, useEffect } from "react";
import AddressVendor from "./AddressVendor";
import BankVendor from "./BankVendor";
import { InfoCircle } from "iconsax-react";
import { useDispatch, useSelector } from 'react-redux';
import { VENDOR_BASIC_INFO_SAGA, RESET_CODE, VENDOR_SAGA } from "../Utils/Constant";


function BasicVendor({ handleClose, vendorDetails }) {



    const dispatch = useDispatch();
    const state = useSelector(state => state)


    console.log("state", state)


    console.log("vendorDetails", vendorDetails)


    const [payload, setPayload] = useState(null);
    const [activeTab, setActiveTab] = useState(1);
    const [businessName, setBusinessName] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [email, setEmail] = useState("");
    const [designation, setDesignation] = useState("");
    const [gstVat, setGstVat] = useState("");
    const [cin, setCin] = useState('');
    const [tan, setTan] = useState('');
    const [pan, setPan] = useState('');
    const [legal, setLegal] = useState('');
    const [nature, setNature] = useState('');
    const [additionalContacts, setAdditionalContacts] = useState([]);
    const [formErrors, setFormErrors] = useState({});
    const [basicDetails, setBasicDetails] = useState('')


    const handleBackBasic = (value) => {
        setActiveTab(value)
    }


    const handleNextToBank = (value, payload) => {
        setActiveTab(value)
        console.log("payload", payload)
        setPayload(payload);

    }


    const handleBackToAddress = (value) => {
        setActiveTab(value)
    }







    const handleBusinessNameChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z\s]+$/.test(value) || value === "") {
            setBusinessName(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, businessName: "" }));
        }

    };

    const handleContactPersonChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z\s]*$/.test(value) || value === "") {
            setContactPerson(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, contactPerson: "" }));
        }
    };

    const handleContactNumberChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value) || value === "") {
            setContactNumber(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, contactNumber: "" }));
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value.toLowerCase();
        setEmail(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, email: "" }));

        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
        if (value && !emailRegex.test(value)) {
            setFormErrors("Invalid email format (allowed: .com, .org, .net, .in)");
        } else {
            setFormErrors("");
        }
    };


    const handleDesignationChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z\s]*$/.test(value) || value === "") {
            setDesignation(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, designation: "" }));
        }
    };

    const handleGstVatChange = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, gstVat: "" }));
        setGstVat(e.target.value);
    };

    const handleCinChange = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, cin: "" }));
        setCin(e.target.value);
    };

    const handleTanChange = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, tan: "" }));
        setTan(e.target.value);
    };

    const handlePanChange = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, pan: "" }));
        setPan(e.target.value);
    };

    const handleLegalChange = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, legal: "" }));
        setLegal(e.target.value);
    };

    const handleNatureChange = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, nature: "" }));
        setNature(e.target.value);
    };



    const validateForm = () => {
        let errors = {};

        if (!businessName.trim()) errors.businessName = "Business Name is required";
        if (!contactPerson.trim()) errors.contactPerson = "Contact Person is required";
        if (!contactNumber.trim() || !/^\d{10}$/.test(contactNumber))
            errors.contactNumber = "Enter a valid 10-digit Contact Number";
        if (!email.trim()) {
            errors.email = "Email is required";
        } else {
            const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
            if (!emailRegex.test(email)) errors.email = "Invalid Email format";
        }
        if (!designation.trim()) errors.designation = "Designation is required";
        if (!gstVat.trim()) errors.gstVat = "GST/VAT is required";
        if (!cin.trim()) errors.cin = "CIN is required";
        if (!tan.trim()) errors.tan = "TAN is required";
        if (!pan.trim()) errors.pan = "PAN is required";
        if (!legal) errors.legal = "Select Legal Status";
        if (!nature) errors.nature = "Select Nature of Business";
        // --


        additionalContacts.forEach((contact, index) => {
            if (!contact.name.trim()) errors[`additionalName${index}`] = `Name is required`;

            if (!contact.contactNumber.trim() || !/^\d{10}$/.test(contact.contactNumber)) {
                errors[`additionalContactNumber${index}`] = `Enter a valid 10-digit Contact Number`;
            }

            if (!contact.email.trim()) {
                errors[`additionalEmail${index}`] = `Email is required`;
            } else {
                const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
                if (!emailRegex.test(contact.email)) {
                    errors[`additionalEmail${index}`] = `Invalid Email format`;
                }
            }

            if (!contact.designation.trim()) errors[`additionalDesignation${index}`] = `Designation is required`;
        });

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };




    const handleSaveClick = () => {
        if (validateForm()) {
            const formattedAdditionalContacts = additionalContacts.map(contact => ({
                name: contact.name,
                contactNumber: Number(contact.contactNumber),
                contactEmail: contact.email,
                designation: contact.designation
            }));

            dispatch({
                type: VENDOR_BASIC_INFO_SAGA,
                payload: {
                    vendor_id: '',
                    businessName: businessName,
                    contactPersonName: contactPerson,
                    contactNumber: contactNumber,
                    emailId: email,
                    designation: designation,
                    gstvat: gstVat,
                    additionalContactInfo: formattedAdditionalContacts,

                }
            });
        }
    };


    useEffect(() => {
        if (state.Common.successCode === 200) {
            setBusinessName('');
            setContactPerson('');
            setContactNumber('');
            setEmail('');
            setDesignation('');
            setGstVat('');
            setAdditionalContacts([]);
            dispatch({ type: VENDOR_SAGA, payload: { searchKeyword: "jos" } })
            dispatch({ type: RESET_CODE })
        }

    }, [state.Common.successCode])

    const handleNextClick = () => {
        setActiveTab(2);
        const formattedAdditionalContacts = additionalContacts.map(contact => ({
            name: contact.name,
            contactNumber: Number(contact.contactNumber),
            contactEmail: contact.email,
            designation: contact.designation
        }));


        const payload = {

            vendor_id: '',
            businessName: businessName,
            contactPersonName: contactPerson,
            contactNumber: contactNumber,
            emailId: email,
            designation: designation,
            gstvat: gstVat,
            additionalContactInfo: formattedAdditionalContacts,


        }

        setBasicDetails(payload)

    };

    const addContact = () => {
        setAdditionalContacts([
            ...additionalContacts,
            { id: additionalContacts.length + 1, name: "", contactNumber: "", email: "", designation: "" }
        ]);

    };


    const handleAdditionalContactChange = (index, field, value) => {
        const updatedContacts = [...additionalContacts];
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [`additional${field.charAt(0).toUpperCase() + field.slice(1)}${index}`]: "",
        }));

        if (field === "name" || field === "designation") {
            if (/^[A-Za-z\s]*$/.test(value)) {
                updatedContacts[index][field] = value;
            }
        } else if (field === "contactNumber") {
            if (/^\d{0,10}$/.test(value)) {
                updatedContacts[index][field] = value;
            }
        } else if (field === "email") {
            updatedContacts[index][field] = value.toLowerCase();
        }

        setAdditionalContacts(updatedContacts);
    };

    const tabs = [
        { id: 1, label: "Basic Information" },
        { id: 2, label: "Address Information" },
        { id: 3, label: "Bank Detail" },
    ];

    const handleTabClick = (id) => {
        setActiveTab(id);
    };

    return (
        <div className="bg-blueGray-100  w-full">
            <div className="p-2 sm:p-2 md:p-2 lg:p-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-xl font-Gilroy">Vendor</h3>
                    <div onClick={handleClose} className="cursor-pointer text-xl font-bold">X</div>
                </div>


                <div className="sticky top-0  z-10 overflow-x-auto">
                    <div className="flex flex-col sm:flex-row gap-2 mb-4  border-gray-300">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`px-4 py-2 font-Gilroy  md:px-6 lg:px-8 text-base
          ${activeTab === tab.id
                                        ? "border-b-4 border-[#205DA8] text-[#205DA8] font-semibold text-base"
                                        : "text-gray-500 border-neutral-100 border-b-4 text-base"
                                    } transition-all duration-300 text-left sm:text-center`}
                                onClick={() => handleTabClick(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>


                {
                    state.Common.errorMessage && <label className="block  mb-2 text-start font-Gilroy font-normal text-md text-red-600"> {state.Common.errorMessage} </label>
                }
                {
                    state.Common.successMessage && <label className="block  mb-2 text-start font-Gilroy font-normal text-md text-green-600"> {state.Common.successMessage
                    } </label>
                }

                <div className="p-2 sm:p-2 md:p-2 lg:p-4 bg-white mt-4 rounded-2xl">

                    {activeTab === 1 &&
                        <div>
                            <h2 className="text-xl font-semibold mb-4 font-Gilroy text-black">Basic Information</h2>
                            <div className="max-h-[250px] overflow-y-auto  
                          lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3">
                                <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3'>


                                    <div className='  '>
                                        <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Business Name <span className='text-red-500'>*</span> </label>
                                        <input
                                            id='clientId'
                                            value={businessName}
                                            onChange={handleBusinessNameChange}
                                            type='text'
                                            placeholder='Enter Business Name'
                                            className='px-3 py-3 w-full border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                        {formErrors.businessName && (
                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.businessName} </p>)}

                                    </div>
                                    <div>
                                        <label className="block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800">
                                            Contact Person<span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            id="contactPerson"
                                            value={contactPerson}
                                            onChange={handleContactPersonChange}
                                            type="text"
                                            placeholder="Enter Contact Person Name"
                                            className="px-3 py-3 border w-full rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800"
                                        />
                                        {formErrors.contactPerson && (
                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.contactPerson} </p>)}
                                    </div>


                                    <div >
                                        <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Contact  Number<span className='text-red-500'>*</span> </label>
                                        <input
                                            id='clientId'
                                            type='text'
                                            value={contactNumber}
                                            onChange={handleContactNumberChange}
                                            placeholder='Enter Contact  Number'
                                            className='w-full px-3 py-3 border rounded-xl focus:outline-none   font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                        {formErrors.contactNumber && (
                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.contactNumber} </p>)}
                                    </div>
                                    <div >
                                        <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Email ID <span className='text-red-500'>*</span> </label>
                                        <input
                                            id='clientId'
                                            type='text'
                                            value={email}
                                            onChange={handleEmailChange}
                                            placeholder='Enter Email ID'
                                            className='w-full px-3 py-3 border rounded-xl focus:outline-none   font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                        {formErrors.email && (
                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.email} </p>)}
                                    </div>
                                    <div>
                                        <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Designation <span className='text-red-500'>*</span> </label>
                                        <input
                                            id='clientId'
                                            type='text'
                                            value={designation}
                                            onChange={handleDesignationChange}
                                            placeholder='Enter Designation'
                                            className='w-full px-3 py-3 border rounded-xl focus:outline-none   font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                        {formErrors.designation && (
                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.designation} </p>)}
                                    </div>
                                    <div >
                                        <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>GST/VAT <span className='text-red-500'>*</span></label>
                                        <input
                                            id='clientId'
                                            type='text'
                                            value={gstVat}
                                            onChange={handleGstVatChange}
                                            placeholder='Enter GST/VAT'

                                            className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                        {formErrors.gstVat && (
                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.gstVat} </p>)}
                                    </div>
                                    <div >
                                        <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800' >CIN <span className='text-red-500'>*</span></label>
                                        <input

                                            type='text'
                                            value={cin}
                                            onChange={handleCinChange}
                                            placeholder='Enter CIN'
                                            className='w-full px-3 py-3 border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                        {formErrors.cin && (
                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.cin} </p>)}
                                    </div>
                                    <div >
                                        <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>PAN  <span className='text-red-500'>*</span></label>
                                        <input

                                            type='text'
                                            value={pan}
                                            onChange={handlePanChange}
                                            placeholder='Enter PAN'
                                            className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                        {formErrors.pan && (
                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.pan} </p>)}
                                    </div>
                                    <div>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>TAN  <span className='text-red-500'>*</span></label>
                                        <input

                                            type='text'
                                            value={tan}
                                            onChange={handleTanChange}
                                            placeholder='Enter TAN'
                                            className='w-full px-3 py-3 border rounded-xl focus:outline-none   font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                        {formErrors.tan && (
                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.tan} </p>)}
                                    </div>
                                    <div className='mb-2 items-center'>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>
                                            Legal Status Firm <span className='text-red-500'>*</span>
                                        </label>
                                        <select
                                            id='legalStatusFirm'
                                            value={legal}
                                            onChange={handleLegalChange}
                                            className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                        >
                                            <option value="">Select Legal Status</option>
                                            <option value="Sole Proprietorship">PRIVATE LIMITED</option>
                                            <option value="Partnership">LLT _LOW LATENCY TRANSSPORT</option>
                                            <option value="LLC">PARTNERSHIP</option>
                                            <option value="Corporation">PROPRIETORSHIP</option>
                                        </select>
                                        {formErrors.legal && (
                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.legal} </p>)}
                                    </div>
                                    <div className='mb-2 items-center'>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>
                                            Nature of Business <span className='text-red-500'>*</span>
                                        </label>
                                        <select
                                            id='natureOfBusiness'
                                            value={nature}
                                            onChange={handleNatureChange}
                                            className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                        >
                                            <option value="">Select Business Type</option>
                                            <option value="Retail">Retail</option>
                                            <option value="Manufacturing">Manufacturing</option>
                                            <option value="Service">Service</option>
                                            <option value="IT & Software">IT & Software</option>
                                            <option value="Healthcare">Healthcare</option>
                                        </select>
                                        {formErrors.nature && (
                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.nature} </p>)}
                                    </div>


                                </div>


                                <div className="pt-4">

                                    {additionalContacts.map((contact, index) => (
                                        <div key={contact.id} className="mt-4 p-4 ">
                                            <h2 className="text-xl font-semibold mb-2 text-black">
                                                Additional Contact {index + 1}
                                            </h2>
                                            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block mb-2 text-neutral-800 font-medium font-Gilroy">
                                                        Contact Person Name<span className="text-red-500 ">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={contact.name}
                                                        onChange={(e) => handleAdditionalContactChange(index, "name", e.target.value)}
                                                        placeholder="Enter Contact Person Name"
                                                        className="px-3 py-3 w-full font-Gilroy border rounded-xl focus:outline-none"
                                                    />
                                                    {formErrors[`additionalName${index}`] && (
                                                        <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                            <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors[`additionalName${index}`]} </p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block mb-2 text-neutral-800 font-medium font-Gilroy">
                                                        Contact Number <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={contact.contactNumber}
                                                        onChange={(e) => handleAdditionalContactChange(index, "contactNumber", e.target.value)}
                                                        placeholder="Enter Contact Number"
                                                        className="px-3 py-3 font-Gilroy w-full border rounded-xl focus:outline-none"
                                                    />
                                                    {formErrors[`additionalContactNumber${index}`] && (
                                                        <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                            <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors[`additionalContactNumber${index}`]} </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block mb-2 text-neutral-800 font-medium font-Gilroy">
                                                        Email ID <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={contact.email}
                                                        onChange={(e) => handleAdditionalContactChange(index, "email", e.target.value)}
                                                        placeholder="Enter Email ID"
                                                        className="px-3 py-3  font-Gilroy w-full border rounded-xl focus:outline-none"
                                                    />
                                                    {formErrors[`additionalEmail${index}`] && (
                                                        <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                            <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors[`additionalEmail${index}`]} </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block mb-2 text-neutral-800 font-medium font-Gilroy">
                                                        Designation<span className='text-red-500'>*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={contact.designation}
                                                        onChange={(e) => handleAdditionalContactChange(index, "designation", e.target.value)}
                                                        placeholder="Enter Designation"
                                                        className="px-3 py-3 w-full font-Gilroy border rounded-xl focus:outline-none"
                                                    />
                                                    {formErrors[`additionalDesignation${index}`] && (
                                                        <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                            <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors[`additionalDesignation${index}`]} </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {
                                        additionalContacts.length < 2 &&

                                        <div className="mt-4">
                                            <button
                                                onClick={addContact}
                                                className="rounded-lg text-blue-800 font-semibold text-md cursor-pointer font-Gilroy"
                                            >
                                                + Add Additional Contact {additionalContacts.length + 1}
                                            </button>
                                        </div>

                                    }
                                </div>
                            </div>
                            <div className="flex flex-col xs:flex-row sm:flex-row justify-end gap-2 sm:gap-4">
                                <button
                                    type="button"
                                    className="w-full sm:w-auto font-medium font-Montserrat px-4 py-2 border border-[#205DA8] text-[#205DA8] rounded-lg shadow-md bg-[#205DA8] text-white transition"
                                    onClick={handleSaveClick} >
                                    Save & Exit
                                </button>

                                <button
                                    type="button"
                                    className="w-full sm:w-auto font-medium font-Montserrat px-4 py-2 border border-[#205DA8] text-[#205DA8] rounded-lg shadow-md bg-[#205DA8] text-white transition"
                                    onClick={handleNextClick}
                                >
                                    Next
                                </button>
                            </div>


                        </div>}
                    {activeTab === 2 && <div> <AddressVendor handleBack={handleBackBasic} handleNextToBank={handleNextToBank} /></div>}
                    {activeTab === 3 && <div><BankVendor hanldeBackToAddress={handleBackToAddress} basicDetails={basicDetails} payload={payload} /></div>}
                </div>
            </div>
        </div>
    );
}

export default BasicVendor;
