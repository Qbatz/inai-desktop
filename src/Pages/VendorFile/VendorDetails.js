/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import Dot from '../../Asset/Icon/Dot.svg'
import { useDispatch, useSelector } from 'react-redux';
import { VIEW_VENDOR_SAGA } from '../../Utils/Constant'
import { useParams } from 'react-router-dom';



function VendorDetails() {


  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const { vendorId } = useParams()

  useEffect(() => {
    dispatch({ type: VIEW_VENDOR_SAGA, payload: vendorId });
  }, []);



  const VendorList = state.vendor?.ParticularVendorList
    ? [state.vendor.ParticularVendorList]
    : [];



  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };


  return (
    <div className="bg-blueGray-100 min-h-screen w-full">
      <div className="p-3">
        <div className="p-6 bg-white rounded-2xl">
          <div className="flex p-2 justify-between">
            <h1 className="text-lg sm:text-xl md:text-xl lg:text-xl font-semibold font-Gilroy text-black">Vendor</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 p-2">
            {VendorList?.map((vendor, index) => (
              <>
                <div key={index} className="flex flex-col space-y-6">

                  <div className="p-6 rounded-lg border border-gray-300 relative bg-white">

                    <div className="absolute top-4 right-6 text-gray-500">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 cursor-pointer">
                        <img src={Dot} alt="Dot" className="w-4 h-4" />
                      </div>
                    </div>
                    <h2 className="text-base font-semibold font-Gilroy">Basic Information</h2>
                    <hr className="my-2" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 p-2">
                      <div>
                        <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Business Name</p>
                        <p className="font-semibold font-Gilroy text-sm pt-2">{vendor.businessName || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Contact Person</p>
                        <p className="font-semibold font-Gilroy text-sm pt-2">{vendor.title}.{vendor.contactPersonName || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Email</p>
                        <p className="font-semibold font-Gilroy text-sm pt-2">{vendor.emailId || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Mobile No.</p>
                        <p className="font-semibold font-Gilroy text-sm pt-2">+{vendor.country_code}{vendor.contactNumber || 'N/A'}</p>
                      </div>
                      <div>
                          <p className="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Designation</p>
                          <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>{vendor.designation}</p>
                        </div>
                      <div>
                        <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">GST/VAT</p>
                        <p className="font-semibold font-Gilroy text-sm pt-2">{vendor.gstvat || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-lg border border-gray-300 relative bg-white">
                    <div className="absolute top-4 right-6 text-gray-500">
                      <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 cursor-pointer">
                        <img src={Dot} alt="Dot" className="w-4 h-4" />
                      </div>
                    </div>
                    <h2 className="text-base font-semibold font-Gilroy">Bank Details</h2>
                    <hr className="my-2" />
                    <div >


                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 p-2" >
                        <div>
                          <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Beneficiary Customer Name</p>
                          <p className="font-semibold font-Gilroy text-sm pt-2">{vendor?.bankDetails?.[0]?.name || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Beneficiary Account Number</p>
                          <p className="font-semibold font-Gilroy text-sm pt-2">{vendor?.bankDetails?.[0]?.accountNo || 'N/A'}</p>
                        </div>

                        <div>
                          <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">IFSC Code</p>
                          <p className="font-semibold font-Gilroy text-sm pt-2">{vendor?.bankDetails?.[0]?.ifscCode || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Bank Address 1</p>
                          <p className="font-semibold font-Gilroy text-sm pt-2">{vendor?.bankDetails?.[0]?.address1 || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Bank Country</p>
                          <p className="font-semibold font-Gilroy text-sm pt-2">{vendor?.bankDetails?.[0]?.country || 'N/A'}</p>
                        </div>

                        <div>
                          <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Intermediary Routing Bank</p>
                          <p className="font-semibold font-Gilroy text-sm pt-2">{vendor?.bankDetails?.[0]?.routingBank || "N/A"}</p>
                        </div>
                        <div>
                          <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Swift Code for Intermediary Bank</p>
                          <p className="font-semibold font-Gilroy text-sm pt-2">{vendor?.bankDetails?.[0]?.intermediary_swift_code || 'N/A'}</p>
                        </div>
                      </div>



                    </div>
                  </div>
                </div>


                <div className="p-6 rounded-lg border border-gray-300 bg-white relative">
                  <div className="absolute top-4 right-6 text-gray-500">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 cursor-pointer">
                      <img src={Dot} alt="Dot" className="w-4 h-4" />
                    </div>
                  </div>
                  <h2 className="text-base font-semibold font-Gilroy">Address Information</h2>
                  <hr className="my-2" />


                  <div className="p-2 rounded-lg bg-white">
                    <h2 className="text-lg font-semibold mb-4 font-Gilroy">Office Address</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-2">
                      <div>
                        <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Address Line 1</p>
                        <p className="font-semibold font-Gilroy text-sm pt-2">{vendor.address?.[0]?.doorNo || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Address Line 2</p>
                        <p className="font-semibold font-Gilroy text-sm pt-2">{vendor.address?.[0]?.street || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Address Line 3</p>
                        <p className="font-semibold font-Gilroy text-sm pt-2">{vendor.address?.[0]?.locality || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Address Line 4</p>
                        <p className="font-semibold font-Gilroy text-sm pt-2">{vendor.address?.[0]?.address4 || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Postal Code</p>
                        <p className="font-semibold font-Gilroy text-sm pt-2">{vendor.address?.[0]?.postalCode || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">City</p>
                        <p className="font-semibold font-Gilroy text-sm pt-2">{vendor.address?.[0]?.city || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 p-2 w-full">
                      <div className="col-span-12 md:col-span-4">
                        <p className="text-gray-500 text-xs font-medium font-Gilroy">Landmark</p>
                        <p className="font-semibold text-sm pt-2 font-Gilroy">{vendor.address?.[0]?.landMark || 'N/A'}</p>
                      </div>
                      <div className="col-span-12 md:col-span-8 w-full">

                        <p className="text-gray-500 text-xs font-medium font-Gilroy">Google Map</p>
                        <div className="max-w-full sm:max-w-[500px] md:max-w-[900px] overflow-hidden">
                          {vendor.address && vendor.address.length > 0 && vendor.address[0].mapLink ? (
                            isValidUrl(vendor.address[0].mapLink) ? (
                              <a
                                href={vendor.address[0].mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm cursor-pointer font-semibold mb-2 font-Gilroy text-blue-500 underline block truncate"
                                title={vendor.address[0].mapLink}
                              >
                                {vendor.address[0].mapLink}
                              </a>
                            ) : (
                              <p
                                className="text-sm font-semibold mb-2 mt-1 font-Gilroy text-[#222222] truncate"
                                title={vendor.address[0].mapLink}
                              >
                                {vendor.address[0].mapLink}
                              </p>
                            )
                          ) : (
                            <p className="text-sm font-semibold mb-2 mt-1 font-Gilroy text-[#222222]">N/A</p>
                          )}
                        </div>




                      </div>
                    </div>
                  </div>


                  <div className="p-2 rounded-lg bg-white">
                    <h2 className="text-lg font-semibold mb-4 font-Gilroy">Shipping Address</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-2">
                      <div>
                        <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Address Line 1</p>
                        <p className="font-semibold font-Gilroy text-sm pt-2">{vendor.address?.[1]?.doorNo || 'N/A'}</p>
                      </div>
                     
                      <div>
                        <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Address Line 2</p>
                        <p className="font-semibold font-Gilroy text-sm pt-2">{vendor.address?.[2]?.street || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Address Line 3</p>
                        <p className="font-semibold font-Gilroy text-sm pt-2">{vendor.address?.[3]?.locality  || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Address Line 4</p>
                        <p className="font-semibold font-Gilroy text-sm pt-2">{vendor.address?.[4]?.address4 || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Postal Code</p>
                        <p className="font-semibold font-Gilroy text-sm pt-2">{vendor.address?.[1]?.postalCode || 'N/A'}</p>
                      </div>
                     
                      <div>
                        <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">City</p>
                        <p className="font-semibold font-Gilroy text-sm pt-2">{vendor.address?.[1]?.city || 'N/A'}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 gap-4 p-2 w-full">
                      <div className='col-span-12 md:col-span-4'>
                        <p className="text-gray-500 text-xs font-medium font-Gilroy">Landmark</p>
                        <p className="font-semibold text-sm pt-2 font-Gilroy">{vendor.address?.[1]?.landMark || 'N/A'}</p>
                      </div>
                      <div  className='col-span-12 md:col-span-8 w-full'>


                        <p className="text-gray-500 text-xs font-medium font-Gilroy">Google Map</p>
                        <div className="max-w-full sm:max-w-[600px] md:max-w-[600px] overflow-hidden">
                          {vendor.address && vendor.address.length > 1 && vendor.address[1].mapLink ? (
                            isValidUrl(vendor.address[1].mapLink) ? (
                              <a
                                href={vendor.address[1].mapLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm cursor-pointer font-semibold mb-2 font-Gilroy text-blue-500 underline block truncate"
                                title={vendor.address[1].mapLink}
                              >
                                {vendor.address[1].mapLink}
                              </a>
                            ) : (
                              <p className="text-sm font-semibold mb-2 mt-1 font-Gilroy text-[#222222] truncate" title={vendor.address[1].mapLink}>
                                {vendor.address[1].mapLink}
                              </p>
                            )
                          ) : (
                            <p className="text-sm font-semibold mb-2 mt-1 font-Gilroy text-[#222222]">N/A</p>
                          )}
                        </div>



                      </div>
                    </div>
                  </div>
                </div >

              </>
            ))}
          </div>
        </div>
      </div>
    </div >
  );




};

export default VendorDetails;