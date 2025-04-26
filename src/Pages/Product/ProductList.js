/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect, useMemo } from 'react';
import PlusCircle from '../../Asset/Images/Plus_Circle.svg';
import { SearchNormal1, Calendar, Edit, Trash, ArrowLeft2, ArrowRight2, ArrowUp, ArrowDown } from "iconsax-react";
import Filter from '../../Asset/Images/filter.png';
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { enGB } from "date-fns/locale";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import DeleteProduct from './DeleteProduct';
import { useDispatch, useSelector } from 'react-redux';
import { GET_PRODUCT_SAGA, RESET_CODE } from '../../Utils/Constant'
import moment from 'moment';
import Cloth from '../../Asset/Images/Cloth.png'


function ProductList() {


    const navigate = useNavigate()
    const dispatch = useDispatch();
    const state = useSelector(state => state)
    const [loading, setLoading] = useState(false)
    const [showPicker, setShowPicker] = useState(false);
    const [showPopup, setShowPopUp] = useState(null);
    const [showDeleteProduct, setShowDeleteProduct] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const popupRef = useRef(null);
    const pickerRef = useRef(null);
    const [productList, setProductList] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [hasSelectedBoth, setHasSelectedBoth] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });






    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);


    const handleSort = (key) => {
        setSortConfig(prev => {
            if (prev.key === key) {
                return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
            } else {
                return { key, direction: 'asc' };
            }
        });
    };


    const sortedData = useMemo(() => {
        let sorted = [...productList];
        if (sortConfig.key !== null) {
            sorted.sort((a, b) => {
                const valA = a[sortConfig.key];
                const valB = b[sortConfig.key];

               
                if (!isNaN(valA) && !isNaN(valB)) {
                    return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
                }

               
                const strA = valA?.toString().toLowerCase() || "";
                const strB = valB?.toString().toLowerCase() || "";

                if (strA < strB) return sortConfig.direction === 'asc' ? -1 : 1;
                if (strA > strB) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return sorted;
    }, [productList, sortConfig]);





    const paginatedData = sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


  

    const totalPages = Math.ceil(productList?.length / itemsPerPage);


    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSelect = (ranges) => {
        setDateRange([])
        const startDate = ranges.selection.startDate;
        const endDate = ranges.selection.endDate;
        const formattedStartDate = moment(startDate).format("YYYY-MM-DD");
        const formattedEndDate = moment(endDate).format("YYYY-MM-DD");
        setStartDate(formattedStartDate);
        setEndDate(formattedEndDate);
        setDateRange([ranges.selection]);
        if (startDate && endDate && startDate !== endDate && !hasSelectedBoth) {
            setShowPicker(false);
            setHasSelectedBoth(true);
        }

    };











    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };



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



    const handleShowPopup = (id, event) => {
        const { top, left, height } = event.target.getBoundingClientRect();
        setPopupPosition({
            top: top + height + 5,
            left: left - 150,
        });
        setShowPopUp(showPopup === id ? null : id);
    };
    const handleDeleteProductPopup = (id) => {
        setShowDeleteProduct(true);
        setShowPopUp(null);
        setDeleteProductId(id)
    };
    const handleCloseForDeleteProduct = () => {
        setShowDeleteProduct(false);
    };

    // const handleEditProductPopup = (editDetails) => {
    //     navigate('/add-products', { state: { editDetails } });

    // }

    const handleNavigateproductDetails = (item) => {
               navigate(`/product-details/${item.uniqueProductCode}`); 
      };
      



    useEffect(() => {
        dispatch({ type: GET_PRODUCT_SAGA, payload: { searchKeyword: "" } })
        setLoading(true)
    }, [])



    useEffect(() => {
        if (state.Common.successCode === 200) {
            setProductList(state.product.productList)
            setLoading(false)
            setShowDeleteProduct(false);
            setTimeout(() => {
                dispatch({ type: RESET_CODE })
            }, 1000)
        }

    }, [state.Common.successCode])


    useEffect(() => {
        if (state.product?.productList) {
            setProductList(state.product?.productList)
        }
    }, [state.product?.productList])

    useEffect(() => {
        if (state.Common?.successCode === 200 || state.Common?.code === 400 || state.Common?.code === 401 || state.Common?.code === 402) {
            setLoading(false)
            setTimeout(() => {
                dispatch({ type: RESET_CODE })
            }, 1000)
        }
    }, [state.Common?.successCode, state.Common?.code]);

    useEffect(() => {
        const delayApi = setTimeout(() => {
          if (searchTerm.trim().length >= 3) {
            dispatch({
              type: GET_PRODUCT_SAGA,
              payload: { searchKeyword: searchTerm.trim() },
            });
            setLoading(true);
          } else if (searchTerm.trim().length === 0) {
            dispatch({
              type: GET_PRODUCT_SAGA,
              payload: { searchKeyword: "" },
            });
          }
        }, 500);
      
        return () => clearTimeout(delayApi);
      }, [searchTerm]);
      


    useEffect(() => {
        const delayApi = setTimeout(() => {
            if (startDate && endDate && startDate !== endDate) {
                dispatch({
                    type: GET_PRODUCT_SAGA,
                    payload: { startDate: startDate, endDate: endDate },
                });
                setShowPicker(false)
            } else {
                dispatch({ type: GET_PRODUCT_SAGA, payload: { startDate: null, endDate: null } })

            }
        }, 500);

        return () => clearTimeout(delayApi);
    }, [startDate, endDate]);




    const renderSortableHeader = (label, key) => (
        <div className="flex items-center justify-center gap-2 cursor-pointer" onClick={() => handleSort(key)}>
            {label}
            <div className="flex flex-row">
                <ArrowUp
                    size="16"
                    color={sortConfig.key === key && sortConfig.direction === "asc" ? "#205DA8" : "#4a4a4a"}
                />
                <ArrowDown
                    size="16"
                    color={sortConfig.key === key && sortConfig.direction === "desc" ? "#205DA8" : "#4a4a4a"}
                />
            </div>
        </div>
    );




    return (
        <div className='bg-slate-100 flex-1 flex w-full p-4 rounded-tl-lg rounded-tr-lg m-0 relative'>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                    <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
                </div>
            )}


            <div className='bg-white flex-1 flex flex-col rounded-2xl ps-5 pt-3 pe-5 relative'>

                <div className='flex flex-col xs:items-center sm:flex-row md:flex-row justify-between items-center gap-2 sticky left-0 top-0 right-0 '>
                    <div>
                        <h2 className="text-xl font-semibold mb-2 font-Gilroy text-black">ProductList</h2>
                    </div>

                    <div className="">
                        <button
                            onClick={() => { navigate('/add-products') }}
                            className="px-6 md:px-8 lg:px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat text-xs md:text-base font-medium flex items-center gap-2">
                            <img src={PlusCircle} alt="plus" className='w-4 md:w-5 lg:w-4' /> AddProduct</button>
                    </div>
                </div>

                <div className='grid md:grid-cols-12 sm:grid-cols-2 gap-3 mb-2 pt-4'>
                    <div className="relative col-span-7 cursor-pointer">
                        <SearchNormal1
                            size="16"
                            color="gray"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-500"
                        />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder='Search by name'
                            className="w-full bg-slate-100 border-slate-100 pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#205DA8] text-gray-500 font-Gilroy  text-sm font-medium"
                        />
                    </div>
                    <div className=" col-span-2 bg-slate-100  rounded-lg flex items-center gap-2 justify-center  cursor-pointer">
                        <img alt="plus" src={Filter}
                            className=" text-gray-500 h-4 w-4"
                        />

                        <label className='block text-gray-500 font-Gilroy  text-sm font-medium'>Filters</label>
                    </div>



                    <div className="relative col-span-3 bg-slate-100 rounded-lg cursor-pointer">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => setShowPicker(!showPicker)}
                        >
                            <Calendar
                                size="16"
                                color="gray"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                            />
                            <input
                                type="text"
                                value={`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
                                readOnly
                                className="w-full pl-10 pr-4 py-2 bg-transparent outline-none cursor-pointer block text-gray-500 font-Gilroy  text-sm font-medium"
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


                <div className="flex-1 flex flex-col">
                    <div className='overflow-x-auto rounded-xl border border-slate-200 max-h-[380px] overflow-y-auto p-0 mt-4 mb-extra'>
                        <table className="w-full table-auto border-collapse rounded-xl border-b-0 border-[#E1E8F0]">
                            <thead className="bg-slate-100 sticky top-0 z-10">
                                <tr>

                                    <th className="px-4 py-3 text-center text-neutral-800 text-sm font-medium font-Gilroy">S.No</th>
                                    <th className="px-4 py-2 text-center text-neutral-800 text-sm font-medium font-Gilroy">{renderSortableHeader("Product Name", "productName")}</th>
                                    <th className="px-4 py-2 text-center text-neutral-800 text-sm font-medium font-Gilroy">{renderSortableHeader("Ava. Qty", "quantity")}</th>
                                    <th className="px-4 py-2 text-center text-neutral-800 text-sm font-medium font-Gilroy">{renderSortableHeader("Make", "make")}</th>
                                    <th className="px-4 py-2 text-center text-neutral-800 text-sm font-medium font-Gilroy">{renderSortableHeader("Price", "price")}</th>
                                    <th className="px-4 py-2 text-center text-neutral-800 text-sm font-medium font-Gilroy">{renderSortableHeader("Currency", "currency")}</th>
                                    <th className="px-4 py-2 text-center text-neutral-800 text-sm font-medium font-Gilroy">{renderSortableHeader("Status", "status")}</th>
                                    <th className="px-4 py-2 text-center text-neutral-800 text-sm font-medium font-Gilroy">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {paginatedData?.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center text-red-600 font-Gilroy py-4">
                                            No Data Found
                                        </td>
                                    </tr>
                                ) : (
                                    paginatedData?.map((item, index) => (
                                        <tr key={index} className="border-0 mt-4">
                                            <td className="px-4 py-3 text-center text-sm font-Gilroy">{index + 1}</td>
                                            <td  onClick={()=>handleNavigateproductDetails(item)} className=" text-[#205DA8] hover:underline hover:cursor-pointer flex items-center px-6 py-3 font-Gilroy font-semibold text-sm  cursor-pointer">
                                                <img
                                                    src={item.images[0]?.url || Cloth}
                                                    alt={item.productName}
                                                    className="w-10 h-10 rounded-md mr-4"
                                                    onError={(e) => e.target.src = "/images/default.jpg"}
                                                />

                                                {item.productName}
                                            </td>

                                            <td className="py-3 pl-8 text-start text-black text-sm font-medium font-Gilroy mr-2">
                                                {item.quantity}
                                            </td>

                                            <td className="pl-6 text-start py-2 text-center text-black text-sm font-medium font-Gilroy">
                                                {item.make}
                                            </td>
                                            <td className="pl-4 text-start py-2 text-black text-sm font-medium font-Gilroy">
                                                {item.price}
                                            </td>

                                            <td className="pl-7 text-start py-2 text-black text-sm font-medium font-Gilroy">
                                                {item.currency}
                                            </td>

                                            <td
                                                className={`pl-6 text-start py-2 text-sm font-semibold font-Gilroy ${item.status === "Pending"
                                                    ? "text-orange-500"
                                                    : item.status === "Completed"
                                                        ? "text-green-500"
                                                        : "text-red-500"
                                                    }`}
                                            >
                                                {item.status}
                                            </td>

                                            <td className="px-4 py-2 text-center text-black text-sm font-medium font-Gilroy relative">
                                                <div
                                                    onClick={(e) => handleShowPopup(index, e)}
                                                    className="w-8 h-8 rounded-full border border-[#E1E8F0] flex items-center justify-center cursor-pointer hover:bg-slate-100 transition duration-200 ml-4"
                                                >
                                                    <HiOutlineDotsVertical className="text-black p-0" />
                                                    {showPopup === index && (
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
                                                            <div  
                                                            // onClick={() => handleEditProductPopup(item)}
                                                             className="px-4 py-2  flex items-center gap-2 font-Gilroy">
                                                                <Edit size="16" color="#205DA8" /> Edit
                                                            </div>
                                                            <div className="px-4 py-2 cursor-pointer flex items-center gap-2 font-Gilroy text-red-700"
                                                                onClick={() => handleDeleteProductPopup(item.uniqueProductCode)}
                                                            >
                                                                <Trash size="16" color="#B91C1C" /> Delete
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>



                        </table>
                    </div>
                </div>



                {
                    productList.length > 10 &&


                    <nav className="sticky flex flex-col xs:flex-row sm:flex-row md:flex-row justify-end items-center mt-4 bg-white p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                            <select
                                value={itemsPerPage}
                                onChange={handleItemsPerPageChange}
                                className="px-1 py-1 border border-[#205DA8] rounded-md text-[#205DA8] font-bold cursor-pointer outline-none shadow-none"
                            >
                                <option value={10}>10</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-4">
                            <ul className="flex items-center list-none m-0 p-0 gap-4">

                                <li>
                                    <button
                                        className={`px-2 py-1 rounded-full min-w-[30px] text-center border-none bg-transparent ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-[#1E45E1] cursor-pointer"
                                            }`}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        <ArrowLeft2 size="16" color={currentPage === 1 ? "#ccc" : "#205DA8"} />
                                    </button>
                                </li>


                                <li className="text-sm font-bold">
                                    {currentPage} of {totalPages}
                                </li>


                                <li>
                                    <button
                                        className={`px-2 py-1 rounded-full min-w-[30px] text-center border-none bg-transparent ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-[#1E45E1] cursor-pointer"
                                            }`}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        <ArrowRight2 size="16" color={currentPage === totalPages ? "#ccc" : "#1E45E1"} />
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>


                }




            </div>

            {showDeleteProduct && <DeleteProduct handleClose={handleCloseForDeleteProduct} deleteProductId={deleteProductId} />}

        </div>
    );
}

export default ProductList;
