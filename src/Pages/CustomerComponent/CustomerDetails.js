/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { GET_CUSTOMER_DETAILS_SAGA } from '../../Utils/Constant'
import { useParams } from 'react-router-dom';

function CustomerDetails() {

    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const { customerId } = useParams()

    const customer = state.customer?.customerDetails || {};

    useEffect(() => {
        dispatch({ type: GET_CUSTOMER_DETAILS_SAGA, payload: customerId });
    }, []);


    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    

    return (
        <div className="bg-blueGray-100  w-full">
            <div className="p-3">

                <div className="p-6 bg-white max-h-fit overflow-y-auto rounded-2xl  ps-5 pt-3 pe-5 ">


                    <h1
                        className="sticky top-0 left-0 w-full text-xl font-semibold mb-2 font-Gilroy text-black bg-white z-50 p-3"
                    >
                        Customer
                    </h1>


                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-12 p-2 lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3  max-h-[440px] overflow-y-auto ">

                        <>

                            <div className=''>


                                <div className="bg-white p-4 rounded-xl shadow-sm border mb-5 ">
                                    <div className='flex items-center justify-between'>

                                        <h2 className="text-base font-semibold mb-2 font-Gilroy text-black">Basic Information</h2>


                                        <div className="px-2 py-2 rounded-full border border-zinc-100 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition duration-200">
                                            <HiOutlineDotsVertical className="text-black p-0 " />

                                        </div>

                                    </div>

                                    <hr className='mt-2 mb-[8px] border-1 border-[#E7E7E7] ' />
                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 ">

                                        <div>
                                            <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Business Name *</p>
                                            <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{customer.businessName}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Contact Person</p>
                                            <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{customer.title}.{customer.contactPerson}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Email</p>
                                            <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>{customer.emailId || 'N/A'}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Mobile no.</p>
                                            <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>+{customer.country_code}{customer.contactNumber}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Designation</p>
                                            <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>{customer.designation}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">GST/VAT</p>
                                            <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>{customer.gstVat}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className=" bg-white p-4 rounded-xl shadow-sm border">
                                    <div className='flex items-center justify-between'>

                                        <h2 className="text-base font-semibold mb-2 font-Gilroy text-black">Bank Details</h2>

                                        <div className="px-2 py-2 rounded-full border border-zinc-100 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition duration-200">
                                            <HiOutlineDotsVertical className="text-black p-0 " />

                                        </div>
                                    </div>

                                    <hr className='mt-2 mb-[8px] border-1 border-[#E7E7E7] ' />
                                    {customer?.bankDetails?.length > 0 ? (
                                        customer?.bankDetails?.map((bank, index) => {
                                            return index === 0 && <div key={index} className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                                <div>
                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Beneficiary Customer Name</p>
                                                    <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{bank.name || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Beneficiary Account Number</p>
                                                    <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{bank.accountNo || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">IFSC Code</p>
                                                    <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>{bank.ifscCode || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Bank Address </p>
                                                    <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap capitalize'>{bank.address1 || 'N/A'}{" , "}{bank.address2}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Bank Country</p>
                                                    <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>{bank.country || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Intermediary Routing Bank</p>
                                                    <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>{bank.routingBank || 'N/A'}</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Sift Code for intermediary Bank</p>
                                                    <p className='text-sm font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap'>{bank.swiftCode || 'N/A'}</p>
                                                </div>
                                            </div>
                                        })
                                    )
                                        :
                                        (
                                            <div className="text-sm text-gray-500 font-Gilroy text-center">No bank details available</div>
                                        )
                                    }

                                </div>
                            </div>



                            <div className=" bg-white p-4 rounded-xl shadow-sm border min-h-fit ">
                                <div className='flex items-center justify-between'>

                                    <h2 className="text-base font-semibold mb-2 font-Gilroy text-black">Address Information</h2>


                                    <div className="px-2 py-2 rounded-full border border-zinc-100 flex items-center justify-center cursor-pointer hover:bg-slate-100 transition duration-200">
                                        <HiOutlineDotsVertical className="text-black p-0 " />

                                    </div>
                                </div>

                                <hr className='mt-2 mb-[8px] border-1 border-[#E7E7E7] ' />
                                {
                                    customer?.address?.length > 0 ? (
                                        (() => {
                                            const officeAddresses = customer.address.filter(item => item.addressType === "Office Address");
                                            const shippingAddresses = customer.address.filter(item => item.addressType !== "Office Address");

                                            return (
                                                <>
                                                    {officeAddresses.map(item => (
                                                        <div key={item.id}>
                                                            <h3 className="text-base font-semibold mb-2 font-Gilroy text-black">Office Address</h3>
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div>
                                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Address Line 1</p>
                                                                    <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222]">{item.doorNo || 'N/A'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Address Line 2</p>
                                                                    <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222]">{item.street || 'N/A'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Address Line 3</p>
                                                                    <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222]">{item.locality || 'N/A'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Address Line 4</p>
                                                                    <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222]">{item.address4 || 'N/A'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Postal Code</p>
                                                                    <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222]">{item.postalCode || 'N/A'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">City</p>
                                                                    <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222]">{item.city || 'N/A'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Landmark</p>
                                                                    <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222]">{item.landMark || 'N/A'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Google Map</p>
                                                                    {isValidUrl(item.mapLink) ? (
                                                                        <a
                                                                            href={item.mapLink}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-sm font-semibold mb-2 font-Gilroy text-blue-500 underline"
                                                                        >
                                                                            {item.mapLink}
                                                                        </a>
                                                                    ) : (
                                                                        <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222]">
                                                                            {item.mapLink || 'N/A'}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}

                                                    {officeAddresses.length > 0 && shippingAddresses.length > 0 && (
                                                        <hr className="my-4 border-[#E7E7E7]" />
                                                    )}

                                                    {shippingAddresses.map(item => (
                                                        <div key={item.id}>
                                                            <h3 className="text-base font-semibold mb-2 font-Gilroy text-black">Shipping Address</h3>
                                                            <div className="grid grid-cols-3 gap-4">
                                                                <div>
                                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Address Line 1</p>
                                                                    <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222]">{item.doorNo || 'N/A'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Address Line 2</p>
                                                                    <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222]">{item.street || 'N/A'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Address Line 3</p>
                                                                    <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222]">{item.locality || 'N/A'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Address Line 4</p>
                                                                    <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222]">{item.address4 || 'N/A'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Postal Code</p>
                                                                    <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222]">{item.postalCode || 'N/A'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-semibold mb-2 font-Gilroy text-[#4B4B4B]">City</p>
                                                                    <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222]">{item.city || 'N/A'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Landmark</p>
                                                                    <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222]">{item.landMark || 'N/A'}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs font-medium mb-2 font-Gilroy text-[#4B4B4B]">Google Map</p>
                                                                    {isValidUrl(item.mapLink) ? (
                                                                        <a
                                                                            href={item.mapLink}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            className="text-sm font-semibold mb-2 font-Gilroy text-blue-500 underline"
                                                                        >
                                                                            {item.mapLink}
                                                                        </a>
                                                                    ) : (
                                                                        <p className="text-sm font-semibold mb-2 font-Gilroy text-[#222222]">
                                                                            {item.mapLink || 'N/A'}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </>
                                            );
                                        })()
                                    ) : (
                                        <div className="text-sm text-gray-500 font-Gilroy text-center">No address details available</div>
                                    )
                                }


                            </div>

                        </>

                    </div>


                </div>
            </div>
        </div>
    )

}

export default CustomerDetails