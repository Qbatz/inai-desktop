import React, { useState, useEffect } from 'react'
import { InfoCircle } from "iconsax-react";
import { useDispatch, useSelector } from 'react-redux';
import { RESET_VENDOR_ID,VENDOR_BANK_INFO_SAGA, RESET_CODE, CREATE_VENDOR_SAGA, VENDOR_SAGA,EDIT_VENDOR_SAGA } from '../../Utils/Constant'


function BankVendor(props) {



  const dispatch = useDispatch();
  const state = useSelector(state => state)
  console.log("state", state)
  console.log("basicDetails", props.basicDetails, "payload", props.payload)




  const [beneficiaryName, setBeneficiaryName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankBarnch, setBankBarnch] = useState('');
  const [ifscCode, setIfscCode] = useState("");
  const [swift, setSwift] = useState("");
  const [adCode, setAdCode] = useState("");
  const [bankAddress, setBankAddress] = useState("");
  const [bankCountry, setBankCountry] = useState("");
  const [intermediaryBank, setIntermediaryBank] = useState("");
  const [siftCode, setSiftCode] = useState("");
  const [intermediaryDetails, setIntermediaryDetails] = useState("");
  const [iban, setIban] = useState('');
  const [bankAddress2, setBankAddress2] = useState('');
  const [bankAddress3, setBankAddress3] = useState('');
  const [formErrors, setFormErrors] = useState({});




  const handleBeneficiaryNameChange = (e) => {
    clearError("beneficiaryName");
    setBeneficiaryName(e.target.value)
  }
    ;

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

  const handleBankBranchChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) {
      setBankBarnch(value);
      clearError("bankBranch");
    }
  };

  const handleIfscCodeChange = (e) => {
    clearError("ifscCode");
    setIfscCode(e.target.value)
  };

  const handleSwiftChange = (e) => {
    setSwift(e.target.value)
    clearError("siftCode");
  }

  const handleAdCodeChange = (e) => {
    setAdCode(e.target.value)
    clearError("adCode");
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
    if (!accountNumber) errors.accountNumber = 'Account Number is required';
    if (accountNumber && !/^\d{9,18}$/.test(accountNumber)) {
      errors.accountNumber = 'Account Number must be 9-18 digits';
    }
    if (!bankName) errors.bankName = 'Bank Name is required';
    if (!ifscCode) errors.ifscCode = 'IFSC Code is required';
    if (!swift) errors.swift = 'SWIFT Code is required';
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
    props.hanldeBackToAddress(2)
  }





console.log("props",props)


  const handleSubmit = () => {
    if (validateForm()) {
      const addresses = props?.payload?.address || [];
      const AddPayload = {
        vendor_details: {
          basic_info: {
            businessName: props?.basicDetails?.businessName || "",
            contactPersonName: props?.basicDetails?.contactPersonName || "",
            contactNumber: props?.basicDetails?.contactNumber || "",
            emailId: props?.basicDetails?.emailId || "",
            designation: props?.basicDetails?.designation || "",
            gstvat: props?.basicDetails?.gstvat || ""
          },
          additionalContactInfo: props?.basicDetails?.additionalContactInfo || [],

          address_info: [
            {
              doorNo: addresses[0]?.doorNo || "",
              street: addresses[0]?.street || "",
              locality: addresses[0]?.locality || "",
              city: addresses[0]?.city || "",
              postalCode: addresses[0]?.postalCode || "",
              landMark: addresses[0]?.landMark || "",
              mapLink: addresses[0]?.mapLink || "",
              addressType: addresses[0]?.addressType || 1
            },
            {
              doorNo: addresses[1]?.doorNo || "",
              street: addresses[1]?.street || "",
              locality: addresses[1]?.locality || "",
              city: addresses[1]?.city || "",
              postalCode: addresses[1]?.postalCode || "",
              landMark: addresses[1]?.landMark || "",
              mapLink: addresses[1]?.mapLink || "",
              addressType: addresses[1]?.addressType || 2
            }
          ],

          bankDetails: {
            name: beneficiaryName,
            accountNo: accountNumber,
            bankName: bankName,
            ifscCode: ifscCode,
            address1: bankAddress,
            address2: bankAddress2,
            address3: bankAddress3,
            country: bankCountry,
            routingBank: intermediaryBank,
            swiftCode: swift,
            routingBankAddress: intermediaryDetails,
            routingAccountIndusand: iban
          }
        }
      };

      const EditPayload = {
        vendor_id: props?.vendorDetail?.vendorId || "",
        businessName: props?.basicDetails?.businessName || "",
        contactPersonName: props?.basicDetails?.contactPersonName || "",
        contactNumber: props?.basicDetails?.contactNumber || "",
        emailId: props?.basicDetails?.emailId || "",
        designation: props?.basicDetails?.designation || "",
        gstvat: props?.basicDetails?.gstvat || "",
        additionalContactInfo: props?.basicDetails?.additionalContactInfo || [],
        address: [
            {
                doorNo: addresses[0]?.doorNo || "",
                street: addresses[0]?.street || "",
                locality: addresses[0]?.locality || "",
                city: addresses[0]?.city || "",
                postalCode: addresses[0]?.postalCode || "",
                landMark: addresses[0]?.landMark || "",
                mapLink: addresses[0]?.mapLink || "",
                addressType: addresses[0]?.addressType || 1
            },
            {
                doorNo: addresses[1]?.doorNo || "",
                street: addresses[1]?.street || "",
                locality: addresses[1]?.locality || "",
                city: addresses[1]?.city || "",
                postalCode: addresses[1]?.postalCode || "",
                landMark: addresses[1]?.landMark || "",
                mapLink: addresses[1]?.mapLink || "",
                addressType: addresses[1]?.addressType || 2
            }
        ],
        bankDetails: [{
            name: beneficiaryName || "",
            accountNo: accountNumber || "",
            bankName: bankName || "",
            ifscCode: ifscCode || "",
            address1: bankAddress || "",
            address2: bankAddress2 || "",
            address3: bankAddress3 || "",
            country: bankCountry || "",
            routingBank: intermediaryBank || "",
            swiftCode: swift || "",
            routingBankAddress: intermediaryDetails || "",
            routingAccountIndusand: iban || ""
        }]
    }
    console.log("EditPayload",EditPayload)

if(props.vendorDetail){
  dispatch({
    type: EDIT_VENDOR_SAGA,
    payload: EditPayload
  });
}else{
  dispatch({
    type: CREATE_VENDOR_SAGA,
    payload: AddPayload
  });
}

    
    }
  };


  const handleSaveClick = () => {
    if (!validateForm()) return;
    dispatch({
      type: VENDOR_BANK_INFO_SAGA,
      payload: {
        vendorId: state.vendor.vendorId || props.payload?.vendorId || props?.vendorDetail?.vendorId || "",
        bankDetails: [
          {
            name: beneficiaryName,
            accountNo: accountNumber,
            bankName: bankName,
            ifscCode: ifscCode,
            address1: bankAddress,
            address2: bankAddress2,
            address3: bankAddress3,
            country: bankCountry,
            routingBank: intermediaryBank,
            swiftCode: swift,
            routingBankAddress: intermediaryDetails,
            routingAccountIndusand: iban
          }
        ]
      }
    });


  }



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
      dispatch({ type: VENDOR_SAGA, payload: { searchKeyword: "jos" } })
      dispatch({ type: RESET_CODE });
      dispatch({ type: RESET_VENDOR_ID})
    }
  }, [state.Common.successCode]);


 useEffect(() => {
  if (props.vendorDetail?.bankDetails?.length > 0) {
    const bank = props.vendorDetail.bankDetails[0];

    setBeneficiaryName(bank.name || "");
    setAccountNumber(bank.accountNo || "");
    setBankName(bank.bankName || "");
    setIfscCode(bank.ifscCode || "");
    setBankAddress(bank.address1 || "");
    setBankAddress2(bank.address2 || "");
    setBankAddress3(bank.address3 || "");
    setBankCountry(bank.country || "");
    setIntermediaryBank(bank.routingBank || "");
    setSwift(bank.swiftCode || "");
    setIntermediaryDetails(bank.routingBankAddress || "");
    setIban(bank.routingAccountIndusand || "");
}
  }, [props.vendorDetail]); 
  



  return (
    <div>
      <div className='bg-white rounded-2xl h-auto'>

        <h2 className="text-xl font-semibold mb-4 font-Gilroy text-black">Bank Detail</h2>




        <div className='max-h-[250px] overflow-y-auto  
                          lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3'>
          <div className='grid md:grid-cols-4 sm:grid-cols-2 gap-2'>


            <div className='mb-2 items-center'>
              <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>
                Beneficiary Currency Name<span className='text-red-500'>*</span>
              </label>
              <select
                id='beneficiaryName'
                value={beneficiaryName}
                onChange={handleBeneficiaryNameChange}
                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
              >
                <option value="">Select Beneficiary</option>
                <option value="USD">USD</option>
                <option value="INR">INR</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
              </select>
              {formErrors.beneficiaryName && (
                <p className="text-red-600 font-Gilroy font-medium text-sm flex items-center gap-1 pt-2">
                  <span><InfoCircle size="14" color="#DC2626" /></span> {formErrors.beneficiaryName} </p>)}
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
            {/* <div className='mb-2 items-center  '>
              <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bank Branch </label>
              <input
                id='clientId'
                type='text'
                value={bankBarnch}
                onChange={handleBankBranchChange}
                placeholder='Enter Bank Barnch'
                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
              />

            </div> */}

          </div>


          <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3'>
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
              <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>SWIFT Code
                <span className='text-red-500'>*</span>
              </label>

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
            {/* <div className='mb-2 items-center'>
              <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>AD Code</label>

              <input
                id='clientId'
                type='text'
                value={adCode}
                onChange={handleAdCodeChange}
                placeholder='Enter AD Code'
                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
              />
            </div> */}
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
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="India">India</option>
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
          </div>


          <div className='grid md:grid-cols-12 sm:grid-cols-2 gap-3'>
            <div className='mb-2 items-center col-span-4'>
              <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>SIFT Code for intermediary Bank</label>

              <input
                id='clientId'
                type='text'
                value={siftCode}
                onChange={handleSiftCodeChange}
                placeholder='Enter SIFT Code for intermediary Bank'
                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
              />
            </div>

            <div className='mb-2  items-center col-span-8'>
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



          </div>

          <div className='grid md:grid-cols-12 sm:grid-cols-2 gap-3'>
            <div className='mb-2  items-center col-span-8'>
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
            <button
              type="button"
              className="w-full sm:w-auto px-4 font-Montserrat font-medium py-2 border border-[#205DA8] text-[#205DA8] rounded-lg shadow-md hover:bg-[#205DA8] hover:text-white transition"
              onClick={handleSaveClick} >
              Save & Exit
            </button>
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

export default BankVendor