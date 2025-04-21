import { takeEvery, call, put } from "redux-saga/effects";
import {
    ERROR_CODE,
    GET_PRODUCT_REDUCER,
    GET_PRODUCT_SAGA,
    SUCCESS_CODE,
    ADD_PRODUCT_SAGA,
    DELETE_PRODUCT_SAGA,
    EDIT_PRODUCT_SAGA,
    GET_CATEGORY_REDUCER,
    GET_CATEGORY_SAGA,
    GET_SUB_CATEGORY_SAGA,
    GET_SUB_CATEGORY_REDUCER,
    GET_BRAND_REDUCER,
    GET_BRAND_SAGA,
    EDIT_IMAGE_PRODUCT_SAGA,
    EDIT_TECH_IMAGE_PRODUCT_SAGA,
    DELETE_IMAGE_PRODUCT_SAGA,
    DELETE_TECH_IMAGE_PRODUCT_SAGA,
    ADD_IMAGE_PRODUCT_SAGA,
    ADD_TECH_IMAGE_PRODUCT_SAGA



} from "../../Utils/Constant";
import { refreshToken } from "../../Token_Access/Token";
import { addTechImage,addImage,DeleteProductTechImage,DeleteProductImage,getProduct, addProduct, DeleteProduct, editProduct, GetCategory, GetSubCategory, GetBrand, editImage,editTechImage} from "../Action/ProductAction";
import { toast } from 'react-toastify';



export const toastStyle = {
    backgroundColor: "#28C76F",
    color: "#F8F9FA",
    width: "100%",
    borderRadius: "12px",
    height: "40px",
    fontFamily: "Gilroy",
    fontWeight: 600,
    fontSize: "14px",
    textAlign: "start",
    display: "flex",
    alignItems: "center",
    padding: "12px 20px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
};





function* handleCategory() {
    try {
        const response = yield call(GetCategory)
        if (response.status === 200) {
            yield put({ type: GET_CATEGORY_REDUCER, payload: { response: response.data } });

        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.detail || error?.response?.data?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}


function* handleSubCategory(category) {
    try {
        const response = yield call(GetSubCategory, category.payload)
        if (response.status === 200) {
            yield put({ type: GET_SUB_CATEGORY_REDUCER, payload: { response: response.data } });

        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.detail || error?.response?.data?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}





function* handleGetBrand() {
    try {
        const response = yield call(GetBrand)
        if (response.status === 200) {
            yield put({ type: GET_BRAND_REDUCER, payload: { response: response.data } });

        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.detail || error?.response?.data?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}


function* handleGetProduct(action) {
    try {
        const response = yield call(getProduct, action.payload)
        if (response.status === 200) {
            yield put({ type: GET_PRODUCT_REDUCER, payload: { response: response.data.products } });
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });

        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.detail || error?.response?.data?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}

function* handleAddProduct(action) {
    try {
        const response = yield call(addProduct, action.payload)

    
        if (response.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message, IsVisible: 1 } });
            toast.success(response.data.message || 'Success!', {
                autoClose: 2000,
                icon: false,
                hideProgressBar: true,
                closeButton: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: toastStyle

            });
        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.detail || error?.response?.data?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}



function* handleDeleteProduct(action) {
    try {
        const response = yield call(DeleteProduct, action.payload)

        

        if (response.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });
            toast.success(response.data.message || 'Success!', {
                autoClose: 2000,
                icon: false,
                hideProgressBar: true,
                closeButton: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: toastStyle

            });
        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.detail || error?.response?.data?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}



function* handleEditProduct(action) {
    try {
        const response = yield call(editProduct, action.payload)

        if (response.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message ,IsVisible: 1 } });
            toast.success(response.data.message || 'Success!', {
                autoClose: 2000,
                icon: false,
                hideProgressBar: true,
                closeButton: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: toastStyle

            });
        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.detail || error?.response?.data?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}

function* handleEditImageProduct(action) {
    try {
        const response = yield call(editImage, action.payload)

        if (response.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });
            toast.success(response.data.message || 'Success!', {
                autoClose: 2000,
                icon: false,
                hideProgressBar: true,
                closeButton: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: toastStyle

            });
        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.detail || error?.response?.data?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}

function* handleEditTechImageProduct(action) {
    try {
        const response = yield call(editTechImage, action.payload)

        if (response.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });
            toast.success(response.data.message || 'Success!', {
                autoClose: 2000,
                icon: false,
                hideProgressBar: true,
                closeButton: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: toastStyle

            });
        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.detail || error?.response?.data?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}

function* handleDeleteImageProduct(action) {
    try {
        const response = yield call(DeleteProductImage, action.payload)

        

        if (response.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message } });
            toast.success(response.data.message || 'Success!', {
                autoClose: 2000,
                icon: false,
                hideProgressBar: true,
                closeButton: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: toastStyle

            });
        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.detail || error?.response?.data?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}


function* handleDeleteTechImageProduct(action) {
    try {
        const response = yield call(DeleteProductTechImage, action.payload)


        if (response.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message} });
            toast.success(response.data.message || 'Success!', {
                autoClose: 2000,
                icon: false,
                hideProgressBar: true,
                closeButton: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: toastStyle

            });
        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.detail || error?.response?.data?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}




function* handleAddImage(action) {
    try {
        const response = yield call(addImage, action.payload)

     

        if (response.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message} });
            toast.success(response.data.message || 'Success!', {
                autoClose: 2000,
                icon: false,
                hideProgressBar: true,
                closeButton: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: toastStyle

            });
        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.detail || error?.response?.data?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}

function* handleAddTechImage(action) {
    try {
        const response = yield call(addTechImage, action.payload)

             if (response.status === 200) {
            yield put({ type: SUCCESS_CODE, payload: { statusCode: response.status, message: response.data.message} });
            toast.success(response.data.message || 'Success!', {
                autoClose: 2000,
                icon: false,
                hideProgressBar: true,
                closeButton: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: toastStyle

            });
        }
        else if (response.status === 201) {
            yield put({ type: ERROR_CODE, payload: { message: response.data.message || response.message, statusCode: response.status } })
        }

        if (response) {
            refreshToken(response)
        }
    } catch (error) {
        const errorMessage = error?.response?.data?.detail || error?.response?.data?.message;
        const statusCode = error?.response?.status || error?.status;
        yield put({ type: ERROR_CODE, payload: { message: errorMessage, statusCode } });
    }

}




function* ProductSaga() {
    yield takeEvery(GET_PRODUCT_SAGA, handleGetProduct)
    yield takeEvery(ADD_PRODUCT_SAGA, handleAddProduct)
    yield takeEvery(DELETE_PRODUCT_SAGA, handleDeleteProduct)
    yield takeEvery(EDIT_PRODUCT_SAGA, handleEditProduct)
    yield takeEvery(GET_CATEGORY_SAGA, handleCategory)
    yield takeEvery(GET_SUB_CATEGORY_SAGA, handleSubCategory)
    yield takeEvery(GET_BRAND_SAGA, handleGetBrand)
    yield takeEvery(EDIT_IMAGE_PRODUCT_SAGA, handleEditImageProduct)
    yield takeEvery(EDIT_TECH_IMAGE_PRODUCT_SAGA , handleEditTechImageProduct)
    yield takeEvery(DELETE_IMAGE_PRODUCT_SAGA,handleDeleteImageProduct)
    yield takeEvery(DELETE_TECH_IMAGE_PRODUCT_SAGA,handleDeleteTechImageProduct)
    yield takeEvery(ADD_IMAGE_PRODUCT_SAGA,handleAddImage)
    yield takeEvery(ADD_TECH_IMAGE_PRODUCT_SAGA,handleAddTechImage)
  

}
export default ProductSaga;