import React from 'react';
import Dot from '../Icon/Dot.svg'

function VendorDetails() {
  return (
    <div className="bg-blueGray-100 min-h-screen w-full">
      <div className="p-6">
        <div className="bg-white rounded-2xl">
          <h1 className="text-2xl font-bold p-4">Vendor</h1>

          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 p-2">

            <div className="flex flex-col space-y-6">

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
                    <p className="font-semibold font-Gilroy text-sm pt-2">Inai Technology</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Contact Person</p>
                    <p className="font-semibold font-Gilroy text-sm pt-2">Abhishek Kumar</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Email</p>
                    <p className="font-semibold font-Gilroy text-sm pt-2">abishekkumar@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Mobile No.</p>
                    <p className="font-semibold font-Gilroy text-sm pt-2">+91 9876543210</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Designation</p>
                    <p className="font-semibold font-Gilroy text-sm pt-2">abishekkumar@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">GST/VAT</p>
                    <p className="font-semibold font-Gilroy text-sm pt-2">+91 9876543210</p>
                  </div>
                </div>
              </div>


              <div className="p-6 rounded-lg border border-gray-300 relative bg-white">
              <div className="absolute top-4 right-6 text-gray-500">
                <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-400 cursor-pointer">
                  <img src={Dot} alt="Dot" className="w-4 h-4" />
                </div>
                </div>
                <h2 className="text-base font-semibold">Bank Details</h2>
                <hr className="my-2" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 p-2">

                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Beneficiary Customer Name</p>
                    <p className="font-semibold font-Gilroy text-sm pt-2">Beneficiary Account Bank Name</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Beneficiary Account Number</p>
                    <p className="font-semibold font-Gilroy text-sm pt-2">Abishek Kumar</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Email</p>
                    <p className="font-semibold font-Gilroy text-sm pt-2">abishekkumar@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">IFSC Code</p>
                    <p className="font-semibold font-Gilroy text-sm pt-2">+91 9876543210</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Bank Address 1</p>
                    <p className="font-semibold font-Gilroy text-sm pt-2">abishekkumar@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Bank Country</p>
                    <p className="font-semibold font-Gilroy text-sm pt-2">+91 9876543210</p>
                  </div>

                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Intermediary Routing Bank</p>
                    <p className="font-semibold font-Gilroy text-sm pt-2">abishekkumar@gmail.com</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Swift Code for Intermediary Bank</p>
                    <p className="font-semibold font-Gilroy text-sm pt-2">+91 9876543210</p>
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
              <h2 className="text-base font-semibold">Address Information</h2>
              <hr className="my-2" />

              <div className="p-2 rounded-lg  bg-white">
                <h2 className="text-lg font-semibold mb-4">Office Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-2">
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Address Line 1</p>
                    <p className="font-semibold font-Gilroy text-sm pt-2">₹25,000</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Address Line 2</p>
                    <p className="font-semibold font-Gilroy text-sm pt-2">₹5,000/m</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Address Line 2</p>
                    <p className="font-semibold font-Gilroy text-sm pt-2">₹5,000/m</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Address Line 4</p>
                    <p className="font-semibold font-Gilroy text-sm pt-2">₹25,000</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Postal Code</p>
                    <p className="font-semibold font-Gilroy text-sm pt-2">263837333</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 p-2">

                  <div>
                    <p className="text-gray-500 text-xs font-medium">Landmark</p>
                    <p className="font-semibold text-sm  pt-2">Chidambaram Stadium</p>
                  </div>


                  <div>
                    <p className="text-gray-500 text-xs font-medium">Google Map</p>
                    <a href="https://maps.app.goo.gl/D26"
                      className="text-blue-500 break-all  pt-2"
                      target="_blank"
                      rel="noopener noreferrer">
                      https://maps.app.goo.gl/D26
                    </a>

                  </div>
                </div>


              </div>


              <div className="p-2 rounded-lg  bg-white">
                <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-2">
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Address Line 1</p>
                    <p className="font-semibold font-Gilroy text-sm  pt-2">₹25,000</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Address Line 2</p>
                    <p className="font-semibold font-Gilroy text-sm  pt-2">₹5,000/m</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Address Line 2</p>
                    <p className="font-semibold font-Gilroy text-sm  pt-2">₹5,000/m</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Address Line 4</p>
                    <p className="font-semibold font-Gilroy text-sm  pt-2">₹25,000</p>
                  </div>
                  <div>
                    <p className="text-[#4B4B4B] text-xs font-medium font-Gilroy">Postal Code</p>
                    <p className="font-semibold font-Gilroy text-sm  pt-2">263837333</p>
                  </div>

                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 p-2">

                  <div>
                    <p className="text-gray-500 text-xs font-medium">Landmark</p>
                    <p className="font-semibold text-sm  pt-2">Chidambaram Stadium</p>
                  </div>


                  <div>
                    <p className="text-gray-500 text-xs font-medium">Google Map</p>
                    <a href="https://maps.app.goo.gl/D26"
                      className="text-blue-500 break-all  pt-2"
                      target="_blank"
                      rel="noopener noreferrer">
                      https://maps.app.goo.gl/D26
                    </a>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div >
  );
};

export default VendorDetails;