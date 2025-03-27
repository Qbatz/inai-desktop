import React, { useState } from 'react'
import { InfoCircle } from "iconsax-react";

function AddressVendor() {

  const [officeAddress1, setOfficeAddress1] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [googleMap, setGoogleMap] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const [shippingAddress1, setShippingAddress1] = useState("");
  const [shippingCity, setShippingCity] = useState("");
  const [shippingState, setShippingState] = useState("");
  const [shippingCountry, setShippingCountry] = useState("");
  const [shippingPostalCode, setShippingPostalCode] = useState("");
  const [shippingLandmark, setShippingLandmark] = useState("");
  const [shippingGoogleMap, setShippingGoogleMap] = useState("");
  const [sameAsOffice, setSameAsOffice] = useState(false);



  const handleOfficeAddress1Change = (e) => setOfficeAddress1(e.target.value);
  const handleCityChange = (e) => {
    setFormErrors((prevErrors) => ({ ...prevErrors, city: "" }));
    setCity(e.target.value);
  };
  const handleStateChange = (e) => setState(e.target.value);
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
  const handleShippingAddress1Change = (e) => setShippingAddress1(e.target.value);
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
  const handleCheckboxChange = () => setSameAsOffice(!sameAsOffice);

  const validateForm = () => {
    let errors = {};


    if (!city.trim()) errors.city = "City is required";

    if (!postalCode.trim()) errors.postalCode = "Postal Code is required";


    if (!shippingCity.trim()) errors.shippingCity = "City is required";

    if (!shippingPostalCode.trim()) errors.shippingPostalCode = "Postal Code is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      const payload = {
        officeAddress1,
        city,
        state,
        country,
        postalCode,
        landmark,
        googleMap,
        shippingAddress1,
        shippingCity,
        shippingState,
        shippingCountry,
        shippingPostalCode,
        shippingLandmark,
        shippingGoogleMap,
        sameAsOffice,
      };
      console.log("Form submitted successfully", payload);
    }
  };


  return (
    <div>
      <div className='bg-white rounded-2xl h-auto '>


        <h2 className="text-xl font-semibold mb-4 font-Gilroy text-black">Address Information</h2>
        <div className='max-h-[250px] overflow-y-auto  
                          lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3'>
          <h4 className="text-base font-medium mb-4 font-Gilroy text-black">Office Address </h4>
          <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3'>


            <div className='mb-2 items-center '>
              <input
                id='clientId'
                type='text'
                value={officeAddress1}
                onChange={handleOfficeAddress1Change}
                placeholder='Enter Address Line 1'
                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
              />

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
                value={state}
                onChange={handleStateChange}
                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
              >
                <option value="">Select State</option>
                <option value="California">California</option>
                <option value="Texas">Texas</option>
                <option value="New York">New York</option>
                <option value="Florida">Florida</option>
                <option value="Illinois">Illinois</option>
              </select>

            </div>

            <div className='mb-2 items-center'>

              <select
                id='country'
                value={country}
                onChange={handleCountryChange}
                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
              >
                <option value="">Select Country</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="India">India</option>
              </select>

            </div>


          </div>
          <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3'>
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
                <option value="California">California</option>
                <option value="Texas">Texas</option>
                <option value="New York">New York</option>
                <option value="Florida">Florida</option>
                <option value="Illinois">Illinois</option>
              </select>

            </div>

            <div className='mb-2 items-center'>
              <select
                id='shippingCountry'
                value={shippingCountry}
                onChange={handleShippingCountry}
                className='px-3 py-3 w-full border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
              >
                <option value="">Select Country</option>
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="India">India</option>
              </select>

            </div>


          </div>

          <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3'>
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
            className="px-10 py-2 bg-slate-400 rounded-lg text-white font-Montserrat  text-base font-semibold"

          >
            Back
          </button>

          <button
            className="px-10 py-2 bg-blue-800 rounded-lg text-white font-Montserrat  text-base font-semibold"
            onClick={handleNext}
          >
            Next
          </button>
        </div>


      </div>
    </div>
  )
}

export default AddressVendor