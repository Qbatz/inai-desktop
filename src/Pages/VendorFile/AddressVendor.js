/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { InfoCircle } from "iconsax-react";
import { RESET_VENDOR_ID, VENDOR_ADDRESS_INFO_SAGA, RESET_CODE, VENDOR_SAGA } from '../../Utils/Constant';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";


function AddressVendor(props) {
  const dispatch = useDispatch();
  const stateData = useSelector(state => state)


  const navigate = useNavigate()





  const [officeAddress1, setOfficeAddress1] = useState("");
  const [officeAddress2, setOfficeAddress2] = useState('');
  const [officeAddress3, setOfficeAddress3] = useState('');
  const [officeAddress4, setOfficeAddress4] = useState('');
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [landmark, setLandmark] = useState("");
  const [googleMap, setGoogleMap] = useState("");
  const [formErrors, setFormErrors] = useState({});

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
  const [loading, setLoading] = useState(false)

  const handleBackToBasic = () => {
    props.handleBack(1)
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

    if (e.target.checked) {
      setShippingAddress1(officeAddress1);
      setShippingAddress2(officeAddress2);
      setShippingAddress3(officeAddress3);
      setShippingAddress4(officeAddress4);
      setShippingCity(city);
      setShippingState(state);
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








  const validateForm = () => {
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
    if (validateForm()) {
      const payloadData = {
        vendorId: stateData.vendor.vendorId,
        address: [
          {
            doorNo: officeAddress1,
            street: officeAddress2,
            locality: officeAddress3,
            address4: officeAddress4,
            city: city,
            state: state,
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

      props.handleNextToBank(3, payloadData)

    }

  };


  



  useEffect(()=>{
    if(sameAsOffice){
      setShippingAddress1(officeAddress1);
      setShippingAddress2(officeAddress2);
      setShippingAddress3(officeAddress3);
      setShippingAddress4(officeAddress4);
      setShippingCity(city);
      setShippingState(state);
      setShippingCountry(country);
      setShippingPostalCode(postalCode);
      setShippingLandmark(landmark);
      setShippingGoogleMap(googleMap);
    }else{
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

  },[officeAddress1,
    officeAddress2,
    officeAddress3,
    officeAddress4,
    city,
    state,
    country,
    postalCode,
    landmark,
    googleMap,])





    // useEffect(() => {
    //                const handler = setTimeout(() => {
    //       const payloadData = {
    //         vendorId: stateData.vendor.vendorId,
    //         address: [
    //           {
    //             doorNo: officeAddress1,
    //             street: officeAddress2,
    //             locality: officeAddress3,
    //             address4: officeAddress4,
    //             city: city,
    //             state: state,
    //             country: country,
    //             postalCode: postalCode,
    //             landMark: landmark,
    //             mapLink: googleMap,
    //             addressType: 1
    //           },
    //           {
    //             doorNo: shippingAddress1,
    //             street: shippingAddress2,
    //             locality: shippingAddress3,
    //             address4: shippingAddress4,
    //             city: shippingCity,
    //             state: shippingState,
    //             country: shippingCountry,
    //             postalCode: shippingPostalCode,
    //             landMark: shippingLandmark,
    //             mapLink: shippingGoogleMap,
    //             addressType: 2
    //           }
    //         ]
    //       };
    
    //       if (payloadData.address.length > 0) {
    //         dispatch(StoreAddressData(payloadData));
    //       }
    //     }, 500);
    
    //     return () => {
    //       clearTimeout(handler);
    //     };
     
    // }, [
    //   officeAddress1,
    //   officeAddress2,
    //   officeAddress3,
    //   officeAddress4,
    //   city,
    //   state,
    //   country,
    //   postalCode,
    //   landmark,
    //   googleMap,
    //   shippingAddress1,
    //   shippingAddress2,
    //   shippingAddress3,
    //   shippingAddress4,
    //   shippingCity,
    //   shippingState,
    //   shippingCountry,
    //   shippingPostalCode,
    //   shippingLandmark,
    //   shippingGoogleMap,
    // ]);
    
  










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




  const handleSaveClick = () => {
    if (validateForm()) {

      if (props.vendorDetails) {


        const payload = {
          vendorId: props.vendorDetails?.vendorId || "",
          address: [
            {
              doorNo: officeAddress1,
              street: officeAddress2,
              locality: officeAddress3,
              address4: officeAddress4,
              city: city,
              state: state,
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


        dispatch({
          type: VENDOR_ADDRESS_INFO_SAGA,
          payload: payload
        });


        setLoading(true)
      } else {

      }

    }
  }

  useEffect(() => {
    if (stateData.Common.successCode === 200) {
      setOfficeAddress1("");
      setOfficeAddress2("");
      setOfficeAddress3("");
      setCity("");
      setState("");
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
      dispatch({ type: VENDOR_SAGA, payload: { searchKeyword: "jos" } })
      dispatch({ type: RESET_CODE });
      dispatch({ type: RESET_VENDOR_ID })
    }
  }, [stateData.Common.successCode]);

  useEffect(() => {
    if (props.vendorDetails && props.vendorDetails.address) {
      const officeAddress = props.vendorDetails.address.find(addr => addr.addressType ===  "Office Address") || {};
      const shippingAddress = props.vendorDetails.address.find(addr => addr.addressType === "Shipping Address") || {};

      setOfficeAddress1(officeAddress.doorNo || "");
      setOfficeAddress2(officeAddress.street || "");
      setOfficeAddress3(officeAddress.locality || "");
      setOfficeAddress4(officeAddress.address4 || "");
      setCity(officeAddress.city || "");
      setState(officeAddress.state || "");
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
  }, [props.vendorDetails]);




  useEffect(() => {
    if (props.addressDetails && props.addressDetails.address) {
      const officeAddress = props.addressDetails.address.find(addr => addr.addressType === "Office Address") || {};
      const shippingAddress = props.addressDetails.address.find(addr => addr.addressType === "Shipping Address") || {};

      setOfficeAddress1(officeAddress.doorNo || "");
      setOfficeAddress2(officeAddress.street || "");
      setOfficeAddress3(officeAddress.locality || "");
      setOfficeAddress4(officeAddress.address4 || "");
      setCity(officeAddress.city || "");
      setState(officeAddress.state || "");
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
  }, [props.addressDetails]);




  return (
    <div>
      <div className='bg-white rounded-2xl h-auto  relative'>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
            <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
          </div>
        )}
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
                value={state}
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
              <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Country <span className='text-red-500'>*</span></label>

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


            {/* </div>
          <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3'> */}
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
                <option value="United States">United States</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="India">India</option>
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
              props.vendorDetails && <button
                type="button"
                className="w-full sm:w-auto px-4 font-Montserrat font-medium py-2 border border-[#205DA8] text-[#205DA8] rounded-lg shadow-md hover:bg-[#205DA8] hover:text-white transition"
                onClick={handleSaveClick} >
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
  )
}

export default AddressVendor