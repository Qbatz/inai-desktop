import React, { useState, useRef, useEffect } from 'react'
import PlusCircle from '../Images/Plus_Circle.svg'
import { SearchNormal1, Calendar, Edit, Trash, ArrowLeft2, ArrowRight2 } from "iconsax-react";
import Filter from '../Images/filter.png'
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { enGB } from "date-fns/locale";
import BasicVendor from "../VendorFile/BasicVendor";
import DeleteVendor from './DeleteVendor';
import Minus from '../Icon/minus-square.svg';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { RESET_CODE, VENDOR_SAGA } from '../Utils/Constant'
import VendorDetails from './VendorDetails'


function VendorList() {


  const dispatch = useDispatch();
  const state = useSelector(state => state)



  const [showPicker, setShowPicker] = useState(false);
  const [isVisible, setIsVisible] = useState(true)
  const [showAddVendor, setShowAddVendor] = useState(false)
  const [showPopup, setShowPopUp] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const popupRef = useRef(null);
  const pickerRef = useRef(null);
  const [showDeleteVendor, setShowDeleteVendor] = useState(false)
  const [vendorList, setVendorList] = useState([])
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [vendorDetails, setVendorDetails] = useState('')
  const [deleteVendorId, setDeleteVendorId] = useState('')
  const [showParticularVendor, setShowParticularVendor] = useState(false)
  const [particularVendorDetails, setParticularVendorDetails] = useState('')

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const paginatedData = vendorList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(vendorList.length / itemsPerPage);

  const handleSelect = (ranges) => {
    console.log("ranges", ranges)
    setDateRange([ranges.selection]);
    setShowPicker(false);
  };

  const handleAddVendor = () => {
    setShowAddVendor(true)
    setIsVisible(false)
    setVendorDetails('')
  }

  const handleClose = () => {
    dispatch({ type: RESET_CODE })
    setShowAddVendor(false)
    setIsVisible(true)
  }

  const handleShowPopup = (id, event) => {
    const { top, left, height } = event.target.getBoundingClientRect();
    setPopupPosition({
      top: top + height + 5,
      left: left - 150,
    });
    setShowPopUp(showPopup === id ? null : id);
  };




  const handleDeleteVendorPopup = (item) => {

    setShowDeleteVendor(true)
    setDeleteVendorId(item.vendorId)
    setShowPopUp(null)
  }

  const handleCloseForDeleteVedor = () => {
    setShowDeleteVendor(false)
  }

  const handleEditVendor = (vendorDetails) => {
    console.log("vendorDetails", vendorDetails)
    setShowAddVendor(true)
    setIsVisible(false)
    setVendorDetails(vendorDetails)
  }

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };


  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };


  const handleViewVendor = (item) => {
    setShowParticularVendor(true)
    setIsVisible(false)
    setParticularVendorDetails(item)
  }

  const handleCloseViewVendor = () => {
    setShowParticularVendor(false)
    setIsVisible(true)
  }


  // useEffect///////////////////////////////////////////////////////////////////////////



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
    if (state.Common.successCode === 200) {
      setShowDeleteVendor(false)
      setShowAddVendor(false)
      // setIsVisible(true)
      dispatch({ type: RESET_CODE })
    }

  }, [state.Common.successCode])



  useEffect(() => {
    dispatch({ type: VENDOR_SAGA, payload: { searchKeyword: "jos" } })
  }, [])


  console.log("state", state)

  useEffect(() => {
    if (state.Common.successCode === 200) {
      setVendorList(state.vendor?.vendorList)

      setTimeout(() => {
        dispatch({ type: RESET_CODE })
      }, 5000)

    }

  }, [state.Common.successCode])






console.log("isVisible",isVisible)





  return (

    <>
      <div className='bg-slate-100  h-fit w-full p-4 rounded-tl-lg rounded-tr-lg   m-0'>

        {
          state.Common.successMessage && <label className="block  mb-2 text-start font-Gilroy font-normal text-md text-green-600"> {state.Common.successMessage} </label>
        }
        {
          isVisible ?

          <div className=' bg-white rounded-2xl h-fit ps-5 pt-3 pe-5'>


            <div className="sticky top-0 z-10 flex flex-col xs:items-center sm:flex-row md:flex-row justify-between items-center gap-2">

              <h2 className=" text-lg sm:text-xl md:text-xl lg:text-xl font-semibold font-Gilroy text-black">
                Vendor
              </h2>

              <button
                onClick={handleAddVendor}
                className="px-6 md:px-8 lg:px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat text-xs md:text-base font-medium flex items-center gap-2"
              >
                <img src={PlusCircle} alt="plus" className="w-4 md:w-5 lg:w-4" />
                Add Vendor
              </button>
            </div>


            <div className='grid md:grid-cols-12 sm:grid-cols-2 gap-3 mb-2 pt-4 overflow-y-auto'>
              <div className="relative  col-span-7">
                <SearchNormal1
                  size="16"
                  color="gray"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-500"
                />
                <input
                  type="text"
                  className="w-full bg-slate-100 border-slate-100 pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#205DA8] text-gray-500 font-Gilroy  text-sm font-medium"
                />
              </div>
              <div className=" col-span-2 bg-slate-100  rounded-lg flex items-center gap-2 justify-center  cursor-pointer">
                <img alt="plus" src={Filter}
                  className=" text-gray-500 h-4 w-4"
                />

                <label className="hidden xs:hidden sm:block md:block lg:block text-gray-500 font-Gilroy text-sm font-medium">
                  Filters
                </label>


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

            <div className="flex-1 overflow-x-auto rounded-xl border border-slate-200 max-h-[340px] overflow-y-auto p-0 mt-4 mb-extra">
              <table className="w-full  table-auto border-collapse  rounded-xl border-b-0 border-[#E1E8F0]">
                <thead className="bg-slate-100 sticky top-0 z-10">
                  <tr>
                    {/* <th className="px-4 py-2">
                    <img src={Minus} alt='Minus' />
                  </th> */}
                    <th className=" px-4 py-2 text-center text-neutral-600 text-sm font-medium font-Gilroy">Business Name</th>
                    <th className=" px-4 py-2 text-center text-neutral-600 text-sm font-medium font-Gilroy">Contact Person Name</th>
                    <th className=" px-4 py-2 text-center text-neutral-600 text-sm font-medium font-Gilroy">Email ID</th>
                    <th className=" px-4 py-2 text-center text-neutral-600 text-sm font-medium font-Gilroy">Mobile no.</th>
                    <th className=" px-4 py-2 text-center text-neutral-600 text-sm font-medium font-Gilroy">Receivable Amount</th>
                    <th className=" px-4 py-2 text-center text-neutral-600 text-sm font-medium font-Gilroy"></th>


                  </tr>
                </thead>
                <tbody className=" ">
                  {paginatedData.map((item, index) => (
                    <tr key={index} className="border-0">
                      {/* <td className=" px-4 py-2"> <img src={Minus} alt='Minus' /></td> */}
                      <td className=" px-4 py-2 text-center text-trueGray-600 text-sm font-medium font-Gilroy hover:underline hover:cursor-pointer text-[#205DA8]" onClick={() => handleViewVendor(item.vendorId)}>{item.businessName}</td>
                      <td className=" px-4 py-2 text-center text-trueGray-600 text-sm font-medium font-Gilroy">{item.contactPersonName}</td>
                      <td className=" px-4 py-2 text-center text-trueGray-600 text-sm font-medium font-Gilroy" >{item.emailId}</td>
                      <td className=" px-4 py-2 text-center text-trueGray-600 text-sm font-medium font-Gilroy">{item.contactNumber}</td>
                      <td className=" px-4 py-2 text-center text-trueGray-600 text-sm font-medium font-Gilroy">{item.Amount || '-'}</td>
                      <td className="px-4 py-2 text-center text-black text-sm font-medium font-Gilroy relative">
                        <div onClick={(e) => handleShowPopup(index, e)} className="w-8 h-8 rounded-full border border-[#E1E8F0] flex items-center justify-center cursor-pointer hover:bg-slate-100 transition duration-200">
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
                              <div className="px-4 py-2 cursor-pointer  flex items-center gap-2 font-Gilroy" onClick={() => handleEditVendor(item)}>
                                <Edit size="16" color="#205DA8" /> Edit
                              </div>
                              <div className="px-4 py-2 cursor-pointer  flex items-center gap-2 font-Gilroy text-red-700" onClick={() => handleDeleteVendorPopup(item)}>
                                <Trash size="16" color="#B91C1C" /> Delete
                              </div>
                            </div>
                          )}
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <nav className="sticky flex flex-col xs:flex-row sm:flex-row md:flex-row justify-end items-center mt-4 bg-white p-4 rounded-lg">
              <div className="flex items-center gap-2">

                <select
                  value={itemsPerPage}
                  onChange={handleItemsPerPageChange}
                  className="border border-[#205DA8] rounded-md text-[#205DA8] font-bold px-2 py-1 outline-none"
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
          </div>
:
null
        }
        {
          showAddVendor &&
          <BasicVendor handleClose={handleClose} vendorDetails={vendorDetails} />}

        {
          showDeleteVendor &&
          <DeleteVendor handleClose={handleCloseForDeleteVedor} deleteVendorId={deleteVendorId} />
        }

        {
          showParticularVendor &&
          <VendorDetails handleCloseVendor={handleCloseViewVendor} particularVendorDetails={particularVendorDetails} />
        }








      </div>

    </>
  )
}

export default VendorList;

