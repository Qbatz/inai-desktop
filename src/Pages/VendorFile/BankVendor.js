/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line react/prop-types
import React, { useState, useEffect } from 'react'
import { InfoCircle } from "iconsax-react";
import { useDispatch, useSelector } from 'react-redux';
import { RESET_VENDOR_ID, RESET_CODE, CREATE_VENDOR_SAGA, VENDOR_SAGA, EDIT_VENDOR_SAGA } from '../../Utils/Constant'
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function BankVendor(props) {



  const dispatch = useDispatch();
  const state = useSelector(state => state)
  const navigate = useNavigate()


  const [loading, setLoading] = useState(false)
  const [beneficiaryName, setBeneficiaryName] = useState(props?.basicDetails?.contactPersonName);
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
  const [formErrors, setFormErrors] = useState({});
  const [rountingBankAddress, setRountingBankAddress] = useState('')
  const [initialEditData, setInitialEditData] = useState(null);


  const handleBeneficiaryNameChange = (e) => {
    clearError("beneficiaryName");
    setBeneficiaryName(e.target.value)
  }


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
    clearError("ifscCode");
    setIfscCode(e.target.value)
  };

  const handleSwiftChange = (e) => {
    setSwift(e.target.value)
    clearError("swift");
  }



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
    setSiftCode(e.target.value);
    clearError("siftCode");
  };

  const handleIntermediaryDetailsChange = (e) => {
    setIntermediaryDetails(e.target.value);
    clearError("intermediaryDetails");
  };

  const handleIbanChange = (e) => {
    setIban(e.target.value);
    clearError("iban");
  };

  const validateForm = () => {
    let errors = {};

    if (!beneficiaryName) errors.beneficiaryName = 'Beneficiary Name is required';
    if (!beneficiaryCurrency) errors.beneficiaryCurrency = 'Beneficiary Currency is required';
    if (!accountNumber) errors.accountNumber = 'Account Number is required';
    if (accountNumber && !/^\d{9,18}$/.test(accountNumber)) {
      errors.accountNumber = 'Account Number must be 9-18 digits';
    }

    if (!bankName) errors.bankName = 'Bank Name is required';
    if (!ifscCode) errors.ifscCode = 'IFSC Code is required';
    if (!bankAddress) errors.bankAddress = 'BankAddress is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };






  const clearError = (field) => {
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: "" });
    }
  };


  const hanldeBackToAddress = () => {
    
    const bankDetails = {
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

    props.hanldeBackToAddress(2,bankDetails)
  }







  const isDataChanged = () => {
    if (!initialEditData) return true;
    const addresses = props?.addressInfo?.address || [];
    const officeAddress = addresses[0] || {};
    const shippingAddress = addresses[1] || {};

    const currentData = {
      businessName: props?.basicDetails?.businessName || "",
      contactPersonName: props?.basicDetails?.contactPersonName || "",
      contactNumber: props?.basicDetails?.contactNumber || "",
      emailId: props?.basicDetails?.emailId || "",
      designation: props?.basicDetails?.designation || "",
      title: props?.basicDetails?.title,
      country_code: props?.basicDetails?.country_code,
      gstvat: props?.basicDetails?.gstvat || "",
      additionalContactInfo: props?.basicDetails?.additionalContactInfo || [],
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
    if (validateForm()) {
      const addresses = props?.addressInfo?.address || [];

      const officeAddress = addresses[0] || {};
      const shippingAddress = addresses[1] || {};


      if (props.vendorDetail && !isDataChanged()) {
        setFormErrors({ general: "No changes detected" });
        return;
      }

      const AddPayload = {
        vendor_details: {
          basic_info: {
            businessName: props?.basicDetails?.businessName || "",
            contactPersonName: props?.basicDetails?.contactPersonName || "",
            contactNumber: props?.basicDetails?.contactNumber || "",
            emailId: props?.basicDetails?.emailId || "",
            designation: props?.basicDetails?.designation || "",
            title: props?.basicDetails?.title,
            country_code: props?.basicDetails.country_code,
            gstvat: props?.basicDetails?.gstvat || ""
          },
          additionalContactInfo: props?.basicDetails?.additionalContactInfo || [],

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
        vendor_id: props?.vendorDetail?.vendorId || "",
        businessName: props?.basicDetails?.businessName || "",
        contactPersonName: props?.basicDetails?.contactPersonName || "",
        contactNumber: props?.basicDetails?.contactNumber || "",
        emailId: props?.basicDetails?.emailId || "",
        designation: props?.basicDetails?.designation || "",
        title: props?.basicDetails?.title,
        country_code: props?.basicDetails?.country_code,
        gstvat: props?.basicDetails?.gstvat || "",
        additionalContactInfo: props?.basicDetails?.additionalContactInfo || [],
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


      if (props.vendorDetail) {
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
      setIban("");
      dispatch({ type: VENDOR_SAGA  , payload: { searchKeyword: "" }})
      dispatch({ type: RESET_CODE });
      dispatch({ type: RESET_VENDOR_ID })
    }
  }, [state.Common.successCode]);


  useEffect(() => {
    if (state.Common?.successCode === 200 || state.Common?.code === 400 || state.Common?.code === 401 || state.Common?.code === 402) {
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: RESET_CODE })
      }, 5000)
    }
  }, [state.Common?.successCode, state.Common?.code]);

  useEffect(() => {
    if (state.Common.IsVisible === 1) {
      navigate('/vendor')
    }

  }, [state.Common.IsVisible])



  useEffect(() => {
    if (props.vendorDetail?.bankDetails?.length > 0) {
      const bank = props.vendorDetail.bankDetails[0];
      const addresses = props?.addressInfo?.address || [];


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
        businessName: props?.basicDetails?.businessName || "",
        contactPersonName: props?.basicDetails?.contactPersonName || "",
        contactNumber: props?.basicDetails?.contactNumber || "",
        emailId: props?.basicDetails?.emailId || "",
        designation: props?.basicDetails?.designation || "",
        title: props?.basicDetails?.title,
        country_code: props?.basicDetails?.country_code,
        gstvat: props?.basicDetails?.gstvat || "",
        additionalContactInfo: props?.basicDetails?.additionalContactInfo || [],
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
    }
  }, [props.vendorDetail]);







  useEffect(() => {
    if (props.addressDetails?.bank) {
      const bank = props.addressDetails?.bank;

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
    }
  }, [props.addressDetails]);



  return (
    <div>
      <div className='bg-white rounded-2xl h-auto relative'>

        <h2 className="text-xl font-semibold mb-4 font-Gilroy text-black">Bank Detail</h2>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
          </div>
        )}
        {formErrors.general && (
          <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2 mb-3">
            <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.general}
          </p>
        )}

        <div className='max-h-[250px] overflow-y-auto  
                          lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3'>
          <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-2'>


            <div className='mb-2 items-center'>
              <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>
                Beneficiary  Name<span className='text-red-500'>*</span>
              </label>

              <input
                id='clientId'
                type='text'
                value={props.vendorDetail ? beneficiaryName : props?.basicDetails?.contactPersonName}
                onChange={handleBeneficiaryNameChange}
                placeholder='Enter Beneficiary Name '
                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
              />

              {formErrors.beneficiaryName && (
                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                  <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.beneficiaryName} </p>)}
            </div>

            <div className='mb-2 items-center '>
              <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Beneficiary Currency<span className='text-red-500'>*</span></label>


              <select
                value={beneficiaryCurrency}
                onChange={handleBeneficiaryCurrency}
                className="w-full px-3 py-3 border rounded-xl focus:outline-none  capitalize font-Gilroy font-medium text-sm text-neutral-800" >
                <option value="">Select beneficiary currency</option>
                <option value="USD">USD</option>
                <option value="INR">INR</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>

              </select>

              {formErrors.beneficiaryCurrency && (
                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                  <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.beneficiaryCurrency} </p>)}

            </div>
            <div className='mb-2  items-center'>
              <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Beneficiary Account Number
                <span className='text-red-500'>*</span> </label>

              <input
                id='clientId'
                type='text'
                value={accountNumber}
                onChange={handleAccountNumberChange}
                placeholder='Enter Account Number'
                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
              />
              {formErrors.accountNumber && (
                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                  <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.accountNumber} </p>)}
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
                value={bankName}
                onChange={handleBankNameChange}
                placeholder='Enter Account Name'
                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
              />
              {formErrors.bankName && (
                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                  <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.bankName} </p>)}
            </div>

            <div className='mb-2 items-center'>
              <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>IFSC Code
                <span className='text-red-500'>*</span>
              </label>

              <input
                id='clientId'
                type='text'
                value={ifscCode}
                onChange={handleIfscCodeChange}
                placeholder='Enter IFSC Code'
                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
              />
              {formErrors.ifscCode && (
                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                  <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.ifscCode} </p>)}
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
                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                  <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.swift} </p>)}
            </div>

            <div className='mb-2 items-center'>
              <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bank Address 1         <span className='text-red-500'>*</span></label>

              <input
                id='clientId'
                type='text'
                value={bankAddress}
                onChange={handleBankAddressChange}
                placeholder='Enter Bank Address '
                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
              />

              {formErrors.bankAddress && (
                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                  <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.bankAddress} </p>)}

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

            <div className='mb-2 items-center'>
              <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>
                Bank Country
              </label>
              <select
                id='bankCountry'
                value={bankCountry}
                onChange={handleBankCountryChange}
                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
              >
                <option value="">Select Bank Country</option>
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>

              </select>
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
                placeholder='Enter SIFT Code for intermediary Bank'
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
        <div className="flex flex-col xs:flex-row sm:flex-row justify-between items-center mt-4 gap-3 sm:gap-0">

          <button className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-400 rounded-lg text-white font-semibold"
            onClick={hanldeBackToAddress}>

            Back
          </button>


          <div className="flex flex-col xs:flex-row sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-4 font-Montserrat font-medium py-2 border border-[#205DA8] text-[#205DA8] rounded-lg shadow-md bg-[#205DA8] text-white transition"
              onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>




      </div>
    </div>
  )
}

BankVendor.propTypes = {
  hanldeBackToAddress: PropTypes.func,
  basicDetails: PropTypes.object,
  vendorDetail: PropTypes.object,
  addressDetails: PropTypes.object,
  addressInfo:PropTypes.object,
  contactPerson:PropTypes.string

}

export default BankVendor