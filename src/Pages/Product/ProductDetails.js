/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, forwardRef, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GET_PARTICULAR_PRODUCT_SAGA, RESET_CODE, EDIT_PARTICULAR_PRODUCT_SAGA } from '../../Utils/Constant'
import moment from "moment";
import { Edit, DocumentDownload } from "iconsax-react";
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
function ProductDetails() {





    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const { productId } = useParams()
    const productDetails = state?.product?.particularProductList 



    console.log("productDetails", productDetails)
    const [showAll, setShowAll] = useState(false);
    const [showTechAll, setShowTechAll] = useState(false);
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState({});


    const images = productDetails?.images ?? [];
    const imagesToShow = showAll ? images : images.slice(0, 6);
    const hasMoreImages = images.length > 6;
    const [techFilesWithSize, setTechFilesWithSize] = useState([]);

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

    console.log("productId", productId)

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



    const handleValueChange = (field, e, customValue = null) => {
        let inputValue = customValue ?? e.target.value;
        setEditingField(field);

        if (inputValue instanceof Date && editingField === "manufacturing_year") {
            const year = inputValue.getFullYear();
            const month = String(inputValue.getMonth() + 1).padStart(2, '0');
            inputValue = `${year}-${month}`;
        }


        let value = typeof inputValue === 'string' ? inputValue : inputValue?.toString?.() ?? '';
        let tempError = {};
        let finalValue = value;

        const fieldKey = fieldKeyMap[editingField] || editingField;
        const currentValue = productDetails[fieldKey];

        const readableFieldName = editingField.replace(/_/g, ' ');
        const capitalizedField = readableFieldName.charAt(0).toUpperCase() + readableFieldName.slice(1);
        setEditedValue(value);

        // if (editingField === "manufacturing_year") {
        //     const trimmedValue = value.trim();

        //     if (trimmedValue.length === 7 && /^\d{4}-\d{2}$/.test(trimmedValue)) {
        //         if (trimmedValue === currentValue?.toString().trim()) {
        //             setErrorMessage({
        //                 [editingField]: `No changes made to ${readableFieldName}`
        //             });
        //             return;
        //         }

        //         finalValue = trimmedValue;

        //         dispatch({
        //             type: EDIT_PARTICULAR_PRODUCT_SAGA,
        //             payload: {
        //                 field: editingField,
        //                 value: finalValue,
        //                 uniqueProductCode: productDetails.uniqueProductCode
        //             }
        //         });

        //         setErrorMessage({});
        //         setLoading(true);
        //         setEditingField(null);
        //         return;
        //     } else {
        //         tempError[editingField] = `${capitalizedField} must be in YYYY-MM format`;
        //         setErrorMessage(tempError);
        //         return;
        //     }
        // }

        // else if (["price", "discount"].includes(editingField)) {
        //     value = inputValue.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        //     const trimmedValue = value.trim();

        //     if (trimmedValue === "" || isNaN(parseFloat(trimmedValue)) || !/^\d*\.?\d*$/.test(trimmedValue)) {
        //         tempError[editingField] = `${capitalizedField} is required`;
        //         setErrorMessage(tempError);
        //         setEditedValue(trimmedValue);
        //         return;
        //     }

        //     if (trimmedValue === currentValue?.toString().trim()) {
        //         setErrorMessage({
        //             [editingField]: `No changes made to ${readableFieldName}`
        //         });
        //         return;
        //     }

        //     finalValue = trimmedValue;
        //     setEditedValue(trimmedValue);
        // }

        // else if (editingField === "origin_country") {
        //     value = inputValue.replace(/[^a-zA-Z\s]/g, '');
        //     finalValue = value;

        //     if (value.trim() === currentValue?.toString().trim()) {
        //         setErrorMessage({
        //             [editingField]: `No changes made to ${readableFieldName}`
        //         });
        //         return;
        //     }

        //     setEditedValue(value);
        // }

        // if (requiredFields.includes(editingField)) {
        //     const trimmed = value.trim();
        //     if (trimmed === "") {
        //         tempError[editingField] = `Enter the ${readableFieldName}`;
        //         setErrorMessage(tempError);
        //         setEditedValue(value);
        //         return;
        //     } else {
        //         setErrorMessage(prev => {
        //             const newErr = { ...prev };
        //             delete newErr[editingField];
        //             return newErr;
        //         });
        //     }
        // }

        // if (["state", "origin_country", "manufacturing_year"].includes(editingField)) {
        //     dispatch({
        //         type: EDIT_PARTICULAR_PRODUCT_SAGA,
        //         payload: {
        //             field: editingField,
        //             value: finalValue,
        //             uniqueProductCode: productDetails.uniqueProductCode
        //         }
        //     });

        //     setLoading(true);
        //     setEditingField(null);
        //     return;
        // }
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

    const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
        <div
            className="flex w-full font-Gilroy items-center border border-gray-300 rounded-md px-3 py-2.5 text-md text-gray-700 cursor-pointer"
            onClick={onClick}
            ref={ref}
        >
            <input
                type="text"
                className="flex-1 font-Gilroy bg-transparent outline-none py-0.5 text-md font-semibold text-black placeholder-gray-400"
                value={value}
                placeholder={placeholder}
                readOnly
            />
            <CalendarDays className="text-gray-400 ml-2 shrink-0" size={18} />
        </div>
    ));

    CustomInput.displayName = "CustomInput";




    console.log("imagesToShowTech", imagesToShowTech)

    const fetchFileSize = async (url) => {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            const size = response.headers.get('content-length');
            return (size / (1024 * 1024)).toFixed(2); // in MB
        } catch (err) {
            console.error('Error fetching file size:', err);
            return null;
        }
    };

    useEffect(() => {
        const fetchSizes = async () => {
            const listToShow = showTechAll ? techImages : techImages.slice(0, 6);

            const updatedFiles = await Promise.all(
                listToShow.map(async (file) => {
                    if (!file.size) {
                        const size = await fetchFileSize(file.url);
                        return { ...file, size };
                    }
                    return file;
                })
            );

            setTechFilesWithSize(updatedFiles);
        };

        fetchSizes();
    }, [techImages, showTechAll]);









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
                            <div className=" md:col-span-6 w-full flex flex-col h-full">
                                <div>
                                    <div className='w-full '>
                                        <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Product Name</p>

                                        <input
                                            ref={editableRef}
                                            className="placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full"
                                            value={productDetails?.productName}
                                            onChange={(e) => handleValueChange("product_name", e)}
                                            placeholder="Enter Product Name"
                                            onKeyDown={(e) => handleKeyDown(e, "product_name")}

                                        />

                                        {errorMessage.product_name && (
                                            <p className="text-red-500 text-xs flex items-center gap-1 font-Gilroy mt-2 mb-2">
                                                <InfoCircle size={14} color="#DC2626" />
                                                {errorMessage.product_name}
                                            </p>
                                        )}
                                    </div>

                                    <div>
                                        <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Product Code </p>

                                        <input
                                            className="placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full"
                                            value={productDetails?.productCode || "N/A"}
                                            readOnly

                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Description</p>

                                        <textarea
                                            rows={4}
                                            ref={editableRef}
                                            className="placeholder:oklch(70.8% 0 0) placeholder:text-sm placeholder:font-medium text-md font-semibold focus:outline-none mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full"
                                            value={productDetails?.description || "N/A"}
                                            placeholder="Enter Description"
                                            onChange={handleValueChange}
                                            onKeyDown={(e) => handleKeyDown(e, "description")}

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


                            <div className="col-span-4  w-full flex flex-col h-full">

                                <div>
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Product Images </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
                                        {imagesToShow?.length > 0 ? imagesToShow.map((img, index) => {
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

                            </div>

                        </div>


                        {/* images */}
                        {/* <div className="grid grid-cols-2 gap-8 mb-3 p-2">



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
                        </div> */}
                        {/* end */}
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
                                        value={productDetails?.price || "N/A"}
                                        onChange={(e) => handleValueChange("price", e)}
                                        onKeyDown={(e) => handleKeyDown(e, "price")}
                                        placeholder='Enter Price'
                                        autoFocus
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
                                        value={productDetails?.quantity || ""}
                                        onChange={(e) => handleValueChange("quantity", e)}
                                        placeholder="Enter Quantity"
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
                                        value={productDetails?.weight || ""}
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
                                        value={productDetails?.discount ?? ""}
                                        onChange={(e) => handleValueChange("discount", e)}
                                        onKeyDown={(e) => handleKeyDown(e, "discount")}
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
                                        value={productDetails?.hsnCode || "N/A"}
                                        placeholder="Enter HSN"
                                        onChange={(e) => handleValueChange("hsn_code", e)}
                                        onKeyDown={(e) => handleKeyDown(e, "hsn_code")}
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
                                        value={productDetails?.gst || "N/A"}
                                        placeholder="Enter GST"
                                        onChange={(e) => handleValueChange("gst", e)}
                                        onKeyDown={(e) => handleKeyDown(e, "gst")}
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
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-normal mb-2 font-Gilroy text-[#4B4B4B]">Country of Origin</p>

                                    <div ref={editableRef}>
                                        <Select
                                            options={countryOptions}
                                            value={countryOptions.find(option => option.value === productDetails?.countryOfOrigin)}
                                            onChange={(selectedOption) => handleValueChange("origin_country", selectedOption.value)}
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
                                        selected={
                                            productDetails?.manufaturingYearAndMonth
                                                ? new Date(productDetails?.manufaturingYearAndMonth)
                                                : null
                                        }
                                        onChange={(date) =>
                                            handleValueChange({ target: { value: date } }, "manufacturing_year")
                                        }
                                        dateFormat="MM/yyyy"
                                        showMonthYearPicker
                                        className="placeholder:oklch(70.8% 0 0) cursor-pointer font-Gilroy font-medium text-sm text-[#222222] w-full"
                                        placeholderText="Month and Year of Manufacture"
                                        customInput={<CustomInput ref={editableRef} />}
                                        wrapperClassName="w-full"
                                        autoFocus
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
                                                handleValueChange("state", selectedOption.value)
                                            }
                                            className="mb-2 font-Gilroy text-sm w-auto"
                                            classNamePrefix="react-select"
                                            placeholder="Enter State"
                                            styles={customSelectStyles}
                                            autoFocus
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

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
                                {techFilesWithSize && techFilesWithSize.length > 0 ? (
                                    techFilesWithSize.map((file, index) => {
                                        const isPDF = file.url.endsWith('.pdf');
                                        const isDoc = file.url.endsWith('.doc') || file.url.endsWith('.docx') || file.url.endsWith('.txt');
                                        const fileType = isPDF ? 'PDF' : isDoc ? 'DOC' : 'Other';
                                        const fileIcon = isPDF ? Pdf : isDoc ? WordIcon : Pdf;
                                        const fileName = file.url.split('/').pop();
                                        const fileSize = file.size ? `${file.size} MB` : '---';

                                        return (
                                            <div key={index} className='bg-[#F2F8FF] px-3 py-3 rounded-xl border border-[#F2F8FF]'>
                                                <div className='bg-[#FFF] px-3 py-3 rounded-xl border border-[#F2F8FF]'>
                                                    <div className='flex space-x-6 items-center'>
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

                                                                <label className='flex  items-center text-gray-500 text-sm font-Gilroy font-semibold'>
                                                                    <GoDotFill /> {fileSize}
                                                                </label>

                                                                <label className='flex  items-center text-gray-500 text-sm font-Gilroy font-semibold'>
                                                                    <GoDotFill /> {fileType}
                                                                </label>
                                                            </div>
                                                        </div>

                                                        <a href={file.url} download target="_blank" rel="noopener noreferrer">
                                                            <FaDownload
                                                                color="#222"
                                                                variant="Bold"
                                                                className='cursor-pointer'
                                                            />
                                                        </a>
                                                    </div>
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
                                                // onChange={(e) => handleAdditionalFieldChange(index, e.target.value)}
                                                className="text-md font-semibold mb-2 font-Gilroy text-[#222222] border border-gray-300 rounded-xl px-3 py-3 w-full capitalize"
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