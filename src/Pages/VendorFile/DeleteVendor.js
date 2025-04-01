import React, { useEffect } from 'react'
import { DELETE_VENDOR_SAGA ,VENDOR_SAGA,RESET_CODE} from '../../Utils/Constant'
import { useDispatch, useSelector } from 'react-redux'


function DeleteCustomer({ handleClose, deleteVendorId }) {

    const dispatch = useDispatch()
    const state = useSelector(state => state)



    const handleDeleteVendor = () => {
        if (deleteVendorId) {
            dispatch({ type: DELETE_VENDOR_SAGA, payload: deleteVendorId })
        }
    }

    useEffect(() => {
        if (state.Common.successCode === 200) {
            dispatch({ type: VENDOR_SAGA, payload: { searchKeyword: "jos" } })

            dispatch({ type: RESET_CODE })
        }

    }, [state.Common.successCode])
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[388px] h-[200px] p-6">

                <div className="flex justify-center border-b-0">
                    <h2 className="text-[18px] font-semibold text-[#222222] text-center flex-1 font-Gilroy">
                        Delete Customer
                    </h2>
                </div>


                <div className="text-center text-[14px] text-[#646464] font-medium mt-[20px] font-Gilroy">
                    Are you sure you want to  Delete?
                </div>


                <div className="flex justify-center border-t-0 mt-[10px] space-x-4">
                    <button
                        onClick={handleClose}
                        className="w-[160px] h-[52px] rounded-lg border border-[#205DA8] text-[#205DA8] font-semibold text-[14px] bg-white font-Montserrat"

                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleDeleteVendor}
                        className="w-[160px] h-[52px] rounded-lg bg-[#205DA8] text-white font-semibold text-[14px] font-Montserrat"

                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteCustomer