/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RESET_CODE, GET_ACTIVITIES_SAGA } from '../../Utils/Constant'
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import { useNavigate } from 'react-router-dom';

function Activities() {


    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [activitiesList, setActivitiesList] = useState([])
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const paginatedData = activitiesList?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(activitiesList.length / itemsPerPage);


    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };


    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };


    const handleNavigateDetailsPage = (details) => {
        const id = details.transactionId
        if (id) {
            if (details.module === "client") {
                navigate(`/customer-details/${id}`)
            } else if (details.module === "vendor") {
                navigate(`/vendor-details/${id}`)
            }
            else if (details.module === "product") {
                navigate(`/product-details/${id}`);
            }
        }
    }



    useEffect(() => {
        dispatch({ type: GET_ACTIVITIES_SAGA })
        setLoading(true)
    }, [])




    useEffect(() => {
        if (state.Common.successCode === 200) {
            setActivitiesList(state.userInfo.ActivitiesList)
            setLoading(false)
            setTimeout(() => {
                dispatch({ type: RESET_CODE })
            }, 2000)

        }
    }, [state.Common.successCode])



    useEffect(() => {
        if (state.Common?.code === 400 || state.Common?.code === 401 || state.Common?.code === 402) {
            setLoading(false)
            setTimeout(() => {
                dispatch({ type: RESET_CODE })
            }, 3000)
        }
    }, [state.Common?.code]);

    return (
        <div>
            <div
                className="flex-1 flex flex-col relative"
            >
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                        <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
                    </div>
                )}
                <div className='overflow-x-auto rounded-xl border border-slate-200 max-h-[260px] overflow-y-auto p-0 mt-4 '>

                    <table className="w-full table-auto border-collapse rounded-xl border-b-0 border-[#E1E8F0]">
                        <thead className="bg-slate-100 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-2 text-center text-neutral-600 text-sm font-medium font-Gilroy">S.No</th>
                                <th className="px-4 py-2 text-left text-neutral-600 text-sm font-medium font-Gilroy">Activities</th>
                                <th className="px-4 py-2 text-center text-neutral-600 text-sm font-medium font-Gilroy">Date & Time</th>

                            </tr>
                        </thead>

                        <tbody>
                            {paginatedData.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="text-center text-red-600 font-Gilroy py-4">
                                        No Data Found
                                    </td>
                                </tr>
                            ) : (
                                paginatedData.map((item, index) => (
                                    <tr key={index} className="border-0">
                                        <td className="px-4 py-2 text-center text-black text-sm font-medium font-Gilroy">
                                            {(currentPage - 1) * itemsPerPage + index + 1}
                                        </td>

                                        <td title={`${item.description} ${item.type}`}
                                            className="text-[#222222] px-4 py-2 text-left text-md font-medium font-Gilroy "
                                        >
                                            {item.type === "Login" ? (
                                                <span className='overflow-hidden whitespace-nowrap text-ellipsis max-w-[50px]'> {item.description.toLowerCase().charAt(0).toUpperCase() + item.description.toLowerCase().slice(1)}</span>
                                            ) : (
                                                <>
                                                    {item.description.toLowerCase().charAt(0).toUpperCase() + item.description.toLowerCase().slice(1)}
                                                    <span className="text-xs text-[#205DA8] cursor-pointer hover:underline" onClick={() => handleNavigateDetailsPage(item)}>
                                                        _{item.type.toLowerCase().charAt(0).toUpperCase() + item.type.toLowerCase().slice(1)}
                                                    </span>
                                                </>
                                            )}
                                        </td>




                                        <td className="px-4 py-2 text-center text-black text-sm font-medium font-Gilroy overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">{item.datetime}</td>

                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>







                </div>


            </div>

            {activitiesList.length > 10 && (
               
                <nav className="absolute right-4 bottom-0  flex flex-col xs:flex-row sm:flex-row md:flex-row justify-end items-center mt-4 bg-white p-4 rounded-lg">
                    <div className="flex items-center gap-2">
                        <select
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="border border-[#205DA8] rounded-md text-[#205DA8] font-bold px-2 py-1 outline-none cursor-pointer"
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
                            className={`p-2 rounded-full ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-[#205DA8] cursor-pointer"
                                }`}
                        >
                            <ArrowLeft2 size="16" color={currentPage === 1 ? "#ccc" : "#205DA8"} />
                        </button>

                        <span className="text-sm font-bold">{currentPage} of {totalPages}</span>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`p-2 rounded-full ${currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-[#205DA8] cursor-pointer"
                                }`}
                        >
                            <ArrowRight2 size="16" color={currentPage === totalPages ? "#ccc" : "#205DA8"} />
                        </button>
                    </div>
                </nav>

            )}

        </div>
    )
}

export default Activities;