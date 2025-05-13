/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Vendor from "../Pages/VendorFile/Vendor";
import ProductList from "../Pages/Product/ProductList";
import AddProduct from "../Pages/Product/AddProduct";
import InaiLogo from "../Asset/Images/Inai_Logo.svg";
import ClientIcon from '../Asset/Icon/Client_S.svg';
import ClientBlue from '../Asset/Icon/Client_blue.svg';
import VendorIcon from '../Asset/Icon/Vendor_S.svg';
import VendorBlue from '../Asset/Icon/Vendor_blue.svg'
import ProductIcon from '../Asset/Icon/Product_S.svg';
import ProductBlue from '../Asset/Icon/Product_blue.svg';
import InvoiceIcon from '../Asset/Icon/Invoice_S.svg';
import InvoiceBlue from '../Asset/Icon/Invoice_blue.svg';
import Profile from "../Asset/Icon/profile-picture.png";
import Dot from '../Asset/Icon/Dot_s.svg'
import Topbar from './Topbar'
import CustomerDetails from "../Pages/CustomerComponent/CustomerDetails";
import CustomerList from "../Pages/CustomerComponent/CustomerList";
import { Chart2, LoginCurve, Setting2, I24Support, Receipt1, Receipt2 } from "iconsax-react";
import { useDispatch, connect } from 'react-redux';
import { LOG_OUT } from "../Utils/Constant";
import { encryptData } from "../Crypto/crypto";
import { Route, Routes, useNavigate } from "react-router-dom";
import AddCustomer from "../Pages/CustomerComponent/AddCustomer";
import AddVendor from "../Pages/VendorFile/AddVendor";
import VendorDetails from "../Pages/VendorFile/VendorDetails";
import UserDetails from "../Pages/UserInfo/UserDetails";
import { GET_USER_INFO_SAGA } from '../Utils/Constant';
import PropTypes from 'prop-types';
import ProductDetails from "../Pages/Product/ProductDetails";
import InvoiceList from "../Pages/Invoice/InvoiceList";
import AddInvoice from "../Pages/Invoice/AddInvoice";





function Sidebar({ state }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeItem, setActiveItem] = useState("dashboard");

    const [isLogout, setIsLogout] = useState(false)


    useEffect(() => {
        dispatch({ type: GET_USER_INFO_SAGA });
    }, []);

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


    const handleUserDetails = () => {
        navigate('/user/details');
        setActiveItem("")
    };


    useEffect(() => {
        const path = window.location.pathname;
        if (path === "/product") {
            setActiveItem("product");
        } else if (path === "/vendor") {
            setActiveItem("vendor");
        } else if (path === "/client") {
            setActiveItem("client");
        } else if (path === "/") {
            setActiveItem("dashboard");
        }else if(path === "/invoice"){
 setActiveItem("invoice");
        }

    }, [window.location.pathname]);



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
                            onClick={() => {
                                setActiveItem('dashboard')
                                navigate("/")
                            }}
                        >
                            <Chart2 size="22" color={activeItem === "dashboard" ? "#205DA8" : "#0F172A"} />
                            <span className="hidden lg:inline">Dashboard</span>
                        </li>
                        <li
                            className={`grid grid-cols-[auto_1fr] items-center gap-3 font-Gilroy font-semibold text-base p-2 cursor-pointer ${activeItem === "client" ? "text-[#205DA8]" : "text-black"
                                }`}
                            onClick={() => {
                                setActiveItem('client')
                                navigate("/client")
                            }}
                        >
                            <img src={activeItem === "client" ? ClientBlue : ClientIcon} alt="VendorIcon" />
                            <span className="hidden lg:inline">Client</span>
                        </li>
                        <li
                            className={`grid grid-cols-[auto_1fr] items-center gap-3 font-Gilroy font-semibold text-base p-2 cursor-pointer ${activeItem === "vendor" ? "text-[#205DA8]" : "text-black"
                                }`}
                            onClick={() => {
                                setActiveItem("vendor")
                                navigate("/vendor")
                            }}
                        >
                            <img src={activeItem === "vendor" ? VendorBlue : VendorIcon} alt="VendorIcon" />
                            <span className="hidden lg:inline">Vendor</span>
                        </li>
                        <li
                            className={`grid grid-cols-[auto_1fr] items-center gap-3 font-Gilroy font-semibold text-base p-2 cursor-pointer ${activeItem === "product" ? "text-[#205DA8]" : "text-black"
                                }`}
                            onClick={() => {
                                setActiveItem("product")
                                navigate('/product')
                            }}
                        >
                            <img src={activeItem === "product" ? ProductBlue : ProductIcon} alt="ProductIcon" />
                            <span className="hidden lg:inline">Product</span>
                        </li>
                        <li
                            className={`grid grid-cols-[auto_1fr] items-center gap-3 font-Gilroy font-semibold text-base p-2 cursor-pointer ${activeItem === "invoice" ? "text-[#205DA8]" : "text-black"
                                }`}
                            onClick={() => {setActiveItem("invoice")
                                navigate('/invoice')
                            }}
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
                <div className=" mx-4   flex  space-x-3" onClick={handleUserDetails}>


                    <img src={Profile} alt="Profile" className="h-11 w-11 rounded-full object-cover cursor-pointer" />

                    <div className="hidden sm:hidden md:hidden lg:flex flex-col w-[150px] overflow-hidden mt-1">
                        <p
                            className={`text-sm font-semibold font-Gilroy truncate whitespace-nowrap overflow-hidden cursor-pointer ${activeItem === "" ? "text-[#205DA8]" : "text-black"} `}
                            title={
                                state.firstName || state.lastName
                                    ? `${state.firstName || ""}${state.lastName || ""}`
                                    : "Admin"
                            }
                        >
                            {(state.firstName || state.lastName)
                                ? `${state.firstName || ""}${state.lastName || ""}`
                                : "Admin"}
                        </p>
                        <p
                            className={`text-xs font-Gilroy truncate whitespace-nowrap overflow-hidden cursor-pointer ${activeItem === "" ? "text-[#205DA8]" : "text-gray-500"} `}
                            title={state.email || ""}
                        >
                            {state.email || ""}
                        </p>
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



            <div className="flex-1 p-0 overflow-auto flex flex-col">
                <div className="sticky left-0 top-0 right-0 z-40 flex justify-end">
                    <Topbar />
                </div>

                <div className="flex flex-1">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/client" element={<CustomerList />} />
                        <Route path="/vendor" element={<Vendor />} />
                        <Route path="/product" element={<ProductList />} />
                        <Route path="/add-products" element={<AddProduct />} />
                        <Route path="/add-customer" element={<AddCustomer />} />
                        <Route path="/customer-details/:customerId" element={<CustomerDetails />} />
                        <Route path="/add-vendor" element={<AddVendor />} />
                        <Route path="/vendor-details/:vendorId" element={<VendorDetails />} />
                        <Route path="/user/details" element={<UserDetails />} />
                        <Route path="/product-details/:productId" element={<ProductDetails />} />
                        <Route path="/invoice" element={<InvoiceList />} />
                        <Route path="/add-invoice" element={<AddInvoice />} />
                        
                    </Routes>

                </div>







                <div className={`fixed inset-0  z-50 flex items-center justify-center ${isLogout ? "visible" : "hidden"} bg-black bg-opacity-50`}>
                    <div className="bg-white rounded-lg shadow-lg w-[388px] h-[180px] p-6 pb-[6px] ">
                        <div className="flex justify-center border-b-0">
                            <h2 className="text-[20px] font-semibold text-[#222222] text-center flex-1 font-Gilroy">
                                Logout?
                            </h2>
                        </div>

                        <div className="text-center text-[14px] text-[#646464] font-medium mt-[10px] font-Gilroy">
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

const mapsToProps = (stateInfo) => {
    return {
        state: stateInfo.userInfo?.userDetails,
    };
};


Sidebar.propTypes = {
    state: PropTypes.object
};

export default connect(mapsToProps)(Sidebar);






