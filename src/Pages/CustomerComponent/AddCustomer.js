import React, { useState } from 'react'
import { MdError } from 'react-icons/md';

function AddCustomer() {


    const [value, setValue] = useState(1);
    const [errors, setErrors] = useState({});


    const [formData, setFormData] = useState({
        businessName: '',
        contactPerson: '',
        contactNumber: '',
        emailId: '',
        designation: '',
        gstVat: '',
        cin: '',
        pan: '',
        tan: '',
        legalStatus: '',
    });


    const [natureOfBusiness, setNatureOfBusiness] = useState({
        business1: false,
        business2: false,
        business3: false,
    });

    const [contacts, setContacts] = useState([
        { name: "", number: "", email: "", designation: "" },
    ]);


    const [bankDetailsList, setBankDetailsList] = useState([
        {
            beneficiaryCurrency: "",
            accountNumber: "",
            bankName: "",
            ifscCode: "",
            swiftCode: "",
            bankAddress1: "",
            bankAddress2: "",
            bankCountry: "",
            intermediaryRoutingBank: "",
            intermediarySiftCode: "",
            bankAddress: "",
            intermediaryAccountNumber: "",
            iban: ""
        }
    ]);


    const [officeAddress, setOfficeAddress] = useState({
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        city: "",
        state: "",
        postalCode: "",
        landmark: "",
        googleMap: ""
    });

    const [shippingAddress, setShippingAddress] = useState({
        address1: "",
        address2: "",
        address3: "",
        address4: "",
        city: "",
        state: "",
        postalCode: "",
        landmark: "",
        googleMap: ""
    });





    const handleInputChange = (field, value) => {

        setFormData((prevData) => ({
            ...prevData,
            [field]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: value.trim() ? "" : prevErrors[field],
        }));


    };


    const tabs = [
        { id: 1, label: "Basic Information" },
        { id: 2, label: "Address Information" },
        { id: 3, label: "Bank Detail" },

    ];




    const handleNatureOfBusinessChange = (name, value) => {

        setNatureOfBusiness((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleTabClick = (id) => {
        setValue(id)

    };

    const handleNextForAddress = () => {
        setValue(2)
    }

    const handleBackToBasicInformation = () => {
        setValue(1)
    }

    const handleNextForBank = () => {
        setValue(3)
    }

    const handleBackToAddress = () => {
        setValue(2)
    }


    const handleAddAdditionalContact = () => {
        setContacts([
            ...contacts,
            { name: "", number: "", email: "", designation: "" },
        ]);
    };

    const handleChange = (index, field, value) => {
        const updatedContacts = [...contacts];
        updatedContacts[index][field] = value;
        setContacts(updatedContacts);

        setErrors((prevErrors) => {
            const updatedContactErrors = [...prevErrors.contactErrors];
            updatedContactErrors[index][field] = value.trim() ? "" : prevErrors.contactErrors[index][field];
            return {
                ...prevErrors,
                contactErrors: updatedContactErrors,
            };
        });

    };




    // console.log("officeAddress", officeAddress, "shippingAddress", shippingAddress)

    // console.log("formData", formData)

    // console.log("natureOfBusiness", natureOfBusiness)

    // console.log("contacts", contacts)

    // console.log("bankDetailsList", bankDetailsList)


    const handleOfficeChange = (field, value) => {
        setOfficeAddress((prev) => ({ ...prev, [field]: value }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: value.trim() ? "" : prevErrors[field],
        }));

    };


    const handleShippingChange = (field, value) => {
        setShippingAddress((prev) => ({ ...prev, [field]: value }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [`ship${field}`]: value.trim() ? "" : prevErrors[`ship${field}`],
        }));
    };

    const handleSameAsOffice = (e) => {
        if (e.target.checked) {
            setShippingAddress(officeAddress);
        } else {
            setShippingAddress({
                address1: "",
                address2: "",
                address3: "",
                address4: "",
                city: "",
                state: "",
                postalCode: "",
                landmark: "",
                googleMap: ""
            });
        }
    };

    const handleBankingChange = (index, field, value) => {
        const updatedList = [...bankDetailsList];
        updatedList[index][field] = value;
        setBankDetailsList(updatedList);
        const updatedErrors = { ...errors };
        const errorKey = `bankDetails_${index}_${field}`;
        if (updatedErrors[errorKey]) {
            delete updatedErrors[errorKey];
            setErrors(updatedErrors);
        }
    };



    const addBankDetail = () => {
        setBankDetailsList([
            ...bankDetailsList,
            {
                beneficiaryCurrency: "",
                accountNumber: "",
                bankName: "",
                ifscCode: "",
                swiftCode: "",
                bankAddress1: "",
                bankAddress2: "",
                bankCountry: "",
                intermediaryRoutingBank: "",
                intermediarySiftCode: "",
                bankAddress: "",
                intermediaryAccountNumber: "",
                iban: ""
            }
        ]);
    };





    const handleSaveAndExit = () => {
        let tempErrors = {};
        let contactErrors = contacts.map(() => ({ name: "", number: "", email: "", designation: "" }));
        let isValid = true;

        if (!formData.businessName.trim()) {
            tempErrors.businessName = "Business Name is required";
            isValid = false;
        }
        if (!formData.contactPerson.trim()) {
            tempErrors.contactPerson = "Contact Person is required";
            isValid = false;
        }



        if (!formData.emailId.trim()) {
            tempErrors.emailId = "Email ID is required";
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.emailId)) {
            tempErrors.emailId = "Invalid Email format";
            isValid = false;
        }

        if (!formData.contactNumber.trim()) {
            tempErrors.contactNumber = "Contact Number is required";
            isValid = false;
        } else if (formData.contactNumber.length !== 10) {
            tempErrors.contactNumber = "Contact Number must be 10 digits";
            isValid = false;
        } else if (!/^[0-9]*$/.test(formData.contactNumber)) {
            tempErrors.contactNumber = "Contact Number must be Numbers";
            isValid = false;
        }


        if (!formData.designation.trim()) {
            tempErrors.designation = "Designation is required";
            isValid = false;
        }


        if (!formData.gstVat.trim()) {
            tempErrors.gstVat = "GST/VAT is required";
            isValid = false;
        }


        if (!formData.cin.trim()) {
            tempErrors.cin = "CIN is required";
            isValid = false;
        }


        if (!formData.pan.trim()) {
            tempErrors.pan = "PAN is required";
            isValid = false;
        }


        if (!formData.tan.trim()) {
            tempErrors.tan = "TAN is required";
            isValid = false;
        }


        if (!formData.legalStatus.trim()) {
            tempErrors.legalStatus = "Legal Status is required";
            isValid = false;
        }

        contacts?.forEach((contact, index) => {




            if (!contact.name.trim()) {
                contactErrors[index].name = "Contact Name is required";
                isValid = false;
            }
            if (!contact.number.trim()) {
                contactErrors[index].number = "Contact Number is required";
                isValid = false;
            } else if (contact.number.length !== 10) {
                contactErrors[index].number = "Contact Number must be 10 digits";
                isValid = false;
            } else if (!/^[0-9]*$/.test(contact.number)) {
                contactErrors[index].number = "Contact Number must be Numbers";
                isValid = false;
            }

            if (!contact.email) {
                contactErrors[index].email = "Contact Email is required";
                isValid = false;
            } else if (!/^\S+@\S+\.\S+$/.test(contact.email)) {
                contactErrors[index].email = "Invalid Email format";
                isValid = false;
            }

            if (!contact.designation.trim()) {
                contactErrors[index].designation = "Contact Designation is required";
                isValid = false;
            }
        });


        setErrors({ ...tempErrors, contactErrors });


        if (isValid) {

        }

    };



    const handleSaveAddress = () => {

        let isValid = true;
        let errors = {};

        if (!officeAddress.address1.trim()) {
            errors.address1 = "Address Line 1 is required";
            isValid = false
        }


        if (!officeAddress.city.trim()) {
            errors.city = "City is required";
            isValid = false
        }

        if (!officeAddress.state.trim()) {
            errors.state = "State is required";
            isValid = false
        }
        if (!officeAddress.postalCode.trim()) {
            errors.postalCode = "Postal Code is required";
            isValid = false
        }

        if (!shippingAddress.address1.trim()) {
            errors.shipaddress1 = "Address Line 1 is required";
            isValid = false
        }

        if (!shippingAddress.city.trim()) {
            errors.shipcity = "City is required";
            isValid = false
        }

        if (!shippingAddress.state.trim()) {
            errors.shipstate = "State is required";
            isValid = false
        }
        if (!shippingAddress.postalCode.trim()) {
            errors.shippostalCode = "Postal Code is required";
            isValid = false
        }


        setErrors(errors)
        if (isValid) {

        }

    }



    const handleCustomerSubmit = () => {
        let isValid = true;
        let finalErrors = {};
        let addressErrors = {};
        let bankErrors = {};
        let tempErrors = {};
        let contactErrors = contacts.map(() => ({ name: "", number: "", email: "", designation: "" }));

        if (!formData.businessName.trim()) {
            tempErrors.businessName = "Business Name is required";
            isValid = false;
        }
        if (!formData.contactPerson.trim()) {
            tempErrors.contactPerson = "Contact Person is required";
            isValid = false;
        }
        if (!formData.emailId.trim()) {
            tempErrors.emailId = "Email ID is required";
            isValid = false;
        } else if (!/^\S+@\S+\.\S+$/.test(formData.emailId)) {
            tempErrors.emailId = "Invalid Email format";
            isValid = false;
        }
        if (!formData.contactNumber.trim()) {
            tempErrors.contactNumber = "Contact Number is required";
            isValid = false;
        } else if (formData.contactNumber.length !== 10) {
            tempErrors.contactNumber = "Contact Number must be 10 digits";
            isValid = false;
        } else if (!/^[0-9]*$/.test(formData.contactNumber)) {
            tempErrors.contactNumber = "Contact Number must be Numbers";
            isValid = false;
        }
        if (!formData.designation.trim()) tempErrors.designation = "Designation is required";
        if (!formData.gstVat.trim()) tempErrors.gstVat = "GST/VAT is required";
        if (!formData.cin.trim()) tempErrors.cin = "CIN is required";
        if (!formData.pan.trim()) tempErrors.pan = "PAN is required";
        if (!formData.tan.trim()) tempErrors.tan = "TAN is required";
        if (!formData.legalStatus.trim()) tempErrors.legalStatus = "Legal Status is required";

        contacts?.forEach((contact, index) => {
            if (!contact.name.trim()) contactErrors[index].name = "Contact Name is required";
            if (!contact.number.trim()) contactErrors[index].number = "Contact Number is required";
            else if (contact.number.length !== 10) contactErrors[index].number = "Contact Number must be 10 digits";
            else if (!/^[0-9]*$/.test(contact.number)) contactErrors[index].number = "Contact Number must be Numbers";
            if (!contact.email) contactErrors[index].email = "Contact Email is required";
            else if (!/^\S+@\S+\.\S+$/.test(contact.email)) contactErrors[index].email = "Invalid Email format";
            if (!contact.designation.trim()) contactErrors[index].designation = "Contact Designation is required";
        });

        tempErrors.contactErrors = contactErrors;
        finalErrors = { ...finalErrors, ...tempErrors };



        if (!officeAddress.address1.trim()) addressErrors.address1 = "Address Line 1 is required";
        if (!officeAddress.city.trim()) addressErrors.city = "City is required";
        if (!officeAddress.state.trim()) addressErrors.state = "State is required";
        if (!officeAddress.postalCode.trim()) addressErrors.postalCode = "Postal Code is required";
        if (!shippingAddress.address1.trim()) addressErrors.shipaddress1 = "Shipping Address Line 1 is required";
        if (!shippingAddress.city.trim()) addressErrors.shipcity = "Shipping City is required";
        if (!shippingAddress.state.trim()) addressErrors.shipstate = "Shipping State is required";
        if (!shippingAddress.postalCode.trim()) addressErrors.shippostalCode = "Shipping Postal Code is required";

        finalErrors = { ...finalErrors, ...addressErrors };



        bankDetailsList.forEach((bank, index) => {
            if (!bank.beneficiaryCurrency.trim()) bankErrors[`bankDetails_${index}_beneficiaryCurrency`] = "Currency is required";
            if (!bank.accountNumber.trim()) bankErrors[`bankDetails_${index}_accountNumber`] = "Account Number is required";
            if (!bank.bankName.trim()) bankErrors[`bankDetails_${index}_bankName`] = "Bank Name is required";
            if (!bank.ifscCode.trim()) bankErrors[`bankDetails_${index}_ifscCode`] = "IFSC Code is required";
            if (!bank.swiftCode.trim()) bankErrors[`bankDetails_${index}_swiftCode`] = "SWIFT Code is required";
        });

        finalErrors = { ...tempErrors, ...addressErrors, ...bankErrors };


        if (Object.keys(finalErrors).length > 0) {
            setErrors(finalErrors);
        } else {
            // console.log(formData, officeAddress, shippingAddress, bankDetailsList);
        }

        if (isValid) {

        }

    };




    return (
        <div >

            <div>
                <h2 className="text-xl font-semibold mb-4  font-Gilroy">Add Customer </h2>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 mb-4  border-gray-300">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`px-4 py-2 font-Gilroy ${value === tab.id
                            ? "border-b-4 border-[#205DA8] text-[#205DA8] font-semibold text-base"
                            : "text-gray-500 border-neutral-100 border-b-4 text-base"
                            } transition-all duration-600`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {value === 1 &&
                <div className='bg-white rounded-2xl h-auto ps-5 pt-3 pe-5'>


                    <h2 className="text-xl font-semibold mb-2 font-Gilroy text-black">Basic Information</h2>

                    <div className='max-h-[320px] overflow-y-auto  
                          lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3 ' >
                        <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3'>


                            <div className=''>
                                <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Business Name  <span className='text-red-500'>*</span></label>
                                <input

                                    type='text'
                                    value={formData.businessName}
                                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                                    placeholder='Enter Business Name'
                                    className='px-3 py-3 border w-full rounded-xl focus:outline-none   font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                {errors.businessName && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <MdError size={16} />
                                        <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                            {errors.businessName}
                                        </span>
                                    </div>
                                )}

                            </div>
                            <div >
                                <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Contact Person   <span className='text-red-500'>*</span></label>
                                <input

                                    type='text'
                                    value={formData.contactPerson}
                                    onChange={(e) => handleInputChange('contactPerson', e.target.value)}
                                    placeholder='Enter Contact Person'
                                    className='px-3 py-3 border w-full rounded-xl focus:outline-none   font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                {errors.contactPerson && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <MdError size={16} />
                                        <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                            {errors.contactPerson}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div >
                                <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Contact  Number <span className='text-red-500'>*</span></label>
                                <input

                                    type='text'
                                    value={formData.contactNumber}
                                    onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                                    placeholder='Enter Contact  Number'
                                    maxLength={10}
                                    className='w-full px-3 py-3 border rounded-xl focus:outline-none   font-Gilroy font-medium text-sm text-neutral-800'
                                />

                                {errors.contactNumber && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <MdError size={16} />
                                        <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                            {errors.contactNumber}
                                        </span>
                                    </div>
                                )}

                            </div>
                            <div >
                                <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Email ID  <span className='text-red-500'>*</span></label>
                                <input
                                    type='text'
                                    value={formData.emailId}
                                    onChange={(e) => handleInputChange('emailId', e.target.value)}
                                    placeholder='Enter Email ID'
                                    className='w-full px-3 py-3 border rounded-xl focus:outline-none   font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                {errors.emailId && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <MdError size={16} />
                                        <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                            {errors.emailId}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Designation  <span className='text-red-500'>*</span></label>
                                <input

                                    type='text'
                                    value={formData.designation}
                                    onChange={(e) => handleInputChange('designation', e.target.value)}
                                    placeholder='Enter Designation'
                                    className='w-full px-3 py-3 border rounded-xl focus:outline-none   font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                {errors.designation && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <MdError size={16} />
                                        <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                            {errors.designation}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div >
                                <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>GST/VAT <span className='text-red-500'>*</span></label>
                                <input

                                    type='text'
                                    value={formData.gstVat}
                                    onChange={(e) => handleInputChange('gstVat', e.target.value)}
                                    placeholder='Enter GST/VAT'
                                    className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                {errors.gstVat && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <MdError size={16} />
                                        <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                            {errors.gstVat}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div >
                                <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800' >CIN <span className='text-red-500'>*</span></label>
                                <input

                                    type='text'
                                    value={formData.cin}
                                    onChange={(e) => handleInputChange('cin', e.target.value)}
                                    placeholder='Enter CIN'
                                    className='w-full px-3 py-3 border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                {errors.cin && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <MdError size={16} />
                                        <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                            {errors.cin}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div >
                                <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>PAN  <span className='text-red-500'>*</span></label>
                                <input

                                    type='text'
                                    value={formData.pan}
                                    onChange={(e) => handleInputChange('pan', e.target.value)}
                                    placeholder='Enter PAN'
                                    className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                {errors.pan && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <MdError size={16} />
                                        <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                            {errors.pan}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div>
                                <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>TAN  <span className='text-red-500'>*</span></label>
                                <input

                                    type='text'
                                    value={formData.tan}
                                    onChange={(e) => handleInputChange('tan', e.target.value)}
                                    placeholder='Enter TAN'
                                    className='w-full px-3 py-3 border rounded-xl focus:outline-none   font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                {errors.tan && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <MdError size={16} />
                                        <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                            {errors.tan}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className='mb-2' >
                                <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Legal Status of firm <span className='text-red-500'>*</span></label>
                                <select
                                    value={formData.legalStatus}
                                    onChange={(e) => handleInputChange('legalStatus', e.target.value)} className="w-full px-3 py-3 border rounded-xl focus:outline-none  capitalize font-Gilroy font-medium text-sm text-neutral-800" >
                                    <option value="" selected>Select Legal Status of firm</option>
                                    <option value="PRIVATE LIMITED">PRIVATE LIMITED</option>
                                    <option value="LLT_LOW LATENCY TRANSSPORT">LLT_LOW LATENCY TRANSSPORT</option>
                                    <option value="PARTNERSHIP">PARTNERSHIP</option>
                                    <option value="PROPRIETORSHIP">PROPRIETORSHIP</option>
                                </select>

                                {errors.legalStatus && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <MdError size={16} />
                                        <span className="text-red-500 text-xs flex items-center gap-1 mt-1 font-Gilroy">
                                            {errors.legalStatus}
                                        </span>
                                    </div>
                                )}
                            </div>



                        </div>
                        <div className='mb-2'>
                            <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Nature of Business</label>
                            <div className='flex gap-6'>
                                <div className='flex gap-3 items-center'>

                                    <input
                                        type="checkbox"
                                        className="ml-2 accent-[#205DA8]"
                                        checked={!!natureOfBusiness.business1}
                                        onChange={(e) => handleNatureOfBusinessChange('business1', e.target.checked)}
                                    />
                                    <label className='block text-start font-Gilroy font-normal text-md text-neutral-800' >Business 1</label>
                                </div>
                                <div className='flex gap-3 items-center'>
                                    <input
                                        type="checkbox"
                                        className="ml-2 accent-[#205DA8]"
                                        checked={!!natureOfBusiness.business2}
                                        onChange={(e) => handleNatureOfBusinessChange('business2', e.target.checked)}
                                    />
                                    <label className='block  text-start font-Gilroy font-normal text-md text-neutral-800'>Business 2</label>
                                </div>
                                <div className='flex gap-3  items-center'>
                                    <input
                                        type="checkbox"
                                        className="ml-2 accent-[#205DA8]"
                                        checked={!!natureOfBusiness.business3}
                                        onChange={(e) => handleNatureOfBusinessChange('business3', e.target.checked)}
                                    />
                                    <label className='block  text-start font-Gilroy font-normal text-md text-neutral-800'>Business 3</label>
                                </div>


                            </div>

                        </div>

                        <div className="p-4">
                            {contacts.map((contact, index) => (
                                <div key={index} className="mb-6">
                                    <h2 className="text-xl font-semibold mb-2 font-Gilroy text-black pt-3 pb-3">
                                        {`Additional Contact ${index + 1}`}
                                    </h2>

                                    <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
                                        <div>
                                            <label className="block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800">
                                                Contact Person Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Contact Person Name"
                                                value={contact.name}
                                                onChange={(e) => handleChange(index, "name", e.target.value)}
                                                className="px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800"
                                            />
                                            {errors.contactErrors?.[index]?.name && (
                                                <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                                    <MdError size={16} />
                                                    <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.contactErrors[index].name}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800">
                                                Contact Number <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Contact Number"
                                                value={contact.number}
                                                onChange={(e) => handleChange(index, "number", e.target.value)}
                                                className="w-full px-3 py-3 border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800"
                                            />
                                            {errors.contactErrors?.[index]?.number && (
                                                <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                                    <MdError size={16} />
                                                    <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.contactErrors[index].number}</p>
                                                </div>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800">
                                                Email ID <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Email ID"
                                                value={contact.email}
                                                onChange={(e) => handleChange(index, "email", e.target.value)}
                                                className="w-full px-3 py-3 border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800"
                                            />
                                            {errors.contactErrors?.[index]?.email && (
                                                <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                                    <MdError size={16} />
                                                    <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.contactErrors[index].email}</p>
                                                </div>

                                            )}
                                        </div>

                                        <div>
                                            <label className="block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800">
                                                Designation <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                placeholder="Enter Designation"
                                                value={contact.designation}
                                                onChange={(e) =>
                                                    handleChange(index, "designation", e.target.value)
                                                }
                                                className="w-full px-3 py-3 border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800"
                                            />
                                            {errors.contactErrors?.[index]?.designation && (
                                                <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                                    <MdError size={16} />
                                                    <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.contactErrors[index].designation}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {contacts.length < 2 && (
                                <label
                                    className="rounded-lg text-[#205DA8] font-semibold font-Gilroy text-md cursor-pointer pt-3 pb-3"
                                    onClick={handleAddAdditionalContact}
                                >
                                    + Add Additional Contact {contacts.length + 1}
                                </label>
                            )}
                        </div>
                    </div>
                    <div className="flex justify-end mb-4 mt-2">
                        <div className='gap-3 flex '>
                            <button onClick={handleSaveAndExit} className="px-10 py-2 border border-[#205DA8] rounded-lg text-[#205DA8] font-Montserrat mb-4 text-base font-semibold"  >Save & Exit</button>


                            <button className="px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat mb-4 text-base font-semibold" onClick={handleNextForAddress}>Next</button>
                        </div>
                    </div>


                </div>
            }


            {value === 2 &&
                <div className='bg-white rounded-2xl h-auto p-5'>


                    <h2 className="text-xl font-semibold mb-4 font-Gilroy text-black">Address Information</h2>

                    <div className='max-h-[300px] overflow-y-auto  lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3' >

                        <h4 className="text-base font-medium mb-4 font-Gilroy text-black">Office Address <span className='text-red-500'>*</span></h4>
                        <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3'>


                            <div className='mb-2 items-center '>
                                <input

                                    type='text'
                                    placeholder='Enter Address Line 1'
                                    value={officeAddress.address1}
                                    onChange={(e) => handleOfficeChange('address1', e.target.value)}
                                    className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                {errors.address1 && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <MdError size={16} />
                                        <span className="text-red-500 text-xs font-Gilroy">{errors.address1}</span>
                                    </div>
                                )}
                            </div>

                            <div className='mb-2  items-center'>
                                <input

                                    type='text'
                                    placeholder='Enter Address Line 2'
                                    value={officeAddress.address2}
                                    onChange={(e) => handleOfficeChange('address2', e.target.value)}
                                    className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                />
                            </div>
                            <div className='mb-2 items-center'>
                                <input
                                    type='text'
                                    placeholder='Enter Address Line 3'
                                    value={officeAddress.address3}
                                    onChange={(e) => handleOfficeChange('address3', e.target.value)}
                                    className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                />
                            </div>
                            <div className='mb-2 items-center'>
                                <input

                                    type='text'
                                    placeholder='Enter Address Line 4'
                                    value={officeAddress.address4}
                                    onChange={(e) => handleOfficeChange('address4', e.target.value)}
                                    className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                />
                            </div>
                            <div className='mb-2 items-center'>
                                <input

                                    type='text'
                                    placeholder='Enter City'
                                    value={officeAddress.city}
                                    onChange={(e) => handleOfficeChange('city', e.target.value)}
                                    className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                {errors.city && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <MdError size={16} />
                                        <span className="text-red-500 text-xs font-Gilroy">{errors.city}</span>
                                    </div>
                                )}
                            </div>



                            <div className='mb-2 items-center'>
                                <select
                                    value={officeAddress.state}
                                    onChange={(e) => handleOfficeChange('state', e.target.value)} className="w-full px-3 py-3 border rounded-xl focus:outline-none  capitalize font-Gilroy font-medium text-sm text-neutral-800" >
                                    <option value="">Select state</option>
                                    <option value="TamilNadu">Tamil Nadu</option>

                                </select>
                                {errors.state && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <MdError size={16} />
                                        <span className="text-red-500 text-xs font-Gilroy">{errors.state}</span>
                                    </div>
                                )}
                            </div>



                            <div className='mb-2 items-center'>
                                <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Postal Code <span className='text-red-500'>*</span></label>
                                <input

                                    type='text'
                                    placeholder='Enter Postal Code'
                                    value={officeAddress.postalCode}
                                    onChange={(e) => handleOfficeChange('postalCode', e.target.value)}
                                    className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                {errors.postalCode && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <MdError size={16} />
                                        <span className="text-red-500 text-xs font-Gilroy">{errors.postalCode}</span>
                                    </div>
                                )}
                            </div>
                            <div className='mb-2 items-center'>
                                <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Landmark </label>
                                <input

                                    type='text'
                                    placeholder='Enter Landmark'
                                    value={officeAddress.landmark}
                                    onChange={(e) => handleOfficeChange('landmark', e.target.value)}
                                    className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                />
                            </div>
                            <div className='mb-2 items-center'>
                                <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Google Map </label>
                                <input

                                    type='text'
                                    placeholder='Enter Google Map Link'
                                    value={officeAddress.googleMap}
                                    onChange={(e) => handleOfficeChange('googleMap', e.target.value)}
                                    className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                />
                            </div>



                        </div>


                        <h4 className="text-base font-medium mb-4 font-Gilroy text-black" >Shipping Address  <span className='text-red-500'>*</span> <span className='text-md accent-[#205DA8]'><input type="checkbox" onChange={handleSameAsOffice} /></span><span className='text-sm font-medium mb-4 font-Gilroy text-[#205DA8]'> Same as office Address</span></h4>
                        <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-4'>


                            <div className='mb-2 items-center '>
                                <input

                                    type='text'
                                    placeholder='Enter Address Line 1'
                                    value={shippingAddress.address1}
                                    onChange={(e) => handleShippingChange('address1', e.target.value)}
                                    className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                {errors.shipaddress1 && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <MdError size={16} />
                                        <span className="text-red-500 text-xs font-Gilroy">{errors.shipaddress1}</span>
                                    </div>
                                )}
                            </div>

                            <div className='mb-2  items-center'>
                                <input

                                    type='text'
                                    placeholder='Enter Address Line 2'
                                    value={shippingAddress.address2}
                                    onChange={(e) => handleShippingChange('address2', e.target.value)}
                                    className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                />

                            </div>
                            <div className='mb-2 items-center'>
                                <input

                                    type='text'
                                    placeholder='Enter Address Line 3'
                                    value={shippingAddress.address3}
                                    onChange={(e) => handleShippingChange('address3', e.target.value)}
                                    className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                />
                            </div>
                            <div className='mb-2 items-center'>
                                <input

                                    type='text'
                                    placeholder='Enter Address Line 4'
                                    value={shippingAddress.address4}
                                    onChange={(e) => handleShippingChange('address4', e.target.value)}
                                    className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                />
                            </div>
                            <div className='mb-2 items-center'>
                                <input

                                    type='text'
                                    placeholder='Enter City'
                                    value={shippingAddress.city}
                                    onChange={(e) => handleShippingChange('city', e.target.value)}
                                    className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                {errors.shipcity && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <MdError size={16} />
                                        <span className="text-red-500 text-xs font-Gilroy">{errors.shipcity}</span>
                                    </div>
                                )}
                            </div>

                            <div className='mb-2 items-center'>
                                <select
                                    value={shippingAddress.state}
                                    onChange={(e) => handleShippingChange('state', e.target.value)} className="w-full px-3 py-3 border rounded-xl focus:outline-none  capitalize font-Gilroy font-medium text-sm text-neutral-800" >
                                    <option value="" >Select state</option>
                                    <option value="TamilNadu">Tamil Nadu</option>

                                </select>
                                {errors.shipstate && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <MdError size={16} />
                                        <span className="text-red-500 text-xs font-Gilroy">{errors.shipstate}</span>
                                    </div>
                                )}
                            </div>



                            <div className='mb-2 items-center'>
                                <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Postal Code <span className='text-red-500'>*</span></label>
                                <input

                                    type='text'
                                    placeholder='Enter Postal Code'
                                    value={shippingAddress.postalCode}
                                    onChange={(e) => handleShippingChange('postalCode', e.target.value)}
                                    className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                {errors.shippostalCode && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1'>
                                        <MdError size={16} />
                                        <span className="text-red-500 text-xs font-Gilroy"> {errors.shippostalCode}</span>
                                    </div>
                                )}
                            </div>
                            <div className='mb-2 items-center'>
                                <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Landmark </label>
                                <input

                                    type='text'
                                    placeholder='Enter Landmark'
                                    value={shippingAddress.landmark}
                                    onChange={(e) => handleShippingChange('landmark', e.target.value)}
                                    className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                />
                            </div>
                            <div className='mb-2 items-center'>
                                <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Google Map </label>
                                <input

                                    type='text'
                                    placeholder='Enter Google Map Link'
                                    value={shippingAddress.googleMap}
                                    onChange={(e) => handleShippingChange('googleMap', e.target.value)}
                                    className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                />
                            </div>



                        </div>

                    </div>
                    <div className="flex justify-between mb-4 mt-4">
                        <button className="px-10 py-2 bg-slate-400 rounded-lg text-white font-Montserrat mb-4 text-base font-semibold" onClick={handleBackToBasicInformation} >Back</button>
                        <div className='gap-3 flex '>
                            <button onClick={handleSaveAddress} className="px-10 py-2 border border-[#205DA8] rounded-lg text-[#205DA8] font-Montserrat mb-4 text-base font-semibold"  >Save & Exit</button>

                            <button className="px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat mb-4 text-base font-semibold" onClick={handleNextForBank} >Next</button>
                        </div>
                    </div>


                </div>
            }



            {value === 3 &&
                <div className='bg-white rounded-2xl h-auto p-5'>

                    <h2 className="text-2xl font-semibold mb-4 font-Gilroy">Bank Detail</h2>
                    <div className='max-h-[300px] overflow-y-auto  
    lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3' >
                        {bankDetailsList.map((bankDetails, index) => (
                            <div key={index} className='mb-4  p-4 rounded-lg'>
                                {
                                    bankDetailsList.length > 1 && <h2 className="text-xl font-semibold mb-2 font-Gilroy text-black pt-3 pb-3">
                                        {`Bank Details ${index + 1}`}
                                    </h2>
                                }


                                <div className='grid md:grid-cols-12 sm:grid-cols-2 gap-3'>


                                    <div className='mb-2 items-center col-span-3'>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Beneficiary Currency<span className='text-red-500'>*</span></label>
                                        <select
                                            value={bankDetails.beneficiaryCurrency}
                                            onChange={(e) => handleBankingChange(index, 'beneficiaryCurrency', e.target.value)}
                                            className="w-full px-3 py-3 border rounded-xl focus:outline-none  capitalize font-Gilroy font-medium text-sm text-neutral-800" >
                                            <option value="">Select beneficiary currency</option>
                                            <option value="USD">USD</option>
                                            <option value="INR">INR</option>
                                            <option value="EUR">EUR</option>
                                            <option value="GBP">GBP</option>
                                            <option value="JPY">JPY</option>

                                        </select>

                                        {errors[`bankDetails_${index}_beneficiaryCurrency`] && (
                                            <div className='text-red-500 text-xs font-Gilroy mt-1 flex items-center gap-1 '>
                                                <MdError size={16} /> {errors[`bankDetails_${index}_beneficiaryCurrency`]}
                                            </div>
                                        )}

                                    </div>

                                    <div className='mb-2  items-center col-span-3'>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Beneficiary Account Number <span className='text-red-500'>*</span></label>

                                        <input

                                            type='text'
                                            placeholder='Enter Account Number'
                                            value={bankDetails.accountNumber}
                                            onChange={(e) => handleBankingChange(index, 'accountNumber', e.target.value)}
                                            className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                        {errors[`bankDetails_${index}_accountNumber`] && (
                                            <div className='text-red-500 text-xs font-Gilroy mt-1 flex items-center gap-1 '>
                                                <MdError size={16} /> {errors[`bankDetails_${index}_accountNumber`]}
                                            </div>
                                        )}
                                    </div>
                                    <div className='mb-2 items-center col-span-4'>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Beneficiary Account Bank Name<span className='text-red-500'>*</span></label>

                                        <input

                                            type='text'
                                            placeholder='Enter Account Name'
                                            value={bankDetails.bankName}
                                            onChange={(e) => handleBankingChange(index, 'bankName', e.target.value)}
                                            className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                        {errors[`bankDetails_${index}_bankName`] && (
                                            <div className='text-red-500 text-xs font-Gilroy mt-1 flex items-center gap-1'>
                                                <MdError size={16} /> {errors[`bankDetails_${index}_bankName`]}
                                            </div>
                                        )}
                                    </div>
                                    <div className='mb-2 items-center col-span-2'>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>IFSC Code<span className='text-red-500'>*</span></label>

                                        <input
                                            type='text'
                                            placeholder='Enter IFSC Code'
                                            value={bankDetails.ifscCode}
                                            onChange={(e) => handleBankingChange(index, 'ifscCode', e.target.value)}
                                            className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                        {errors[`bankDetails_${index}_ifscCode`] && (
                                            <div className='text-red-500 text-xs font-Gilroy mt-1 flex items-center gap-1'>
                                                <MdError size={16} /> {errors[`bankDetails_${index}_ifscCode`]}
                                            </div>
                                        )}
                                    </div>

                                </div>


                                <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3'>


                                    <div className='mb-2 items-center '>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>SWIFT Code <span className='text-red-500'>*</span></label>
                                        <input

                                            type='text'
                                            placeholder='Enter SWIFT Code'
                                            value={bankDetails.swiftCode}
                                            onChange={(e) => handleBankingChange(index, 'swiftCode', e.target.value)}
                                            className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                        {errors[`bankDetails_${index}_swiftCode`] && (
                                            <div className='text-red-500 text-xs font-Gilroy mt-1 flex items-center gap-1'>
                                                <MdError size={16} /> {errors[`bankDetails_${index}_swiftCode`]}
                                            </div>
                                        )}

                                    </div>

                                    <div className='mb-2  items-center'>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bank Address 1 </label>

                                        <input

                                            type='text'
                                            placeholder='Enter Bank Address 1'
                                            value={bankDetails.bankAddress1}
                                            onChange={(e) => handleBankingChange(index, 'bankAddress1', e.target.value)}
                                            className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                    </div>
                                    <div className='mb-2 items-center'>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bank Address 2 </label>

                                        <input

                                            type='text'
                                            placeholder='Enter Bank Address 2'
                                            value={bankDetails.bankAddress2}
                                            onChange={(e) => handleBankingChange(index, 'bankAddress2', e.target.value)}
                                            className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                    </div>
                                    <div className='mb-2 items-center'>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bank Country </label>
                                        {/* 
                                        <input

                                            type='text'
                                            placeholder='Enter Bank Country'
                                            value={bankDetails.bankCountry}
                                            onChange={(e) => handleBankingChange(index, 'bankCountry', e.target.value)}
                                            className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                        /> */}
                                        <select
                                            value={bankDetails.bankCountry}
                                            onChange={(e) => handleBankingChange(index, 'bankCountry', e.target.value)}
                                            className="w-full px-3 py-3 border rounded-xl focus:outline-none  capitalize font-Gilroy font-medium text-sm text-neutral-800" >
                                            <option value="">Select Bank Country</option>
                                            <option value="USD">USD</option>
                                            <option value="INR">INR</option>
                                            <option value="EUR">EUR</option>
                                            <option value="GBP">GBP</option>
                                            <option value="JPY">JPY</option>

                                        </select>
                                    </div>

                                    <div className='mb-2 items-center'>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Intermediary Routing Bank </label>

                                        <input

                                            type='text'
                                            placeholder='Enter Intermediary Routing Bank'
                                            value={bankDetails.intermediaryRoutingBank}
                                            onChange={(e) => handleBankingChange(index, 'intermediaryRoutingBank', e.target.value)}
                                            className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                    </div>

                                    <div className='mb-2 items-center'>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>SIFT Code for intermediary Bank</label>

                                        <input

                                            type='text'
                                            placeholder='Enter SIFT Code for intermediary Bank'
                                            value={bankDetails.intermediarySiftCode}
                                            onChange={(e) => handleBankingChange(index, 'intermediarySiftCode', e.target.value)}
                                            className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                    </div>




                                </div>


                                <div className='grid md:grid-cols-12 sm:grid-cols-2 gap-3'>
                                    <div className='mb-2 items-center  col-span-4'>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bank Address </label>
                                        <input

                                            type='text'
                                            placeholder='Enter Bank Address'
                                            value={bankDetails.bankAddress}
                                            onChange={(e) => handleBankingChange(index, 'bankAddress', e.target.value)}
                                            className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                        />

                                    </div>

                                    <div className='mb-2  items-center col-span-8'>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Beneficiary Bank Account Number with Intermediary </label>

                                        <input

                                            type='text'
                                            placeholder='Enter Beneficiary Bank Account Number with Intermediary'
                                            value={bankDetails.intermediaryAccountNumber}
                                            onChange={(e) => handleBankingChange(index, 'intermediaryAccountNumber', e.target.value)}
                                            className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                    </div>

                                </div>
                                <div className='grid md:grid-cols-12 sm:grid-cols-2 gap-3'>
                                    <div className='mb-2 items-center col-span-7 '>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>IBAN (International Bank Account Number) </label>
                                        <input

                                            type='text'
                                            placeholder='Enter IBAN (International Bank Account Number)'
                                            value={bankDetails.iban}
                                            onChange={(e) => handleBankingChange(index, 'iban', e.target.value)}
                                            className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                        />

                                    </div>

                                </div>

                            </div>
                        ))}
                    </div>
                    {
                        bankDetailsList.length === 1 &&
                        <label onClick={addBankDetail} className="px-3 py-2 cursor-pointer  rounded-lg text-[#205DA8] font-semibold font-Gilroy"> + Add Another Bank Detail</label>


                    }





                    <div className="flex justify-between mt-4 mb-4">
                        <button className="px-10 py-2 bg-slate-400 rounded-lg text-white font-Montserrat mb-4 text-base font-semibold" onClick={handleBackToAddress} >Back</button>

                        <button className="px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat mb-4 text-base font-semibold" onClick={handleCustomerSubmit} >Submit</button>

                    </div>


                </div>
            }


        </div>
    )
}

export default AddCustomer