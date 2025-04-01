import React from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";

function CustomerDetails() {
    return (

        <div class="p-6 bg-white  min-h-screen rounded-2xl  ps-5 pt-3 pe-5">
            <h1 className="text-xl font-semibold mb-2 font-Gilroy text-black">Customer</h1>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

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
                                <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">Inai Technology</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Contact Person</p>
                                <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">Abishek Kumar</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Email</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>abishekkumar@gmail.comgggggggggggggggggggggggggggggggggggggg</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Mobile no.</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>+91 9876543210</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Designation</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>CEO</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">GST/VAT</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>+91 9876543210</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white p-4 rounded-xl shadow-sm border">
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
                                <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">Abishek Kumar</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Beneficiary Account Number</p>
                                <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">1548798</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Email</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>example@gmail.com</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">IFSC Code</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>IFSC2210</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Bank Address 1</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>IFSC2210</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Bank Country</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>IFSC2210</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Intermediary Routing Bank</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>IFSC2210</p>
                            </div>
                            <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Sift Code for intermediary Bank</p>
                                <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>IFSC2210</p>
                            </div>
                        </div>
                    </div>
                </div>



                <div class="bg-white p-4 rounded-xl shadow-sm border">
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
                    <div class="grid  gap-4">
                        <div>
                            <h3 class="text-base font-semibold mb-2 font-Gilroy text-black">Office Address</h3>
                            <div class="grid grid-cols-3  gap-4">
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Address Line 1</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">₹25,000</p>

                                </div>

                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Address Line 2</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">₹25,000</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Address Line 3</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">₹25,000</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Address Line 4</p>
                             <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">₹25,000</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Postal Code</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">45879</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Landmark</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">wofgjsijpojspo</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Google Map</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">https://maps.app.goo.gl/D26</p>

                                </div>
                            </div>
                        </div>

                        <hr className='mt-1 mb-[8px] border-1 border-[#E7E7E7] ' />
                        

                        <div>
                            <h3 class="text-base font-semibold mb-2 font-Gilroy text-black">Shipping Address</h3>
                            <div class="grid grid-cols-3  gap-4">
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Address Line 1</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">₹25,000</p>

                                </div>

                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Address Line 2</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">₹25,000</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Address Line 3</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">₹25,000</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Address Line 4</p>
                             <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">₹25,000</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Postal Code</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">45879</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Landmark</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">wofgjsijpojspo</p>

                                </div>
                                <div>
                                <p class="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">Google Map</p>
                            <p class="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">https://maps.app.goo.gl/D26</p>

                                </div>
                            </div>
                        </div>


                    </div>
                </div>





            </div>


        </div>

    )
}

export default CustomerDetails