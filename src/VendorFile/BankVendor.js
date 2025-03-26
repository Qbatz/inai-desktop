import React, { useState } from 'react'
import { InfoCircle } from "iconsax-react";

function BankVendor() {
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
  const [formErrors, setFormErrors] = useState({});
  const handleBeneficiaryNameChange = (e) => setBeneficiaryName(e.target.value);
  const handleAccountNumberChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setAccountNumber(value);
  };
  const handleBankNameChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) setBankName(value);
  };
  const handleBankBranchChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) setBankBarnch(value);
  };
  const handleIfscCodeChange = (e) => setIfscCode(e.target.value);
  const handleSwiftChange = (e) => setSwift(e.target.value);
  const handleAdCodeChange = (e) => setAdCode(e.target.value);
  const handleBankAddressChange = (e) => setBankAddress(e.target.value);
  const handleBankCountryChange = (e) => setBankCountry(e.target.value);
  const handleIntermediaryBankChange = (e) => {
    const value = e.target.value;
    if (/^[A-Za-z\s]*$/.test(value)) setIntermediaryBank(value);
  };
  const handleSiftCodeChange = (e) => setSiftCode(e.target.value);
  const handleIntermediaryDetailsChange = (e) => setIntermediaryDetails(e.target.value);
  const handleIbanChange = (e) => setIban(e.target.value);

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

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const payload = {
      beneficiaryName,
      accountNumber,
      bankName,
      bankBarnch,
      ifscCode,
      swift,
      adCode,
      bankAddress,
      bankCountry,
      intermediaryBank,
      siftCode,
      intermediaryDetails,
      iban,
    };

    console.log('Submitting payload:', payload);
    alert('Form submitted successfully!');
  };

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
              <option value="Bank of America">Bank of America</option>
              <option value="Chase Bank">Chase Bank</option>
              <option value="Wells Fargo">Wells Fargo</option>
              <option value="CitiBank">CitiBank</option>
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
          <div className='mb-2 items-center  '>
            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bank Barnch </label>
            <input
              id='clientId'
              type='text'
              value={bankBarnch}
              onChange={handleBankBranchChange}
              placeholder='Enter Bank Barnch'
              className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
            />

          </div>

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
          <div className='mb-2 items-center'>
            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>AD Code</label>

            <input
              id='clientId'
              type='text'
              value={adCode}
              onChange={handleAdCodeChange}
              placeholder='Enter AD Code'
              className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
            />
          </div>
          <div className='mb-2 items-center'>
            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bank Address</label>

            <input
              id='clientId'
              type='text'
              value={bankAddress}
              onChange={handleBankAddressChange}
              placeholder='Enter Bank Address '
              className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
            />
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

          <button className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-400 rounded-lg text-white font-semibold">
            Back
          </button>


          <div className="flex flex-col xs:flex-row sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2 border border-blue-800 text-blue-800 rounded-lg font-semibold">
              Save & Exit
            </button>
            <button className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-blue-800 text-white rounded-lg font-semibold"
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