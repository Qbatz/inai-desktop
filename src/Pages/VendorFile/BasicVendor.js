/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import BankVendor from "./BankVendor";
import { InfoCircle } from "iconsax-react";
import { useDispatch, useSelector } from 'react-redux';
import { VENDOR_BASIC_INFO_SAGA, VENDOR_SAGA, RESET_CODE, GET_MASTER_SAGA, RESET_VENDOR_ID, VENDOR_ADDRESS_INFO_SAGA } from "../../Utils/Constant";
import { useNavigate } from "react-router-dom";


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
        // { name: "", contactNumber: "", email: "", designation: "" }
    ]);
    const [formErrors, setFormErrors] = useState({});
    const [basicDetails, setBasicDetails] = useState('')
    const [addressDetails, setAddressDetails] = useState({ address: null, bank: null })




    // address INfo


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
    //   const [formErrors, setFormErrors] = useState({});

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





   


    const handleBackToAddress = (value, Address, bankDetails) => {
        setActiveTab(value)
        setAddressDetails({ address: Address, bank: bankDetails })


    }







    const handleBusinessNameChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z\s]+$/.test(value) || value === "") {
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
        if (/^[A-Za-z\s]*$/.test(value) || value === "") {
            setDesignation(value);
            setFormErrors((prevErrors) => ({ ...prevErrors, designation: "" }));
        }
    };

    const handleGstVatChange = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, gstVat: "" }));
        setGstVat(e.target.value);
    };


    const validateForm = () => {
        let errors = {};

        if (!businessName?.trim()) errors.businessName = "Business Name is required";
        if (!surName) errors.surName = "Title is required";
        if (!contactPerson?.trim()) errors.contactPerson = "Contact Person is required";
        if (!countryCode) errors.countryCode = "countryCode is required";
        if (!contactNumber?.trim() || !/^\d{10}$/.test(contactNumber))
            errors.contactNumber = "Enter a valid 10-digit Contact Number";
        if (!email?.trim()) {
            errors.email = "Email is required";
        } else {
            const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
            if (!emailRegex.test(email)) errors.email = "Invalid Email format";
        }
        if (!designation?.trim()) errors.designation = "Designation is required";
        if (!gstVat?.trim()) errors.gstVat = "GST/VAT is required";

        additionalContacts?.forEach((contact, index) => {
            const hasName = contact.name?.trim();

            if (hasName) {

                if (!contact.surName) {
                    errors[`additionalSurName${index}`] = `Title is required`;
                }

                if (!contact.contactNumber?.trim() || !/^\d{10}$/.test(contact.contactNumber)) {
                    errors[`additionalContactNumber${index}`] = `Enter a valid 10-digit Contact Number`;
                }


                if (!contact.countryCode) {
                    errors[`additionalCountryCode${index}`] = `Country code is required`;
                }

                if (!contact.email?.trim()) {
                    errors[`additionalEmail${index}`] = `Email is required`;
                } else {
                    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
                    if (!emailRegex.test(contact.email)) {
                        errors[`additionalEmail${index}`] = `Invalid Email format`;
                    }
                }


                if (!contact.designation?.trim()) {
                    errors[`additionalDesignation${index}`] = `Designation is required`;
                }
            } else {

            }
        });


        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };



    // basic info save & click button

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
            acc[key] = initialValues[key];
            return acc;
        }, {});


        const isChanged = JSON.stringify(current) !== JSON.stringify(filteredInitial);
        if (vendorDetails && !isChanged) {
            setFormErrors({ general: "No changes detected" });
            return;
        }

        if (validateForm()) {

            const formattedAdditionalContacts = additionalContacts.map(contact => ({
                title: contact.surName,
                name: contact.name,
                country_code: contact.countryCode,
                contactNumber: Number(contact.contactNumber),
                contactEmail: contact.email,
                designation: contact.designation
            }));
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


    //  next button
    const handleNextClick = () => {
        if (validateForm()) {

            setActiveTab(2);
            const formattedAdditionalContacts = additionalContacts.map(contact => ({
                title: contact.surName,
                name: contact.name,
                country_code: contact.countryCode,
                contactNumber: Number(contact.contactNumber),
                contactEmail: contact.email,
                designation: contact.designation
            }));


            const payload = {
                vendor_id: '',
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

            setBasicDetails(payload)
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
        const isFormValid = validateForm();
        const isAddressValid = validateFormAddress();

        const formattedAdditionalContacts = additionalContacts.map(contact => ({
            title: contact.surName,
            name: contact.name,
            country_code: contact.countryCode,
            contactNumber: Number(contact.contactNumber),
            contactEmail: contact.email,
            designation: contact.designation
        }));

        const payload = {
            vendor_id: '',
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

        if (id === 3) {
            if (isFormValid && isAddressValid) {
                setBasicDetails(payload);
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
        } else if (id === 2) {
            if (isFormValid) {
                setBasicDetails(payload);
                setActiveTab(2);
            }
        } else {
            setActiveTab(id);
        }
    };







    const handleBackToBasic = () => {
        setActiveTab(1)

    }

    const handleOfficeAddress1Change = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, officeAddress1: "" }));
        setOfficeAddress1(e.target.value)
    };

    const handleOfficeAddress2Change = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, officeAddress2: "" }));
        setOfficeAddress2(e.target.value);
    };

    const handleOfficeAddress3Change = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, officeAddress3: "" }));
        setOfficeAddress3(e.target.value);
    };

    const handleOfficeAddress4Change = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, officeAddress4: "" }));
        setOfficeAddress4(e.target.value);
    };




    const handleCityChange = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, city: "" }));
        setCity(e.target.value);
    };
    const handleStateChange = (e) => setOfficeState(e.target.value);
    const handleCountryChange = (e) => setCountry(e.target.value);
    const handlePostalCodeChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value)) {
            setPostalCode(value);
        }
        if (formErrors.postalCode && /^\d+$/.test(value)) {
            setFormErrors((prevErrors) => ({ ...prevErrors, postalCode: "" }));
        }
    };
    const handleLandmarkChange = (e) => setLandmark(e.target.value);

    const handleGoogleMapChange = (e) => setGoogleMap(e.target.value);

    const handleShippingAddress1Change = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, shippingAddress1: "" }));
        setShippingAddress1(e.target.value)
    };


    const handleShippingAddress2Change = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, shippingAddress2: "" }));
        setShippingAddress2(e.target.value);
    };

    const handleShippingAddress3Change = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, shippingAddress3: "" }));
        setShippingAddress3(e.target.value);
    };

    const handleShippingAddress4Change = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, shippingAddress4: "" }));
        setShippingAddress4(e.target.value);
    };


    const handleShippingCity = (e) => {
        setFormErrors((prevErrors) => ({ ...prevErrors, shippingCity: "" }));
        setShippingCity(e.target.value);
    }
    const handleShippingState = (e) => setShippingState(e.target.value);
    const handleShippingCountry = (e) => setShippingCountry(e.target.value);
    const handleShippingPostalCodeChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,10}$/.test(value)) {
            setShippingPostalCode(value);
            if (formErrors.shippingPostalCode && /^\d+$/.test(value)) {
                setFormErrors((prevErrors) => ({ ...prevErrors, shippingPostalCode: "" }));
            }
        }
    };
    const handleShippingLandmarkChange = (e) => setShippingLandmark(e.target.value);
    const handleShippingGoogleMapChange = (e) => setShippingGoogleMap(e.target.value);

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
        if (!postalCode.trim()) errors.postalCode = "Postal Code is required";

        if (!shippingAddress1.trim()) errors.shippingAddress1 = "Shipping Address is required";
        if (!shippingCity.trim()) errors.shippingCity = "City is required";
        if (!shippingPostalCode.trim()) errors.shippingPostalCode = "Postal Code is required";
        setFormErrors(errors);
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
        if (state.Common.successCode === 200) {
            setBusinessName('');
            setContactPerson('');
            setContactNumber('');
            setEmail('');
            setDesignation('');
            setGstVat('');
            setAdditionalContacts([]);
            dispatch({ type: VENDOR_SAGA, payload: { searchKeyword: "jos" } })
            setTimeout(() => {
                dispatch({ type: RESET_VENDOR_ID })
            }, 6000)
        }

    }, [state.Common.successCode])


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
        if (state.Common?.IsVisible === 1) {
            navigate('/vendor')
        }

    }, [state.Common?.IsVisible])









    // Address Info save & exit

    


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




    useEffect(() => {
        if (state.Common.successCode === 200) {
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
            //   dispatch({ type: VENDOR_SAGA, payload: { searchKeyword: "jos" } })
            dispatch({ type: RESET_CODE });
            dispatch({ type: RESET_VENDOR_ID })
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




    //   useEffect(() => {
    //     if (props.addressDetails && props.addressDetails.address) {
    //       const officeAddress = props.addressDetails.address.find(addr => addr.addressType === "Office Address") || {};
    //       const shippingAddress = props.addressDetails.address.find(addr => addr.addressType === "Shipping Address") || {};

    //       setOfficeAddress1(officeAddress.doorNo || "");
    //       setOfficeAddress2(officeAddress.street || "");
    //       setOfficeAddress3(officeAddress.locality || "");
    //       setOfficeAddress4(officeAddress.address4 || "");
    //       setCity(officeAddress.city || "");
    //       setOfficeState(officeAddress.state || "");
    //       setCountry(officeAddress.country || "");
    //       setPostalCode(officeAddress.postalCode || "");
    //       setLandmark(officeAddress.landMark || "");
    //       setGoogleMap(officeAddress.mapLink || "");


    //       setShippingAddress1(shippingAddress.doorNo || "");
    //       setShippingAddress2(shippingAddress.street || "");
    //       setShippingAddress3(shippingAddress.locality || "");
    //       setShippingAddress4(shippingAddress.address4 || "");
    //       setShippingCity(shippingAddress.city || "");
    //       setShippingState(shippingAddress.state || "");
    //       setShippingCountry(shippingAddress.country || "");
    //       setShippingPostalCode(shippingAddress.postalCode || "");
    //       setShippingLandmark(shippingAddress.landMark || "");
    //       setShippingGoogleMap(shippingAddress.mapLink || "");
    //     }
    //   }, [props.addressDetails]);





    return (
        <div className="bg-blueGray-100  w-full">
            <div className="p-2 sm:p-2 md:p-2 lg:p-4 relative">
                <div className="flex items-center justify-between pe-12 mb-4">
                    <h3 className="font-semibold text-xl font-Gilroy">{vendorDetails ? 'Edit Vendor' : 'Add Vendor'}</h3>
                </div>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                        <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
                    </div>
                )}

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

                {formErrors.general && (
                    <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                        <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.general}
                    </p>
                )}

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
                                        <div className="flex">
                                            <select
                                                value={surName}
                                                onChange={handleSurNameChange}
                                                className="px-3 py-3 border border-r-0 rounded-tr-none rounded-br-none rounded-tl-xl rounded-bl-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-500 w-[100px]"
                                            >
                                                <option value="" >Select</option>
                                                {state.settings?.titles?.map((title) => (
                                                    <option key={title.id} value={title.id}>
                                                        {title.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <input
                                                id="contactPerson"
                                                value={contactPerson}
                                                onChange={handleContactPersonChange}
                                                type="text"
                                                placeholder="Enter Contact Person Name"
                                                className="px-3 py-3 border w-full border-l-0 rounded-tl-none rounded-bl-none rounded-tr-xl rounded-br-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800"
                                            />
                                        </div>

                                        {formErrors.contactPerson && (
                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.contactPerson} </p>)}
                                    </div>


                                    <div >
                                        <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Contact  Number<span className='text-red-500'>*</span> </label>

                                        <div className="flex">
                                            <select
                                                value={countryCode}
                                                onChange={handleCountryCodeChange}
                                                className="px-3 py-3 border border-r-0 rounded-tr-none rounded-br-none rounded-tl-xl rounded-bl-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-500 w-[100px]"
                                            >
                                                <option value="">Select</option>
                                                {state.settings?.countryCode?.map((item) => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.phone}
                                                    </option>
                                                ))}

                                            </select>

                                            <input
                                                type='text'
                                                value={contactNumber}
                                                onChange={handleContactNumberChange}
                                                placeholder='Enter Contact  Number'
                                                className='w-full px-3 py-3 border border-l-0 rounded-tl-none rounded-bl-none rounded-tr-xl rounded-br-xl  focus:outline-none   font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                        </div>
                                        {
                                            formErrors.countryCode && formErrors.contactNumber ? (
                                                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> Country Code and Contact Number are required
                                                </p>
                                            ) : formErrors.countryCode ? (
                                                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.countryCode}
                                                </p>
                                            ) : formErrors.contactNumber ? (
                                                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.contactNumber}
                                                </p>
                                            ) : null
                                        }

                                    </div>
                                    <div >
                                        <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Email ID <span className='text-red-500'>*</span> </label>
                                        <input

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
                                                        Contact Person Name<span className="text-red-500 ">*</span>
                                                    </label>
                                                    <div className="flex">
                                                        <select
                                                            value={contact.surName}
                                                            onChange={(e) => handleAdditionalContactChange(index, "surName", e.target.value)}
                                                            className="px-3 py-3 border border-r-0 rounded-tr-none rounded-br-none rounded-tl-xl rounded-bl-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-500 w-[100px]"
                                                        >
                                                            <option value="" className="font-Gilroy text-neutral-800 " >Select</option>
                                                            {state.settings?.titles?.map((title) => (
                                                                <option key={title.id} value={title.id}>
                                                                    {title.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        <input
                                                            type="text"
                                                            value={contact.name}
                                                            onChange={(e) => handleAdditionalContactChange(index, "name", e.target.value)}
                                                            placeholder="Enter Contact Person Name"
                                                            className="px-3 py-3 w-full  border-l-0 rounded-tl-none rounded-bl-none rounded-tr-xl rounded-br-xl  font-Gilroy border  focus:outline-none"
                                                        />
                                                    </div>

                                                    {
                                                        formErrors[`additionalName${index}`] && formErrors[`additionalSurName${index}`] ? (
                                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                                <span><InfoCircle size="14" color="#DC2626" /></span> Title and Name are required
                                                            </p>
                                                        ) : formErrors[`additionalName${index}`] ? (
                                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                                <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors[`additionalName${index}`]}
                                                            </p>
                                                        ) : formErrors[`additionalSurName${index}`] ? (
                                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                                <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors[`additionalSurName${index}`]}
                                                            </p>
                                                        ) : null
                                                    }

                                                </div>

                                                <div>
                                                    <label className="block mb-2 text-neutral-800 font-medium font-Gilroy">
                                                        Contact Number <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="flex">
                                                        <select
                                                            value={contact.countryCode}
                                                            onChange={(e) => handleAdditionalContactChange(index, "countryCode", e.target.value)}
                                                            className="px-3 py-3 border border-r-0 rounded-tr-none rounded-br-none rounded-tl-xl rounded-bl-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-500 w-[100px]"
                                                        >
                                                            <option value="">Select</option>
                                                            {state.settings?.countryCode?.map((item) => (
                                                                <option key={item.id} value={item.id}>
                                                                    {item.phone}
                                                                </option>
                                                            ))}

                                                        </select>

                                                        <input
                                                            type="text"
                                                            value={contact.contactNumber}
                                                            onChange={(e) => handleAdditionalContactChange(index, "contactNumber", e.target.value)}
                                                            placeholder="Enter Contact Number"
                                                            className="px-3 py-3 font-Gilroy w-full border border-l-0 rounded-tl-none rounded-bl-none rounded-tr-xl rounded-br-xl rounded-xl focus:outline-none"
                                                        />
                                                    </div>
                                                    {
                                                        formErrors[`additionalContactNumber${index}`] && formErrors[`additionalCountryCode${index}`] ? (
                                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                                <span><InfoCircle size="14" color="#DC2626" /></span> Country Code and Contact Number are required
                                                            </p>
                                                        ) : formErrors[`additionalContactNumber${index}`] ? (
                                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                                <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors[`additionalContactNumber${index}`]}
                                                            </p>
                                                        ) : formErrors[`additionalCountryCode${index}`] ? (
                                                            <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                                <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors[`additionalCountryCode${index}`]}
                                                            </p>
                                                        ) : null
                                                    }

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
                            <div className="flex flex-col xs:flex-row sm:flex-row justify-end gap-2 sm:gap-4">
                                <button
                                    type="button"
                                    className="w-full sm:w-auto font-medium font-Montserrat px-4 py-2 border border-[#205DA8] text-[#205DA8] rounded-lg shadow-md hover:bg-[#205DA8] hover:text-white transition"
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
                    {activeTab === 2 && <div>


                        <div>
                            <div className='bg-white rounded-2xl h-auto  relative'>


                                <h2 className="text-xl font-semibold mb-4 font-Gilroy text-black">Address Information</h2>
                                <div className='max-h-[250px] overflow-y-auto  
                                                  lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3'>
                                    <h4 className="text-base font-medium mb-4 font-Gilroy text-black">Office Address </h4>
                                    <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3'>

                                        <div className='mb-2 items-center '>
                                            <input
                                                type='text'
                                                value={officeAddress1}
                                                onChange={handleOfficeAddress1Change}
                                                placeholder='Enter Address Line 1'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {formErrors.officeAddress1 && (
                                                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.officeAddress1} </p>)}
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
                                                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.officeAddress2}
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
                                                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.officeAddress3}
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
                                                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.officeAddress4}
                                                </p>
                                            )}
                                        </div>



                                        <div className='mb-2  items-center'>
                                            <input
                                                id='clientId'
                                                type='text'
                                                value={city}
                                                onChange={handleCityChange}
                                                placeholder='Enter City'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {formErrors.city && (
                                                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.city} </p>)}
                                        </div>
                                        <div className='mb-2 items-center'>

                                            <select
                                                id='state'
                                                value={officeState}
                                                onChange={handleStateChange}
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            >
                                                <option value="">Select State</option>
                                                <option value="Tamil Nadu">Tamil Nadu</option>
                                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                <option value="Assam">Assam</option>
                                                <option value="Bihar">Bihar</option>
                                                <option value="Chhattisgarh">Chhattisgarh</option>

                                            </select>

                                        </div>

                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Country</label>

                                            <select
                                                id='country'
                                                value={country}
                                                onChange={handleCountryChange}
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            >
                                                <option value="">Select Country</option>
                                                <option value="India">India</option>
                                                <option value="United States">United States</option>
                                                <option value="Canada">Canada</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="Australia">Australia</option>

                                            </select>

                                        </div>



                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Postal Code <span className='text-red-500'>*</span></label>
                                            <input
                                                id='clientId'
                                                type='text'
                                                value={postalCode}
                                                onChange={handlePostalCodeChange}
                                                placeholder='Enter Postal Code'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {formErrors.postalCode && (
                                                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.postalCode} </p>)}
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
                                                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.landmark} </p>)}
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


                                        <div className='mb-2 items-center '>
                                            <input
                                                id='clientId'
                                                type='text'
                                                value={shippingAddress1}
                                                onChange={handleShippingAddress1Change}
                                                placeholder='Enter Address Line '
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />

                                            {formErrors.shippingAddress1 && (
                                                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.shippingAddress1} </p>)}


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
                                                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.shippingAddress2}
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
                                        <div className='mb-2  items-center'>
                                            <input
                                                id='clientId'
                                                type='text'
                                                value={shippingCity}
                                                onChange={handleShippingCity}
                                                placeholder='Enter City'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {formErrors.shippingCity && (
                                                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.shippingCity} </p>)}
                                        </div>
                                        <div className='mb-2 items-center'>
                                            <select
                                                id='shippingState'
                                                value={shippingState}
                                                onChange={handleShippingState}
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            >
                                                <option value="">Select State</option>
                                                <option value="Tamil Nadu">Tamil Nadu</option>
                                                <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                <option value="Assam">Assam</option>
                                                <option value="Bihar">Bihar</option>
                                                <option value="Chhattisgarh">Chhattisgarh</option>
                                            </select>

                                        </div>

                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Country </label>

                                            <select
                                                id='shippingCountry'
                                                value={shippingCountry}
                                                onChange={handleShippingCountry}
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            >
                                                <option value="">Select Country</option>
                                                <option value="India">India</option>
                                                <option value="United States">United States</option>
                                                <option value="Canada">Canada</option>
                                                <option value="United Kingdom">United Kingdom</option>
                                                <option value="Australia">Australia</option>

                                            </select>

                                        </div>


                                        {/* </div>
                        
                                  <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3'> */}
                                        <div className='mb-2 items-center'>
                                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Postal Code <span className='text-red-500'>*</span></label>
                                            <input
                                                id='clientId'
                                                type='text'
                                                value={shippingPostalCode}
                                                onChange={handleShippingPostalCodeChange}
                                                placeholder='Enter Postal Code'
                                                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                            />
                                            {formErrors.shippingPostalCode && (
                                                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                                                    <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.shippingPostalCode} </p>)}
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
                                <div className="flex flex-col xs:flex-row sm:flex-row  justify-between mb-2 mt-4">
                                    <button
                                        onClick={handleBackToBasic}
                                        className="px-10 py-2 bg-slate-400 rounded-lg text-white font-Montserrat  text-base font-semibold font-Montserrat"

                                    >
                                        Back
                                    </button>

                                    <div className="flex flex-col xs:flex-row sm:flex-row justify-end gap-2 sm:gap-4">

                                        {
                                            vendorDetails && <button
                                                type="button"
                                                className="w-full sm:w-auto px-4 font-Montserrat font-medium py-2 border border-[#205DA8] text-[#205DA8] rounded-lg shadow-md hover:bg-[#205DA8] hover:text-white transition"
                                                onClick={handleSaveClickAddress} >
                                                Save & Exit
                                            </button>
                                        }

                                        <button
                                            className="px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat  text-base font-medium  font-Montserrat"
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
                    {activeTab === 3 && <div><BankVendor hanldeBackToAddress={handleBackToAddress} basicDetails={basicDetails}  vendorDetail={vendorDetails} addressDetails={addressDetails} contactPerson={contactPerson} addressInfo={addressInfo} /></div>}
                </div>
            </div>
        </div>
    );
}

export default BasicVendor;
