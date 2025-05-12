/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DELETE_CUSTOMER_SAGA, GET_CUSTOMER_LIST_SAGA, RESET_CODE } from '../../Utils/Constant'
import PropTypes from 'prop-types'



function DeleteCustomer({ handleClose, deleteCustomerId }) {



    const dispatch = useDispatch()
    const state = useSelector(state => state)

    const [loading, setLoading] = useState(false)


    const handleDeleteCustomer = () => {
        if (deleteCustomerId) {
            setLoading(true)
            dispatch({ type: DELETE_CUSTOMER_SAGA, payload: deleteCustomerId })
        }
    }

    useEffect(() => {
        if (state.Common.successCode === 200) {
            setLoading(false)
            dispatch({ type: GET_CUSTOMER_LIST_SAGA , payload: { searchKeyword: "" } });
            dispatch({ type: RESET_CODE })
        }

    }, [state.Common.successCode])



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[388px]  h-fit  p-6">

                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                        <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
                    </div>
                )}


                <div className="flex justify-center border-b-0">
                    <h2 className="text-[18px] font-semibold text-[#222222] text-center flex-1 font-Gilroy">
                        Delete Customer
                    </h2>
                </div>


                <div className="text-center text-[14px] text-[#646464] font-medium mt-[15px] font-Gilroy">
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
                        onClick={handleDeleteCustomer}
                        className="w-[160px] h-[52px] rounded-lg bg-[#205DA8] text-white font-semibold text-[14px] font-Montserrat"

                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

DeleteCustomer.propTypes = {
    handleClose: PropTypes.func,
    deleteCustomerId: PropTypes.any
}

export default DeleteCustomer