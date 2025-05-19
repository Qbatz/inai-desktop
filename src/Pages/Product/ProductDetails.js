/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GET_PARTICULAR_PRODUCT_SAGA, RESET_CODE, EDIT_PARTICULAR_PRODUCT_SAGA } from '../../Utils/Constant'
import Pdf from '../../Asset/Images/pdfImage.png'
import WordIcon from '../../Asset/Images/doc.png';
import { InfoCircle } from "iconsax-react";
import Select from "react-select";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarDays } from "lucide-react";
import PropTypes from 'prop-types';
import { FaDownload } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import { FaAngleLeft } from "react-icons/fa6";





const CustomInput = forwardRef(({ value, onClick, placeholder, className, ...rest }, ref) => {
    return (
        <div
            ref={ref}
            onClick={onClick}
            className={`flex w-full font-Gilroy items-center border border-gray-300 rounded-xl px-3 py-3 text-md text-gray-700 cursor-pointer ${className || ''}`}
            {...rest}
        >
            <input
                type="text"
                className="flex-1 font-Gilroy bg-transparent outline-none py-0.5 font-semibold text-sm text-[#222222] placeholder-gray-400 cursor-pointer"
                value={value}
                placeholder={placeholder}
                readOnly
            />
            <CalendarDays className="text-gray-400 ml-2 shrink-0 cursor-pointer" size={18} />
        </div>
    );
});
CustomInput.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
    placeholder: PropTypes.string,
    className:PropTypes.string,
};

function ProductDetails() {

    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const { productId } = useParams()
    const productDetails = state?.product?.particularProductList
    const scrollRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);


    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState({});

    const imagesToShow = productDetails?.images ?? [];
    const imagesToShowTech = productDetails?.technicaldocs ?? [];
    const [editingField, setEditingField] = useState(null);
    const [editedValue, setEditedValue] = useState("");

    const editableRef = useRef(null);
    const [containStates, setContainStates] = useState({});
    const [editedValues, setEditedValues] = useState({
        product_name: "",
        description: "",
        price: "",
        discount: "",
        hsn_code: "",
        gst: "",
        manufacturing_year: "",
        origin_country: "",
    });


    const handleImageLoad = (e, index) => {
        const { naturalWidth, naturalHeight } = e.target;
        setContainStates(prev => ({
            ...prev,
            [index]: naturalHeight > naturalWidth
        }));
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
        manufacturing_year: "manufaturingYearAndMonth",
        state: "State"
    };


    const triggerUpdate = () => {
        if (!editingField) return;

        const currentValue = productDetails[fieldKeyMap[editingField]] || "";
        const readableFieldName = fieldKeyMap[editingField] || editingField;

        const edited = editedValues?.[editingField]?.toString().trim() || "";

        if (edited === currentValue.toString().trim()) {
            setErrorMessage({
                [editingField]: `No changes made to ${readableFieldName}`
            });
            return;
        }

        if (edited !== "" && Object.keys(errorMessage).length === 0) {
            let finalValue = edited;

            if (editingField === "manufacturing_year" && /^\d{8}$/.test(edited)) {
                const year = edited.slice(0, 4);
                const month = edited.slice(4, 6);
                const day = edited.slice(6, 8);
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






    const handleValueChange = (field, e, customValue = null) => {
        setErrorMessage({})
        let inputValue = customValue ?? e?.target?.value ?? '';

        setEditingField(field);


        if (inputValue instanceof Date && field === "manufacturing_year") {
            const year = inputValue.getFullYear();
            const month = String(inputValue.getMonth() + 1).padStart(2, '0');
            inputValue = `${year}-${month}`;
        }

        let value = typeof inputValue === 'string' ? inputValue : String(inputValue ?? '');

        const readableFieldName = field.replace(/_/g, ' ');
        const capitalizedField = readableFieldName.charAt(0).toUpperCase() + readableFieldName.slice(1);


        setEditedValues(prev => ({
            ...prev,
            [field]: value
        }));


        let tempError = { ...errorMessage };


        if (requiredFields.includes(field) && value.trim() === "") {
            tempError[field] = `Enter the ${readableFieldName}`;
        } else {
            delete tempError[field];
        }


        if (field === "manufacturing_year") {
            if (!/^\d{4}-\d{2}$/.test(value.trim())) {
                tempError[field] = `${capitalizedField} must be in YYYY-MM format`;
            }
        }

        if (["price", "discount"].includes(field)) {
            let cleanedValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
            setEditedValues(prev => ({
                ...prev,
                [field]: cleanedValue
            }));
            if (!cleanedValue || isNaN(cleanedValue)) {
                tempError[field] = `${capitalizedField} is required and must be a valid number`;
            }
        }

        if (field === "origin_country") {
            let cleanedValue = value.replace(/[^a-zA-Z\s]/g, '');
            setEditedValues(prev => ({
                ...prev,
                [field]: cleanedValue
            }));
        }

        setErrorMessage(tempError);
        if (Object.keys(tempError).length === 0) {
            if (["state", "origin_country", "manufacturing_year"].includes(field)) {

                const key = fieldKeyMap[field] ?? field;
                let existingValue = productDetails[key] ?? "";

                if (field === "manufacturing_year") {

                    if (typeof existingValue === "string" && /^\d{4}-\d{2}-\d{2}T/.test(existingValue)) {
                        existingValue = existingValue.slice(0, 7);
                    }

                    if (existingValue instanceof Date) {
                        const year = existingValue.getFullYear();
                        const month = String(existingValue.getMonth() + 1).padStart(2, '0');
                        existingValue = `${year}-${month}`;
                    }
                }




                if (existingValue.toString().trim() === value.toString().trim()) {
                    setErrorMessage({
                        [field]: `No changes made to ${capitalizedField}`
                    });
                    return;
                }

                dispatch({
                    type: EDIT_PARTICULAR_PRODUCT_SAGA,
                    payload: {
                        field,
                        value,
                        uniqueProductCode: productDetails.uniqueProductCode
                    }
                });
                setLoading(true);
                setEditingField(null);
            }
        }



    };



    const handleKeyDown = (e, fieldKey, currentTypedValue) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            let error = {};
            const trimmedEdited = currentTypedValue?.toString().trim();

            const actualKey = fieldKeyMap[fieldKey] || fieldKey;
            const currentValue = productDetails[actualKey]?.toString().trim();


            if (!trimmedEdited && requiredFields.includes(fieldKey)) {
                error[fieldKey] = `Enter the ${fieldKey.replace(/_/g, ' ')}`;
                setErrorMessage(prev => ({ ...prev, ...error }));
                return;
            }

            if (trimmedEdited === currentValue) {
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
                    value: trimmedEdited,
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
            borderRadius: '12px',
            boxShadow: 'none',
            cursor: 'pointer',
            padding: '8px 1px',
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
            color: state.data.value === '' ? 'oklch(70.8% 0 0)' : 'black',
            fontSize: "16px",
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

    CustomInput.displayName = "CustomInput";



    const handleScrollToLeftPhotos = () => {
        scrollRef.current?.scrollBy({ left: -500, behavior: 'smooth' });
    };

    const handleScrollToRightPhotos = () => {
        scrollRef.current?.scrollBy({ left: 500, behavior: 'smooth' });
    };



    useEffect(() => {
        if (imagesToShow.length > 0) {
            setPreviewImage(imagesToShow[0].url);
        }
    }, [imagesToShow]);



    useEffect(() => {
        if (editingField && productDetails) {
            setEditedValues((prev) => ({
                ...prev,
                [editingField]: productDetails[editingField]
            }));
        }
    }, [editingField, productDetails]);


    useEffect(() => {
        dispatch({ type: GET_PARTICULAR_PRODUCT_SAGA, payload: productId });
        setLoading(true)
    }, [productId]);

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

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (editableRef.current && !editableRef.current.contains(event.target)) {
                setEditingField(null);
                setErrorMessage({});
                if (editingField) {
                    triggerUpdate();
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [editedValue, editingField, errorMessage, productDetails]);




    return (
        <div className="bg-blueGray-100  w-full">

            <div className="ps-3 pt-6 pe-3 flex flex-col" >
                <h1 className="text-xl mb-3 font-semibold font-Gilroy text-black sticky sticky top-0 bg-blueGray-100 z-10 ps-2">Product Detail</h1>


                <div className="p-6 bg-white  rounded-2xl relative ">
                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                            <div className="loader border-t-4 border-[#205DA8] border-solid rounded-full w-10 h-10 animate-spin"></div>
                        </div>
                    )}
                    <div className='lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-6  max-h-[460px] overflow-y-auto'>


                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-2 items-start">
                            <div className=" md:col-span-7 w-full flex flex-col h-full">
                                <div>
                                    <div className='w-full mb-2 '>
                                        <p className="text-sm font-normal mb-4 font-Gilroy text-[#4B4B4B]">Product Name</p>
                                        <div ref={editableRef}>
                                            <input

                                                className="placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full"
                                                value={editingField === "product_name"
                                                    ? editedValues.product_name
                                                    : productDetails?.productName || ""
                                                }
                                                onChange={(e) => handleValueChange("product_name", e)}
                                                placeholder="Enter Product Name"
                                                onKeyDown={(e) => handleKeyDown(e, "product_name", e.target.value)}
                                                onBlur={() => {
                                                    setEditingField(null);
                                                    setEditedValue('');
                                                }}
                                            />
                                        </div>
                                        {errorMessage.product_name && (
                                            <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                                <InfoCircle size={14} color="#DC2626" />
                                                {errorMessage.product_name}
                                            </p>
                                        )}
                                    </div>

                                    <div className='mb-2'>
                                        <p className="text-sm font-normal mb-4 font-Gilroy text-[#4B4B4B]">Product Code </p>

                                        <input
                                            className="placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full"
                                            value={productDetails?.productCode || "N/A"}
                                            readOnly


                                        />
                                    </div>
                                    <div className='mb-2' >
                                        <p className="text-sm font-normal mb-4 font-Gilroy text-[#4B4B4B]">Description</p>

                                        <textarea
                                            rows={5}
                                            ref={editableRef}
                                            className="placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full"
                                            value={
                                                editingField === "description"
                                                    ? editedValues.description
                                                    : productDetails?.description || ""
                                            }
                                            onBlur={() => setEditingField(null)}
                                            placeholder="Enter Description"
                                            onChange={(e) => handleValueChange("description", e)}
                                            onKeyDown={(e) => handleKeyDown(e, "description", e.target.value)}


                                        />

                                        {errorMessage.description && (
                                            <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                                <InfoCircle size={14} color="#DC2626" />
                                                {errorMessage.description}
                                            </p>
                                        )}
                                    </div>

                                </div>
                            </div>


                            <div className="col-span-5 w-full flex flex-col h-full">


                                <div className="w-full h-auto">
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Product Images</p>
                                    {previewImage && (
                                        <div className="w-full h-[200px] mb-4 border border-gray-200 rounded-md flex items-center justify-center bg-white">
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="w-full h-full object-cover rounded-md "
                                            />
                                        </div>
                                    )}

                                    <div className="flex mt-2 gap-0 relative z-10">

                                        {imagesToShow.length > 2 && (
                                            <div onClick={handleScrollToLeftPhotos} className="absolute left-[0px] top-1/2 -translate-y-1/2 z-20 p-1 bg-opacity-90 bg-white rounded-full">
                                                <FaAngleLeft className="w-6 h-6 cursor-pointer text-[#205DA8]" alt="prev" />
                                            </div>
                                        )}

                                        <div
                                            ref={scrollRef}
                                            className="flex flex-row items-center min-w-[100px]   overflow-x-scroll pg-red-100"
                                        >
                                            <div className="bg-white flex flex-row  gap-4 ">
                                                {imagesToShow.map((img, index) => {
                                                    const isSelected = previewImage === img.url;
                                                    return <div
                                                        key={index} onClick={() => setPreviewImage(img.url)}
                                                        className="relative min-w-[140px] h-[140px]   cursor-pointer font-Gilroy border border-gray-200 rounded-md"
                                                    >
                                                        <img
                                                            src={img.url}
                                                            alt={`Product ${index}`}
                                                            onLoad={(e) => handleImageLoad(e, index)}
                                                            className={`rounded-md w-full h-full ${containStates[index] ? 'object-contain' : 'object-cover'}`}
                                                        />
                                                        {!isSelected && (
                                                            <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-50 rounded-md pointer-events-none" />
                                                        )}
                                                    </div>
                                                })}
                                            </div>
                                        </div>


                                        {imagesToShow.length > 2 && (
                                            <div onClick={handleScrollToRightPhotos} className=" absolute right-[0px] top-1/2 -translate-y-1/2 z-20 p-1 bg-opacity-90 bg-white rounded-full ">
                                                <FaAngleLeft className="w-6 h-6 rotate-180 cursor-pointer text-[#205DA8]" alt="prev" />
                                            </div>
                                        )}
                                    </div>

                                </div>

                            </div>

                        </div>


                        <div className='border border-[#D9D9D9 rounded-xl px-3 py-3 w-full mb-5'>
                            <label className='text-xl font-semibold mb-2 font-Gilroy text-[#222222]'>Pricing & Quantity</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 ">

                                <div>
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Currency</p>
                                    <input
                                        type="text"
                                        className="text-md font-semibold mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full focus:outline-none"
                                        value={
                                            productDetails?.currency
                                                ? `${currencySymbols[productDetails?.currency] || ''} ${productDetails?.currency}`
                                                : ""
                                        }
                                        onChange={(e) => handleValueChange("currency", e)}
                                        placeholder="Enter Currency"
                                        readOnly


                                    />
                                </div>
                                <div>
                                    <div className='flex items-center space-x-3'>
                                        <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Price Per Unit</p>
                                    </div>

                                    <input
                                        ref={editableRef}
                                        className="placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full"

                                        value={
                                            editingField === "price"
                                                ? editedValues.price
                                                : productDetails?.currency
                                                    ? `${currencySymbols[productDetails.currency] || ''} ${productDetails.price || ''}`
                                                    : productDetails?.price || ''
                                        }

                                        onChange={(e) => handleValueChange("price", e)}
                                        onKeyDown={(e) => handleKeyDown(e, "price", e.target.value)}
                                        placeholder='Enter Price'
                                        onBlur={() => setEditingField(null)}

                                    />

                                    {errorMessage.price && (
                                        <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                            <InfoCircle size={14} color="#DC2626" />
                                            {errorMessage.price}
                                        </p>
                                    )}
                                </div>


                                <div>
                                    <div className='flex items-center space-x-3'>
                                        <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Available Quantity</p>
                                    </div>
                                    <input
                                        type="text"
                                        className="text-md focus:outline-none font-semibold mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full"
                                        value={
                                            productDetails?.quantity && productDetails.quantity !== "0"
                                                ? productDetails.quantity
                                                : "N/A"
                                        }
                                        onChange={(e) => handleValueChange("quantity", e)}
                                        placeholder="Enter Quantity"
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Unit of Measurement</p>

                                    <input
                                        ref={editableRef}
                                        className="placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full"
                                        value={productDetails?.unit || "N/A"}
                                        onChange={(e) => handleValueChange("unit", e)}
                                        onKeyDown={(e) => handleKeyDown(e, "unit")}
                                        placeholder="Enter Unit of Measurement"
                                        readOnly



                                    />

                                    {errorMessage.unit && (
                                        <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                            <InfoCircle size={14} color="#DC2626" />
                                            {errorMessage.unit}
                                        </p>
                                    )}
                                </div>



                                <div>
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Total Weight</p>
                                    <input
                                        type="text"
                                        className="placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full"
                                        value={
                                            productDetails?.weight && productDetails.weight !== "0"
                                                ? productDetails.weight
                                                : "N/A"
                                        }

                                        readOnly
                                        placeholder="Enter Weight"


                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Discount</p>

                                    <input
                                        ref={editableRef}
                                        type="text"
                                        placeholder="Enter Discount"
                                        className="placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full"
                                        value={
                                            editingField === "discount"
                                                ? editedValues.discount
                                                : productDetails?.discount === "0"
                                                    ? "N/A"
                                                    : productDetails?.discount ?? "N/A"
                                        }

                                        onChange={(e) => handleValueChange("discount", e)}
                                        onKeyDown={(e) => handleKeyDown(e, "discount", e.target.value)}
                                        onBlur={() => setEditingField(null)}
                                    />

                                    {errorMessage.discount && (
                                        <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                            <InfoCircle size={14} color="#DC2626" />
                                            {errorMessage.discount}
                                        </p>
                                    )}
                                </div>


                            </div>

                        </div>




                        <div className='border border-[#D9D9D9 rounded-xl px-3 py-3 w-full mb-5'>

                            <label className='text-xl font-semibold mb-2 font-Gilroy text-[#222222]'>Tax & Product Identification</label>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 ">

                                <div className="w-full">
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">HSN</p>
                                    <input
                                        ref={editableRef}
                                        className="placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full"
                                        value={
                                            editingField === "hsn_code"
                                                ? editedValues.hsn_code
                                                : !productDetails?.hsnCode || productDetails?.hsnCode === "0" ||  productDetails?.hsnCode === ""
                                                    ? "N/A"
                                                    : productDetails.hsnCode
                                        }
                                        placeholder="Enter HSN"
                                        onChange={(e) => handleValueChange("hsn_code", e)}
                                        onKeyDown={(e) => handleKeyDown(e, "hsn_code", e.target.value)}
                                        onBlur={() => setEditingField(null)}
                                    />
                                    {errorMessage.hsn_code && (
                                        <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                            <InfoCircle size={14} color="#DC2626" />
                                            {errorMessage.hsn_code}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">GST %</p>
                                    <input
                                        ref={editableRef}
                                        className="placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full"
                                        value={
                                            editingField === "gst"
                                                ? editedValues.gst
                                                : productDetails?.gst ?? "N/A"
                                        }
                                        placeholder="Enter GST"
                                        onChange={(e) => handleValueChange("gst", e)}
                                        onKeyDown={(e) => handleKeyDown(e, "gst")}
                                        onBlur={() => setEditingField(null)}
                                        readOnly

                                    />
                                    {errorMessage.gst && (
                                        <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                            <InfoCircle size={14} color="#DC2626" />
                                            {errorMessage.gst}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Serial No</p>
                                    <input
                                        ref={editableRef}
                                        className="placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full"
                                        value={Array.isArray(productDetails?.serialNo) ? productDetails?.serialNo.join(", ") : "N/A"}
                                        placeholder="Enter Serial Numbers"
                                        onChange={(e) => handleValueChange("serialNo", e)}
                                        onKeyDown={(e) => handleKeyDown(e, "serialNo")}
                                        readOnly

                                    />
                                    {errorMessage.serialNo && (
                                        <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                            <InfoCircle size={14} color="#DC2626" />
                                            {errorMessage.serialNo}
                                        </p>
                                    )}
                                </div>



                            </div>

                        </div>

                        <div className='border border-[#D9D9D9 rounded-xl px-3 py-3 w-full mb-5'>

                            <label className='text-xl font-semibold mb-2 font-Gilroy text-[#222222]'>Others</label>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2 ">


                                <div>
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Category</p>
                                    <input
                                        type="text"
                                        className="text-md focus:outline-none font-semibold mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full"
                                        value={productDetails?.categoryName || ""}
                                        onChange={(e) => handleValueChange("categoryName", e)}
                                        placeholder="Enter Category"
                                        readOnly

                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Sub - Category</p>
                                    <input
                                        type="text"
                                        className="text-md focus:outline-none font-semibold mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full"
                                        value={productDetails?.subCategoryName || ""}
                                        onChange={(e) => handleValueChange("subCategoryName", e)}
                                        placeholder="Enter Sub - Category"
                                        readOnly

                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Brand</p>
                                    <input
                                        type="text"
                                        className="text-md focus:outline-none font-semibold mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full"
                                        value={productDetails?.brandName || ""}
                                        onChange={(e) => handleValueChange("brandName", e)}
                                        placeholder="Enter Brand"
                                        readOnly

                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Country of Origin</p>

                                    <div ref={editableRef}>
                                        <Select
                                            options={countryOptions}
                                            value={countryOptions.find(option => option.value === productDetails?.countryOfOrigin)}
                                            onChange={(selectedOption) => handleValueChange("origin_country", null, selectedOption.value)}
                                            className="font-Gilroy text-sm w-auto"
                                            classNamePrefix="react-select"
                                            placeholder="Enter Country of Origin"
                                            styles={customSelectStyles}
                                        />
                                    </div>

                                    {errorMessage.origin_country && (
                                        <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                            <InfoCircle size={14} color="#DC2626" />
                                            {errorMessage.origin_country}
                                        </p>
                                    )}
                                </div>


                                <div>
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Month and Year of Manufacture</p>


                                    <DatePicker
                                        selected={productDetails?.manufaturingYearAndMonth}
                                        onChange={(date) => handleValueChange("manufacturing_year", null, date)}
                                        dateFormat="MM/yyyy"
                                        showMonthYearPicker
                                        showFullMonthYearPicker={true}
                                        placeholderText="Month and Year of Manufacture"
                                        customInput={<CustomInput placeholder="Month and Year of Manufacture" />}
                                        wrapperClassName="w-full"
                                    />


                                    {errorMessage.manufacturing_year && (
                                        <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                            <InfoCircle size={14} color="#DC2626" />
                                            {errorMessage.manufacturing_year}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">State</p>

                                    <div ref={editableRef}>
                                        <Select
                                            options={stateOptions}
                                            value={stateOptions.find(
                                                (option) => option.value === productDetails?.State
                                            )}
                                            onChange={(selectedOption) =>
                                                handleValueChange("state", null, selectedOption.value)
                                            }
                                            className="mb-2 font-Gilroy text-sm w-auto"
                                            classNamePrefix="react-select"
                                            placeholder="Enter State"
                                            styles={customSelectStyles}

                                        />
                                    </div>

                                    {errorMessage.state && (
                                        <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                            <InfoCircle size={14} color="#DC2626" />
                                            {errorMessage.state}
                                        </p>
                                    )}
                                </div>


                            </div>

                        </div>

                        <div className='border border-[#D9D9D9] rounded-xl px-3 py-3 w-full mb-5'>
                            <label className='text-xl font-semibold mb-2 font-Gilroy text-[#222222]'>Files & Documents</label>

                            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
                                {imagesToShowTech && imagesToShowTech.length > 0 ? (
                                    imagesToShowTech.map((file, index) => {
                                        const isPDF = file.url.endsWith('.pdf');
                                        const isDoc = file.url.endsWith('.doc') || file.url.endsWith('.docx') || file.url.endsWith('.txt');
                                        const isImage = /\.(jpg|jpeg|png|gif|webp)$/i.test(file.url);
                                        const fileType = isPDF ? 'PDF' : isDoc ? 'DOC' : isImage ? 'Image' : 'Other';
                                        const fileIcon = isPDF ? Pdf : isDoc ? WordIcon : Pdf;
                                        const fileName = file.url.split('/').pop();
                                        const fileSize = file.size ? `${file.size} MB` : '---';

                                        return (
                                            <div key={index} className='bg-[#F2F8FF] px-3 py-3 rounded-xl border border-[#F2F8FF] h-fit'>
                                                <div className='bg-[#FFF] px-3 py-3 rounded-xl border border-[#F2F8FF]'>
                                                    {isImage ? (
                                                        <div className='flex justify-center'>

                                                            <img
                                                                src={file.url}
                                                                alt="Preview"
                                                                className="w-full h-[100px] object-contain rounded-md"
                                                            />

                                                        </div>
                                                    ) : (
                                                        <div className='flex space-x-6 items-center flex-wrap'>
                                                            <div>
                                                                <div className='flex space-x-2 mb-2'>
                                                                    <img
                                                                        src={fileIcon}
                                                                        alt="File"
                                                                        className="w-[30px] h-[30px] rounded-md"
                                                                    />
                                                                    <label
                                                                        title={file.name || fileName}
                                                                        className="truncate max-w-[150px] overflow-hidden whitespace-nowrap text-[#222] text-md font-Gilroy font-semibold"
                                                                    >
                                                                        {file.name || fileName}
                                                                    </label>
                                                                </div>

                                                                <div className='flex space-x-6'>
                                                                    <label className='text-gray-500 text-sm font-Gilroy font-semibold'>
                                                                        {file.pageCount || '---'} pages
                                                                    </label>

                                                                    <label className='flex items-center text-gray-500 text-sm font-Gilroy font-semibold'>
                                                                        <GoDotFill /> {fileSize}
                                                                    </label>

                                                                    <label className='flex items-center text-gray-500 text-sm font-Gilroy font-semibold'>
                                                                        <GoDotFill /> {fileType}
                                                                    </label>
                                                                </div>
                                                            </div>

                                                            <a href={file.url} download target="_blank" rel="noopener noreferrer">
                                                                <FaDownload
                                                                    color="#222"
                                                                    className='cursor-pointer'
                                                                />
                                                            </a>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p className="text-red-600 font-Gilroy text-sm">No tech files available</p>
                                )}
                            </div>


                        </div>



                        {Array.isArray(productDetails?.additional_fields) && productDetails.additional_fields.length > 0 && (
                            <div className='border border-[#D9D9D9] rounded-xl px-3 py-3 w-full mb-5'>
                                <label className='text-xl font-semibold mb-2 font-Gilroy text-[#222222]'>Additional Fields</label>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
                                    {productDetails.additional_fields.map((field, index) => (
                                        <div key={index} className="mb-4">
                                            <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B] capitalize">
                                                {field.title}
                                            </p>
                                            <input
                                                type="text"
                                                value={field.value || ""}
                                                className="text-md focus:outline-none font-semibold mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full capitalize"
                                                placeholder={`Enter ${field.title}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>



                </div>

            </div>
        </div>
    )
}
ProductDetails.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
    placeholder: PropTypes.string,
};
export default ProductDetails







