import React,{ useEffect }  from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { X } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { GET_CUSTOMER_DETAILS_SAGA } from '../../Utils/Constant'
import CustomerList from './CustomerList';

function CustomerDetails({particularCustomerDetails}) {

 


        const dispatch = useDispatch();
        const state = useSelector(state => state);

        console.log("state",state);
        

        const customerList = state.customer?. ParticularCustomerList || [];

        console.log("customerList",customerList);
        

        console.log("particularCustomerDetails state:", particularCustomerDetails);
    
        useEffect(() => {
            if (particularCustomerDetails) {
                dispatch({ type: GET_CUSTOMER_DETAILS_SAGA, payload: particularCustomerDetails });
            }
        }, [particularCustomerDetails, dispatch]);
        
    
    

    return (

        <div class="p-6 bg-white  min-h-screen rounded-2xl  ps-5 pt-3 pe-5">

            <h1 className="text-xl font-semibold mb-2 font-Gilroy text-black">Customer</h1>

            <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-2 p-2">
            {customerList.map((customer, index) => (
                <>

                <div className=''>


                    <div class="bg-white p-4 rounded-xl shadow-sm border mb-5">
                        <div className='flex items-center justify-between'>

                            <h2 class="text-base font-semibold mb-2 font-Gilroy text-black">Basic Information</h2>


                            <div className="px-2 py-2 rounded-full border border-zinc-100 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition duration-200">
                                <HiOutlineDotsVertical className="text-black p-0 " />
                                {/* {showPopup === item.id && (
                                    <div
                                        ref={popupRef}

                                        style={{
                                            position: "fixed",
                                            top: popupPosition.top,
                                            left: popupPosition.left,
                                            zIndex: 50,
                                        }}
                                        className="w-32 bg-slate-100 shadow-lg rounded-md z-50"

                                    >
                                        <div className="px-4 py-2 cursor-pointer  flex items-center gap-2 font-Gilroy" onClick={() => handleEditCustomer()}>
                                            <Edit size="16" color="#205DA8" /> Edit
                                        </div>
                                        <div className="px-4 py-2 cursor-pointer  flex items-center gap-2 font-Gilroy text-red-700" onClick={() => handleDeleteCustomerPopup()}>
                                            <Trash size="16" color="#B91C1C" /> Delete
                                        </div>
                                    </div>
                                )} */}
                            </div>

                        </div>

                        <hr className='mt-2 mb-[8px] border-1 border-[#E7E7E7] ' />
                        <div class="grid grid-cols-2 gap-4 text-sm text-gray-600">

                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Business Name *</p>
                                <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{customer.businessName}</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Contact Person</p>
                                <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{customer.contactPerson}</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Email</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>{customer.emailId}</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Mobile no.</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>{customer.contactNumber}</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Designation</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>{customer.designation}</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">GST/VAT</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>{customer.gstVat}</p>
                            </div>
                        </div>
                    </div>

                    <div class=" bg-white p-4 rounded-xl shadow-sm border">
                        <div className='flex items-center justify-between'>

                            <h2 class="text-base font-semibold mb-2 font-Gilroy text-black">Bank Details</h2>

                            <div className="px-2 py-2 rounded-full border border-zinc-100 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition duration-200">
                                <HiOutlineDotsVertical className="text-black p-0 " />
                                {/* {showPopup === item.id && (
                                    <div
                                        ref={popupRef}

                                        style={{
                                            position: "fixed",
                                            top: popupPosition.top,
                                            left: popupPosition.left,
                                            zIndex: 50,
                                        }}
                                        className="w-32 bg-slate-100 shadow-lg rounded-md z-50"

                                    >
                                        <div className="px-4 py-2 cursor-pointer  flex items-center gap-2 font-Gilroy" onClick={() => handleEditCustomer()}>
                                            <Edit size="16" color="#205DA8" /> Edit
                                        </div>
                                        <div className="px-4 py-2 cursor-pointer  flex items-center gap-2 font-Gilroy text-red-700" onClick={() => handleDeleteCustomerPopup()}>
                                            <Trash size="16" color="#B91C1C" /> Delete
                                        </div>
                                    </div>
                                )} */}
                            </div>
                        </div>

                        <hr className='mt-2 mb-[8px] border-1 border-[#E7E7E7] ' />
                        <div class="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Beneficiary Customer Name</p>
                                <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{customer.name}</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Beneficiary Account Number</p>
                                <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{customer.accountNo}</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Email</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>{customer.emailId}</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">IFSC Code</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>{customer.ifscCode}</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Bank Address 1</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>{customer.address1}</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Bank Country</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>{customer.country}</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Intermediary Routing Bank</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>{customer.routingBank}</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Sift Code for intermediary Bank</p>  
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>{customer.swiftCode}</p>
                            </div>
                        </div>
                    </div>
                </div>



                <div class=" bg-white p-4 rounded-xl shadow-sm border">
                    <div className='flex items-center justify-between'>

                        <h2 class="text-base font-semibold mb-2 font-Gilroy text-black">Address Information</h2>


                        <div className="px-2 py-2 rounded-full border border-zinc-100 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition duration-200">
                            <HiOutlineDotsVertical className="text-black p-0 " />
                            {/* {showPopup === item.id && (
                                    <div
                                        ref={popupRef}

                                        style={{
                                            position: "fixed",
                                            top: popupPosition.top,
                                            left: popupPosition.left,
                                            zIndex: 50,
                                        }}
                                        className="w-32 bg-slate-100 shadow-lg rounded-md z-50"

                                    >
                                        <div className="px-4 py-2 cursor-pointer  flex items-center gap-2 font-Gilroy" onClick={() => handleEditCustomer()}>
                                            <Edit size="16" color="#205DA8" /> Edit
                                        </div>
                                        <div className="px-4 py-2 cursor-pointer  flex items-center gap-2 font-Gilroy text-red-700" onClick={() => handleDeleteCustomerPopup()}>
                                            <Trash size="16" color="#B91C1C" /> Delete
                                        </div>
                                    </div>
                                )} */}
                        </div>
                    </div>

                    <hr className='mt-2 mb-[8px] border-1 border-[#E7E7E7] ' />
                    <div class="grid gap-4">
                        <div>
                            <h3 class="text-base font-semibold mb-2 font-Gilroy text-black">Office Address</h3>
                            <div class="grid grid-cols-3  gap-4">
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Address Line 1</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{customer.address?.[0]?.doorNo || 'N/A'}</p>
                           
                                </div>

                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Address Line 2</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{customer.address?.[0]?.landMark || 'N/A'}</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Address Line 3</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{customer.address3 || 'N/A'}</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Address Line 4</p>
                             <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{customer.address3 || 'N/A'}</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Postal Code</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{customer.address?.[0]?.postalCode || 'N/A'}</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Landmark</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{customer.address?.[0]?.landMark || 'N/A'}</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Google Map</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap"> {customer.address?.[0]?.mapLink || 'N/A'}</p>

                                </div>
                            </div>
                        </div>

                        <hr className='mt-1 mb-[8px] border-1 border-[#E7E7E7] ' />
                        

                        <div>
                            <h3 class="text-base font-semibold mb-2 font-Gilroy text-black">Shipping Address</h3>
                            <div class="grid grid-cols-3  gap-4">
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Address Line 1</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{customer.address?.[1]?.doorNo || 'N/A'}</p>

                                </div>

                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Address Line 2</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{customer.address?.[1]?.landMark || 'N/A'}</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Address Line 3</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{customer.address || 'N/A'}</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Address Line 4</p>
                             <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{customer.address || 'N/A'}</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Postal Code</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{customer.address?.[1]?.postalCode || 'N/A'}</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Landmark</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{customer.address?.[1]?.landMark || 'N/A'}</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Google Map</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap"> {customer.address?.[1]?.mapLink || 'N/A'}</p>

                                </div>
                            </div>
                        </div>


                    </div>
                </div>

                </>

                            ))}

            </div>


        </div>

    )

}

export default CustomerDetails