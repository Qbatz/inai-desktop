/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PlusCircle from '../../Asset/Images/Plus_Circle.svg';
import { SearchNormal1, Calendar, Edit, Trash, ArrowLeft2, ArrowRight2 } from "iconsax-react";
import Filter from '../../Asset/Images/filter.png';
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { HiOutlineDotsVertical } from "react-icons/hi";
import DeleteInvoiceList from './DeleteInvoiceList';
import moment from 'moment';
import { enGB } from "date-fns/locale";
import { GET_ALL_INVOICE_SAGA, RESET_CODE } from '../../Utils/Constant'
import { useDispatch, useSelector } from 'react-redux';


const InvoiceList = () => {
    const dispatch = useDispatch();
    const state = useSelector(state => state)
    const navigate = useNavigate();
    const popupRef = useRef(null);
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showPopup, setShowPopUp] = useState(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [deleteInvoiceId, setDeleteInvoiceId] = useState('')
    const [showDeleteInvoiceList, setShowDeleteInvoiceList] = useState(false);
    const [isStartSelected, setIsStartSelected] = useState(false);
    const [invoiceList, setInvoiceList] = useState([])
    const [loading, setLoading] = useState(false)
    const timeoutRef = useRef(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

 

    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);



    const handleSelect = (ranges) => {
        const selection = ranges.selection;
        const selectedStart = selection.startDate;
        const selectedEnd = selection.endDate;

        if (!isStartSelected) {

            setDateRange([
                {
                    ...selection,
                    endDate: null,
                },
            ]);
            setStartDate(moment(selectedStart).format("YYYY-MM-DD"));
            setEndDate("");
            setIsStartSelected(true);
        } else {
            setDateRange([selection]);
            setEndDate(moment(selectedEnd).format("YYYY-MM-DD"));
            setShowPicker(false);
            setIsStartSelected(false);
        }
    };
    const handleAddinvoice = () => {
        navigate('/add-invoice')
    }
    const handleInvoiceDetails = (invoiceId) => {
        navigate(`/invoice-details/${invoiceId}`)
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

    const totalPages = Math.ceil(invoiceList.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedInvoices = invoiceList?.slice(startIndex, endIndex);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopUp(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  useEffect(() => {
        const handleClickOutside = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setShowPicker(false);
            }
        };

        if (showPicker) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showPicker]);
    useEffect(() => {
        dispatch({ type: GET_ALL_INVOICE_SAGA, payload: { searchKeyword: "" } })
        setLoading(true)
    }, []);




    useEffect(() => {
        const updatedTotalPages = Math.ceil(invoiceList.length / itemsPerPage);

        if (currentPage > updatedTotalPages && updatedTotalPages > 0) {
            setCurrentPage(updatedTotalPages);
        }
    }, [invoiceList, itemsPerPage, currentPage]);


    useEffect(() => {
        if (state.Common.successCode === 200) {
            setInvoiceList(state.invoice.invoiceList);
            setLoading(false);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                dispatch({ type: RESET_CODE });
            }, 300);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [state.Common.successCode]);

    useEffect(() => {
        if (state.Common?.code === 400 || state.Common?.code === 401 || state.Common?.code === 402) {
            setLoading(false)
            setTimeout(() => {
                dispatch({ type: RESET_CODE })
            }, 100)
        }
    }, [state.Common?.code]);

    useEffect(() => {
        const delayApi = setTimeout(() => {
            if (searchTerm.trim().length >= 1) {
                dispatch({
                    type: GET_ALL_INVOICE_SAGA,
                    payload: { searchKeyword: searchTerm.trim() },
                });
                setLoading(true);
            } else if (searchTerm.trim().length === 0) {
                dispatch({
                    type: GET_ALL_INVOICE_SAGA,
                    payload: { searchKeyword: "" },
                });
            }
        }, 500);

        return () => clearTimeout(delayApi);
    }, [searchTerm]);


    useEffect(() => {
        const delayApi = setTimeout(() => {
            if (startDate && endDate) {
                dispatch({
                    type: GET_ALL_INVOICE_SAGA,
                    payload: { startDate: startDate, endDate: endDate },
                });
                setShowPicker(false)
            } else {
                dispatch({ type: GET_ALL_INVOICE_SAGA, payload: { startDate: null, endDate: null } })

            }
        }, 500);

        return () => clearTimeout(delayApi);
    }, [startDate, endDate]);
 
    return (

        <div className="flex-1 flex w-full p-4 rounded-tl-lg rounded-tr-lg m-0 relative bg-slate-100 relative">


            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                    <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
                </div>
            )}


            {isVisible && (
                <div className="bg-white flex-1 flex flex-col rounded-2xl p-4 relative h-[515px] w-full">

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
                                className="w-full bg-slate-100 border-slate-100 pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#205DA8] text-gray-500 font-Gilroy  text-sm font-medium"
                            />
                        </div>

                        <div className="col-span-2 bg-slate-100 rounded-lg flex items-center gap-2 justify-center cursor-pointer">
                            <img alt="plus" src={Filter} className="h-4 w-4" />
                            <label className="text-gray-500 font-Gilroy text-sm font-medium">Filters</label>
                        </div>

                        <div className="relative col-span-3 bg-slate-100 rounded-lg cursor-pointer">
                            <div
                                className="flex items-center cursor-pointer bg-dark"
                                onClick={() => setShowPicker(!showPicker)}
                            >
                                <Calendar
                                    size="16"
                                    color="gray"
                                    className="absolute left-8 top-1/2 transform -translate-y-1/2"
                                />

                                <input
                                    type="text"
                                    value={`${dateRange[0].startDate
                                        ? moment(dateRange[0].startDate).format("MMMM DD")
                                        : ""
                                        } - ${dateRange[0].endDate
                                            ? moment(dateRange[0].endDate).format("MMMM DD")
                                            : ""
                                        }`}
                                    readOnly
                                    className="w-full pl-20 pr-4 py-2 bg-transparent outline-none cursor-pointer block text-gray-500 font-Gilroy text-sm font-medium"
                                />

                            </div>

                            {showPicker && (
                                <div ref={pickerRef} className="absolute top-15 right-0  mt-2 shadow-lg border rounded-lg bg-white z-20">
                                    <DateRangePicker
                                        ranges={dateRange}
                                        onChange={handleSelect}
                                        moveRangeOnFirstSelection={false}
                                        editableDateInputs={true}
                                        locale={enGB}
                                    />
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="rounded-xl border border-gray-200 max-h-[320px] overflow-y-auto overflow-x-auto mt-3 mb-1">
                        <table className="w-full table-auto border-collapse rounded-xl border-b-0 border-gray-200">
                            <thead className="bg-slate-100 sticky top-0 z-10">
                                <tr>
                                    {["S.No", "Invoice Number", "Contact Person Name", "Email ID", "Mobile No.", "Date", "Amount", ""].map((head, i) => (
                                        <th key={i} className="px-4 py-2 text-center text-gray-600 text-sm font-normal font-Gilroy">
                                            {head}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedInvoices.length > 0 ? (
                                    paginatedInvoices.map((invoice, index) => (
                                        <tr key={index}>
                                            <td className="px-4 py-2 text-center text-black text-sm font-medium font-Gilroy">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                            <td className="px-4 py-2 text-center text-black text-sm font-medium font-Gilroy hover:underline hover:text-[#205DA8] hover:cursor-pointer " onClick={() => handleInvoiceDetails(invoice.invoiceNo)}>{invoice.invoiceNo}</td>
                                            <td className="px-4 py-2 text-center text-black text-sm font-medium font-Gilroy">{invoice.customerDetails.contact_person}</td>
                                            <td className="px-4 py-2 text-center text-black text-sm font-medium font-Gilroy">{invoice.customerDetails.email}</td>
                                            <td className="px-4 py-2 text-center text-black text-sm font-medium font-Gilroy">{invoice.customerDetails.contact_number}</td>
                                            <td className="px-4 py-2 text-center text-black text-sm font-medium font-Gilroy">{invoice.invoiceDate}</td>
                                            <td className="px-4 py-2 text-center text-black text-sm font-medium font-Gilroy">{invoice.products[0]?.price}</td>
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
                                                                className="px-4 py-2 cursor-pointer flex items-center gap-2 font-Gilroy"
                                                            >
                                                                <Edit size="16" color="#205DA8" className='' /> Edit
                                                            </div>
                                                            <div
                                                                className="px-4 py-2 cursor-pointer flex items-center gap-2 text-red-700 font-Gilroy"
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

                    {invoiceList.length > 10 && (
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
