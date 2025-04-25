/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GET_PARTICULAR_PRODUCT_SAGA, RESET_CODE, EDIT_PARTICULAR_PRODUCT_SAGA } from '../../Utils/Constant'
import moment from "moment";
import { Edit } from "iconsax-react";

function ProductDetails() {





    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const { productId } = useParams()
    const productDetails = state.product.particularProductList
    const [showAll, setShowAll] = useState(false);
    const [showTechAll, setShowTechAll] = useState(false);
    const [loading, setLoading] = useState(false)

    const images = productDetails?.images ?? [];
    const imagesToShow = showAll ? images : images.slice(0, 6);
    const hasMoreImages = images.length > 6;

    const techImages = productDetails?.technicaldocs ?? [];
    const imagesToShowTech = showTechAll ? techImages : techImages.slice(0, 6);
    const hasMoreTechImages = techImages.length > 6;

    const [editingField, setEditingField] = useState(null);
    const [editedValue, setEditedValue] = useState("");

    const editableRef = useRef(null);


   

    const handleSeeMoreProductImages = () => {
        setShowAll(true);
    };

    const handleSeeMoreTechImages = () => {
        setShowTechAll(true);
    };



    useEffect(() => {
        dispatch({ type: GET_PARTICULAR_PRODUCT_SAGA, payload: productId });
        setLoading(true)
    }, []);

    useEffect(() => {
        if (state.Common?.successCode === 200 || state.Common?.code === 400 || state.Common?.code === 401 || state.Common?.code === 402) {

            dispatch({ type: GET_PARTICULAR_PRODUCT_SAGA, payload: productId });
            setLoading(false)
            setTimeout(() => {
                dispatch({ type: RESET_CODE })
            }, 1000)
        }
    }, [state.Common?.successCode, state.Common?.code]);


    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);


        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleOutsideClick = (e) => {
        if (editableRef.current && !editableRef.current.contains(e.target)) {
            setEditingField(null);
        }
    };

    const handleEditClick = (fieldKey, currentValue) => {
        setEditingField(fieldKey);
        setEditedValue(currentValue || "");
    };

    const handleValueChange = (e) => {
        setEditedValue(e.target.value);
    };

    const handleKeyDown = (e, fieldKey) => {
        if (e.key === "Enter") {
            dispatch({
                type: EDIT_PARTICULAR_PRODUCT_SAGA,
                payload: {
                    field: fieldKey,
                    value: editedValue,
                    uniqueProductCode: productDetails.uniqueProductCode
                }
            });
            setEditingField(null);
        }
    };


    return (
        <div className="bg-blueGray-100 min-h-screen w-full">
            <div className="p-3  flex flex-col" >
                <h1 className="text-xl font-semibold mb-2 font-Gilroy text-black sticky sticky top-0 bg-blueGray-100 z-10 ">Product Detail</h1>


                <div className="p-8 bg-white  min-h-screen rounded-2xl relative">
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                            <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                            <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Product Images </p>
                            <div className="grid grid-cols-3 flex items-center justify-center ">
                                {imagesToShow.length > 0 ? imagesToShow.map((img, index) => {
                                    const isLastVisible = !showAll && index === 5;



                                    return (
                                        <div
                                            key={index}
                                            className="relative  w-[120px] h-[120px]  cursor-pointer font-Gilroy border border-gray-200 rounded-md"
                                            onClick={isLastVisible ? handleSeeMoreProductImages : undefined}
                                        >
                                            <img
                                                src={img.url}
                                                alt={`Product ${index}`}
                                                className="w-[120px] h-[120px] object-cover rounded-md"
                                            />


                                            {isLastVisible && hasMoreImages && (
                                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                                                    <span className="text-white font-semibold text-lg">See More</span>
                                                </div>
                                            )}
                                        </div>

                                    );
                                })

                                    :
                                    <label className="block  mb-2 text-start font-Gilroy font-normal text-md text-red-600">No product images available</label>



                                }
                            </div>
                        </div>


                        <div>
                            <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Tech Images </p>
                            <div className="grid grid-cols-3 flex items-center justify-center gap-4">
                                {imagesToShowTech.length > 0 ? imagesToShowTech?.map((img, index) => {
                                    const isLastVisible = !showTechAll && index === 5;

                                    return (
                                        <div
                                            key={index}
                                            className="relative w-[120px] h-[120px]  cursor-pointer font-Gilroy border border-gray-200 rounded-md"
                                            onClick={isLastVisible ? handleSeeMoreTechImages : undefined}
                                        >
                                            <img
                                                src={img.url}
                                                alt={`Product ${index}`}
                                                className=" w-[120px] h-[120px] object-cover rounded-md"
                                            />


                                            {isLastVisible && hasMoreTechImages && (
                                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                                                    <span className="text-white font-semibold text-lg">See More</span>
                                                </div>
                                            )}
                                        </div>

                                    );
                                })
                                    :


                                    <label className="block  mb-2 text-start font-Gilroy font-normal text-md text-red-600">No tech images available</label>



                                }
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-12 p-2 ">

                        <div>
                            <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Product Code </p>
                            <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap ">{productDetails.productCode || "N/A"}</p>
                        </div>
                        <div>
                            <div className='flex items-center space-x-3'>
                                <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Product Name</p>
                                <span className='flex mb-2 cursor-pointer'> <Edit size="16" color="#205DA8" onClick={() => handleEditClick("product_name", productDetails.productName)} /></span>

                            </div>
                            {editingField === "product_name" ? (
                                <input ref={editableRef}
                                    className="text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-md px-2 py-1 w-full"
                                    value={editedValue}
                                    onChange={handleValueChange}
                                    onKeyDown={(e) => handleKeyDown(e, "product_name")}
                                    autoFocus
                                />
                            ) : (
                                <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap capitalize">
                                    {productDetails.productName || "N/A"}
                                </p>
                            )}
                        </div>


                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-12 p-2 ">

                        <div>
                            <div className='flex items-center space-x-3'>
                                <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Description </p>
                                <span className='flex mb-2 cursor-pointer'> <Edit size="16" color="#205DA8" onClick={() => handleEditClick("description", productDetails.description)} /></span>

                            </div>
                            {editingField === "description" ? (
                                <input ref={editableRef}
                                    className="text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-md px-2 py-1 w-full"
                                    value={editedValue}
                                    onChange={handleValueChange}
                                    onKeyDown={(e) => handleKeyDown(e, "description")}
                                    autoFocus
                                />
                            ) : (
                                <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222]  capitalize">
                                    {productDetails.description || "N/A"}
                                </p>
                            )}                        </div>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-12 p-2 ">

                        <div>
                            <div className='flex items-center space-x-3'>
                                <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Available Quantity  </p>

                            </div>
                            <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{productDetails.quantity || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Unit of Measurement </p>
                            <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{productDetails.unit || "N/A"}</p>
                        </div>
                        <div>
                            <div className='flex items-center space-x-3'>
                                <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Price </p>
                                <span className='flex mb-2 cursor-pointer'> <Edit size="16" color="#205DA8" onClick={() => handleEditClick("price", productDetails.price)} /></span>

                            </div>
                            {editingField === "price" ? (
                                <input ref={editableRef}
                                    className="text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-md px-2 py-1 w-full"
                                    value={editedValue}
                                    onChange={handleValueChange}
                                    onKeyDown={(e) => handleKeyDown(e, "price")}
                                    autoFocus
                                />
                            ) : (
                                <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap capitalize">
                                    {productDetails.price || "N/A"}
                                </p>
                            )}                        </div>

                        <div>
                            <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Currency </p>
                            <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{productDetails.currency || "N/A"}</p>
                        </div>

                        <div>
                            <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Weight </p>
                            <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{productDetails.weight || "N/A"}</p>
                        </div>

                        <div>
                            <div className='flex items-center space-x-3'>
                                <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Discount </p>
                                <span className='flex mb-2 cursor-pointer'> <Edit size="16" color="#205DA8" onClick={() => handleEditClick("discount", productDetails.discount)} /></span>

                            </div>
                            {editingField === "discount" ? (
                                <input ref={editableRef}
                                    type="text"
                                    className="text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-md px-2 py-1 w-full"
                                    value={editedValue}
                                    onChange={handleValueChange}
                                    onKeyDown={(e) => handleKeyDown(e, "discount")}
                                    autoFocus
                                />
                            ) : (
                                <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">
                                    {productDetails.discount === "" || productDetails.discount === null || productDetails.discount === undefined
                                        ? "N/A"
                                        : productDetails.discount === "0" || productDetails.discount === 0
                                            ? "0"
                                            : `${productDetails.discount}%`}
                                </p>
                            )}
                        </div>

                        <div>
                            <div className='flex items-center space-x-3'>
                                <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">HSN </p>
                                <span className='flex mb-2 cursor-pointer'> <Edit size="16" color="#205DA8" onClick={() => handleEditClick("hsn_code", productDetails.hsnCode)} /></span>

                            </div>
                            {editingField === "hsn_code" ? (
                                <input ref={editableRef}
                                    className="text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-md px-2 py-1 w-full"
                                    value={editedValue}
                                    onChange={handleValueChange}
                                    onKeyDown={(e) => handleKeyDown(e, "hsn_code")}
                                    autoFocus
                                />
                            ) : (
                                <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap capitalize">
                                    {productDetails.hsnCode || "N/A"}
                                </p>
                            )}                        </div>
                        <div>
                            <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">GST </p>
                            <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{productDetails.gst || "N/A"}</p>
                        </div>
                        <div>
                            <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Serial No</p>
                            <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap capitalize">
                                {Array.isArray(productDetails.serialNo) && productDetails.serialNo.length > 0
                                    ? productDetails.serialNo.join(", ")
                                    : "N/A"}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Category</p>
                            <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">{productDetails.categoryName || "N/A"}</p>
                        </div>

                        <div>
                            <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Sub - Category</p>
                            <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap capitalize">{productDetails.subCategoryName || "N/A"}</p>
                        </div>

                        <div>
                            <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Brand</p>
                            <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap capitalize">{productDetails.brandName || "N/A"}</p>
                        </div>

                        <div>
                            <div className='flex items-center space-x-3'>
                                <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Country of Origin</p>
                                <span className='flex mb-2 cursor-pointer'> <Edit size="16" color="#205DA8" onClick={() => handleEditClick("origin_country", productDetails.countryOfOrigin)} /></span>

                            </div>
                            {editingField === "origin_country" ? (
                                <input ref={editableRef}
                                    className="text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-md px-2 py-1 w-full"
                                    value={editedValue}
                                    onChange={handleValueChange}
                                    onKeyDown={(e) => handleKeyDown(e, "origin_country")}
                                    autoFocus
                                />
                            ) : (
                                <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap capitalize">
                                    {productDetails.countryOfOrigin || "N/A"}
                                </p>
                            )}                          </div>
                        <div>
                            <div className='flex items-center space-x-3'>
                                <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Month and Year of Manufacture</p>
                                <span className='flex mb-2 cursor-pointer'> <Edit size="16" color="#205DA8" onClick={() =>
                                    handleEditClick("manufacturing_year", productDetails.manufaturingYearAndMonth)
                                } /></span>

                            </div>
                            {editingField === "manufacturing_year" ? (
                                <input ref={editableRef}
                                    type="date"
                                    className="text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-md px-2 py-1"
                                    value={
                                        editedValue
                                            ? moment(editedValue).format("YYYY-MM-DD")
                                            : ""
                                    }
                                    onChange={(e) => handleValueChange(e)}
                                    onKeyDown={(e) => handleKeyDown(e, "manufacturing_year")}
                                    autoFocus
                                />
                            ) : (
                                <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap capitalize">
                                    {productDetails.manufaturingYearAndMonth
                                        ? moment(productDetails.manufaturingYearAndMonth).format("DD-MM-YYYY")
                                        : "N/A"}
                                </p>
                            )}

                        </div>
                        <div>
                            <div className='flex items-center space-x-3'>
                                <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">State</p>
                                <span className='flex mb-2 cursor-pointer'> <Edit size="16" color="#205DA8" onClick={() => handleEditClick("state", productDetails.State)} /></span>

                            </div>
                            {editingField === "state" ? (
                                <input ref={editableRef}
                                    className="text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-md px-2 py-1 w-full"
                                    value={editedValue}
                                    onChange={handleValueChange}
                                    onKeyDown={(e) => handleKeyDown(e, "state")}
                                    autoFocus
                                />
                            ) : (
                                <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap capitalize">
                                    {productDetails.State || "N/A"}
                                </p>
                            )}                                 </div>



                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-12 p-2 ">
                        {productDetails.additional_fields?.map((field, index) => (
                            field.value && field.value.toString().trim().length > 0 && (
                                <div key={index} className="mb-4 ">
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B] capitalize">{field.title}</p>
                                    <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap capitalize">
                                        {field.value}
                                    </p>
                                </div>
                            )
                        ))}

                    </div>






                </div>

            </div>
        </div>
    )
}

export default ProductDetails