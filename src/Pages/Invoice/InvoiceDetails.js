import React from "react";
import InaiLogo from "../../Asset/Images/Inai_Logo.svg";


function InvoiceDetails (){
    return (
        <>
        <div className="bg-blueGray-100 w-full">
            <div className="p-5">

                <div className="p-8 bg-white rounded-2xl pt-4">

                    <div className="sticky top-0 bg-white z-10 flex justify-between items-start px-4 py-3">

                        <div>
                            <div className="inline-block px-3 py-2 border border-dashed border-gray-300 rounded bg-[#f1f5f9]">
                                <img
                                    src={InaiLogo}
                                    alt="INAI Logo"
                                    className="h-4 lg:h-[32px] w-auto"
                                />
                            </div>

                            <div className="flex gap-8 mt-1">
                                <div>
                                    <div className="text-gray-500 font-Outfit font-medium text-base leading-6">Export Invoice</div>
                                    <div className="text-gray-500 font-Outfit font-medium text-base leading-6">Invoice Date</div>
                                </div>
                                <div className="mt-1.5">
                                    <div className="font-Outfit font-medium text-sm ">#INV0001</div>
                                    <div className="font-Outfit font-medium text-sm ">Sep 24, 2024</div>
                                </div>
                            </div>
                        </div>

                        <div className="text-right max-w-xs font-Gilroy">
                            <h1 className="text-[#205DA8] font-Gilroy font-semibold text-base mb-1 leading-6">Inai Procure Private Limited</h1>
                            <p className="text-xs mb-1">Flat No. G2, Plot No. 79, Mullai Street,</p>
                            <p className="text-xs mb-1">Nagar, Adoorakkam, Chennai, India - 600 088</p>
                            <p className="font-Gilroy font-normal text-sm leading-6">GSTIN: 33AAGCI9097J1ZU</p>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-md max-h-[310px] overflow-y-auto lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3">

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          
                            <div className="bg-[#F1F4F9] p-4 rounded-lg">

                                <h3 className="text-sm font-Gilroy font-semibold text-[#205DA8] mb-2">Consignee</h3>
                                <p className="text-sm font-Gilroy font-semibold text-black mb-1">Rahul Preet</p>
                                <p className="text-xs text-gray-900 leading-5 mb-1">Flat No. G-2, Plot No. 79, Mullai Street, Sabari Nagar, Adoorakkam, Chennai - 600 088</p>
                                <p className="text-sm text-gray-700 font-Gilroy mb-1">inai@inaiql.com</p>
                                <p className="text-xs text-gray-900 font-Gilroy mb-1">+91 97915 42784</p>
                                <p className="text-xs text-gray-500 font-Gilroy mb-1">GSTIN : </p>
                                <p className="text-xs text-gray-500 font-Gilroy ">IEC : </p>
                            </div>

                            <div className="bg-[#F1F4F9] p-4 rounded-lg">
                                <h3 className="text-sm font-Gilroy text-[#205DA8] mb-2 font-semibold">Consignee</h3>
                                <p className="text-sm font-Gilroy font-semibold text-black mb-1">Preet Singh</p>
                                <p className="text-xs text-gray-900 leading-5 mb-1">Flat No. G-2, Plot No. 79, Mullai Street, Sabari Nagar, Adoorakkam, Chennai - 600 088</p>
                                <p className="text-sm text-gray-700 font-Gilroy mb-1">inai@inaiql.com</p>
                                <p className="text-xs text-gray-900 font-Gilroy mb-1">+91 97915 42784</p>
                                <p className="text-xs text-gray-500 font-Gilroy mb-1">GSTIN : </p>
                                <p className="text-xs text-gray-500 font-Gilroy ">IEC : </p>
                            </div>

                            <div className="bg-[#F1F4F9] p-4 rounded-lg">
                                <h3 className="text-sm font-Gilroy font-semibold text-[#205DA8] mb-2">Buyer / Delivery Address</h3>
                                <p className="text-sm font-Gilroy font-semibold text-black mb-1">Sandeep Mourya</p>
                                <p className="text-xs text-gray-900 font-Gilroy leading-5 mb-1">Flat No. G-2, Plot No. 79, Mullai Street, Sabari Nagar, Adoorakkam, Chennai - 600 088</p>
                                <p className="text-sm text-gray-700 font-Gilroy mb-1">inai@inaiql.com</p>
                                <p className="text-xs text-gray-900 font-Gilroy mb-1">+91 97915 42784</p>
                                <p className="text-xs text-gray-500 font-Gilroy mb-1">GSTIN : </p>
                                <p className="text-xs text-gray-500 font-Gilroy">IEC : </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-4 text-sm border border-gray-300 rounded-xl">

                            <div className="px-4 py-3 text-black font-semibold relative">
                                <div className="pl-4 mt-3 mb-2">Origin of Goods :
                                    <span className="ml-2">India</span>
                                </div>
                                <div className="pl-4">Port of Loading  :
                                    <span className="ml-2">Chennai</span>
                                </div>
                                <div className="absolute top-2 bottom-2 right-0 w-[2px] bg-gray-300"></div>
                            </div>


                            <div className="px-6 py-3 relative">
                                <div className="flex justify-between gap-4">
                                    <div>
                                        <p className="text-gray-500 font-medium mb-1 font-Gilroy">Buyer PO# :</p>
                                        <p className="mb-1 font-semibold font-Gilroy">1232231-001</p>
                                        <p className="font-semibold font-Gilroy">0623213-008</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 font-medium mb-1 font-Gilroy">Date :</p>
                                        <p className="mb-1 font-semibold font-Gilroy">1st-Dec-2023</p>
                                        <p className="font-semibold font-Gilroy">1st-May-2024</p>
                                    </div>
                                </div>
                                <div className="absolute top-2 bottom-2 right-0 w-[2px] bg-gray-300"></div>
                            </div>

                            <div className="px-4 py-3">


                                <p className="mb-2 text-gray-500">
                                    Marks :
                                    <span className="ml-2 text-gray-900 font-semibold ml-16 font-Gilroy">INAI242509</span>
                                </p>

                                <p className="mb-1 text-gray-500 font-Gilroy"> Total Package :
                                    <span className="ml-4 text-gray-900 font-semibold font-Gilroy">19</span>
                                </p>
                                <hr className="mb-1" />
                                <p className="text-gray-900 font-medium font-Gilroy ">Wooden Box
                                    <span className="ml-4 font-Gilroy"> - 5 </span>
                                </p>
                                <p className="text-gray-900 font-medium font-Gilroy">MS Frame
                                    <span className="ml-8 font-Gilroy"> - 3 </span>
                                </p>

                            </div>
                        </div>

                        <div className="overflow-hidden rounded-tl-2xl rounded-tr-2xl border border-gray-300 mt-4">
                            <table className="min-w-full">
                                <thead>
                                    <tr className="bg-blue-900 text-white">
                                        <th className="px-4 py-3 text-left text-xs font-medium font-Gilroy">Item No.</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium font-Gilroy">Description</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium font-Gilroy">HSN</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium font-Gilroy">Quantity</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium font-Gilroy">Per Unit Cost in USD</th>
                                        <th className="px-4 py-3 text-left text-xs font-medium font-Gilroy">TOTAL Cost in USD</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-300">
                                        <td className="px-4 py-2 text-sm font-semibold font-Gilroy">1</td>

                                        <td className="px-4 py-2 text-sm font-Gilroy font-normal">
                                            <div>WITHDRAWAL TYPE HEATER MODEL: FHLP 530, 5 KW</div>
                                            <div className="text-gray-900 font-semibold font-Gilroy">440VAC 60HZ IP 55 MAKE: SPHEREHOT</div>
                                        </td>

                                        <td className="px-4 py-2 text-sm font-Gilroy text-gray-900 font-semibold">851679000</td>
                                        <td className="px-4 py-2 text-sm font-Gilroy text-gray-900 font-semibold">2 No</td>
                                        <td className="px-4 py-2 text-sm font-Gilroy text-gray-900 font-semibold">414.60</td>
                                        <td className="px-4 py-2 text-sm font-Gilroy text-gray-900 font-semibold">829.20</td>
                                    </tr>
                                    <tr className="border-b border-gray-300">
                                        <td className="px-4 py-2 text-sm font-semibold font-Gilroy">2</td>

                                        <td className="px-4 py-2 text-sm font-Gilroy font-normal">
                                            <div>ROTARY PADDLE LEVEL SWITCH MODEL: SEX50000-</div>
                                            <div className="text-gray-900 font-semibold font-Gilroy">ADBAKB440K3500 (TAIWAN)</div>
                                        </td>

                                        <td className="px-4 py-2 text-sm text-gray-900 font-semibold font-Gilroy">85365090</td>
                                        <td className="px-4 py-2 text-sm text-gray-900 font-semibold font-Gilroy">1 No</td>
                                        <td className="px-4 py-2 text-sm text-gray-900 font-semibold font-Gilroy">626.20</td>
                                        <td className="px-4 py-2 text-sm text-gray-900 font-semibold font-Gilroy">726.20</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>

                        <div className="flex justify-between mt-5">
                         
                            <div className="flex flex-col gap-3 max-w-md w-full">
                                <div className="p-3 border border-gray-300 rounded-lg shadow-sm bg-[#FBFCFE]">
                                    <div className="mb-2 pl-1">
                                        <h3 className="mb-2 font-Gilroy font-semibold text-base text-[#205DA8]">Weight Details</h3>
                                        <div className="text-sm">
                                            <p className="mb-1 font-Gilroy font-normal text-[#737982]">
                                                Gross Weight :
                                                <span className="text-black ml-2 font-Gilroy">3638.00 Kg</span>
                                            </p>
                                             <p className="mb-1 font-Gilroy font-normal text-[#737982]">
                                               Net Weight :
                                                <span className="text-black ml-5 font-Gilroy">3108.00 Kg</span>
                                            </p>

                                           
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 border border-gray-300 rounded-lg shadow-sm bg-[#FBFCFE]">
                                    <div className="mb-2 pl-1">
                                        <h3 className="text-base font-semibold mb-2 text-[#205DA8] font-Gilroy">Declaration:</h3>
                                        <p className="font-Gilroy font-normal text-sm">
                                            We declare that this invoice shows the actual price of the goods described above and that all particulars are true and correct.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-between w-full max-w-md mr-10">
                                <div className="mb-2">
                                    <div className="flex justify-between text-sm mb-2 font-Gilroy text-[#737982]">
                                        <span>Total FOB Value</span>
                                        <span className="text-black font-Gilroy">USD 21,881.60</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-1 font-Gilroy text-[#737982]">
                                        <span>Freight</span>
                                        <span className="text-black font-Gilroy">USD 590.00</span>
                                    </div>
                                    <div className="flex justify-between text-sm mb-1 font-Gilroy text-[#737982]">
                                        <span>Insurance</span>
                                        <span className="text-black font-Gilroy">USD 10.00</span>
                                    </div>
                                    <div className="border-t border-gray-900 my-2"></div>
                                    <div className="flex justify-between text-sm font-semibold font-Gilroy">
                                        <span>Total Payable</span>
                                        <span>USD 22,481.60</span>
                                    </div>
                                     <div className="border-b border-gray-900 my-2"></div>
                                </div>

                                <div className="text-right relative top-1">
                                    <p className="font-Gilroy font-normal text-sm mb-3">For INAI PROCURE PRIVATE LIMITED</p>
                                    <p className="text-sm font-Gilroy font-semibold text-base mt-3">Authorised Signatory</p>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>

        </>

    )
}
export default InvoiceDetails;