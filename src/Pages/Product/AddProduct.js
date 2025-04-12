/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, forwardRef, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Trash from "../../Asset/Icon/trash.svg";
import addcircle from "../../Asset/Icon/add-circle.svg";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";
import Arrow from "../../Asset/Icon/Arrow.svg";
import FormBuilder from '../../FormBuilderComponent/AdditionalFormField';
import { InfoCircle } from "iconsax-react";
import PropTypes from 'prop-types';
import { GET_CATEGORY_SAGA, GET_SUB_CATEGORY_SAGA, GET_BRAND_SAGA } from '../../Utils/Constant'
import { useDispatch, useSelector } from 'react-redux';

function AddProduct() {


    const dispatch = useDispatch();
    const state = useSelector(state => state)


    const scrollRef = useRef(null);
    const scrollTechRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [images, setImages] = useState([
        
    ]);
    const [techImages, setTechImages] = useState([
        
    ]);
    const [showAdditionalFields, setShowAdditionalFields] = useState(false)
    const [displayItems, setDisplayItems] = useState([])
    const [formValues, setFormValues] = useState({});

    const [serialNo, setSerialNo] = useState(1);
    const [formData, setFormData] = useState({
        serialNo: "1",
        productCode: "",
        productName: "",
        description: "",
        availableQuantity: "",
        unit: "",
        price: "",
        currency: "",
        weight: "",
        discount: "",
        hsn: "",
        gst: "",
        category: "",
        subCategory: "",
        brand: "",
        make: "",
        country: "",
        stateName: "",
        district: "",
    });


    const [errors, setErrors] = useState({});



    useEffect(() => {
        if (!formData.serialNo) {
            setFormData((prev) => ({ ...prev, serialNo: serialNo.toString() }));
        }
    }, [formData.serialNo, serialNo]);

    const handleInputChange = (field, value) => {



        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: value.trim() ? "" : prevErrors[field],
        }));
    };









    const validate = () => {
        let newErrors = {};

        if (!formData.productCode) newErrors.productCode = "Product Code is required";
        if (!formData.productName.trim()) newErrors.productName = "Product Name is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.currency.trim()) newErrors.currency = "Currency is required";
        if (!formData.unit) newErrors.unit = "Unit is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

   


    const handleImageAdd = (e) => {
        const files = Array.from(e.target.files);

        setImages((prev) => {
            const unique = files.filter(preview => !prev.includes(preview));
            return [...prev, ...unique];
        });
    };


    const handleImageDelete = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleTechDocAdd = (e) => {
        const files = Array.from(e.target.files);
       
        setTechImages((prev) => {
            const unique = files.filter(preview => !prev.includes(preview));
            return [...prev, ...unique];
        });
    };

    const handleTechDocDelete = (index) => {
        setTechImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleScrollToLeftPhotos = () => {
                scrollRef.current?.scrollBy({ left: -500, behavior: 'smooth' });
      };
      
      const handleScrollToRightPhotos = () => {
              scrollRef.current?.scrollBy({ left: 500, behavior: 'smooth' });
      };
      


    const handleScrollToLeftPhotosForTech = () => {
        scrollTechRef.current?.scrollBy({ left: -500, behavior: 'smooth' });
    }

    const handleScrollToRightPhotosForTech= () => {
        scrollTechRef.current?.scrollBy({ left: 500, behavior: 'smooth' });
    }










    const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
        <div
            className="flex items-center border border-gray-300 rounded-md px-3 py-2.5 text-sm text-gray-700 cursor-pointer"
            onClick={onClick}
            ref={ref}
            style={{ width: "285px" }}
        >
            <input
                type="text"
                className="flex-1 w-full bg-transparent outline-none  py-0.5 font-medium text-xs text-slate-500 placeholder-gray-400"
                value={value}
                placeholder={placeholder}
                readOnly
            />
            <CalendarDays className="text-gray-400 ml-2" size={18} />
        </div>
    ));

    CustomInput.displayName = "CustomInput";

    const PrevArrow = () => {
        return (
            <div
                className="cursor-pointer"
                onClick={handleScrollToLeftPhotos}
            >
                <img src={Arrow} className="w-7 h-7 rotate-180" alt="prev" />
            </div>
        );
    };
    const NextArrow = () => {
        return (
            <div
                className="cursor-pointer"
                onClick={handleScrollToRightPhotos}
            >
                <img src={Arrow} className="w-7 h-7" alt="next" />
            </div>
        );
    };




    const PrevArrowTech = () => {
        return (
            <div
                className="cursor-pointer"
                onClick={handleScrollToLeftPhotosForTech}
            >
                <img src={Arrow} className="w-7 h-7 rotate-180" alt="prev" />
            </div>
        );
    };
    const NextArrowTech = () => {
        return (
            <div
                className="cursor-pointer"
                onClick={handleScrollToRightPhotosForTech}
            >
                <img src={Arrow} className="w-7 h-7" alt="next" />
            </div>
        );
    };





    const updateShowAdditionalFields = () => {
        setShowAdditionalFields(true)
    }

    const updateDisplayItems = (item) => {
        setDisplayItems([...displayItems, item])
        setShowAdditionalFields(false)
    }

    const handleCloseForm = () => {
        setShowAdditionalFields(false)
    }
    const RadioOptionsChange = (title, newValue) => {
        setFormValues((prev) => ({
            ...prev,
            [title]: newValue,
        }));
        const updatedItems = displayItems.map((item) =>
            item.title === title ? { ...item, value: newValue } : item
        );
        setDisplayItems(updatedItems);
    }
    const CheckboxOptionsChange = (title, newValue) => {
        setFormValues((prev) => ({
            ...prev,
            [title]: newValue,
        }));
        const updatedItems = displayItems.map((item) =>
            item.title === title ? { ...item, value: newValue } : item
        );
        setDisplayItems(updatedItems);
    }

    const SelectOptionsChange = (title, newValue) => {
        setFormValues((prev) => ({
            ...prev,
            [title]: newValue,
        }));
        const updatedItems = displayItems.map((item) =>
            item.title === title ? { ...item, value: newValue } : item
        );
        setDisplayItems(updatedItems);
    }

    const textInputCallbackForName = (title, newValue) => {
        setFormValues((prev) => ({
            ...prev,
            [title]: newValue,
        }));
        const updatedItems = displayItems.map((item) =>
            item.title === title ? { ...item, value: newValue } : item
        );
        setDisplayItems(updatedItems);
    };

    const CallbackForTextArea = (title, newValue) => {

        setFormValues((prev) => ({
            ...prev,
            [title]: newValue,
        }));
        const updatedItems = displayItems.map((item) =>
            item.title === title ? { ...item, value: newValue } : item
        );
        setDisplayItems(updatedItems);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            const nextSerial = serialNo + 1;
            setSerialNo(nextSerial);
            setFormData({   
                serialNo: nextSerial.toString(),
            });
            setErrors({});
          
        }
    };



    useEffect(() => {
        dispatch({ type: GET_CATEGORY_SAGA })
        dispatch({ type: GET_BRAND_SAGA })

    }, [])



    useEffect(() => {
        if (formData.category) {
            dispatch({ type: GET_SUB_CATEGORY_SAGA, payload: { catId: Number(formData.category) } })
        }

    }, [formData.category])


   

    return (
        <div className="bg-gray-100 p-6 min-h-screen flex w-full justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                <h2 className="text-xl font-semibold mb-4 font-Gilroy">Add Product</h2>

                <div className="flex-1 mx-auto  max-w-7xl rounded-xl max-h-[400px] overflow-y-auto lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3">

                    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] mb-2 items-start ">
                        <div className="w-full flex flex-col h-full">
                            <div>
                                <label className="block font-normal text-md font-Outfit mb-1">
                                    Product Code (Unique) <span className="text-red-500 text-lg">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="mb-1 focus:outline-none w-[290px] border border-gray-300 rounded-lg px-3 py-3 font-medium text-sm text-slate-500 font-Gilroy"
                                    placeholder="Enter Product code"
                                    name="productCode"
                                    value={formData.productCode}
                                    onChange={(e) => handleInputChange('productCode', e.target.value)}
                                />
                                {errors.productCode && (
                                    <p className="text-red-500 text-xs flex items-center gap-1">
                                        <InfoCircle size={16} color="#DC2626" />
                                        {errors.productCode}
                                    </p>
                                )}

                            </div>


                            <div>
                                <label className="block font-normal text-md font-Outfit mb-1">
                                    Product Name <span className="text-red-500 text-lg">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="mb-1 focus:outline-none w-[290px] border border-gray-300 rounded-lg px-3 py-3 font-medium text-sm text-slate-500 font-Gilroy"
                                    placeholder="Enter Product Name"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={(e) => handleInputChange('productName', e.target.value)}
                                />
                                {errors.productName && (
                                    <p className="text-red-500 text-xs flex items-center gap-1">
                                        <InfoCircle size={16} color="#DC2626" />
                                        {errors.productName}
                                    </p>
                                )}




                            </div>

                            <div>
                                <label className="block font-normal text-md font-Outfit mb-1">
                                    Description<span className="text-red-500 text-lg">*</span>
                                </label>

                                <textarea
                                    placeholder="Enter Description"
                                    className="mt-1 focus:outline-none w-[290px] p-4 border rounded-lg h-36 font-medium text-sm text-slate-500 font-Gilroy"
                                    name="description"
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-xs flex items-center gap-1">
                                        <InfoCircle size={16} color="#DC2626" />
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                        </div>


                        {/* images  */}
                        <div className="w-full p-2 flex flex-col h-full">
                            <label className="block font-normal text-md font-Outfit">Add Photos</label>

                            <div className="flex mt-2 gap-0 relative z-10">



                                {
                                    images.length > 3 && <div className="absolute left-[0px] top-1/2 -translate-y-1/2 z-20 ">
                                        <PrevArrow />

                                    </div>
                                }

                                {
                                    images.length > 3 && <div className='absolute right-[150px] top-1/2 -translate-y-1/2 z-20'>
                                        <NextArrow />

                                    </div>
                                }


                                <div ref={scrollRef} className=' flex flex-row   items-center max-w-[500px] ml-[10px] overflow-x-scroll'>
                                    {images?.length > 0 && (
                                        <div className="bg-white flex flex-row">
                                            {images.map((img, index) => (
                                                <div key={index} className="px-1">
                                                    <div className="relative w-32 h-32 rounded-md overflow-hidden">
                                                        <img
                                                            src={URL.createObjectURL(img)}
                                                            alt={`uploaded-${index}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center rounded-md">
                                                            <div
                                                                className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white bg-opacity-50 cursor-pointer"
                                                                onClick={() => handleImageDelete(index)}
                                                            >
                                                                <img
                                                                    src={Trash}
                                                                    className="w-5 h-5 text-red-500 filter brightness-0 contrast-100"
                                                                    alt="Delete"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )



                                    }



                                </div>

                                <div className="w-32 h-32 border-dashed border flex items-center justify-center rounded-md cursor-pointer bg-white">
                                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                        <img src={addcircle} alt="addcircle" className="w-6 h-6 mb-1" />
                                        <span className="font-Gilroy font-semibold text-xs text-blue-700 text-center font-Outfit">Add Image</span>
                                        <span className="font-Gilroy font-medium text-xs text-[#4B4B4B] text-center">Max size 10 MB</span>
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageAdd}
                                        />
                                    </label>
                                </div>

                            </div>






                            <label className="block font-normal text-md font-Outfit mt-2">Technical</label>

                            <div className="flex mt-2 gap-0 relative z-10">

                                {
                                    techImages.length > 3 && <div className="absolute left-[0px] top-1/2 -translate-y-1/2 z-20 ">
                                        <PrevArrowTech />

                                    </div>
                                }

                                {
                                    techImages.length > 3 && <div className='absolute right-[150px] top-1/2 -translate-y-1/2 z-20'>
                                        <NextArrowTech />

                                    </div>
                                }
                                <div ref={scrollTechRef} className=' flex flex-row   items-center max-w-[500px] ml-[10px] overflow-x-scroll'>
                                    {techImages?.length > 0 && (
                                        <div className="bg-white flex flex-row">
                                            {techImages.map((img, index) => (
                                                <div key={index} className="px-1">
                                                    <div className="relative w-32 h-32 rounded-md overflow-hidden">
                                                        <img
                                                             src={URL.createObjectURL(img)}
                                                            alt={`uploaded-${index}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <div className="absolute inset-0 flex items-center justify-center rounded-md">
                                                            <div
                                                                className="flex items-center space-x-3 px-4 py-2 rounded-full bg-white bg-opacity-50 cursor-pointer"
                                                                onClick={() => handleTechDocDelete(index)}
                                                            >
                                                                <img
                                                                    src={Trash}
                                                                    className="w-5 h-5 text-red-500 filter brightness-0 contrast-100"
                                                                    alt="Delete"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )



                                    }



                                </div>



                                <label className="w-32 h-32 border-dashed border flex flex-col items-center justify-center rounded-md cursor-pointer">
                                    <img src={addcircle} alt="addcircle" className="w-6 h-6 mb-1" />
                                    <span className="font-Gilroy font-semibold text-xs text-blue-700 text-center font-Outfit">
                                        Add Documents
                                    </span>
                                    <span className="font-Gilroy font-medium text-xs text-[#4B4B4B] text-center">
                                        Max size 10 MB
                                    </span>
                                    <input
                                        type="file"
                                        name="tech"
                                        accept=".pdf,.doc,.docx,.txt,image/*"
                                        className="hidden"
                                        onChange={handleTechDocAdd}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="flex flex-wrap gap-3 mb-3">
                            <div className="flex-1">
                                <label className="block font-normal text-md font-Outfit mb-1.5">
                                    Available Quantity
                                </label>
                                <input
                                    type="text"
                                    value={formData.availableQuantity}
                                    onChange={(e) => handleInputChange('availableQuantity', e.target.value)}
                                    className="w-full focus:outline-none border border-gray-300 rounded-lg px-3 py-3 font-medium text-sm text-slate-500 font-Gilroy"
                                    placeholder="Enter Available Quantity"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block font-normal text-md font-Outfit mb-1.5">Unit of measurement <span className="text-red-500 text-sm">*</span></label>
                                <div className="relative">
                                    <select
                                        value={formData.unit}
                                        onChange={(e) => handleInputChange('unit', e.target.value)}
                                        className="w-full focus:outline-none p-3 border rounded-lg font-medium text-sm text-slate-400 appearance-none font-Gilroy">
                                        <option value="" disabled selected>Select Unit of measurement</option>
                                        <option value="kg">Kilogram (kg)</option>
                                        <option value="g">Gram (g)</option>
                                        <option value="l">Litre (l)</option>
                                        <option value="ml">Millilitre (ml)</option>
                                        <option value="pcs">Pieces (pcs)</option>
                                    </select>
                                    <svg className="w-4 h-4 text-[#4B5563] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {errors.unit && (
                                    <p className="text-red-500 text-xs flex items-center gap-1">
                                        <InfoCircle size={16} color="#DC2626" />
                                        {errors.unit}
                                    </p>
                                )}
                            </div>
                            <div className="flex-1 min-w-[250px] max-w-[340px]">
                                <label className="block font-normal text-md font-Outfit mb-1">Price</label>
                                <input
                                    type="text"
                                    value={formData.price}
                                    onChange={(e) => handleInputChange('price', e.target.value)}
                                    className="w-full focus:outline-none border border-gray-300 rounded-lg px-3 py-3 font-medium text-sm text-slate-500 font-Gilroy"
                                    placeholder="Enter Price"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-3">

                            <div className="flex-1 min-w-[250px] max-w-[340px]">
                                <label className="block font-normal text-md font-Outfit mb-1 flex items-center gap-1">
                                    Currency
                                    <span className="text-red-500 text-sm">*</span>
                                </label>
                                <div className='relative'>
                                    <select
                                        value={formData.currency}
                                        onChange={(e) => handleInputChange('currency', e.target.value)}
                                        className="w-full focus:outline-none px-3 py-3 border rounded-xl  appearance-none focus:outline-none  capitalize font-Gilroy font-medium text-sm text-neutral-800" >
                                        <option value="">Select beneficiary currency</option>
                                        <option value="USD">USD</option>
                                        <option value="INR">INR</option>
                                        <option value="EUR">EUR</option>
                                        <option value="GBP">GBP</option>
                                        <option value="JPY">JPY</option>

                                    </select>

                                    <svg className="w-4 h-4 text-[#4B5563] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>

                                </div>

                                {errors.currency && (
                                    <p className="text-red-500 mt-1 text-xs flex items-center gap-1">
                                        <InfoCircle size={16} color="#DC2626" />
                                        {errors.currency}
                                    </p>
                                )}
                            </div>

                            <div className="flex-1 min-w-[250px] max-w-[340px]">
                                <label className="block font-normal text-md font-Outfit mb-1">Weight</label>
                                <div className="relative">
                                    <select
                                        value={formData.weight}
                                        onChange={(e) => handleInputChange('weight', e.target.value)}

                                        className="w-full p-3 focus:outline-none border border-gray-300 rounded-lg font-medium text-sm text-slate-400 appearance-none font-Gilroy">
                                        <option value="" disabled selected>Select Weight</option>
                                        <option value="kg">Kilogram (kg)</option>
                                        <option value="g">Gram (g)</option>
                                        <option value="mg">Milligram (mg)</option>
                                        <option value="lb">Pound (lb)</option>
                                        <option value="oz">Ounce (oz)</option>
                                    </select>
                                    <svg className="w-4 h-4 text-[#4B5563] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex-1 min-w-[250px] max-w-[340px]">
                                <label className="block font-normal text-md font-Outfit mb-1">Discount</label>
                                <div className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden">
                                    <div className="px-3 py-2 border-r text-slate-400 text-sm">%</div>
                                    <input
                                        type="text"
                                        value={formData.discount}
                                        onChange={(e) => handleInputChange('discount', e.target.value)}
                                        placeholder="Enter Discount"
                                        className="w-full focus:outline-none px-3 py-3 font-medium text-sm text-slate-400 focus:outline-none font-Gilroy"
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="flex flex-wrap gap-3 mb-3">
                            <div className="flex-1">
                                <label className="block font-normal text-sm font-Outfit mb-1.5">
                                    HSN
                                </label>
                                <input
                                    type="text"
                                    value={formData.hsn}
                                    onChange={(e) => handleInputChange('hsn', e.target.value)}
                                    className="w-full border focus:outline-none border-gray-300 rounded-lg px-3 py-3 font-medium text-sm text-slate-500 font-Gilroy"
                                    placeholder="Enter hsn"
                                />
                            </div>
                            <div className="flex-1 min-w-[250px] max-w-[340px]">
                                <label className="block font-normal text-md font-Outfit mb-1">Gst</label>
                                <div className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden">
                                    <div className="px-3 py-2 border-r text-slate-400 text-sm">%</div>
                                    <input
                                        type="text"
                                        value={formData.gst}
                                        onChange={(e) => handleInputChange('gst', e.target.value)}
                                        placeholder="Enter GST"
                                        className="w-full focus:outline-none px-3 py-3 font-medium text-sm text-slate-400 focus:outline-none font-Gilroy"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 min-w-[250px] max-w-[340px]">
                                <label className="block font-normal text-md font-Outfit mb-1">Serial No</label>
                                <input
                                    type="text"
                                    value={formData.serialNo}
                                    onChange={(e) => handleInputChange('serialNo', e.target.value)}
                                    className="w-full focus:outline-none border border-gray-300 rounded-lg px-3 py-3 font-medium text-sm text-slate-500 font-Gilroy"
                                    placeholder="Enter Serial No"
                                />
                            </div>





                        </div>

                        <div className="flex flex-wrap gap-3 mb-3">
                            <div className="flex-1 ">
                                <label className="block font-normal text-md font-Outfit mb-1.5">
                                    Brand
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.brand}
                                        onChange={(e) => handleInputChange('brand', e.target.value)}
                                        className="w-full focus:outline-none p-3 border border-gray-300 rounded-lg font-medium text-sm text-slate-400 appearance-none font-Gilroy">
                                        <option value="" disabled selected>Select Brand</option>
                                        {state?.settings?.brandList.length > 0 ? state?.settings?.brandList?.map((brand, index) => (
                                            <option key={index} value={brand.id}>
                                                {brand.name}
                                            </option>
                                        ))


                                            :
                                            <option >
                                                No brand available
                                            </option>
                                        }
                                    </select>


                                    <svg className="w-4 h-4 text-[#4B5563] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex-1 ">
                                <label className="block font-normal text-md font-Outfit mb-1.5">
                                    Category
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.category}
                                        onChange={(e) => handleInputChange('category', e.target.value)}
                                        className="w-full focus:outline-none p-3 border border-gray-300 rounded-lg font-medium text-sm text-slate-400 appearance-none font-Gilroy">
                                        <option value="" disabled selected>Select Category</option>
                                        {state?.settings?.categoryList.length > 0 ? state?.settings?.categoryList?.map((category, index) => (
                                            <option key={index} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))


                                            :
                                            <option >
                                                No category available
                                            </option>
                                        }
                                    </select>


                                    <svg className="w-4 h-4 text-[#4B5563] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="block font-normal text-md font-Outfit mb-1.5">
                                    Sub Category
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.subCategory}
                                        onChange={(e) => handleInputChange('subCategory', e.target.value)}

                                        className="w-full p-3 focus:outline-none border border-gray-300 rounded-lg font-medium text-sm text-slate-400 appearance-none font-Gilroy">
                                        <option value="" disabled selected>Select Sub Category</option>
                                        {state?.settings?.subCategoryList.length > 0 ? state?.settings?.subCategoryList?.map((subcategory, index) => (
                                            <option key={index} value={subcategory.id}>
                                                {subcategory.name}
                                            </option>
                                        ))
                                            :
                                            <option >
                                                No sub category available
                                            </option>
                                        }
                                    </select>


                                    <svg className="w-4 h-4 text-[#4B5563] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                        </div>

                        <div className="flex flex-wrap gap-3 mb-3">
                            <div className="flex-1 ">
                                <label className="block font-normal text-md font-Outfit mb-1">Make</label>
                                <div className="relative">
                                    <select

                                        value={formData.make}
                                        onChange={(e) => handleInputChange('make', e.target.value)}

                                        className="w-full p-3 focus:outline-none border border-gray-300 rounded-lg font-medium text-sm text-slate-400 appearance-none font-Gilroy">
                                        <option value="" disabled selected>Select Make</option>
                                        <option value="zara">Zara</option>
                                        <option value="hm">H&M</option>
                                        <option value="forever21">Forever 21</option>
                                        <option value="uniqlo">Uniqlo</option>
                                        <option value="mango">Mango</option>
                                    </select>

                                    <svg className="w-4 h-4 text-[#4B5563] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex-1 ">
                                <label className="block font-normal text-md font-Outfit mb-1">Country of Origin</label>
                                <div className="relative">
                                    <select
                                        value={formData.country}
                                        onChange={(e) => handleInputChange('country', e.target.value)}

                                        className="w-full focus:outline-none p-3 border border-gray-300 rounded-lg font-medium text-sm text-slate-400 appearance-none font-Gilroy">
                                        <option value="" disabled>
                                            Enter Country of Origin
                                        </option>
                                        <option value="india">India</option>
                                        <option value="usa">United States</option>
                                        <option value="china">China</option>
                                        <option value="germany">Germany</option>
                                        <option value="japan">Japan</option>
                                        <option value="uk">United Kingdom</option>
                                    </select>

                                    <svg className="w-4 h-4 text-[#4B5563] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex-1 ">
                                <label className="block text-md font-Gilroy font-medium text-[#1F2937] mb-2">
                                    Month and Year of Manufacture
                                </label>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Month and Year of Manufacture"
                                    customInput={<CustomInput />}
                                />
                            </div>

                        </div>

                        <div className="flex flex-wrap gap-3 mb-3">
                            <div className="flex-1 max-w-[290px]">
                                <label className="block font-normal text-md font-Outfit mb-1">State</label>
                                <div className="relative">
                                    <select
                                        value={formData.stateName}
                                        onChange={(e) => handleInputChange('stateName', e.target.value)}

                                        className=" focus:outline-none w-full p-3 border border-gray-300 rounded-lg font-medium text-sm text-slate-400 appearance-none font-Gilroy">
                                        <option value="" disabled selected>
                                            Enter State
                                        </option>
                                        <option value="tamil-nadu">Tamil Nadu</option>
                                        <option value="maharashtra">Maharashtra</option>
                                        <option value="karnataka">Karnataka</option>
                                        <option value="delhi">Delhi</option>
                                        <option value="kerala">Kerala</option>
                                        <option value="gujarat">Gujarat</option>
                                        <option value="rajasthan">Rajasthan</option>
                                        <option value="west-bengal">West Bengal</option>
                                        <option value="uttar-pradesh">Uttar Pradesh</option>
                                        <option value="andhra-pradesh">Andhra Pradesh</option>
                                    </select>

                                    <svg
                                        className="w-4 h-4 text-[#4B5563] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>


                            <div className="flex-1 max-w-[290px]">
                                <label className="block font-normal text-md font-Outfit mb-1">
                                    District
                                </label>
                                <input
                                    type="text"
                                    value={formData.district}
                                    onChange={(e) => handleInputChange('district', e.target.value)}
                                    className="w-full border focus:outline-none border-gray-300 rounded-lg px-3 py-3 font-medium text-sm text-slate-500 font-Gilroy"
                                    placeholder="Enter District"
                                />
                            </div>



                        </div>
                    </div>




                    {/* additional field  */}

                    <div className="flex flex-wrap -mx-2 mb-3">
                        {displayItems.length > 0 &&
                            displayItems.map((field, index) => (
                                <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4 max-w-[100%]">
                                    {field.type === "text" && (
                                        <div>
                                            <label className="block font-normal text-md font-Outfit mb-1.5">
                                                {field.title}
                                            </label>
                                            <input
                                                type="text"
                                                value={formValues[field.title] || ""}
                                                placeholder={field.placeholder}
                                                onChange={(e) =>
                                                    textInputCallbackForName(field.title, e.target.value)
                                                }
                                                className="w-full border border-gray-300 rounded-lg font-medium text-sm text-slate-400 py-3 px-3 font-Gilroy"
                                            />
                                        </div>
                                    )}


                                    {field.type === "radio" && (
                                        <div>
                                            <label className="block font-normal text-md font-Outfit mb-1.5 capitalize">
                                                {field.title}
                                            </label>
                                            <div className="flex flex-wrap gap-4">
                                                {field.options?.map((option, idx) => (
                                                    <label key={idx} className="inline-flex items-center space-x-2 text-md text-gray-600 font-Outfit">
                                                        <input
                                                            type="radio"
                                                            id={`radio-${index}-${idx}`}
                                                            name={field.name}
                                                            value={option}
                                                            checked={field.value === option}
                                                            onChange={() => RadioOptionsChange(field.title, option)}
                                                            className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500 font-Gilroy text-sm"
                                                        />
                                                        <span>{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {field.type === "checkbox" && (
                                        <div>
                                            <label className="block text-md font-Outfit mb-1.5 capitalize text-black">
                                                {field.title}
                                            </label>
                                            <div className="flex flex-wrap gap-4">
                                                {field.options?.map((option, idx) => (
                                                    <label
                                                        key={idx}
                                                        className="flex items-center w-[calc(33.333%-0.5rem)] space-x-2 text-sm text-gray-600 font-Outfit"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            name={field.name}
                                                            value={option}
                                                            checked={field.defaultValue?.includes(option)}
                                                            onChange={() => CheckboxOptionsChange(field.title, option)}
                                                            className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500 font-Gilroy text-sm"
                                                        />
                                                        <span>{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {field.type === "select" && (
                                        <div>
                                            <label className="block font-normal text-md font-Outfit mb-1.5 capitalize text-black">
                                                {field.title}
                                            </label>
                                            <div className="relative">
                                                <select
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-[10px] text-sm font-Gilroy font-medium text-gray-700 appearance-none"
                                                    defaultValue=""
                                                    onChange={(e) => SelectOptionsChange(field.title, e.target.value)}
                                                >
                                                    <option value="" disabled>
                                                        Select {field.title}
                                                    </option>
                                                    {field.options?.map((option, idx) => (
                                                        <option key={idx} value={option}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </select>
                                                <svg
                                                    className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    )}

                                    {field.type === "textarea" && (
                                        <div>
                                            <label className="block font-normal text-sm font-Outfit mb-1.5 capitalize text-black font-Outfit">
                                                {field.title}
                                            </label>
                                            <textarea
                                                className="w-full border border-gray-300 rounded-lg px-3 py-[10px] text-sm  font-Gilroy font-medium text-gray-700 resize-none h-28"
                                                placeholder={field.placeholder}
                                                value={field.value}
                                                onChange={(e) => CallbackForTextArea(field.title, e.target.value)}
                                            />
                                        </div>
                                    )}

                                </div>
                            ))}
                    </div>




                    <div> {
                        showAdditionalFields && <FormBuilder update={updateDisplayItems} handleClose={handleCloseForm} />}

                    </div>

                    <button className='bg-blue-900 px-4 py-3 rounded-lg text-base font-bold text-white flex items-center mt-3 font-Outfit' onClick={updateShowAdditionalFields} >+ Additional Field</button>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
                    <button className="bg-white border border-rose-600 text-rose-600 font-medium py-2 px-6 rounded-lg font-Montserrat">
                        Cancel
                    </button>
                    <button onClick={handleSubmit} className="bg-blue-900 text-white font-medium py-2 px-6 rounded-lg font-Montserrat">
                        Submit
                    </button>
                </div>



            </div>
        </div>
    );
}
AddProduct.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
    placeholder: PropTypes.string,
};
export default AddProduct;