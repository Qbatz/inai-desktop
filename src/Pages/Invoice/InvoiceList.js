/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PlusCircle from '../../Asset/Images/Plus_Circle.svg';
import { SearchNormal1, Calendar, Edit, Trash, ArrowLeft2, ArrowRight2 } from "iconsax-react";
import Filter from '../../Asset/Images/filter.png';
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { HiOutlineDotsVertical } from "react-icons/hi";
import DeleteInvoiceList from './DeleteInvoiceList';

const InvoiceList = () => {

    const navigate = useNavigate();
    const popupRef = useRef(null);


    const [isVisible, setIsVisible] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showPopup, setShowPopUp] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [deleteInvoiceId, setDeleteInvoiceId] = useState('')
    const [showDeleteInvoiceList, setShowDeleteInvoiceList] = useState(false);


    const handleAddinvoice = () => {
        navigate('/add-invoice')
    }
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }
 
    const handleShowPopup = (id, event) => {
        const { top, left, height } = event.target.getBoundingClientRect();
        setPopupPosition({
            top: top + height + 5,
            left: left - 150,
        });
        setShowPopUp(showPopup === id ? null : id);
    };

    const handleDeleteInvoiceList = (id) => {
        setShowDeleteInvoiceList(true);
        setShowPopUp(null);
        setDeleteInvoiceId(id)
        setIsVisible(true);
    };
    const handleCloseForDeleteInvoiceList = () => {
        setShowDeleteInvoiceList(false);
    };
    const invoices = [
        { id: '#0019F12723', name: 'Kellie Turcotte', email: 'kellie@gmail.com', mobile: '+91 9856543210', date: '22-07-2024', amount: '₹2500' },
        { id: '#0019F12724', name: 'Tatiana Rosser', email: 'tatiana@gmail.com', mobile: '+91 9856543210', date: '23-07-2024', amount: '₹3000' },
        { id: '#0019F12725', name: 'John Doe', email: 'john@gmail.com', mobile: '+91 9856543211', date: '24-07-2024', amount: '₹3500' },
        { id: '#0019F12726', name: 'Jane Smith', email: 'jane@gmail.com', mobile: '+91 9856543212', date: '25-07-2024', amount: '₹4000' },
        { id: '#0019F12727', name: 'Robert Johnson', email: 'robert@gmail.com', mobile: '+91 9856543213', date: '26-07-2024', amount: '₹4500' },
        { id: '#0019F12728', name: 'Maria Williams', email: 'maria@gmail.com', mobile: '+91 9856543214', date: '27-07-2024', amount: '₹5000' },
        { id: '#0019F12729', name: 'Michael Brown', email: 'michael@gmail.com', mobile: '+91 9856543215', date: '28-07-2024', amount: '₹5500' },
        { id: '#0019F12730', name: 'David Davis', email: 'david@gmail.com', mobile: '+91 9856543216', date: '29-07-2024', amount: '₹6000' },
        { id: '#0019F12731', name: 'Elizabeth Moore', email: 'elizabeth@gmail.com', mobile: '+91 9856543217', date: '30-07-2024', amount: '₹6500' },
        { id: '#0019F12732', name: 'James Taylor', email: 'james@gmail.com', mobile: '+91 9856543218', date: '31-07-2024', amount: '₹7000' },
        { id: '#0019F12733', name: 'Patricia Anderson', email: 'patricia@gmail.com', mobile: '+91 9856543219', date: '01-08-2024', amount: '₹7500' },
        { id: '#0019F12734', name: 'Charles Thomas', email: 'charles@gmail.com', mobile: '+91 9856543220', date: '02-08-2024', amount: '₹8000' },
        { id: '#0019F12735', name: 'Sarah Jackson', email: 'sarah@gmail.com', mobile: '+91 9856543221', date: '03-08-2024', amount: '₹8500' },
        { id: '#0019F12736', name: 'Daniel White', email: 'daniel@gmail.com', mobile: '+91 9856543222', date: '04-08-2024', amount: '₹9000' },
        { id: '#0019F12737', name: 'Nancy Harris', email: 'nancy@gmail.com', mobile: '+91 9856543223', date: '05-08-2024', amount: '₹9500' },
        { id: '#0019F12738', name: 'William Clark', email: 'william@gmail.com', mobile: '+91 9856543224', date: '06-08-2024', amount: '₹10000' },
        { id: '#0019F12739', name: 'Linda Lewis', email: 'linda@gmail.com', mobile: '+91 9856543225', date: '07-08-2024', amount: '₹10500' },
        { id: '#0019F12740', name: 'Joseph Walker', email: 'joseph@gmail.com', mobile: '+91 9856543226', date: '08-08-2024', amount: '₹11000' },
        { id: '#0019F12741', name: 'Karen Young', email: 'karen@gmail.com', mobile: '+91 9856543227', date: '09-08-2024', amount: '₹11500' },
        { id: '#0019F12742', name: 'Thomas King', email: 'thomas@gmail.com', mobile: '+91 9856543228', date: '10-08-2024', amount: '₹12000' },
        { id: '#0019F12743', name: 'Betty Scott', email: 'betty@gmail.com', mobile: '+91 9856543229', date: '11-08-2024', amount: '₹12500' },
        { id: '#0019F12744', name: 'Steven Adams', email: 'steven@gmail.com', mobile: '+91 9856543230', date: '12-08-2024', amount: '₹13000' },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const totalPages = Math.ceil(invoices.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedInvoices = invoices.slice(startIndex, endIndex);


    return (

        <div className="flex-1 flex w-full p-4 rounded-tl-lg rounded-tr-lg m-0 relative bg-gray-100">
            {isVisible && (
                <div className="bg-white flex-1 flex flex-col rounded-2xl p-4 relative h-[510px] w-full">

                    <div className="flex w-full justify-between items-center mb-2">
                        <h2 className="text-xl font-semibold  font-Gilroy text-black">Invoice</h2>
                        <button
                            onClick={handleAddinvoice}
                            className="px-6 md:px-8 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat text-xs md:text-base font-medium flex items-center gap-2"
                        >
                            <img src={PlusCircle} alt="plus" className="w-4 md:w-5" /> Add Invoice
                        </button>
                    </div>

                    <div className="grid md:grid-cols-12 sm:grid-cols-2 gap-3 mb-2 pt-4">

                        <div className="relative col-span-7 cursor-pointer">
                            <SearchNormal1 size="16" color="gray" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search by ID, Support, or Others"
                                className="w-full bg-slate-100 border-slate-100 pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-[#205DA8] text-gray-500 font-Gilroy text-sm font-medium"
                            />
                        </div>

                        <div className="col-span-2 bg-slate-100 rounded-lg flex items-center gap-2 justify-center cursor-pointer">
                            <img alt="plus" src={Filter} className="h-4 w-4" />
                            <label className="text-gray-500 font-Gilroy text-sm font-medium">Filters</label>
                        </div>

                        <div className="relative col-span-3 bg-slate-100 rounded-lg cursor-pointer px-16 py-2 flex items-center gap-2 w-max">
                            <Calendar size="16" color="gray" />
                            <span className="text-gray-500 text-sm font-medium font-Gilroy">April 11 - April 24</span>
                        </div>

                    </div>

                    <div className="rounded-xl border border-gray-200 max-h-[320px] overflow-y-auto overflow-x-auto mt-3 mb-1">
                        <table className="w-full table-auto border-collapse rounded-xl border-b-0 border-gray-200">
                            <thead className="bg-gray-100 sticky top-0 z-10">
                                <tr>
                                    {["S.No", "Invoice Number", "Contact Person Name", "Email ID", "Mobile No.", "Date", "Amount", ""].map((head, i) => (
                                        <th key={i} className="px-4 py-2 text-center text-gray-600 text-sm font-normal font-gilroy">
                                            {head}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedInvoices.length > 0 ? (
                                    paginatedInvoices.map((invoice, index) => (
                                        <tr key={invoice.id}>
                                            <td className="px-4 py-2 text-center text-black text-sm font-medium">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td className="px-4 py-2 text-center text-black text-sm font-medium">{invoice.id}</td>
                                            <td className="px-4 py-2 text-center text-black text-sm">{invoice.name}</td>
                                            <td className="px-4 py-2 text-center text-black text-sm">{invoice.email}</td>
                                            <td className="px-4 py-2 text-center text-black text-sm">{invoice.mobile}</td>
                                            <td className="px-4 py-2 text-center text-black text-sm">{invoice.date}</td>
                                            <td className="px-4 py-2 text-center text-black text-sm">{invoice.amount}</td>
                                            <td className="px-4 py-2 text-center relative">
                                                <div
                                                    onClick={(e) => handleShowPopup(index, e)}
                                                    className="w-8 h-8 rounded-full border border-[#E1E8F0] flex items-center justify-center cursor-pointer hover:bg-slate-100"
                                                >
                                                    <HiOutlineDotsVertical className="text-black" />
                                                    {showPopup === index && (
                                                        <div
                                                            ref={popupRef}
                                                            style={{
                                                                position: "fixed",
                                                                top: popupPosition.top,
                                                                left: popupPosition.left,
                                                                zIndex: 50,
                                                            }}
                                                            className="w-32 bg-slate-100 shadow-lg rounded-md"
                                                        >
                                                            <div
                                                                className="px-4 py-2 cursor-pointer flex items-center gap-2"
                                                            >
                                                                <Edit size="16" color="#205DA8" /> Edit
                                                            </div>
                                                            <div
                                                                className="px-4 py-2 cursor-pointer flex items-center gap-2 text-red-700"
                                                                onClick={() => handleDeleteInvoiceList(invoice.clientId)}
                                                            >
                                                                <Trash size="16" color="#B91C1C" /> Delete
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center text-red-600 font-Gilroy py-4">
                                            No Data Found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {invoices.length > 10 && (
                        <nav className="absolute right-4 bottom-5 flex flex-col xs:flex-row sm:flex-row md:flex-row justify-end items-center bg-white mt-5 rounded-lg -mb-3">

                            <div className="flex items-center gap-2">

                                <select
                                    value={itemsPerPage}
                                    onChange={handleItemsPerPageChange}
                                    className="cursor-pointer border border-[#205DA8] rounded-md text-[#205DA8] font-bold px-1 py-1 outline-none"
                                >

                                    <option value={10}>10</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                </select>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-full ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-[#205DA8] cursor-pointer"}`}
                                >
                                    <ArrowLeft2 size="16" color={currentPage === 1 ? "#ccc" : "#205DA8"} />
                                </button>

                                <span className="text-sm font-bold">{currentPage} of {totalPages}</span>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-full ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-[#205DA8] cursor-pointer"}`}
                                >
                                    <ArrowRight2 size="16" color={currentPage === totalPages ? "#ccc" : "#205DA8"} />
                                </button>
                            </div>
                        </nav>
                    )}
                </div>
            )}

            {showDeleteInvoiceList && <DeleteInvoiceList handleClose={handleCloseForDeleteInvoiceList} deleteInvoiceId={deleteInvoiceId} />}


        </div>




    );
};

export default InvoiceList;
