/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";

import { InfoCircle } from "iconsax-react";
import { useDispatch, useSelector } from 'react-redux';
import { VENDOR_BASIC_INFO_SAGA, VENDOR_SAGA, RESET_CODE, GET_MASTER_SAGA, RESET_VENDOR_ID, VENDOR_ADDRESS_INFO_SAGA, compareData, CREATE_VENDOR_SAGA, EDIT_VENDOR_SAGA } from "../../Utils/Constant";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Select from "react-select";


function BasicVendor({ vendorDetails }) {




    const dispatch = useDispatch();
    const state = useSelector(state => state)
    const navigate = useNavigate()
    const [initialValues, setInitialValues] = useState(null);
    const [activeTab, setActiveTab] = useState(1);
    const [businessName, setBusinessName] = useState("");
    const [contactPerson, setContactPerson] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [email, setEmail] = useState("");
    const [designation, setDesignation] = useState("");
    const [gstVat, setGstVat] = useState("");
    const [loading, setLoading] = useState(false)
    const [surName, setSurName] = useState("")
    const [countryCode, setCountryCode] = useState("")
    const [additionalContacts, setAdditionalContacts] = useState([

    ]);
    const [formErrors, setFormErrors] = useState({});


    const [officeAddress1, setOfficeAddress1] = useState("");
    const [officeAddress2, setOfficeAddress2] = useState('');
    const [officeAddress3, setOfficeAddress3] = useState('');
    const [officeAddress4, setOfficeAddress4] = useState('');
    const [city, setCity] = useState("");
    const [officeState, setOfficeState] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [landmark, setLandmark] = useState("");
    const [googleMap, setGoogleMap] = useState("");

    const [shippingAddress1, setShippingAddress1] = useState("");
    const [shippingAddress2, setShippingAddress2] = useState('');
    const [shippingAddress3, setShippingAddress3] = useState('');
    const [shippingAddress4, setShippingAddress4] = useState('');
    const [shippingCity, setShippingCity] = useState("");
    const [shippingState, setShippingState] = useState("");
    const [shippingCountry, setShippingCountry] = useState("");
    const [shippingPostalCode, setShippingPostalCode] = useState("");
    const [shippingLandmark, setShippingLandmark] = useState("");
    const [shippingGoogleMap, setShippingGoogleMap] = useState("");
    const [sameAsOffice, setSameAsOffice] = useState(false);
    const [addressInfo, setAddressInfo] = useState('')


    const businessNameRef = useRef(null);
    const surNameRef = useRef(null);
    const contactPersonRef = useRef(null);
    const countryCodeRef = useRef(null);
    const contactNumberRef = useRef(null);
    const emailRef = useRef(null);
    const designationRef = useRef(null);
    const gstVatRef = useRef(null);


    const additionalRefs = useRef([]);


    const officeAddress1Ref = useRef(null);
    const cityRef = useRef(null);
    const postalCodeRef = useRef(null);
    const shippingAddress1Ref = useRef(null);
    const shippingCityRef = useRef(null);
    const shippingPostalCodeRef = useRef(null);

    const [beneficiaryName, setBeneficiaryName] = useState(businessName);
    const [beneficiaryCurrency, setBeneficiaryCurrency] = useState('');
    const [accountNumber, setAccountNumber] = useState("");
    const [bankName, setBankName] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [swift, setSwift] = useState("");
    const [bankAddress, setBankAddress] = useState("");
    const [bankCountry, setBankCountry] = useState("");
    const [intermediaryBank, setIntermediaryBank] = useState("");
    const [siftCode, setSiftCode] = useState("");
    const [intermediaryDetails, setIntermediaryDetails] = useState("");
    const [iban, setIban] = useState('');
    const [bankAddress2, setBankAddress2] = useState('');
    const [bankAddress3, setBankAddress3] = useState('');
    const [rountingBankAddress, setRountingBankAddress] = useState('')
    const [initialEditData, setInitialEditData] = useState(null);

    const alphaNumericRegex = /^[A-Za-z0-9]*$/;
    const alphaNumericWithSpaceRegex = /^[\s\S]*$/;


    const onlyNumbersRegex = /^[0-9]*$/;


    const beneficiaryNameRef = useRef(null);
    const beneficiaryCurrencyRef = useRef(null);
    const accountNumberRef = useRef(null);
    const bankNameRef = useRef(null);
    const ifscCodeRef = useRef(null);
    const bankAddressRef = useRef(null);



    const handleBusinessNameChange = (e) => {
        const value = e.target.value;
        const alphanumericRegex = /^[a-zA-Z0-9\s@&]*$/;


        if (alphanumericRegex.test(value)) {
            setBusinessName(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, businessName: "" }));
        }


    };


    const handleSurNameChange = (e) => {
        const value = e.target.value;
        setSurName(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, surName: "" }));
    }


    const handleCountryCodeChange = (e) => {
        const value = e.target.value;
        setCountryCode(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, countryCode: "" }));
    }


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

        if (/^[A-Za-z0-9\s]*$/.test(value) || value === "") {
            setDesignation(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, designation: "" }));
        }
    };


    const handleGstVatChange = (e) => {
        const value = e.target.value;


        if ((/^[A-Za-z0-9]*$/.test(value) || value === "") && value.length <= 15) {
            setGstVat(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, gstVat: "" }));
        }
    };


    const validateForm = () => {
        let errors = {};

        if (!surName) errors.surName = "Title is required";
        if (!contactPerson?.trim()) errors.contactPerson = "Contact Person is required";
        if (!countryCode) errors.countryCode = "countryCode is required";
        if (!contactNumber?.trim() || !/^\d{10}$/.test(contactNumber))
            errors.contactNumber = "Enter a valid 10-digit Contact Number";

        if (email?.trim()) {
            const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
            if (!emailRegex.test(email)) errors.email = "Invalid Email format";
        }

        if (!designation?.trim()) errors.designation = "Designation is required";
        if (!gstVat?.trim()) errors.gstVat = "GST/VAT is required";
        if (!businessName) errors.businessName = "Business Name is required";


        additionalContacts?.forEach((contact, index) => {
            const hasName = typeof contact.name === "string" && contact.name.trim();
            if (hasName) {
                if (!String(contact.surName || "").trim()) {
                    errors[`additionalSurName${index}`] = `Title is required`;
                }

                if (
                    typeof contact.contactNumber !== "string" ||
                    !contact.contactNumber.trim() ||
                    !/^\d{10}$/.test(contact.contactNumber)
                ) {
                    errors[`additionalContactNumber${index}`] = `Enter a valid 10-digit Contact Number`;
                }

                if (!contact.countryCode) {
                    errors[`additionalCountryCode${index}`] = `Country code is required`;
                }

                if (typeof contact.email === "string" && contact.email.trim()) {
                    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
                    if (!emailRegex.test(contact.email)) {
                        errors[`additionalEmail${index}`] = `Invalid Email format`;
                    }
                }

                if (
                    typeof contact.designation !== "string" ||
                    !contact.designation.trim()
                ) {
                    errors[`additionalDesignation${index}`] = `Designation is required`;
                }
            }
        });

        setFormErrors(errors);

        if (Object.keys(errors).length > 0) {
            if (errors.surName) surNameRef.current?.focus();
            else if (errors.contactPerson) contactPersonRef.current?.focus();
            else if (errors.countryCode) countryCodeRef.current?.focus();
            else if (errors.contactNumber) contactNumberRef.current?.focus();
            else if (errors.designation) designationRef.current?.focus();
            else if (errors.gstVat) gstVatRef.current?.focus();
            else if (errors.businessName) businessNameRef.current?.focus();
            else {
                for (let index = 0; index < additionalContacts.length; index++) {
                    if (errors[`additionalSurName${index}`] && additionalRefs.current[index]) {
                        additionalRefs.current[index].surNameRef?.current?.focus();
                        break;
                    }
                    if (errors[`additionalContactNumber${index}`] && additionalRefs.current[index]) {
                        additionalRefs.current[index].contactNumberRef?.current?.focus();
                        break;
                    }
                    if (errors[`additionalCountryCode${index}`] && additionalRefs.current[index]) {
                        additionalRefs.current[index].countryCodeRef?.current?.focus();
                        break;
                    }

                    if (errors[`additionalDesignation${index}`] && additionalRefs.current[index]) {
                        additionalRefs.current[index].designationRef?.current?.focus();
                        break;
                    }
                }
            }
        }

        return Object.keys(errors).length === 0;
    };


    const handleSaveClick = () => {
        const fieldsToCompare = [
            'businessName',
            'surName',
            'countryCode',
            'contactPerson',
            'contactNumber',
            'email',
            'designation',
            'gstVat',
            'additionalContacts'
        ];


        const current = {
            businessName,
            surName,
            countryCode,
            contactPerson,
            contactNumber,
            email,
            designation,
            gstVat,
            additionalContacts
        };


        const filteredInitial = fieldsToCompare.reduce((acc, key) => {
            acc[key] = initialValues ? initialValues[key] : '';
            return acc;
        }, {});



        const isChanged = JSON.stringify(current) !== JSON.stringify(filteredInitial);
        if (vendorDetails && !isChanged) {
            setFormErrors({ general: "No changes detected" });
            return;
        }

        if (validateForm()) {

            const filteredContacts = additionalContacts.filter(contact =>
                String(contact.surName || '').trim() !== '' ||
                String(contact.name || '').trim() !== '' ||
                String(contact.countryCode || '').trim() !== '' ||
                String(contact.contactNumber || '').trim() !== '' ||
                String(contact.email || '').trim() !== '' ||
                String(contact.designation || '').trim() !== ''
            );

            const formattedAdditionalContacts = filteredContacts.length > 0
                ? filteredContacts.map(contact => ({
                    title: contact.surName,
                    name: contact.name,
                    country_code: contact.countryCode,
                    contactNumber: Number(contact.contactNumber),
                    contactEmail: contact.email,
                    designation: contact.designation
                }))
                : [];
            dispatch({
                type: VENDOR_BASIC_INFO_SAGA,
                payload: {
                    vendor_id: vendorDetails?.vendorId || "",
                    businessName: businessName,
                    title: surName,
                    country_code: countryCode,
                    contactPersonName: contactPerson,
                    contactNumber: contactNumber,
                    emailId: email,
                    designation: designation,
                    gstvat: gstVat,
                    additionalContactInfo: formattedAdditionalContacts,
                }
            });
            setLoading(true)


        }
    };

    const handleNextClick = () => {
        if (validateForm()) {
            setActiveTab(2);
        }

    };

    const addContact = () => {
        setAdditionalContacts([
            ...additionalContacts,
            { id: additionalContacts.length + 1, surName: "", name: "", countryCode: "", contactNumber: "", email: "", designation: "" }
        ]);

    };

    const handleAdditionalContactChange = (index, field, value) => {
        const updatedContacts = [...additionalContacts];
        setFormErrors((prevErrors) => ({
            ...prevErrors,
            [`additional${field.charAt(0).toUpperCase() + field.slice(1)}${index}`]: "",
        }));

        if (field === "name") {
            if (/^[A-Za-z\s]*$/.test(value)) {
                updatedContacts[index][field] = value;
            }
        } else if (field === "contactNumber") {
            if (/^\d{0,10}$/.test(value)) {
                updatedContacts[index][field] = value;
            }
        } else if (field === "email") {
            updatedContacts[index][field] = value.toLowerCase();
        } else if (field === "designation") {
            if (/^[A-Za-z0-9\s]*$/.test(value)) {
                updatedContacts[index][field] = value;
            }
        } else {
            updatedContacts[index][field] = value;
        }

        setAdditionalContacts(updatedContacts);
    };

    const tabs = [
        { id: 1, label: "Basic Information" },
        { id: 2, label: "Address Information" },
        { id: 3, label: "Bank Detail" },
    ];

    const handleTabClick = (id) => {


        if (Number(id) === Number(3)) {
            if (validateForm() && validateFormAddress()) {

                const payloadData = {
                    vendorId: state.vendor.vendorId,
                    address: [
                        {
                            doorNo: officeAddress1,
                            street: officeAddress2,
                            locality: officeAddress3,
                            address4: officeAddress4,
                            city: city,
                            state: officeState,
                            country: country,
                            postalCode: postalCode,
                            landMark: landmark,
                            mapLink: googleMap,
                            addressType: 1
                        },
                        {
                            doorNo: shippingAddress1,
                            street: shippingAddress2,
                            locality: shippingAddress3,
                            address4: shippingAddress4,
                            city: shippingCity,
                            state: shippingState,
                            country: shippingCountry,
                            postalCode: shippingPostalCode,
                            landMark: shippingLandmark,
                            mapLink: shippingGoogleMap,
                            addressType: 2
                        }
                    ]
                };

                setAddressInfo(payloadData)
                setActiveTab(3);
            }
        } else if (Number(id) === Number(2)) {
            if (validateForm()) {
                setActiveTab(2);
            }
        } else {
            setActiveTab(id);
        }
    };











    const handleOfficeAddress1Change = (e) => {
        const value = e.target.value;
        if (alphaNumericWithSpaceRegex.test(value) || value === "") {
            setOfficeAddress1(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, officeAddress1: "" }));
        }
    };

    const handleOfficeAddress2Change = (e) => {
        const value = e.target.value;
        if (alphaNumericWithSpaceRegex.test(value) || value === "") {
            setOfficeAddress2(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, officeAddress2: "" }));
        }
    };

    const handleOfficeAddress3Change = (e) => {
        const value = e.target.value;
        if (alphaNumericWithSpaceRegex.test(value) || value === "") {
            setOfficeAddress3(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, officeAddress3: "" }));
        }
    };

    const handleOfficeAddress4Change = (e) => {
        const value = e.target.value;
        if (alphaNumericWithSpaceRegex.test(value) || value === "") {
            setOfficeAddress4(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, officeAddress4: "" }));
        }
    };

    const handleCityChange = (e) => {
        const value = e.target.value;
        const alphaWithSpaceRegex = /^[A-Za-z\s]*$/;
        if (alphaWithSpaceRegex.test(value) || value === "") {
            setCity(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, city: "" }));
        }
    };


    const handleCountryChange = (selectedOption) => {
        setCountry(selectedOption ? selectedOption.value : '');
    };

    const handleStateChange = (selectedOption) => {
        setOfficeState(selectedOption ? selectedOption.value : '');
    };

    const handlePostalCodeChange = (e) => {
        const value = e.target.value;

        if (/^\d{0,6}$/.test(value)) {
            setPostalCode(value);
        }
        if (formErrors.postalCode && /^\d+$/.test(value)) {
            setFormErrors((prevErrors) => ({ ...prevErrors, postalCode: "" }));
        }
    };


    const handleLandmarkChange = (e) => {
        const value = e.target.value;
        if (alphaNumericWithSpaceRegex.test(value) || value === "") {
            setLandmark(value);
        }
    };

    const handleGoogleMapChange = (e) => {
        const value = e.target.value;

        setGoogleMap(value);

    };



    const handleShippingAddress1Change = (e) => {
        const value = e.target.value;
        if (alphaNumericWithSpaceRegex.test(value) || value === "") {
            setShippingAddress1(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, shippingAddress1: "" }));
        }
    };

    const handleShippingAddress2Change = (e) => {
        const value = e.target.value;
        if (alphaNumericWithSpaceRegex.test(value) || value === "") {
            setShippingAddress2(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, shippingAddress2: "" }));
        }
    };

    const handleShippingAddress3Change = (e) => {
        const value = e.target.value;
        if (alphaNumericWithSpaceRegex.test(value) || value === "") {
            setShippingAddress3(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, shippingAddress3: "" }));
        }
    };

    const handleShippingAddress4Change = (e) => {
        const value = e.target.value;
        if (alphaNumericWithSpaceRegex.test(value) || value === "") {
            setShippingAddress4(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, shippingAddress4: "" }));
        }
    };


    const handleShippingCity = (e) => {
        const value = e.target.value;
        const alphaWithSpaceRegex = /^[A-Za-z\s]*$/;

        if (alphaWithSpaceRegex.test(value) || value === "") {
            setShippingCity(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, shippingCity: "" }));
        }
    };


    const handleShippingState = (selectedOption) => {
        setShippingState(selectedOption.value);
    };

    const handleShippingCountry = (selectedOption) => {
        setShippingCountry(selectedOption.value);
    };

    const handleShippingPostalCodeChange = (e) => {
        const value = e.target.value;

        if (/^\d{0,6}$/.test(value)) {
            setShippingPostalCode(value);
        }
        if (formErrors.shippingPostalCode && /^\d+$/.test(value)) {
            setFormErrors((prevErrors) => ({ ...prevErrors, shippingPostalCode: "" }));
        }
    };


    const handleShippingLandmarkChange = (e) => {
        const value = e.target.value;
        if (alphaNumericWithSpaceRegex.test(value) || value === "") {
            setShippingLandmark(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, shippingLandmark: "" }));
        }
    };

    const handleShippingGoogleMapChange = (e) => {
        const value = e.target.value;
        setShippingGoogleMap(value);
        setFormErrors((prevErrors) => ({ ...prevErrors, shippingGoogleMap: "" }));

    };

    const handleCheckboxChange = (e) => {
        setSameAsOffice(e.target.checked);
        setFormErrors({})
        if (e.target.checked) {
            setShippingAddress1(officeAddress1);
            setShippingAddress2(officeAddress2);
            setShippingAddress3(officeAddress3);
            setShippingAddress4(officeAddress4);
            setShippingCity(city);
            setShippingState(officeState);
            setShippingCountry(country);
            setShippingPostalCode(postalCode);
            setShippingLandmark(landmark);
            setShippingGoogleMap(googleMap);
        } else {
            setShippingAddress1('');
            setShippingAddress2('');
            setShippingAddress3('');
            setShippingAddress4('');
            setShippingCity('');
            setShippingState('');
            setShippingCountry('');
            setShippingPostalCode('');
            setShippingLandmark('');
            setShippingGoogleMap('');
        }
    };








    const validateFormAddress = () => {
        let errors = {};

        if (!officeAddress1.trim()) errors.officeAddress1 = "OfficeAddress is required";
        if (!city.trim()) errors.city = "City is required";
        if (!postalCode.trim() || postalCode.length !== 6) {
            errors.postalCode = !postalCode.trim()
                ? "Postal Code is required"
                : "Postal Code must be exactly 6 digits";
        }


        if (!shippingAddress1.trim()) errors.shippingAddress1 = "Shipping Address is required";
        if (!shippingCity.trim()) errors.shippingCity = "City is required";
        if (!shippingPostalCode.trim() || shippingPostalCode.length !== 6) {
            errors.shippingPostalCode = !shippingPostalCode.trim()
                ? "Postal Code is required"
                : "Postal Code must be exactly 6 digits";
        }

        setFormErrors(errors);
        if (Object.keys(errors).length > 0) {
            if (errors.officeAddress1) officeAddress1Ref.current?.focus();
            else if (errors.city) cityRef.current?.focus();
            else if (errors.postalCode) postalCodeRef.current?.focus();
            else if (errors.shippingAddress1) shippingAddress1Ref.current?.focus();
            else if (errors.shippingCity) shippingCityRef.current?.focus();
            else if (errors.shippingPostalCode) shippingPostalCodeRef.current?.focus();
        }
        return Object.keys(errors).length === 0;
    };

    const handleNext = () => {
        if (validateFormAddress()) {
            setActiveTab(3)
            const payloadData = {
                vendorId: state.vendor.vendorId,
                address: [
                    {
                        doorNo: officeAddress1,
                        street: officeAddress2,
                        locality: officeAddress3,
                        address4: officeAddress4,
                        city: city,
                        state: officeState,
                        country: country,
                        postalCode: postalCode,
                        landMark: landmark,
                        mapLink: googleMap,
                        addressType: 1
                    },
                    {
                        doorNo: shippingAddress1,
                        street: shippingAddress2,
                        locality: shippingAddress3,
                        address4: shippingAddress4,
                        city: shippingCity,
                        state: shippingState,
                        country: shippingCountry,
                        postalCode: shippingPostalCode,
                        landMark: shippingLandmark,
                        mapLink: shippingGoogleMap,
                        addressType: 2
                    }
                ]
            };

            setAddressInfo(payloadData)


        }

    };

    const handleSaveClickAddress = () => {
        if (validateFormAddress()) {
            if (vendorDetails) {
                const currentAddress = [
                    {
                        doorNo: officeAddress1,
                        street: officeAddress2,
                        locality: officeAddress3,
                        address4: officeAddress4,
                        city: city,
                        state: officeState,
                        country: country,
                        postalCode: postalCode,
                        landMark: landmark,
                        mapLink: googleMap,
                        addressType: 1
                    },
                    {
                        doorNo: shippingAddress1,
                        street: shippingAddress2,
                        locality: shippingAddress3,
                        address4: shippingAddress4,
                        city: shippingCity,
                        state: shippingState,
                        country: shippingCountry,
                        postalCode: shippingPostalCode,
                        landMark: shippingLandmark,
                        mapLink: shippingGoogleMap,
                        addressType: 2
                    }
                ];

                const officeAddress = vendorDetails.address.find(addr => addr.addressType === "Office Address" || addr.addressType === 1) || {};
                const shippingAddress = vendorDetails.address.find(addr => addr.addressType === "Shipping Address" || addr.addressType === 2) || {};

                const initialAddress = [
                    {
                        doorNo: officeAddress.doorNo || "",
                        street: officeAddress.street || "",
                        locality: officeAddress.locality || "",
                        address4: officeAddress.address4 || "",
                        city: officeAddress.city || "",
                        state: officeAddress.state || "",
                        country: officeAddress.country || "",
                        postalCode: officeAddress.postalCode || "",
                        landMark: officeAddress.landMark || "",
                        mapLink: officeAddress.mapLink || "",
                        addressType: 1
                    },
                    {
                        doorNo: shippingAddress.doorNo || "",
                        street: shippingAddress.street || "",
                        locality: shippingAddress.locality || "",
                        address4: shippingAddress.address4 || "",
                        city: shippingAddress.city || "",
                        state: shippingAddress.state || "",
                        country: shippingAddress.country || "",
                        postalCode: shippingAddress.postalCode || "",
                        landMark: shippingAddress.landMark || "",
                        mapLink: shippingAddress.mapLink || "",
                        addressType: 2
                    }
                ];

                const isChanged = JSON.stringify(currentAddress) !== JSON.stringify(initialAddress);

                if (!isChanged) {
                    setFormErrors({ general: "No changes detected" });
                    return;
                }


                const payload = {
                    vendorId: vendorDetails?.vendorId || "",
                    address: currentAddress
                };

                dispatch({
                    type: VENDOR_ADDRESS_INFO_SAGA,
                    payload: payload
                });

                setLoading(true);
            }
        }
    };











    const handleBeneficiaryNameChange = (e) => {
        const value = e.target.value;
        if (alphaNumericWithSpaceRegex.test(value) || value === "") {
            clearError("beneficiaryName");
            setBeneficiaryName(value);
        }
    };





    const handleRoutingBankAddressChange = (e) => {
        clearError("rountingBankAddress");
        setRountingBankAddress(e.target.value)
    }

    const handleBeneficiaryCurrency = (e) => {
        clearError("beneficiaryCurrency");
        setBeneficiaryCurrency(e.target.value)
    }


    const handleAccountNumberChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setAccountNumber(value);
            clearError("accountNumber");
        }
    };

    const handleBankNameChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z\s]*$/.test(value)) {
            setBankName(value);
            clearError("bankName");
        }
    };





    const handleIfscCodeChange = (e) => {
        const value = e.target.value;
        if (alphaNumericRegex.test(value) || value === "") {
            clearError("ifscCode");
            setIfscCode(value);
        }
    };

    const handleSwiftChange = (e) => {
        const value = e.target.value;
        if (alphaNumericRegex.test(value) || value === "") {
            setSwift(value);
            clearError("swift");
        }
    };



    const handleBankAddressChange = (e) => {
        setBankAddress(e.target.value)
        clearError("bankAddress");
    };

    const handleBankAddress2Change = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, bankAddress2: "" }));
        setBankAddress2(e.target.value);
    };

    const handleBankAddress3Change = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, bankAddress3: "" }));
        setBankAddress3(e.target.value);
    };


    const handleBankCountryChange = (e) => {
        clearError("bankCountry");
        setBankCountry(e.target.value);
    }

    const handleIntermediaryBankChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z\s]*$/.test(value)) {
            setIntermediaryBank(value);
            clearError("intermediaryBank");
        }
    };




    const handleSiftCodeChange = (e) => {
        const value = e.target.value;
        if (alphaNumericWithSpaceRegex.test(value) || value === "") {
            setSiftCode(value);
            clearError("siftCode");
        }
    };

    const handleIbanChange = (e) => {
        const value = e.target.value;
        if (alphaNumericWithSpaceRegex.test(value) || value === "") {
            setIban(value);
            clearError("iban");
        }
    }

    const handleIntermediaryDetailsChange = (e) => {
        const value = e.target.value;
        if (onlyNumbersRegex.test(value) || value === "") {
            setIntermediaryDetails(value);
            clearError("intermediaryDetails");
        }
    };



    const validateFormBank = () => {
        let errors = {};

        if (vendorDetails) {
            if (!beneficiaryName.trim()) {
                errors.beneficiaryName = "Beneficiary Name is required";
            }
        } else {
            if (!contactPerson.trim()) {
                errors.beneficiaryName = "Beneficiary Name is required";
            }
        }
        if (!beneficiaryCurrency) errors.beneficiaryCurrency = 'Beneficiary Currency is required';
        if (!accountNumber) errors.accountNumber = 'Account Number is required';
        if (accountNumber && !/^\d{9,18}$/.test(accountNumber)) {
            errors.accountNumber = 'Account Number must be 9-18 digits';
        }

        if (!bankName) errors.bankName = 'Bank Name is required';
        if (!ifscCode) errors.ifscCode = 'IFSC Code is required';
        if (!bankAddress) errors.bankAddress = 'BankAddress is required';

        setFormErrors(errors);



        if (Object.keys(errors).length > 0) {
            if (errors.beneficiaryName) beneficiaryNameRef.current?.focus();
            else if (errors.beneficiaryCurrency) beneficiaryCurrencyRef.current?.focus();
            else if (errors.accountNumber) accountNumberRef.current?.focus();
            else if (errors.bankName) bankNameRef.current?.focus();
            else if (errors.ifscCode) ifscCodeRef.current?.focus();
            else if (errors.bankAddress) bankAddressRef.current?.focus();
        }
        return Object.keys(errors).length === 0;
    };






    const clearError = (field) => {
        if (formErrors[field]) {
            setFormErrors({ ...formErrors, [field]: "" });
        }
    };





    const isDataChanged = () => {
        if (!initialEditData) return true;
        const addresses = addressInfo?.address || [];
        const officeAddress = addresses[0] || {};
        const shippingAddress = addresses[1] || {};

        const currentData = {
            businessName: businessName || "",
            contactPersonName: contactPerson || "",
            contactNumber: contactNumber || "",
            emailId: email || "",
            designation: designation || "",
            title: surName,
            country_code: countryCode,
            gstvat: gstVat || "",
            additionalContactInfo: additionalContacts || [],
            address_info: [officeAddress, shippingAddress],
            bankDetails: {
                name: beneficiaryName,
                accountNo: accountNumber,
                currency: beneficiaryCurrency,
                bankName: bankName,
                ifscCode: ifscCode,
                address1: bankAddress,
                address2: bankAddress2,
                address3: bankAddress3,
                country: bankCountry,
                routingBank: intermediaryBank,
                swiftCode: swift,
                routingBankAddress: rountingBankAddress,
                routingAccountIndusand: intermediaryDetails,
                intermediary_swift_code: siftCode,
                iban: iban,
            }
        };

        return JSON.stringify(currentData) !== JSON.stringify(initialEditData);
    };



    const handleSubmit = () => {
        if (validateFormBank()) {
            const addresses = addressInfo?.address || [];

            const officeAddress = addresses[0] || {};
            const shippingAddress = addresses[1] || {};


            if (vendorDetails && !isDataChanged()) {
                setFormErrors({ general: "No changes detected" });
                return;
            }



            const filteredContacts = additionalContacts.filter(contact =>
                String(contact.surName || '').trim() !== '' ||
                String(contact.name || '').trim() !== '' ||
                String(contact.countryCode || '').trim() !== '' ||
                String(contact.contactNumber || '').trim() !== '' ||
                String(contact.email || '').trim() !== '' ||
                String(contact.designation || '').trim() !== ''
            );

            const formattedAdditionalContacts = filteredContacts.length > 0
                ? filteredContacts.map(contact => ({
                    title: contact.surName,
                    name: contact.name,
                    country_code: contact.countryCode,
                    contactNumber: Number(contact.contactNumber),
                    contactEmail: contact.email,
                    designation: contact.designation
                }))
                : [];









            const AddPayload = {
                vendor_details: {
                    basic_info: {
                        businessName: businessName || "",
                        contactPersonName: contactPerson || "",
                        contactNumber: contactNumber || "",
                        emailId: email || "",
                        designation: designation || "",
                        title: surName,
                        country_code: countryCode,
                        gstvat: gstVat || ""
                    },
                    additionalContactInfo: formattedAdditionalContacts,

                    address_info: [
                        {
                            doorNo: officeAddress.doorNo || "",
                            street: officeAddress.street || "",
                            locality: officeAddress.locality || "",
                            address4: officeAddress.address4 || "",
                            city: officeAddress.city || "",
                            state: officeAddress.state || "",
                            country: officeAddress.country || "",
                            postalCode: officeAddress.postalCode || "",
                            landMark: officeAddress.landMark || "",
                            mapLink: officeAddress.mapLink || "",
                            addressType: officeAddress.addressType || 1
                        },
                        {
                            doorNo: shippingAddress.doorNo || "",
                            street: shippingAddress.street || "",
                            locality: shippingAddress.locality || "",
                            address4: shippingAddress.address4 || "",
                            city: shippingAddress.city || "",
                            state: shippingAddress.state || "",
                            country: shippingAddress.country || "",
                            postalCode: shippingAddress.postalCode || "",
                            landMark: shippingAddress.landMark || "",
                            mapLink: shippingAddress.mapLink || "",
                            addressType: shippingAddress.addressType || 2
                        }
                    ],

                    bankDetails: [{
                        name: beneficiaryName,
                        accountNo: accountNumber,
                        currency: beneficiaryCurrency,
                        bankName: bankName,
                        ifscCode: ifscCode,
                        address1: bankAddress,
                        address2: bankAddress2,
                        address3: bankAddress3,
                        country: bankCountry,
                        routingBank: intermediaryBank,
                        swiftCode: swift,
                        routingBankAddress: rountingBankAddress,
                        routingAccountIndusand: intermediaryDetails,
                        intermediary_swift_code: siftCode,
                        iban: iban,
                    }]
                }
            };

            const EditPayload = {
                vendor_id: vendorDetails?.vendorId || "",
                businessName: businessName || "",
                contactPersonName: contactPerson || "",
                contactNumber: contactNumber || "",
                emailId: email || "",
                designation: designation || "",
                title: surName,
                country_code: countryCode,
                gstvat: gstVat || "",
                additionalContactInfo: formattedAdditionalContacts,
                address_info: [
                    {
                        doorNo: officeAddress.doorNo || "",
                        street: officeAddress.street || "",
                        locality: officeAddress.locality || "",
                        address4: officeAddress.address4 || "",
                        city: officeAddress.city || "",
                        state: officeAddress.state || "",
                        country: officeAddress.country || "",
                        postalCode: officeAddress.postalCode || "",
                        landMark: officeAddress.landMark || "",
                        mapLink: officeAddress.mapLink || "",
                        addressType: officeAddress.addressType || 1
                    },
                    {
                        doorNo: shippingAddress.doorNo || "",
                        street: shippingAddress.street || "",
                        locality: shippingAddress.locality || "",
                        address4: shippingAddress.address4 || "",
                        city: shippingAddress.city || "",
                        state: shippingAddress.state || "",
                        country: shippingAddress.country || "",
                        postalCode: shippingAddress.postalCode || "",
                        landMark: shippingAddress.landMark || "",
                        mapLink: shippingAddress.mapLink || "",
                        addressType: shippingAddress.addressType || 2
                    }
                ],
                bankDetails: [{
                    name: beneficiaryName,
                    accountNo: accountNumber,
                    currency: beneficiaryCurrency,
                    bankName: bankName,
                    ifscCode: ifscCode,
                    address1: bankAddress,
                    address2: bankAddress2,
                    address3: bankAddress3,
                    country: bankCountry,
                    routingBank: intermediaryBank,
                    swiftCode: swift,
                    routingBankAddress: rountingBankAddress,
                    routingAccountIndusand: intermediaryDetails,
                    intermediary_swift_code: siftCode,
                    iban: iban,
                }]
            }


            if (vendorDetails) {
                dispatch({
                    type: EDIT_VENDOR_SAGA,
                    payload: EditPayload
                });
                setLoading(true)
            } else {
                dispatch({
                    type: CREATE_VENDOR_SAGA,
                    payload: AddPayload
                });
                setLoading(true)
            }


        }
    };



    useEffect(() => {

        additionalRefs.current = additionalContacts.map((_, index) => {

            if (!additionalRefs.current[index]) {
                additionalRefs.current[index] = {
                    surNameRef: React.createRef(),
                    contactNumberRef: React.createRef(),
                    countryCodeRef: React.createRef(),
                    emailRef: React.createRef(),
                    designationRef: React.createRef(),
                };
            }
            return additionalRefs.current[index];
        });
    }, [additionalContacts]);






    useEffect(() => {
        if (vendorDetails) {
            const initial = {
                businessName: vendorDetails.businessName || '',
                surName: vendorDetails?.title_id,
                countryCode: vendorDetails.country_code_id,
                contactPerson: vendorDetails.contactPersonName || '',
                contactNumber: vendorDetails.contactNumber || '',
                email: vendorDetails.emailId || '',
                designation: vendorDetails.designation || '',
                gstVat: vendorDetails.gstvat || '',
                additionalContacts: (vendorDetails.additionalContactInfo || []).map((item) => ({
                    surName: item.title_id || "",
                    name: item.name || "",
                    countryCode: item.country_codeid || '',
                    contactNumber: item.contactNumber || "",
                    email: item.contactEmail || "",
                    designation: item.designation || ""
                }))
            };

            setBusinessName(initial.businessName);
            setContactPerson(initial.contactPerson);
            setContactNumber(initial.contactNumber);
            setEmail(initial.email);
            setSurName(initial.surName)
            setCountryCode(initial.countryCode)
            setDesignation(initial.designation);
            setGstVat(initial.gstVat);
            setAdditionalContacts(initial.additionalContacts);
            setInitialValues(initial);
        }
    }, [vendorDetails]);



    useEffect(() => {
        dispatch({ type: GET_MASTER_SAGA })
    }, [])





    useEffect(() => {
        if (state.Common?.successCode === 200 || state.Common?.code === 400 || state.Common?.code === 401 || state.Common?.code === 402) {
            setLoading(false)
            setTimeout(() => {
                dispatch({ type: RESET_CODE })
            }, 5000)
        }
    }, [state.Common?.successCode, state.Common?.code]);


    useEffect(() => {
        if (state.Common?.isVisible === 1) {
            navigate('/vendor')
        }

    }, [state.Common?.isVisible])



    useEffect(() => {
        if (state.Common.successCode === 200) {
            setBeneficiaryName("");
            setAccountNumber("");
            setBankName("");
            setIfscCode("");
            setBankAddress("");
            setBankAddress2("");
            setBankAddress3("");
            setBankCountry("");
            setIntermediaryBank("");
            setSwift("");
            setIntermediaryDetails("");
            setIban("")
            setBusinessName('');
            setContactPerson('');
            setContactNumber('');
            setEmail('');
            setDesignation('');
            setGstVat('');
            setAdditionalContacts([]);
            setOfficeAddress1("");
            setOfficeAddress2("");
            setOfficeAddress3("");
            setCity("");
            setOfficeState("");
            setCountry("");
            setPostalCode("");
            setLandmark("");
            setGoogleMap("");
            setShippingAddress1("");
            setShippingAddress2("");
            setShippingAddress3("");
            setShippingCity("");
            setShippingState("");
            setShippingCountry("");
            setShippingPostalCode("");
            setShippingLandmark("");
            setShippingGoogleMap("");
            dispatch({ type: VENDOR_SAGA, payload: { searchKeyword: "" } });
            dispatch({ type: RESET_CODE });
            setTimeout(() => {
                dispatch({ type: RESET_VENDOR_ID });
            }, 3000);
        }
    }, [state.Common.successCode]);




    useEffect(() => {
        if (vendorDetails && vendorDetails.address) {
            const officeAddress = vendorDetails.address.find(addr => addr.addressType === "Office Address") || {};
            const shippingAddress = vendorDetails.address.find(addr => addr.addressType === "Shipping Address") || {};

            setOfficeAddress1(officeAddress.doorNo || "");
            setOfficeAddress2(officeAddress.street || "");
            setOfficeAddress3(officeAddress.locality || "");
            setOfficeAddress4(officeAddress.address4 || "");
            setCity(officeAddress.city || "");
            setOfficeState(officeAddress.state || "");
            setCountry(officeAddress.country || "");
            setPostalCode(officeAddress.postalCode || "");
            setLandmark(officeAddress.landMark || "");
            setGoogleMap(officeAddress.mapLink || "");
            setShippingAddress1(shippingAddress.doorNo || "");
            setShippingAddress2(shippingAddress.street || "");
            setShippingAddress3(shippingAddress.locality || "");
            setShippingAddress4(shippingAddress.address4 || "");
            setShippingCity(shippingAddress.city || "");
            setShippingState(shippingAddress.state || "");
            setShippingCountry(shippingAddress.country || "");
            setShippingPostalCode(shippingAddress.postalCode || "");
            setShippingLandmark(shippingAddress.landMark || "");
            setShippingGoogleMap(shippingAddress.mapLink || "");
        }
    }, [vendorDetails]);


    useEffect(() => {
        const allFieldsMatch =
            compareData(officeAddress1, shippingAddress1) &&
            compareData(officeAddress2, shippingAddress2) &&
            compareData(officeAddress3, shippingAddress3) &&
            compareData(officeAddress4, shippingAddress4) &&
            compareData(city, shippingCity) &&
            compareData(officeState, shippingState) &&
            compareData(country, shippingCountry) &&
            compareData(postalCode, shippingPostalCode) &&
            compareData(landmark, shippingLandmark) &&
            compareData(googleMap, shippingGoogleMap);

        const anyFieldNotEmpty =
            officeAddress1.trim() !== "" || shippingAddress1.trim() !== "" ||
            officeAddress2.trim() !== "" || shippingAddress2.trim() !== "" ||
            officeAddress3.trim() !== "" || shippingAddress3.trim() !== "" ||
            officeAddress4.trim() !== "" || shippingAddress4.trim() !== "" ||
            city.trim() !== "" || shippingCity.trim() !== "" ||
            officeState.trim() !== "" || shippingState.trim() !== "" ||
            country.trim() !== "" || shippingCountry.trim() !== "" ||
            postalCode.trim() !== "" || shippingPostalCode.trim() !== "" ||
            landmark.trim() !== "" || shippingLandmark.trim() !== "" ||
            googleMap.trim() !== "" || shippingGoogleMap.trim() !== "";

      
        setSameAsOffice(allFieldsMatch && anyFieldNotEmpty);
    }, [
        officeAddress1, officeAddress2, officeAddress3, officeAddress4,
        city, officeState, country, postalCode, landmark, googleMap,
        shippingAddress1, shippingAddress2, shippingAddress3, shippingAddress4,
        shippingCity, shippingState, shippingCountry, shippingPostalCode,
        shippingLandmark, shippingGoogleMap
    ]);











    useEffect(() => {
        if (vendorDetails?.bankDetails?.length > 0) {
            const bank = vendorDetails.bankDetails[0];
            const addresses = addressInfo?.address || [];


            setBeneficiaryName(bank.name || "");
            setBeneficiaryCurrency(bank.currency || "");
            setAccountNumber(bank.accountNo || "");
            setBankName(bank.bankName || "");
            setIfscCode(bank.ifscCode || "");
            setBankAddress(bank.address1 || "");
            setBankAddress2(bank.address2 || "");
            setBankAddress3(bank.address3 || "");
            setBankCountry(bank.country || "");
            setRountingBankAddress(bank.routingBankAddress || "");
            setSiftCode(bank.intermediary_swift_code || "");
            setIntermediaryBank(bank.routingBank || "");
            setSwift(bank.swiftCode || "");
            setIntermediaryDetails(bank.routingAccountIndusand || "");
            setIban(bank.iban || "");


            setInitialEditData({
                businessName: businessName || "",
                contactPersonName: contactPerson || "",
                contactNumber: contactNumber || "",
                emailId: email || "",
                designation: designation || "",
                title: surName,
                country_code: countryCode,
                gstvat: gstVat || "",
                additionalContactInfo: additionalContacts || [],
                address_info: addresses,
                bankDetails: {
                    name: bank.name || "",
                    accountNo: bank.accountNo || "",
                    currency: bank.currency || "",
                    bankName: bank.bankName || "",
                    ifscCode: bank.ifscCode || "",
                    address1: bank.address1 || "",
                    address2: bank.address2 || "",
                    address3: bank.address3 || "",
                    country: bank.country || "",
                    routingBank: bank.routingBank || "",
                    swiftCode: bank.swiftCode || "",
                    routingBankAddress: bank.routingBankAddress || "",
                    routingAccountIndusand: bank.routingAccountIndusand || "",
                    intermediary_swift_code: bank.intermediary_swift_code || "",
                    iban: bank.iban || "",
                }
            });
        } else {
            setBeneficiaryName(businessName || "");
        }
    }, [vendorDetails, businessName]);

    const customSelectStyles = {
        control: (base) => ({
            ...base,
            borderColor: '#E5E7EB',
            borderRadius: '0.6rem',
            boxShadow: 'none',
            cursor: 'pointer',
            padding: '4px 1px',
            minHeight: '40px',
            '&:hover': {
                borderColor: '#E5E7EB',
            },
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#205DA8' : 'white',
            color: state.isFocused ? 'white' : 'black',
            fontWeight: 500,
            padding: '4px 10px',
            cursor: 'pointer',
            fontSize: "14px",
            fontFamily: 'Gilroy',
        }),
        menu: (base) => ({
            ...base,
            maxHeight: '120px',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            transition: 'all 0.3s ease-in-out',
            transformOrigin: 'top',
            overscrollBehaviorY: 'contain',
        }),
        menuList: (base) => ({
            ...base,
            maxHeight: '120px',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'thin',
            paddingRight: '4px',
            '&::-webkit-scrollbar': {
                width: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#cbd5e1',
                borderRadius: '6px',
            },
        }),
        singleValue: (base, state) => {
            const isPlaceholderSelected = state.data?.isPlaceholder;
            return {
                ...base,
                fontFamily: "Gilroy",
                fontWeight: 500,
                fontSize: "14px",
                textTransform: "capitalize",
                color: isPlaceholderSelected ? "oklch(70.8% 0 0)" : "black",
            };
        },
        placeholder: (base) => ({
            ...base,
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "Gilroy, sans-serif",
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: '#94A3B8',
            padding: '0 8px',
        }),
    };

    const customStyles = {
        control: (base) => ({
            ...base,
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '12px 0 0 12px',
            border: '1px solid #d1d5db',
            borderRight: 'none',
            fontFamily: 'Gilroy',
            fontSize: '14px',
            fontWeight: 500,
            width: '100px',
            boxShadow: 'none',
            '&:hover': {
                border: '1px solid #d1d5db',
                borderRight: 'none',
            },
        }),

        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#205DA8' : 'white',
            color: state.isFocused ? 'white' : 'black',
            cursor: 'pointer',
            fontFamily: 'Gilroy',
            padding: '1px 5px',
            margin: '2px 0',
            '&:hover': {
                backgroundColor: '#205DA8',
                color: 'white',
            },
        }),

        singleValue: (base) => ({
            ...base,
            fontSize: '13px',
            fontFamily: 'Gilroy',
            color: 'Gray',
        }),
        menu: (base) => ({
            ...base,
            zIndex: 9999,
            fontSize: '13px',
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
    };

    const titleOptions = [
        { value: '', label: 'Select' },
        ...(state.Common?.titles || []).map((title) => ({
            value: title.id,
            label: title.name
        }))
    ];
    const countryCodeOptions = [
        { value: '', label: 'Select' },
        ...(state.Common?.country || []).map((item) => ({
            value: item.id,
            label: item.phone
        }))
    ];
    const countryOptions = [
        { value: '', label: 'Select' },
        ...(state.Common?.country || []).map((item) => ({
            value: item.id,
            label: item.phone
        }))
    ];



    return (
        <div className="bg-slate-100  w-full rounded-t-2xl ">
            <div className="p-2 sm:p-2 md:p-2 lg:p-4 relative">
                <div className="flex items-center justify-between pe-12 mb-4">
                    <h3 className="font-semibold text-xl font-Gilroy">{vendorDetails ? 'Edit Vendor' : 'Add Vendor'}</h3>
                </div>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                        <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
                    </div>
                )}

                <div className="sticky top-0  z-10 overflow-x-auto bg-slate-100">
                    <div className="flex flex-col sm:flex-row gap-8 mb-4   border-gray-300">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`px-0 py-2 font-Gilroy  text-base
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

                {formErrors.general && (
                    <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                        <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.general}
                    </p>
                )}

                {
                    state.Common.errorMessage && <label className="block mb-2 text-start font-Gilroy font-normal text-sm text-red-600"> {state.Common.errorMessage} </label>
                }
                {
                    state.Common.successMessage && <label className="block  mb-2 text-start font-Gilroy font-normal text-sm text-green-600"> {state.Common.successMessage
                    } </label>
                }

                <div className="p-2 sm:p-2 md:p-2 lg:p-4 bg-white mt-4 rounded-2xl">

                    {activeTab === 1 &&
                        <div>
                            <h2 className="text-xl font-semibold mb-4 font-Gilroy text-black">Basic Information</h2>
                            <div className="max-h-[300px] overflow-y-auto  
                          lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3">
                                <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3'>


                                    <div>
                                        <label className="block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800">
                                            Contact Person <span className="text-red-500">*</span>
                                        </label>

                                        <div className="flex">
                                            <Select
                                                value={titleOptions.find((option) => String(option.value) === String(surName))}
                                                onChange={(selected) => handleSurNameChange({ target: { value: selected ? selected.value : '' } })}
                                                options={titleOptions}
                                                className="w-[100px]"
                                                classNamePrefix="react-select"
                                                ref={surNameRef}
                                                styles={customStyles}
                                            />

                                            <input
                                                ref={contactPersonRef}
                                                id="contactPerson"
                                                value={contactPerson}
                                                onChange={handleContactPersonChange}
                                                type="text"
                                                placeholder="Enter Contact Person Name"
                                                className="px-3 py-3 border w-full border-l-0 rounded-tl-none rounded-bl-none rounded-tr-xl rounded-br-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800"
                                            />
                                        </div>

                                        {formErrors.surName && formErrors.contactPerson ? (
                                            <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                <InfoCircle size="14" color="#DC2626" className="mb-0.5" />
                                                Title and Name are required
                                            </p>
                                        ) : formErrors.surName ? (
                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-1">
                                                <InfoCircle size="14" color="#DC2626" className="mb-0.5" />
                                                {formErrors.surName}
                                            </p>
                                        ) : formErrors.contactPerson ? (
                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-1">
                                                <InfoCircle size="14" color="#DC2626" className="mb-0.5" />
                                                {formErrors.contactPerson}
                                            </p>
                                        ) : null}
                                    </div>


                                    <div>
                                        <label className="block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800">
                                            Contact Number <span className="text-red-500">*</span>
                                        </label>

                                        <div className="flex">
                                            <Select
                                                value={countryCodeOptions.find((option) => String(option.value) === String(countryCode))}
                                                onChange={(selected) => handleCountryCodeChange({ target: { value: selected ? selected.value : '' } })}
                                                options={countryCodeOptions}
                                                className="w-[100px]"
                                                classNamePrefix="react-select"
                                                ref={countryCodeRef}
                                                styles={customStyles}
                                            />

                                            <input
                                                type="text"
                                                ref={contactNumberRef}
                                                value={contactNumber}
                                                onChange={handleContactNumberChange}
                                                placeholder="Enter Contact Number"
                                                className="w-full px-3 py-3 border border-l-0 rounded-tl-none rounded-bl-none rounded-tr-xl rounded-br-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800"
                                            />
                                        </div>

                                        {formErrors.countryCode && formErrors.contactNumber ? (
                                            <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                <InfoCircle size="14" color="#DC2626" className="mb-0.5" />
                                                Country Code and Contact Number are required
                                            </p>
                                        ) : formErrors.countryCode ? (
                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-1">
                                                <InfoCircle size="14" color="#DC2626" className="mb-0.5" />
                                                {formErrors.countryCode}
                                            </p>
                                        ) : formErrors.contactNumber ? (
                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-1">
                                                <InfoCircle size="14" color="#DC2626" className="mb-0.5" />
                                                {formErrors.contactNumber}
                                            </p>
                                        ) : null}
                                    </div>

                                    <div >
                                        <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Email ID </label>
                                        <input
                                            ref={emailRef}
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

                                            type='text'
                                            value={designation}
                                            ref={designationRef}
                                            onChange={handleDesignationChange}
                                            placeholder='Enter Designation'
                                            className='w-full px-3 py-3 border rounded-xl focus:outline-none   font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                        {formErrors.designation && (
                                            <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.designation} </p>)}
                                    </div>
                                    <div >
                                        <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>GST/VAT <span className='text-red-500'>*</span></label>
                                        <input
                                            type='text'
                                            value={gstVat}
                                            ref={gstVatRef}
                                            onChange={handleGstVatChange}
                                            placeholder='Enter GST/VAT'

                                            className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                        {formErrors.gstVat && (
                                            <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.gstVat} </p>)}
                                    </div>
                                    <div className='  '>
                                        <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Business Name <span className='text-red-500'>*</span> </label>
                                        <input
                                            id='clientId'
                                            ref={businessNameRef}
                                            value={businessName}
                                            onChange={handleBusinessNameChange}
                                            type='text'
                                            placeholder='Enter Business Name'
                                            className='px-3 py-3 w-full border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                        {formErrors.businessName && (
                                            <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.businessName} </p>)}

                                    </div>



                                </div>


                                <div className="pt-4">

                                    {additionalContacts.map((contact, index) => (
                                        <div key={contact.id} className="mt-4 p-4 ">
                                            <h2 className="text-xl font-semibold mb-2 text-black font-Gilroy">
                                                Additional Contact {index + 1}
                                            </h2>
                                            <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3">
                                                <div>
                                                    <label className="block mb-2 text-neutral-800 font-medium font-Gilroy">
                                                        Contact Person Name<span className="text-red-500">*</span>
                                                    </label>

                                                    <div className="flex">
                                                        <Select
                                                            value={titleOptions.find((option) => String(option.value) === String(contact.surName))}
                                                            onChange={(selected) =>
                                                                handleAdditionalContactChange(index, 'surName', selected ? selected.value : '')
                                                            }
                                                            options={titleOptions}
                                                            className="w-[100px]"
                                                            classNamePrefix="react-select"
                                                            ref={additionalRefs.current[index]?.surNameRef}
                                                            styles={customStyles}
                                                        />

                                                        <input
                                                            type="text"
                                                            value={contact.name}
                                                            onChange={(e) =>
                                                                handleAdditionalContactChange(index, 'name', e.target.value)
                                                            }
                                                            placeholder="Enter Contact Person Name"
                                                            className="px-3 py-3 w-full border-l-0 rounded-tl-none rounded-bl-none rounded-tr-xl rounded-br-xl font-Gilroy border focus:outline-none text-sm"
                                                        />
                                                    </div>

                                                    {formErrors[`additionalName${index}`] && formErrors[`additionalSurName${index}`] ? (
                                                        <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                            <InfoCircle size="14" color="#DC2626" />
                                                            Title and Name are required
                                                        </p>
                                                    ) : formErrors[`additionalName${index}`] ? (
                                                        <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                            <InfoCircle size="14" color="#DC2626" className="mb-0.5" />
                                                            {formErrors[`additionalName${index}`]}
                                                        </p>
                                                    ) : formErrors[`additionalSurName${index}`] ? (
                                                        <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                            <InfoCircle size="14" color="#DC2626" className="mb-0.5" />
                                                            {formErrors[`additionalSurName${index}`]}
                                                        </p>
                                                    ) : null}
                                                </div>


                                                <div>
                                                    <label className="block mb-2 text-neutral-800 font-medium font-Gilroy">
                                                        Contact Number <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="flex">
                                                        <Select
                                                            value={countryOptions.find((option) => String(option.value) === String(contact.countryCode))}
                                                            onChange={(selected) =>
                                                                handleAdditionalContactChange(index, 'countryCode', selected ? selected.value : '')
                                                            }
                                                            options={countryOptions}
                                                            className="w-[100px]"
                                                            classNamePrefix="react-select"
                                                            ref={additionalRefs.current[index]?.countryCodeRef}
                                                            styles={customStyles}
                                                        />

                                                        <input
                                                            type="text"
                                                            ref={additionalRefs.current[index]?.contactNumberRef}
                                                            value={contact.contactNumber}
                                                            onChange={(e) =>
                                                                handleAdditionalContactChange(index, 'contactNumber', e.target.value)
                                                            }
                                                            placeholder="Enter Contact Number"
                                                            className="px-3 py-3 font-Gilroy w-full border border-l-0 rounded-tl-none rounded-bl-none rounded-tr-xl rounded-br-xl focus:outline-none text-sm"
                                                        />
                                                    </div>

                                                    {formErrors[`additionalContactNumber${index}`] && formErrors[`additionalCountryCode${index}`] ? (
                                                        <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                            <InfoCircle size="14" color="#DC2626" className="mb-0.5" />
                                                            Country Code and Contact Number are required
                                                        </p>
                                                    ) : formErrors[`additionalContactNumber${index}`] ? (
                                                        <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                            <InfoCircle size="14" color="#DC2626" className="mb-0.5" />
                                                            {formErrors[`additionalContactNumber${index}`]}
                                                        </p>
                                                    ) : formErrors[`additionalCountryCode${index}`] ? (
                                                        <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                            <InfoCircle size="14" color="#DC2626" className="mb-0.5" />
                                                            {formErrors[`additionalCountryCode${index}`]}
                                                        </p>
                                                    ) : null}
                                                </div>

                                                <div>
                                                    <label className="block mb-2 text-neutral-800 font-medium font-Gilroy">
                                                        Email ID
                                                    </label>
                                                    <input
                                                        type="text"
                                                        ref={additionalRefs.current[index]?.emailRef}
                                                        value={contact.email}
                                                        onChange={(e) => handleAdditionalContactChange(index, "email", e.target.value)}
                                                        placeholder="Enter Email ID"
                                                        className="px-3 py-3  font-Gilroy w-full border rounded-xl focus:outline-none text-sm"
                                                    />
                                                    {formErrors[`additionalEmail${index}`] && (
                                                        <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                            <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors[`additionalEmail${index}`]} </p>
                                                    )}
                                                </div>
                                                <div>
                                                    <label className="block mb-2 text-neutral-800 font-medium font-Gilroy">
                                                        Designation<span className='text-red-500'>*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        ref={additionalRefs.current[index]?.designationRef}
                                                        value={contact.designation}
                                                        onChange={(e) => handleAdditionalContactChange(index, "designation", e.target.value)}
                                                        placeholder="Enter Designation"
                                                        className="px-3 py-3 w-full font-Gilroy border rounded-xl focus:outline-none text-sm"
                                                    />
                                                    {formErrors[`additionalDesignation${index}`] && (
                                                        <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                            <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors[`additionalDesignation${index}`]} </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {
                                        additionalContacts.length < 10 &&

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
                            <div className="flex flex-col xs:flex-row sm:flex-row justify-end gap-2 sm:gap-4 mt-2">
                                <button
                                    type="button"
                                    className="w-[167px] px-10 font-medium font-Montserrat px-4 py-2 border border-[#205DA8] text-[#205DA8] rounded-lg shadow-md hover:bg-[#205DA8] hover:text-white transition"
                                    onClick={handleSaveClick} >
                                    Save & Exit
                                </button>

                                <button
                                    type="button"
                                    className="w-[167px] px-10 font-medium font-Montserrat px-4 py-2 border border-[#205DA8] text-[#205DA8] rounded-lg shadow-md bg-[#205DA8] text-white transition"
                                    onClick={handleNextClick}
                                >
                                    Next
                                </button>
                            </div>


                        </div>}
                    {activeTab === 2 && <div>


                        <div>
                            <div className='bg-white rounded-2xl h-auto  relative'>


                                <h2 className="text-xl font-semibold mb-4 font-Gilroy text-black">Address Information</h2>
                                <div className='max-h-[300px] overflow-y-auto  
                                                  lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3'>
                                    <label className="block mb-2 text-neutral-800 font-medium font-Gilroy">
                                        Office Address<span className='text-red-500'>*</span>
                                    </label>
                                    <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3'>

                                        <div className='mb-6 items-center'>
                                            <div className="relative w-full">
                                                <input
                                                    type='text'
                                                    ref={officeAddress1Ref}
                                                    value={officeAddress1}
                                                    onChange={handleOfficeAddress1Change}
                                                    placeholder='Enter Address Line 1'
                                                    className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800 placeholder-transparent'
                                                />
                                                {!officeAddress1 && (
                                                    <span className="absolute left-3 top-[13px] text-sm font-Gilroy font-medium text-neutral-400 pointer-events-none">
                                                        Enter Address Line 1<span className="text-red-500 ml-0.5">*</span>
                                                    </span>
                                                )}
                                            </div>

                                            {formErrors.officeAddress1 && (
                                                <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-0.5">
                                                    <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.officeAddress1}
                                                </p>
                                            )}
                                        </div>


                                        <div className='mb-2 items-center'>
                                            <input
                                                type='text'
                                                value={officeAddress2}
                                                onChange={handleOfficeAddress2Change}
                                                placeholder='Enter Address Line 2'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {formErrors.officeAddress2 && (
                                                <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                    <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.officeAddress2}
                                                </p>
                                            )}
                                        </div>

                                        <div className='mb-2 items-center'>
                                            <input
                                                type='text'
                                                value={officeAddress3}
                                                onChange={handleOfficeAddress3Change}
                                                placeholder='Enter Address Line 3'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {formErrors.officeAddress3 && (
                                                <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                    <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.officeAddress3}
                                                </p>
                                            )}
                                        </div>

                                        <div className='mb-2 items-center'>
                                            <input
                                                type='text'
                                                value={officeAddress4}
                                                onChange={handleOfficeAddress4Change}
                                                placeholder='Enter Address Line 4'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {formErrors.officeAddress4 && (
                                                <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                    <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.officeAddress4}
                                                </p>
                                            )}
                                        </div>


                                        <div className='mb-2 items-center'>
                                            <div className="relative w-full">
                                                <input
                                                    id="clientId"
                                                    type="text"
                                                    value={city}
                                                    ref={cityRef}
                                                    onChange={handleCityChange}
                                                    className="px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800 placeholder-transparent"
                                                    placeholder="Enter City"
                                                />
                                                {!city && (
                                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-Gilroy font-medium text-neutral-400 pointer-events-none">
                                                        Enter City<span className="text-red-500 ml-0.5">*</span>
                                                    </span>
                                                )}
                                            </div>

                                            {formErrors.city && (
                                                <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-0.5">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.city}
                                                </p>
                                            )}
                                        </div>

                                        <div className='mb-2 items-center'>

                                            <Select
                                                id="state"
                                                value={officeState ? { value: officeState, label: officeState } : null}
                                                onChange={(selectedOption) => handleStateChange(selectedOption)}
                                                options={[
                                                    { value: '', label: 'Select State', isPlaceholder: true },
                                                    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
                                                    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
                                                    { value: 'Assam', label: 'Assam' },
                                                    { value: 'Bihar', label: 'Bihar' },
                                                    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
                                                    { value: 'Goa', label: 'Goa' },
                                                    { value: 'Gujarat', label: 'Gujarat' },
                                                    { value: 'Haryana', label: 'Haryana' },
                                                    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
                                                    { value: 'Jharkhand', label: 'Jharkhand' },
                                                    { value: 'Karnataka', label: 'Karnataka' },
                                                    { value: 'Kerala', label: 'Kerala' },
                                                    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
                                                    { value: 'Maharashtra', label: 'Maharashtra' },
                                                    { value: 'Manipur', label: 'Manipur' },
                                                    { value: 'Meghalaya', label: 'Meghalaya' },
                                                    { value: 'Mizoram', label: 'Mizoram' },
                                                    { value: 'Nagaland', label: 'Nagaland' },
                                                    { value: 'Odisha', label: 'Odisha' },
                                                    { value: 'Punjab', label: 'Punjab' },
                                                    { value: 'Rajasthan', label: 'Rajasthan' },
                                                    { value: 'Sikkim', label: 'Sikkim' },
                                                    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
                                                    { value: 'Telangana', label: 'Telangana' },
                                                    { value: 'Tripura', label: 'Tripura' },
                                                    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
                                                    { value: 'Uttarakhand', label: 'Uttarakhand' },
                                                    { value: 'West Bengal', label: 'West Bengal' },
                                                    { value: 'Delhi', label: 'Delhi' },
                                                    { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
                                                    { value: 'Ladakh', label: 'Ladakh' },
                                                    { value: 'Puducherry', label: 'Puducherry' },
                                                ]}
                                                placeholder="Select State"
                                                styles={customSelectStyles}
                                                className="placeholder-transparent font-Gilroy text-sm font-medium text-neutral-800 customState__control"
                                                classNamePrefix="custom"
                                            />


                                        </div>

                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Country</label>

                                            <Select
                                                options={[
                                                    { value: '', label: 'Select Country', isPlaceholder: true },
                                                    { value: 'India', label: 'India' },
                                                    { value: 'United States', label: 'United States' },
                                                    { value: 'United Kingdom', label: 'United Kingdom' },
                                                    { value: 'Australia', label: 'Australia' },
                                                    { value: 'Canada', label: 'Canada' },
                                                    { value: 'Germany', label: 'Germany' },
                                                    { value: 'France', label: 'France' },
                                                    { value: 'Italy', label: 'Italy' },
                                                    { value: 'Singapore', label: 'Singapore' },
                                                    { value: 'Japan', label: 'Japan' },
                                                    { value: 'China', label: 'China' }
                                                ]}
                                                value={country ? { value: country, label: country } : null}
                                                onChange={(selectedOption) => handleCountryChange(selectedOption)}
                                                placeholder="Select Country"
                                                classNamePrefix="custom"
                                                styles={customSelectStyles}
                                                className="placeholder-transparent font-Gilroy text-sm font-medium text-neutral-800"
                                            />




                                        </div>



                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Postal Code <span className='text-red-500'>*</span></label>
                                            <input
                                                id='clientId'
                                                type='text'
                                                ref={postalCodeRef}
                                                value={postalCode}
                                                onChange={handlePostalCodeChange}
                                                placeholder='Enter Postal Code'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {formErrors.postalCode && (
                                                <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                    <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.postalCode} </p>)}
                                        </div>
                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Landmark </label>
                                            <input
                                                id='clientId'
                                                type='text'
                                                value={landmark}
                                                onChange={handleLandmarkChange}
                                                placeholder='Enter Landmark'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {formErrors.landmark && (
                                                <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                    <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.landmark} </p>)}
                                        </div>
                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Google Map </label>
                                            <input
                                                id='clientId'
                                                type='text'
                                                value={googleMap}
                                                onChange={handleGoogleMapChange}
                                                placeholder='Enter Google Map Link'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />

                                        </div>
                                    </div>

                                    <h4 className="text-base font-medium mb-4 font-Gilroy text-black" >Shipping Address  <span className='text-red-500'>*</span> <span className='text-md accent-blue-800'>
                                        <input
                                            type="checkbox"
                                            checked={sameAsOffice}
                                            onChange={handleCheckboxChange}
                                            className="ml-2"
                                        /></span><span className='text-sm font-medium mb-4 font-Gilroy text-blue-800'> Same as office Address</span></h4>

                                    <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-4'>


                                        <div className='mb-6 items-center'>
                                            <div className="relative w-full">
                                                <input
                                                    id='clientId'
                                                    type='text'
                                                    ref={shippingAddress1Ref}
                                                    value={shippingAddress1}
                                                    onChange={handleShippingAddress1Change}
                                                    placeholder='Enter Address Line'
                                                    className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800 placeholder-transparent'
                                                />

                                                {!shippingAddress1 && (
                                                    <span className="absolute left-3 top-[13px] text-sm font-Gilroy font-medium text-neutral-400 pointer-events-none">
                                                        Enter Address Line<span className="text-red-500 ml-0.5">*</span>
                                                    </span>
                                                )}
                                            </div>

                                            {formErrors.shippingAddress1 && (
                                                <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                    <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span>
                                                    {formErrors.shippingAddress1}
                                                </p>
                                            )}
                                        </div>

                                        <div className='mb-2 items-center'>
                                            <input
                                                type='text'
                                                value={shippingAddress2}
                                                onChange={handleShippingAddress2Change}
                                                placeholder='Enter Shipping Address Line 2'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {formErrors.shippingAddress2 && (
                                                <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                    <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.shippingAddress2}
                                                </p>
                                            )}
                                        </div>

                                        <div className='mb-2 items-center'>
                                            <input
                                                type='text'
                                                value={shippingAddress3}
                                                onChange={handleShippingAddress3Change}
                                                placeholder='Enter Shipping Address Line 3'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {formErrors.shippingAddress3 && (
                                                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.shippingAddress3}
                                                </p>
                                            )}
                                        </div>
                                        <div className='mb-2 items-center'>
                                            <input
                                                type='text'
                                                value={shippingAddress4}
                                                onChange={handleShippingAddress4Change}
                                                placeholder='Enter Shipping Address Line 4'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {formErrors.shippingAddress4 && (
                                                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.shippingAddress4}
                                                </p>
                                            )}
                                        </div>

                                        <div className='mb-2 relative items-center'>
                                            <input
                                                id='clientId'
                                                type='text'
                                                ref={shippingCityRef}
                                                value={shippingCity}
                                                onChange={handleShippingCity}
                                                placeholder='Enter City'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800 placeholder-transparent'
                                            />

                                            {!shippingCity && (
                                                <span className="absolute left-3 top-[13px] text-sm font-Gilroy font-medium text-neutral-400 pointer-events-none">
                                                    Enter City<span className="text-red-500 ml-0.5">*</span>
                                                </span>
                                            )}

                                            {formErrors.shippingCity && (
                                                <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                    <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.shippingCity}
                                                </p>
                                            )}
                                        </div>


                                        <div className='mb-2 items-center'>

                                            <Select
                                                id="shippingState"
                                                value={shippingState ? { value: shippingState, label: shippingState } : null}
                                                onChange={handleShippingState}
                                                options={[
                                                    { value: '', label: 'Select State', isPlaceholder: true },
                                                    { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
                                                    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
                                                    { value: 'Assam', label: 'Assam' },
                                                    { value: 'Bihar', label: 'Bihar' },
                                                    { value: 'Chhattisgarh', label: 'Chhattisgarh' },
                                                    { value: 'Goa', label: 'Goa' },
                                                    { value: 'Gujarat', label: 'Gujarat' },
                                                    { value: 'Haryana', label: 'Haryana' },
                                                    { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
                                                    { value: 'Jharkhand', label: 'Jharkhand' },
                                                    { value: 'Karnataka', label: 'Karnataka' },
                                                    { value: 'Kerala', label: 'Kerala' },
                                                    { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
                                                    { value: 'Maharashtra', label: 'Maharashtra' },
                                                    { value: 'Manipur', label: 'Manipur' },
                                                    { value: 'Meghalaya', label: 'Meghalaya' },
                                                    { value: 'Mizoram', label: 'Mizoram' },
                                                    { value: 'Nagaland', label: 'Nagaland' },
                                                    { value: 'Odisha', label: 'Odisha' },
                                                    { value: 'Punjab', label: 'Punjab' },
                                                    { value: 'Rajasthan', label: 'Rajasthan' },
                                                    { value: 'Sikkim', label: 'Sikkim' },
                                                    { value: 'Tamil Nadu', label: 'Tamil Nadu' },
                                                    { value: 'Telangana', label: 'Telangana' },
                                                    { value: 'Tripura', label: 'Tripura' },
                                                    { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
                                                    { value: 'Uttarakhand', label: 'Uttarakhand' },
                                                    { value: 'West Bengal', label: 'West Bengal' },
                                                    { value: 'Delhi', label: 'Delhi' },
                                                    { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
                                                    { value: 'Ladakh', label: 'Ladakh' },
                                                    { value: 'Puducherry', label: 'Puducherry' },

                                                ]}
                                                placeholder="Select State"
                                                styles={customSelectStyles}
                                                className="font-Gilroy text-sm font-medium text-neutral-800 customState__control"
                                                classNamePrefix="custom"
                                                isSearchable={false}
                                            />


                                        </div>

                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Country </label>

                                            <Select
                                                id="shippingCountry"
                                                value={shippingCountry ? { value: shippingCountry, label: shippingCountry } : null}
                                                onChange={handleShippingCountry}
                                                options={[
                                                    { value: '', label: 'Select Country', isPlaceholder: true },
                                                    { value: 'India', label: 'India' },
                                                    { value: 'United States', label: 'United States' },
                                                    { value: 'United Kingdom', label: 'United Kingdom' },
                                                    { value: 'Australia', label: 'Australia' },
                                                    { value: 'Canada', label: 'Canada' },
                                                    { value: 'Germany', label: 'Germany' },
                                                    { value: 'France', label: 'France' },
                                                    { value: 'Italy', label: 'Italy' },
                                                    { value: 'Singapore', label: 'Singapore' },
                                                    { value: 'Japan', label: 'Japan' },
                                                    { value: 'China', label: 'China' }
                                                ]}
                                                placeholder="Select Country"
                                                styles={customSelectStyles}
                                                className="font-Gilroy text-sm font-medium text-neutral-800 custom__control"
                                                classNamePrefix="custom"
                                                isSearchable={false}
                                            />


                                        </div>
                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Postal Code <span className='text-red-500'>*</span></label>
                                            <input
                                                id='clientId'
                                                type='text'
                                                ref={shippingPostalCodeRef}
                                                value={shippingPostalCode}
                                                onChange={handleShippingPostalCodeChange}
                                                placeholder='Enter Postal Code'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {formErrors.shippingPostalCode && (
                                                <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                    <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.shippingPostalCode} </p>)}
                                        </div>
                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Landmark </label>
                                            <input
                                                id='clientId'
                                                type='text'
                                                value={shippingLandmark}
                                                onChange={handleShippingLandmarkChange}
                                                placeholder='Enter Landmark'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />

                                        </div>
                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Google Map </label>
                                            <input
                                                id='clientId'
                                                type='text'
                                                value={shippingGoogleMap}
                                                onChange={handleShippingGoogleMapChange}
                                                placeholder='Enter Google Map Link'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />

                                        </div>



                                    </div>

                                </div>
                                <div className="flex flex-col xs:flex-row sm:flex-row  justify-end  mt-2">

                                    <div className="flex flex-col xs:flex-row sm:flex-row justify-end gap-2 sm:gap-4">

                                        {
                                            vendorDetails && <button
                                                type="button"
                                                className="w-[167px] px-10 font-Montserrat font-medium py-2 border border-[#205DA8] text-[#205DA8] rounded-lg shadow-md hover:bg-[#205DA8] hover:text-white transition"
                                                onClick={handleSaveClickAddress} >
                                                Save & Exit
                                            </button>
                                        }

                                        <button
                                            className="w-[167px] px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat  text-base font-medium  font-Montserrat"
                                            onClick={handleNext}
                                        >
                                            Next
                                        </button>
                                    </div>



                                </div>


                            </div>
                        </div>



                    </div>
                    }
                    {activeTab === 3 &&


                        <div>
                            <div className='bg-white rounded-2xl h-auto relative'>

                                <h2 className="text-xl font-semibold mb-4 font-Gilroy text-black">Bank Detail</h2>


                                {formErrors.general && (
                                    <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1 mb-3">
                                        <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.general}
                                    </p>
                                )}

                                <div className='max-h-[280px] overflow-y-auto  
                          lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3'>
                                    <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-2'>


                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>
                                                Beneficiary  Name<span className='text-red-500'>*</span>
                                            </label>

                                            <input
                                                id='clientId'
                                                type='text'
                                                ref={beneficiaryNameRef}
                                                value={beneficiaryName}
                                                onChange={handleBeneficiaryNameChange}
                                                placeholder='Enter Beneficiary Name '
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />

                                            {formErrors.beneficiaryName && (
                                                <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.beneficiaryName} </p>)}
                                        </div>


                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>
                                                Beneficiary Currency<span className='text-red-500'>*</span>
                                            </label>


                                            <Select
                                                ref={beneficiaryCurrencyRef}
                                                value={beneficiaryCurrency ? { value: beneficiaryCurrency, label: beneficiaryCurrency } : null}
                                                onChange={(selectedOption) => handleBeneficiaryCurrency({ target: { value: selectedOption.value } })}
                                                options={[
                                                    { value: 'Select Currency', label: 'Select Currency', isPlaceholder: true },
                                                    { value: "USD", label: "USD" },
                                                    { value: "INR", label: "INR" },
                                                    { value: "EUR", label: "EUR" },
                                                    { value: "GBP", label: "GBP" },
                                                    { value: "JPY", label: "JPY" }
                                                ]}
                                                placeholder="Select beneficiary currency"
                                                styles={customSelectStyles}
                                                className="capitalize font-Gilroy font-medium text-sm text-neutral-800 customState__control"
                                                classNamePrefix="custom"
                                                isSearchable={false}
                                            />


                                            {formErrors.beneficiaryCurrency && (
                                                <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                    <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.beneficiaryCurrency}
                                                </p>
                                            )}
                                        </div>
                                        <div className='mb-2  items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Beneficiary Account Number
                                                <span className='text-red-500'>*</span> </label>

                                            <input
                                                id='clientId'
                                                type='text'
                                                ref={accountNumberRef}
                                                value={accountNumber}
                                                onChange={handleAccountNumberChange}
                                                placeholder='Enter Account Number'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {formErrors.accountNumber && (
                                                <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                    <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.accountNumber} </p>)}
                                        </div>


                                    </div>


                                    <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3'>



                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Beneficiary Account Bank Name
                                                <span className='text-red-500'>*</span>
                                            </label>

                                            <input
                                                id='clientId'
                                                type='text'
                                                ref={bankNameRef}
                                                value={bankName}
                                                onChange={handleBankNameChange}
                                                placeholder='Enter Account Name'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {formErrors.bankName && (
                                                <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                    <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.bankName} </p>)}
                                        </div>

                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>IFSC Code
                                                <span className='text-red-500'>*</span>
                                            </label>

                                            <input
                                                id='clientId'
                                                type='text'
                                                ref={ifscCodeRef}
                                                value={ifscCode}
                                                onChange={handleIfscCodeChange}
                                                placeholder='Enter IFSC Code'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {formErrors.ifscCode && (
                                                <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                    <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.ifscCode} </p>)}
                                        </div>
                                        <div className='mb-2  items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>SWIFT Code  </label>



                                            <input
                                                id='clientId'
                                                type='text'
                                                value={swift}
                                                onChange={handleSwiftChange}
                                                placeholder='Enter SWIFT Code'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {formErrors.swift && (
                                                <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                    <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.swift} </p>)}
                                        </div>

                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bank Address 1         <span className='text-red-500'>*</span></label>

                                            <input
                                                id='clientId'
                                                type='text'
                                                ref={bankAddressRef}
                                                value={bankAddress}
                                                onChange={handleBankAddressChange}
                                                placeholder='Enter Bank Address '
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />

                                            {formErrors.bankAddress && (
                                                <p className="text-red-600 font-Gilroy font-medium text-xs flex items-center gap-1 pt-1">
                                                    <span><InfoCircle size="14" color="#DC2626" className="mb-0.5" /></span> {formErrors.bankAddress} </p>)}

                                        </div>

                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bank Address 2</label>

                                            <input
                                                type='text'
                                                value={bankAddress2}
                                                onChange={handleBankAddress2Change}
                                                placeholder='Enter Bank Address 2'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />

                                            {formErrors.bankAddress2 && (
                                                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.bankAddress2}
                                                </p>
                                            )}
                                        </div>


                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bank Address 3</label>

                                            <input
                                                type='text'
                                                value={bankAddress3}
                                                onChange={handleBankAddress3Change}
                                                placeholder='Enter Bank Address 3'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />

                                            {formErrors.bankAddress3 && (
                                                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.bankAddress3}
                                                </p>
                                            )}
                                        </div>

                                        <div className="mb-2 items-center">
                                            <label className="block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800">
                                                Bank Country
                                            </label>

                                            <Select
                                                id="bankCountry"
                                                value={
                                                    bankCountry
                                                        ? { value: bankCountry, label: bankCountry }
                                                        : null
                                                }
                                                onChange={(selectedOption) =>
                                                    handleBankCountryChange({ target: { value: selectedOption.value } })
                                                }
                                                options={[
                                                    { value: 'Select Country', label: 'Select Country', isPlaceholder: true },
                                                    { value: 'India', label: 'India' },
                                                    { value: 'United States', label: 'United States' },
                                                    { value: 'United Kingdom', label: 'United Kingdom' },
                                                    { value: 'Australia', label: 'Australia' },
                                                    { value: 'Canada', label: 'Canada' },
                                                    { value: 'Germany', label: 'Germany' },
                                                    { value: 'France', label: 'France' },
                                                    { value: 'Italy', label: 'Italy' },
                                                    { value: 'Singapore', label: 'Singapore' },
                                                    { value: 'Japan', label: 'Japan' },
                                                    { value: 'China', label: 'China' }
                                                ]}
                                                placeholder="Select Bank Country"
                                                styles={customSelectStyles}
                                                className="font-Gilroy text-sm font-medium text-neutral-800"
                                                classNamePrefix="custom"
                                                isSearchable={false}
                                            />

                                        </div>


                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Intermediary Routing Bank </label>

                                            <input
                                                id='clientId'
                                                type='text'
                                                value={intermediaryBank}
                                                onChange={handleIntermediaryBankChange}
                                                placeholder='Enter Intermediary Routing Bank'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                        </div>

                                        <div className='mb-2 items-center '>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>SWIFT Code for intermediary Bank</label>

                                            <input
                                                id='clientId'
                                                type='text'
                                                value={siftCode}
                                                onChange={handleSiftCodeChange}
                                                placeholder='Enter SWIFT Code for intermediary Bank'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                        </div>




                                    </div>


                                    <div className='grid md:grid-cols-2 sm:grid-cols-2 gap-3 mt-1'>

                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bank Address</label>

                                            <input
                                                type='text'
                                                value={rountingBankAddress}
                                                onChange={handleRoutingBankAddressChange}
                                                placeholder='Enter Bank Address 3'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />

                                        </div>
                                        <div className='mb-2  items-center '>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Beneficiary Bank Account Number with Intermediary Bank </label>

                                            <input
                                                id='clientId'
                                                type='text'
                                                value={intermediaryDetails}
                                                onChange={handleIntermediaryDetailsChange}
                                                placeholder='Enter Beneficiary Bank Account Number with Intermediary Bank '
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                        </div>


                                        <div className='mb-2  items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>IBAN (International Bank Account Number)</label>

                                            <input
                                                id='clientId'
                                                type='text'
                                                value={iban}
                                                onChange={handleIbanChange}

                                                placeholder='IBAN (International Bank Account Number)'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="flex flex-col xs:flex-row sm:flex-row justify-end items-center mt-2 gap-3 sm:gap-0">



                                    <div className="flex flex-col xs:flex-row sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
                                        <button className="w-[167px] px-10 font-Montserrat font-medium py-2 border border-[#205DA8] text-[#205DA8] rounded-lg shadow-md bg-[#205DA8] text-white transition"
                                            onClick={handleSubmit}>
                                            Submit
                                        </button>
                                    </div>
                                </div>

                            </div>

                        </div>}
                </div>
            </div>
        </div>
    );
}


BasicVendor.propTypes = {
    vendorDetails: PropTypes.object
}
export default BasicVendor;
