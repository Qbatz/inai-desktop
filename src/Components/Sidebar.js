import React, { useState } from "react";
import Dashboard from "../Pages/Dashboard";
import Vendor from "../Pages/VendorFile/Vendor";
import Product from "./Product";
import InaiLogo from "../Asset/Images/Inai_Logo.svg";
import ClientIcon from '../Asset/Icon/Client_S.svg';
import ClientBlue from '../Asset/Icon/Client_blue.svg';
import VendorIcon from '../Asset/Icon/Vendor_S.svg';
import VendorBlue from '../Asset/Icon/Vendor_blue.svg'
import ProductIcon from '../Asset/Icon/Product_S.svg';
import ProductBlue from '../Asset/Icon/Product_blue.svg';
import InvoiceIcon from '../Asset/Icon/Invoice_S.svg';
import InvoiceBlue from '../Asset/Icon/Invoice_blue.svg';
import Profile from "../Asset/Images/Profile_S.svg"
import Dot from '../Asset/Icon/Dot_s.svg'
import Topbar from './Topbar'
import CustomerDetails from "../Pages/CustomerComponent/CustomerDetails";
import CustomerList from "../Pages/CustomerComponent/CustomerList";
import { Chart2, LoginCurve, Setting2, I24Support, Receipt1, Receipt2 } from "iconsax-react";
import { useDispatch} from 'react-redux';
import { LOG_OUT } from "../Utils/Constant";
import { encryptData } from "../Crypto/crypto";



function Sidebar() {



    
    const dispatch = useDispatch();

    const [activeItem, setActiveItem] = useState("dashboard");

    const [isLogout, setIsLogout] = useState(false)
    const [values, setValues] = useState(null)

    const updateProps =(p)=>{
      setValues(p)
    }

    const handleConfirmLogout = () => {
        dispatch({ type: LOG_OUT });
        const encryptDataLogin = encryptData(JSON.stringify(false));
        localStorage.setItem("inai_login", encryptDataLogin.toString());
        setIsLogout(false)
    }

    const handleLogout = () => {
        setIsLogout(true)
    }


    const handleCloseLogout = () => {
        setIsLogout(false)
    }

  const updateActiveItems = (item) => {
   setActiveItem(item)
}

  


    return (
        <div className="grid grid-cols-[auto_1fr] h-screen overflow-hidden">


            <div className="sticky top-0  h-screen w-16 lg:w-64 grid grid-rows-[auto_1fr] items-start ">

                <div className="sticky top-0 p-2 sm:p-3 md:p-4 lg:p-5 flex items-center justify-between bg-[#F9FAFC] z-50">
                    <div className="flex items-center space-x-2">
                        <img src={InaiLogo} alt="INAI Logo" className="h-4 lg:h-[38px] lg:w-auto md:h-4 md:w-auto sm:h-4" />
                        <img
                            src={Dot}
                            alt="Dot"
                            className="mt-4 hidden md:hidden sm:hidden xs:hidden lg:block"
                        />
                    </div>

                </div>

                <nav className="p-4">
                    <p className="font-Gilroy font-medium text-sm text-[#778192] p-2">Menu</p>
                    <hr className="hidden md:hidden sm:hidden xs:hidden lg:block" />
                    <ul className="space-y-1 ">


                        <li
                            className={`grid grid-cols-[auto_1fr] items-center gap-3 font-Gilroy font-semibold text-base p-2 rounded-lg cursor-pointer 
  ${activeItem === "dashboard" ? "text-[#205DA8]" : "text-black"}`}
                            onClick={() => setActiveItem("dashboard")}
                        >
                            <Chart2 size="22" color={activeItem === "dashboard" ? "#205DA8" : "#0F172A"} />
                            <span className="hidden lg:inline">Dashboard</span>
                        </li>
                        <li
                            className={`grid grid-cols-[auto_1fr] items-center gap-3 font-Gilroy font-semibold text-base p-2 cursor-pointer ${activeItem === "client" ? "text-[#205DA8]" : "text-black"
                                }`}
                            onClick={() => setActiveItem("client")}
                        >
                            <img src={activeItem === "client" ? ClientBlue : ClientIcon} alt="VendorIcon" />
                            <span className="hidden lg:inline">Client</span>
                        </li>
                        <li
                            className={`grid grid-cols-[auto_1fr] items-center gap-3 font-Gilroy font-semibold text-base p-2 cursor-pointer ${activeItem === "vendor" ? "text-[#205DA8]" : "text-black"
                                }`}
                            onClick={() => setActiveItem("vendor")}
                        >
                            <img src={activeItem === "vendor" ? VendorBlue : VendorIcon} alt="VendorIcon" />
                            <span className="hidden lg:inline">Vendor</span>
                        </li>
                        <li
                            className={`grid grid-cols-[auto_1fr] items-center gap-3 font-Gilroy font-semibold text-base p-2 cursor-pointer ${activeItem === "product" ? "text-[#205DA8]" : "text-black"
                                }`}
                            onClick={() => setActiveItem("product")}
                        >
                            <img src={activeItem === "product" ? ProductBlue : ProductIcon} alt="ProductIcon" />
                            <span className="hidden lg:inline">Product</span>
                        </li>
                        <li
                            className={`grid grid-cols-[auto_1fr] items-center gap-3 font-Gilroy font-semibold text-base p-2 cursor-pointer ${activeItem === "invoice" ? "text-[#205DA8]" : "text-black"
                                }`}
                            onClick={() => setActiveItem("invoice")}
                        >
                            <img src={activeItem === "invoice" ? InvoiceBlue : InvoiceIcon} alt="InvoiceIcon" />
                            <span className="hidden lg:inline">Invoice</span>
                        </li>
                        <li
                            className={`grid grid-cols-[auto_1fr] items-center gap-3 font-Gilroy font-semibold text-base p-2 cursor-pointer ${activeItem === "einvoice" ? "text-[#205DA8]" : "text-black"
                                }`}
                            onClick={() => setActiveItem("einvoice")}
                        >
                            <Receipt1 size={activeItem === "einvoice" ? "22" : "22"} color={activeItem === "einvoice" ? "#205DA8" : "#0F172A"} />
                            <span className="hidden lg:inline">E-Invoice</span>
                        </li>
                        <li
                            className={`grid grid-cols-[auto_1fr] items-center gap-3 font-Gilroy font-semibold text-base p-2 cursor-pointer ${activeItem === "ewaybill" ? "text-[#205DA8]" : "text-black"
                                }`}
                            onClick={() => setActiveItem("ewaybill")}
                        >
                            <Receipt2 size={activeItem === "ewaybill" ? "22" : "22"} color={activeItem === "ewaybill" ? "#205DA8" : "#0F172A"} />
                            <span className="hidden lg:inline">E-WayBill</span>
                        </li>
                    </ul>


                </nav>
                <div className=" mx-4   flex  space-x-3">

                    <img src={Profile} alt="Profile" className="h-10 w-10 rounded-full object-cover" />


                    <div className="hidden sm:hidden md:hidden lg:flex flex-col">
                        <p className="text-sm font-semibold">Rakul Preet</p>
                        <p className="text-xs text-gray-500">rakulpreet@gmail.com</p>
                    </div>



                </div>
                <nav className="py-2 px-4">
                    <ul className="space-y-1space-y-1 pt-2 flex flex-col lg:flex-row lg:justify-around flex lg:justify-around md:flex-col sm:flex-col xs:flex-col">

                        <li
                            className={`grid grid-cols-[auto_1fr] items-center gap-3 font-Gilroy font-semibold text-base p-1 cursor-pointer ${activeItem === "support" ? "text-[#205DA8]" : "text-black"
                                }`}
                            onClick={() => setActiveItem("support")}
                        >
                            <I24Support size="22" color={activeItem === "support" ? "#205DA8" : "#0F172A"} />

                        </li>
                        <li
                            className={`grid grid-cols-[auto_1fr] items-center gap-3 font-Gilroy font-semibold text-base p-1 cursor-pointer ${activeItem === "settings" ? "text-[#205DA8]" : "text-black"
                                }`}
                            onClick={() => setActiveItem("settings")}
                        >
                            <Setting2 size={activeItem === "settings" ? "22" : "22"} color={activeItem === "settings" ? "#205DA8" : "#0F172A"} />

                        </li>
                        <li
                            className={`grid grid-cols-[auto_1fr] items-center gap-3 font-Gilroy font-semibold text-base p-1 cursor-pointer ${activeItem === "logout" ? "text-[#205DA8]" : "text-black"
                                }`}
                            onClick={() => handleLogout()}
                        >
                            <LoginCurve size="22" color={activeItem === "logout" ? "#205DA8" : "#0F172A"} />

                        </li>
                    </ul>
                </nav>
            </div>



            <div className="flex-1 p-0 overflow-auto">
                <div className="sticky left-0 top-0 right-0 z-40 flex justify-end">
                    <Topbar />
                </div>

                <div className="">
                    {activeItem === "dashboard" && <Dashboard />}
                    {activeItem === "vendor" && <Vendor />}
                    {activeItem === "product" && <Product />}
                    {activeItem === "client" && <CustomerList updateActiveItems={updateActiveItems} updateProps={updateProps}/>}
                    {activeItem === "add_customer" && <CustomerDetails particularCustomerDetails={values}/>}
                </div>



           



            <div className={`fixed inset-0  z-50 flex items-center justify-center ${isLogout ? "visible" : "hidden"} bg-black bg-opacity-50`}>
                <div className="bg-white rounded-lg shadow-lg w-[388px] h-[200px] p-6">
                    <div className="flex justify-center border-b-0">
                        <h2 className="text-[18px] font-semibold text-[#222222] text-center flex-1 font-Gilroy">
                            Logout?
                        </h2>
                    </div>

                    <div className="text-center text-[14px] text-[#646464] font-medium mt-[20px] font-Gilroy">
                        Are you sure you want to Logout?
                    </div>

                    <div className="flex justify-center border-t-0 mt-[10px] space-x-4">
                        <button
                            data-testid='button-close-logout'
                            className="font-Gilroy w-[160px] h-[52px] rounded-lg border border-[#205DA8] text-[#205DA8] font-semibold text-[14px] bg-white"
                            onClick={handleCloseLogout}
                        >
                            Cancel
                        </button>
                        <button
                            data-testid='button-logout'
                            className="font-Gilroy w-[160px] h-[52px] rounded-lg bg-[#205DA8] text-white font-semibold text-[14px]"
                            onClick={handleConfirmLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            </div>








        </div>
    );
}



export default Sidebar;




