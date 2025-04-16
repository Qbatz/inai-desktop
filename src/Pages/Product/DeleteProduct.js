import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DELETE_PRODUCT_SAGA, RESET_CODE, GET_PRODUCT_SAGA } from '../../Utils/Constant'
import { useDispatch, useSelector } from 'react-redux';


function DeleteProduct({ handleClose, deleteProductId }) {

    const dispatch = useDispatch();
    const state = useSelector(state => state)
    const [loading, setLoading] = useState(false)

    const handleDeleteProduct = () => {
        if (deleteProductId) {
            setLoading(true)
            dispatch({ type: DELETE_PRODUCT_SAGA , payload: {product_code: deleteProductId}})
        }
    }

    useEffect(() => {
        if (state.Common.successCode === 200) {
            setLoading(false)
            dispatch({ type: GET_PRODUCT_SAGA , payload:{ searchKeyword: ""}});
            dispatch({ type: RESET_CODE })
        }

    }, [state.Common.successCode])
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-[388px] h-[200px] p-6">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                        <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
                    </div>
                )}

                <div className="flex justify-center border-b-0">
                    <h2 className="text-[18px] font-semibold text-[#222222] text-center flex-1 font-Gilroy">
                        Delete Product
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
                        onClick={handleDeleteProduct}
                        className="w-[160px] h-[52px] rounded-lg bg-[#205DA8] text-white font-semibold text-[14px] font-Montserrat"

                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}
DeleteProduct.propTypes = {
    handleClose: PropTypes.func.isRequired,
    deleteProductId: PropTypes.string.isRequired,
};

export default DeleteProduct;