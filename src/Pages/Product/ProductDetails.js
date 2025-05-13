/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GET_PARTICULAR_PRODUCT_SAGA, RESET_CODE, EDIT_PARTICULAR_PRODUCT_SAGA } from '../../Utils/Constant'
import moment from "moment";
import { Edit, DocumentDownload } from "iconsax-react";
import Pdf from '../../Asset/Images/pdf.png'
import WordIcon from '../../Asset/Images/doc.png';
import { InfoCircle } from "iconsax-react";
import Select from "react-select";



function ProductDetails() {





    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const { productId } = useParams()
    const productDetails = state.product.particularProductList
    const [showAll, setShowAll] = useState(false);
    const [showTechAll, setShowTechAll] = useState(false);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState({});


    const images = productDetails?.images ?? [];
    const imagesToShow = showAll ? images : images.slice(0, 6);
    const hasMoreImages = images.length > 6;

    const techImages = productDetails?.technicaldocs ?? [];
    const imagesToShowTech = showTechAll ? techImages : techImages.slice(0, 6);
    const hasMoreTechImages = techImages.length > 6;

    const [editingField, setEditingField] = useState(null);
    const [editedValue, setEditedValue] = useState("");

    const editableRef = useRef(null);


    const [containStates, setContainStates] = useState({});

    const handleImageLoad = (e, index) => {
        const { naturalWidth, naturalHeight } = e.target;
        setContainStates(prev => ({
            ...prev,
            [index]: naturalHeight > naturalWidth
        }));
    };


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
            setLoading(false)
            setTimeout(() => {
                dispatch({ type: RESET_CODE })
            }, 1000)
        }
    }, [state.Common?.successCode, state.Common?.code]);


    useEffect(() => {
        if (state.Common?.editStatusCode === 200) {
            dispatch({ type: GET_PARTICULAR_PRODUCT_SAGA, payload: productId });
            setLoading(false)
            setTimeout(() => {
                dispatch({ type: RESET_CODE })
            }, 1000)
        }

    }, [state.Common?.editStatusCode])

    const handleEditClick = (fieldKey, currentValue) => {
        setEditingField(fieldKey);
        setEditedValue(currentValue || "");
        setErrorMessage("");
    };




    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [editingField, editedValue, errorMessage]);

    const handleOutsideClick = (e) => {
        if (editableRef.current && !editableRef.current.contains(e.target)) {
            triggerUpdate();
            setEditingField(null);
            setErrorMessage({});
        }
    };





    const triggerUpdate = () => {
        if (!editingField) return;

        const fieldKeyMap = {
            product_name: "productName",
            description: "description",
            price: "price",
            discount: "discount",
            hsn_code: "hsnCode",
            origin_country: "countryOfOrigin",
            manufacturing_year: "manufacturingYearAndMonth",
            state: "State"
        };

        const currentValue = productDetails[fieldKeyMap[editingField]] || "";
        const readableFieldName = fieldKeyMap[editingField] || editingField;


        if (editedValue.trim() === currentValue.toString().trim()) {
            setErrorMessage({
                [editingField]: `No changes made to ${readableFieldName}`
            });
            return;
        }

        if (editedValue !== "" && Object.keys(errorMessage).length === 0) {
            let finalValue = editedValue;

            if (editingField === "manufacturing_year" && /^\d{8}$/.test(editedValue)) {
                const year = editedValue.slice(0, 4);
                const month = editedValue.slice(4, 6);
                const day = editedValue.slice(6, 8);
                finalValue = `${year}-${month}-${day}`;
            }



            dispatch({
                type: EDIT_PARTICULAR_PRODUCT_SAGA,
                payload: {
                    field: editingField,
                    value: finalValue,
                    uniqueProductCode: productDetails.uniqueProductCode
                }
            });

            setLoading(true);
            setEditingField(null);
        }
    };






    const handleValueChange = (e, customValue = null) => {
        const inputValue = customValue ?? e.target.value;
        let value = inputValue;
        let tempError = {};
        let finalValue = value;

        const fieldKey = fieldKeyMap[editingField] || editingField;
        const currentValue = productDetails[fieldKey];

        const readableFieldName = editingField.replace(/_/g, ' ');
        const capitalizedField = readableFieldName.charAt(0).toUpperCase() + readableFieldName.slice(1);
        setEditedValue(value);

        if (editingField === "manufacturing_year") {
            setEditedValue(value);

            const trimmedValue = value.trim();

            if (trimmedValue.length === 7 && /^\d{4}-\d{2}$/.test(trimmedValue)) {
                if (trimmedValue === currentValue?.toString().trim()) {
                    setErrorMessage({
                        [editingField]: `No changes made to ${readableFieldName}`
                    });
                    return;
                }

                finalValue = trimmedValue;

                dispatch({
                    type: EDIT_PARTICULAR_PRODUCT_SAGA,
                    payload: {
                        field: editingField,
                        value: finalValue,
                        uniqueProductCode: productDetails.uniqueProductCode
                    }
                });

                setErrorMessage({});
                setLoading(true);
                setEditingField(null);
                return;
            } else {

                tempError[editingField] = `${capitalizedField} must be in YYYY-MM format`;
                setErrorMessage(tempError);
                return;
            }
        }


        else if (["price", "discount"].includes(editingField)) {
            value = inputValue.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
            const trimmedValue = value.trim();

            if (trimmedValue === "" || isNaN(parseFloat(trimmedValue)) || !/^\d*\.?\d*$/.test(trimmedValue)) {
                tempError[editingField] = `${capitalizedField} is required`;
                setErrorMessage(tempError);
                setEditedValue(trimmedValue);
                return;
            }

            if (trimmedValue === currentValue?.toString().trim()) {
                setErrorMessage({
                    [editingField]: `No changes made to ${readableFieldName}`
                });
                return;
            }

            finalValue = trimmedValue;
            setEditedValue(trimmedValue);
        }

        else if (editingField === "origin_country") {
            value = inputValue.replace(/[^a-zA-Z\s]/g, '');
            finalValue = value;

            if (value.trim() === currentValue?.toString().trim()) {
                setErrorMessage({
                    [editingField]: `No changes made to ${readableFieldName}`
                });
                return;
            }

            setEditedValue(value);
        }


        if (requiredFields.includes(editingField)) {
            const trimmed = value.trim();
            if (trimmed === "") {
                tempError[editingField] = `Enter the ${readableFieldName}`;
                setErrorMessage(tempError);
                setEditedValue(value);
                return;
            } else {
                setErrorMessage(prev => {
                    const newErr = { ...prev };
                    delete newErr[editingField];
                    return newErr;
                });
            }
        }

        if (["state", "origin_country", "manufacturing_year"].includes(editingField)) {
            dispatch({
                type: EDIT_PARTICULAR_PRODUCT_SAGA,
                payload: {
                    field: editingField,
                    value: finalValue,
                    uniqueProductCode: productDetails.uniqueProductCode
                }
            });

            setLoading(true);
            setEditingField(null);
            return;
        }
    };





    const requiredFields = [
        "product_name",
        "description",
        "price",
        "discount",
        "hsn_code",
        "origin_country",
        "manufacturing_year",
        "state"
    ];



    const fieldKeyMap = {
        product_name: "productName",
        description: "description",
        price: "price",
        discount: "discount",
        hsn_code: "hsnCode",
        origin_country: "countryOfOrigin",
        manufacturing_year: "manufacturingYearAndMonth",
        state: "State"
    };

    const handleKeyDown = (e, fieldKey) => {
        if (e.key === "Enter") {
            let error = {};

            if (!editedValue && requiredFields.includes(fieldKey)) {
                error[fieldKey] = `Enter the ${fieldKey.replace(/_/g, ' ')}`;
                setErrorMessage(prev => ({ ...prev, ...error }));
                return;
            }

            const actualKey = fieldKeyMap[fieldKey] || fieldKey;
            const currentValue = productDetails[actualKey];



            const trimmedEdited = editedValue?.toString().trim();
            const trimmedCurrent = currentValue?.toString().trim();

            if (trimmedEdited === (trimmedCurrent || "")) {
                setErrorMessage({
                    [fieldKey]: `No changes made to ${fieldKey.replace(/_/g, ' ')}`
                });
                return;
            }

            if (Object.keys(errorMessage).length > 0) return;

            dispatch({
                type: EDIT_PARTICULAR_PRODUCT_SAGA,
                payload: {
                    field: fieldKey,
                    value: editedValue,
                    uniqueProductCode: productDetails.uniqueProductCode
                }
            });

            setLoading(true);
            setEditingField(null);
            setErrorMessage(prev => {
                const newErr = { ...prev };
                delete newErr[fieldKey];
                return newErr;
            });
        }
    };



    const currencySymbols = {
        USD: "$",
        INR: "₹",
        EUR: "€",
        GBP: "£",
        JPY: "¥"
    };
    const countryOptions = [
        { value: 'Select Country', label: 'Select Country', isDisabled: true },
        { value: 'India', label: 'India' },
        { value: 'United States', label: 'United States' },
        { value: 'United Kingdom', label: 'United Kingdom' },
        { value: 'Australia', label: 'Australia' },
        { value: 'Canada', label: 'Canada' },
        { value: 'Germany', label: 'Germany' },
        { value: 'France', label: 'France' },
        { value: 'Italy', label: 'Italy' },
        { value: 'Singapore', label: 'Singapore' },
        { value: 'Japan', label: 'Japan' },
        { value: 'China', label: 'China' }
    ];

    const stateOptions = [
        { value: 'Enter State', label: 'Enter State', isDisabled: true },
        { value: 'tamil-nadu', label: 'Tamil Nadu' },
        { value: 'maharashtra', label: 'Maharashtra' },
        { value: 'karnataka', label: 'Karnataka' },
        { value: 'delhi', label: 'Delhi' },
        { value: 'kerala', label: 'Kerala' },
        { value: 'gujarat', label: 'Gujarat' },
        { value: 'rajasthan', label: 'Rajasthan' },
        { value: 'west-bengal', label: 'West Bengal' },
        { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
        { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
        { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
        { value: 'bihar', label: 'Bihar' },
        { value: 'assam', label: 'Assam' },
        { value: 'odisha', label: 'Odisha' },
        { value: 'punjab', label: 'Punjab' }
    ];


    const customSelectStyles = {
        control: (base) => ({
            ...base,
            borderColor: '#D1D5DB',
            borderRadius: '0.5rem',
            boxShadow: 'none',
            cursor: 'pointer',
            padding: '6px 1px',
            minHeight: '46px',
            '&:hover': {
                borderColor: '#D1D5DB',
            },
            '&:focus-within': {
                borderColor: '#D1D5DB',
                boxShadow: 'none',
            },
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#205DA8' : 'white',
            color: state.isFocused ? 'white' : 'black',
            fontWeight: 500,
            padding: '4px 10px',
            cursor: 'pointer'
        }),

        menu: (base) => ({
            ...base,
            maxHeight: '120px',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            transition: 'all 0.3s ease-in-out',
            transformOrigin: 'top',
            overscrollBehaviorY: 'contain',
        }),
        menuList: (base) => ({
            ...base,
            maxHeight: '120px',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'thin',
            paddingRight: '4px',
            '&::-webkit-scrollbar': {
                width: '4px',
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#cbd5e1',
                borderRadius: '6px',
            },
        }),
        singleValue: (base, state) => ({
            ...base,
            color: state.data.value === '' ? 'oklch(70.8% 0 0)' : 'black'
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: '#94A3B8',
            padding: '0 8px',
        }),
    };


    return (
        <div className="bg-blueGray-100  w-full">
            <div className="p-3  flex flex-col" >
                <h1 className="text-xl font-semibold mb-2 font-Gilroy text-black sticky sticky top-0 bg-blueGray-100 z-10 ps-2">Product Detail</h1>


                <div className="p-6 bg-white  rounded-2xl relative ">
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                            <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
                        </div>
                    )}
                    <div className='lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-6  max-h-[460px] overflow-y-auto'>
                        <div className="grid grid-cols-2 gap-8 mb-3 p-2">
                            <div>
                                <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Product Images </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
                                    {imagesToShow.length > 0 ? imagesToShow.map((img, index) => {
                                        const isLastVisible = !showAll && index === 5;
                                        return (
                                            <div
                                                key={index}
                                                className="relative   w-full h-[120px] cursor-pointer font-Gilroy border border-gray-200 rounded-md"
                                                onClick={isLastVisible ? handleSeeMoreProductImages : undefined}
                                            >
                                                <img
                                                    src={img.url}
                                                    alt={`Product ${index}`}
                                                    onLoad={(e) => handleImageLoad(e, index)}
                                                    className={`rounded-md w-full h-full ${containStates[index] ? 'object-contain' : 'object-cover'}`}
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
                                    {imagesToShowTech.length > 0 ? imagesToShowTech?.map((img, index) => {
                                        const isLastVisible = !showTechAll && index === 5;
                                        const isPDF = img.url.endsWith(".pdf");
                                        const isDoc = img.url.endsWith(".doc") || img.url.endsWith(".docx") || img.url.endsWith(".txt");
                                        return (
                                            <div
                                                key={index}
                                                className="relative w-full h-[120px] cursor-pointer font-Gilroy border border-gray-200 rounded-md group hover:bg-gray-800 hover:bg-opacity-30"
                                                onClick={isLastVisible ? handleSeeMoreTechImages : undefined}
                                            >
                                                {isPDF ? (
                                                    <a
                                                        href={img.url}
                                                        rel="noopener noreferrer"
                                                        download
                                                        className="w-full h-full flex flex-col items-center justify-center p-2 relative "
                                                    >
                                                        <img
                                                            src={Pdf}
                                                            alt="PDF"
                                                            className="w-[100px] h-[120px] object-cover rounded-md"
                                                        />
                                                        <span className="hidden group-hover:flex items-center justify-center p-2 rounded-full bg-white bg-opacity-70 absolute top-2 right-2">
                                                            <DocumentDownload
                                                                size="24"
                                                                color="#205DA8"
                                                                variant="Bold"
                                                                className='cursor-pointer'
                                                            />
                                                        </span>
                                                    </a>
                                                ) : isDoc ? (
                                                    <a
                                                        href={img.url}
                                                        rel="noopener noreferrer"
                                                        download
                                                        className="w-full h-full flex flex-col items-center justify-center p-2 relative"
                                                    >
                                                        <img
                                                            src={WordIcon}
                                                            alt="DOC File"
                                                            className="w-[100px] h-[120px] object-contain rounded-md "
                                                        />
                                                        <p className="absolute bottom-1 text-xs text-black text-center truncate w-[90%] bg-white bg-opacity-80 px-1 rounded">{img.name}</p>
                                                        <span className="hidden group-hover:flex items-center justify-center p-2 rounded-full bg-white bg-opacity-70 absolute top-2 right-2">
                                                            <DocumentDownload
                                                                size="24"
                                                                color="#205DA8"
                                                                variant="Bold"
                                                                className='cursor-pointer'
                                                            />
                                                        </span>
                                                    </a>
                                                ) : (
                                                    <div className="relative w-full h-full">
                                                        <img
                                                            src={img.url}
                                                            alt={`Product ${index}`}
                                                            className="w-full h-[120px] object-cover rounded-md"
                                                        />
                                                    </div>
                                                )}


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

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 p-2 ">

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
                                        className=" placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-fit"
                                        value={editedValue}
                                        onChange={handleValueChange}
                                        placeholder='Enter Product Name'
                                        onKeyDown={(e) => handleKeyDown(e, "product_name")}
                                        autoFocus
                                    />
                                ) : (
                                    <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap capitalize">
                                        {productDetails.productName || "N/A"}
                                    </p>
                                )}
                                {errorMessage.product_name && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                        <InfoCircle size={14} color="#DC2626" />
                                        {errorMessage.product_name}
                                    </p>
                                )}
                            </div>


                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-12 p-2 ">

                            <div>
                                <div className='flex items-center space-x-3'>
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Description </p>
                                    <span className='flex mb-2 cursor-pointer'>
                                        <Edit size="16" color="#205DA8" onClick={() => handleEditClick("description", productDetails.description)} /></span>

                                </div>
                                {editingField === "description" ? (
                                    <input ref={editableRef}
                                        className=" placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-[500px]"
                                        value={editedValue}
                                        placeholder='Enter Description'
                                        onChange={handleValueChange}
                                        onKeyDown={(e) => handleKeyDown(e, "description")}
                                        autoFocus
                                    />
                                ) : (
                                    <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222]  capitalize">
                                        {productDetails.description || "N/A"}
                                    </p>
                                )}

                                {errorMessage.description && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                        <InfoCircle size={14} color="#DC2626" />
                                        {errorMessage.description}
                                    </p>
                                )}
                            </div>

                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 p-2 ">

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
                                        className=" placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-fit"
                                        value={editedValue}
                                        onChange={handleValueChange}
                                        onKeyDown={(e) => handleKeyDown(e, "price")}
                                        placeholder='Enter Price'
                                        autoFocus
                                    />
                                ) : (
                                    <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap capitalize">
                                        {productDetails.price || "N/A"}
                                    </p>
                                )}

                                {errorMessage.price && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                        <InfoCircle size={14} color="#DC2626" />
                                        {errorMessage.price}
                                    </p>
                                )}
                            </div>

                            <div>
                                <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Currency </p>
                                <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">
                                    {productDetails.currency ? `${currencySymbols[productDetails.currency] || ''} ${productDetails.currency}` : "N/A"}
                                </p>
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
                                        placeholder='Enter Discount'
                                        className=" placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-fit"
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

                                {errorMessage.discount && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                        <InfoCircle size={14} color="#DC2626" />
                                        {errorMessage.discount}
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
                                        className=" placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-fit"
                                        value={editedValue}
                                        placeholder='Enter HSN'
                                        onChange={handleValueChange}
                                        onKeyDown={(e) => handleKeyDown(e, "hsn_code")}
                                        autoFocus
                                    />
                                ) : (
                                    <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap capitalize">
                                        {productDetails.hsnCode || "N/A"}
                                    </p>
                                )}

                                {errorMessage.hsn_code && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                        <InfoCircle size={14} color="#DC2626" />
                                        {errorMessage.hsn_code}
                                    </p>
                                )}


                            </div>
                            <div>
                                <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">GST</p>
                                <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap">
                                    {productDetails.gst ? `${productDetails.gst}%` : "N/A"}
                                </p>
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

                                    <div ref={editableRef}>
                                        <Select
                                            options={countryOptions}
                                            value={countryOptions.find(option => option.value === editedValue)}
                                            onChange={(selectedOption) => handleValueChange(null, selectedOption.value)}
                                            className="font-Gilroy text-sm w-auto"
                                            classNamePrefix="react-select"
                                            placeholder="Enter Country of Origin"
                                            styles={customSelectStyles}
                                        />

                                    </div>




                                ) : (
                                    <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap capitalize">
                                        {productDetails.countryOfOrigin || "N/A"}
                                    </p>
                                )}
                                {errorMessage.origin_country && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                        <InfoCircle size={14} color="#DC2626" />
                                        {errorMessage.origin_country}
                                    </p>
                                )}

                            </div>
                            <div>
                                <div className='flex items-center space-x-3'>
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Month and Year of Manufacture</p>
                                    <span className='flex mb-2 cursor-pointer'> <Edit size="16" color="#205DA8" onClick={() =>
                                        handleEditClick("manufacturing_year", productDetails.manufaturingYearAndMonth)
                                    } /></span>

                                </div>
                                {editingField === "manufacturing_year" ? (
                                    <input ref={editableRef}
                                        type="month"
                                        className=" placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-fit"
                                        value={
                                            editedValue
                                                ? new Date(editedValue).toISOString().slice(0, 7)
                                                : ""
                                        }
                                        onChange={(e) => handleValueChange(e)}
                                        onKeyDown={(e) => handleKeyDown(e, "manufacturing_year")}
                                        autoFocus
                                    />
                                ) : (
                                    <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap capitalize">
                                        {productDetails.manufaturingYearAndMonth
                                            ? moment(productDetails.manufaturingYearAndMonth).format("MMMM YYYY")
                                            : "N/A"}
                                    </p>
                                )}
                                {errorMessage.manufacturing_year && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                        <InfoCircle size={14} color="#DC2626" />
                                        {errorMessage.manufacturing_year}
                                    </p>
                                )}
                            </div>
                            <div>
                                <div className='flex items-center space-x-3'>
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">State</p>
                                    <span className='flex mb-2 cursor-pointer'> <Edit size="16" color="#205DA8" onClick={() => handleEditClick("state", productDetails.State)} /></span>

                                </div>
                                {editingField === "state" ? (

                                    <div ref={editableRef}>
                                        <Select
                                            options={stateOptions}
                                            value={stateOptions.find(option => option.value === editedValue)}
                                            onChange={(selectedOption) => handleValueChange(null, selectedOption.value)}
                                            className="mb-2 font-Gilroy text-sm w-auto"
                                            classNamePrefix="react-select"
                                            placeholder="Enter State"
                                            styles={customSelectStyles}
                                            autoFocus
                                        />

                                    </div>

                                ) : (
                                    <p className="text-md font-semibold mb-2 font-Gilroy text-[#222222] overflow-hidden text-ellipsis whitespace-nowrap capitalize">
                                        {productDetails.State || "N/A"}
                                    </p>
                                )}
                                {errorMessage.state && (
                                    <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                        <InfoCircle size={14} color="#DC2626" />
                                        {errorMessage.state}
                                    </p>
                                )}


                            </div>



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
        </div>
    )
}

export default ProductDetails