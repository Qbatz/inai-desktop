/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RESET_CODE } from '../../Utils/Constant'
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

function Activities() {


    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const [ activitiesList,  setActivitiesList] = useState([])
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


    

    const tableData = [
        {
          serialNo: 1,
          activity: "Activity 1",
          time: "10:00 AM"
        },
        {
          serialNo: 2,
          activity: "Activity 2",
          time: "11:00 AM"
        },
        {
          serialNo: 3,
          activity: "Activity 3",
          time: "12:00 PM"
        },
        
      ];
      


    useEffect(() => {
        if (state.Common.successCode === 200) {
            setActivitiesList(tableData)
            setTimeout(() => {
                dispatch({ type: RESET_CODE })
            }, 2000)

        }
    }, [state.Common.successCode])

    return (
        <div>
            <div
                className="flex-1 flex flex-col"
            >
                <div className='overflow-x-auto rounded-xl border border-slate-200 max-h-[250px] overflow-y-auto p-0 mt-4 mb-extra'>

                    <table className="w-full table-auto border-collapse rounded-xl border-b-0 border-[#E1E8F0]">
                        <thead className="bg-slate-100 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-2 text-center text-neutral-600 text-sm font-medium font-Gilroy">S.No</th>
                                <th className="px-4 py-2 text-center text-neutral-600 text-sm font-medium font-Gilroy">Activities</th>
                                <th className="px-4 py-2 text-center text-neutral-600 text-sm font-medium font-Gilroy">Time</th>
                               
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

                                        <td className="text-[#205DA8] px-4 py-2 text-center text-sm font-medium font-Gilroy overflow-hidden hover:underline hover:cursor-pointer" >{item.businessName}</td>
                                        <td className="px-4 py-2 text-center text-black text-sm font-medium font-Gilroy overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">{item.title}.{item.contactPerson}</td>
                                      
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>







                </div>


            </div>

            {activitiesList.length > 10 && (
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
            )}

        </div>
    )
}

export default Activities;