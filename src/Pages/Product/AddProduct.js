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
import { FaFilePdf } from "react-icons/fa";
import FormBuilder from '../../FormBuilderComponent/AdditionalFormField';
import { MdError } from "react-icons/md";
import PropTypes from 'prop-types';


function AddProduct() {

    const scrollRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [images, setImages] = useState([]);
    const [techImages, setTechImages] = useState([]);
    const [showAdditionalFields, setShowAdditionalFields] = useState(false)
    const [displayItems, setDisplayItems] = useState([])
    const [formValues, setFormValues] = useState({});

    const [serialNo, setSerialNo] = useState(1);
    const [formData, setFormData] = useState({
        serialNo: "1",
        productCode: "",
        productName: "",
        description: "",
        currency: ""
    });

    const [errors, setErrors] = useState({});


    useEffect(() => {
        const storedImages = localStorage.getItem("uploadedImages");
        if (storedImages) {
            setImages(JSON.parse(storedImages));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("uploadedImages", JSON.stringify(images));
    }, [images]);

    useEffect(() => {
        if (!formData.serialNo) {
            setFormData((prev) => ({ ...prev, serialNo: serialNo.toString() }));
        }
    }, [formData.serialNo, serialNo]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: ""
        }));
    };

    const validate = () => {
        let newErrors = {};

        if (!formData.productCode.trim()) newErrors.productCode = "Product Code is required";
        if (!formData.productName.trim()) newErrors.productName = "Product Name is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.currency.trim()) newErrors.currency = "Currency is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleImageAdd = (e) => {
        const files = Array.from(e.target.files);
        const newPreviews = files.map(file => URL.createObjectURL(file));

        setImages((prev) => {
            const unique = newPreviews.filter(preview => !prev.includes(preview));
            return [...prev, ...unique];
        });
    };

    const handleImageDelete = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleTechDocAdd = (e) => {
        const files = Array.from(e.target.files);
        const filePreviews = files.map((file) => {
            const previewUrl = URL.createObjectURL(file);
            return {
                name: file.name,
                type: file.type,
                preview: previewUrl,
            };
        });
        setTechImages((prev) => [...prev, ...filePreviews]);
    };

    const handleTechDocDelete = (index) => {
        setTechImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleScrollToLeftPhotos = () => {
        scrollRef.current.scrollBy({ left: -500, behavior: 'smooth' });
    }

    const handleScrollToRightPhotos = () => {
        scrollRef.current.scrollBy({ left: 500, behavior: 'smooth' });
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
                className="fixed cursor-pointer"
                onClick={handleScrollToLeftPhotos}
            >
                <img src={Arrow} className="w-7 h-7 rotate-180" alt="prev" />
            </div>
        );
    };
    const NextArrow = () => {
        return (
            <div
                className="fixed cursor-pointer"
                onClick={handleScrollToRightPhotos}
            >
                <img src={Arrow} className="w-7 h-7" alt="next" />
            </div>
        );
    };

    // const techSettings = {
    //     dots: false,
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: Math.min(techImages.length, 3),
    //     slidesToScroll: 1,
    //     prevArrow: <PrevArrow />,
    //     nextArrow: <NextArrow />,
    // };

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

        const updatedItems = displayItems.map((item) =>
            item.title === title ? { ...item, value: newValue } : item
        );
        setDisplayItems(updatedItems);
    }
    const CheckboxOptionsChange = (title, newValue) => {

        const updatedItems = displayItems.map((item) =>
            item.title === title ? { ...item, value: newValue } : item
        );
        setDisplayItems(updatedItems);
    }

    const SelectOptionsChange = (title, newValue) => {

        const updatedItems = displayItems.map((item) =>
            item.title === title ? { ...item, value: newValue } : item
        );
        setDisplayItems(updatedItems);
    }

    const textInputCallbackForName = () => {

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
                productCode: "",
                productName: "",
                description: "",
                currency: ""
            });
            setErrors({});
            alert("Form submitted successfully!");
        }
    };


    return (
        <div className="bg-gray-100 p-6 min-h-screen flex w-full justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                <h2 className="text-xl font-semibold mb-4 font-Gilroy">Add Product</h2>

                <div className="flex-1 mx-auto w-full max-w-7xl rounded-xl max-h-[500px] overflow-y-auto">

                    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] mb-2 items-start ">
                        <div className="w-full flex flex-col h-full">
                            <div>
                                <label className="block font-normal text-xs font-Outfit mb-1">
                                    Product Code (Unique) <span className="text-red-500 text-lg">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="mb-1 w-[290px] border border-gray-300 rounded-lg px-3 py-3 font-medium text-xs text-slate-500 font-Gilroy"
                                    placeholder="Enter Product Name"
                                    name="productCode"
                                    value={formData.productCode}
                                    onChange={handleChange}
                                />
                                {errors.productCode && (
                                    <p className="text-red-500 text-xs flex items-center gap-1">
                                        <MdError className="text-red-500 text-xs mt-0.5" />
                                        {errors.productCode}
                                    </p>
                                )}

                            </div>


                            <div>
                                <label className="block font-normal text-xs font-Outfit mb-1">
                                    Product Name <span className="text-red-500 text-lg">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="mb-1 w-[290px] border border-gray-300 rounded-lg px-3 py-3 font-medium text-xs text-slate-500 font-Gilroy"
                                    placeholder="Enter Product Name"
                                    name="productName"
                                    value={formData.productName}
                                    onChange={handleChange}
                                />
                                {errors.productName && (
                                    <p className="text-red-500 text-xs flex items-center gap-1">
                                        <MdError className="text-red-500 text-xs mt-0.5" />
                                        {errors.productName}
                                    </p>
                                )}




                            </div>

                            <div>
                                <label className="block font-normal text-xs font-Outfit mb-1">
                                    Description<span className="text-red-500 text-lg">*</span>
                                </label>

                                <textarea
                                    placeholder="Enter Description"
                                    className="mt-1 w-[290px] p-4 border rounded-lg h-36 font-medium text-xs text-slate-500 font-Gilroy"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-xs flex items-center gap-1">
                                        <MdError className="text-red-500 text-xs mt-0.5" />
                                        {errors.description}
                                    </p>
                                )}
                            </div>
                        </div>



                        <div className="w-full p-2 flex flex-col h-full">
                            <label className="block font-normal text-sm font-Outfit">Add Photos</label>

                            <div className="flex mt-2 gap-0">

                                <div ref={scrollRef} className='flex flex-row max-w-[640px] ml-[10px] overflow-scroll relative items-center'>
                                    {images?.length > 0 && (
                                        <div className="bg-white flex flex-row">
                                            {images.map((img, index) => (
                                                <div key={index} className="px-1">
                                                    <div className="relative w-32 h-32 rounded-md overflow-hidden">
                                                        <img
                                                            src={img}
                                                            alt={`Uploaded-${index}`}
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
                                    )}

                                    {
                                        images.length > 4 && <div className='absolute left-0 mb-[25px]'>
                                            <PrevArrow className='fixed ' />

                                        </div>
                                    }

                                    {
                                        images.length > 4 && <div className='absolute right-[28px] mb-[25px]'>
                                            <NextArrow className='fixed ' />

                                        </div>
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
                            <label className="block font-normal text-sm font-Outfit mt-2">Technical</label>

                            <div className="flex mt-2">

                                {techImages?.length > 0 && (
                                    <div className="w-[450px] bg-white rounded-md">
                                        {techImages.map((file, index) => (
                                            <div key={index} className="px-1">
                                                <div className="relative w-32 h-32 border rounded-md flex items-center justify-center text-center">
                                                    {file.type && file.type.startsWith("image/") ? (
                                                        <img
                                                            src={file.preview}
                                                            alt={`tech-${index}`}
                                                            className="w-full h-full object-cover rounded-md"
                                                        />
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center w-full h-full px-1 text-center relative">
                                                            <a
                                                                href={file.preview}
                                                                download={file.name}
                                                                className="text-xs truncate w-full break-words max-h-[55px] overflow-hidden text-blue-600 hover:underline"
                                                            >
                                                                {file.name}
                                                            </a>

                                                            <div className="absolute bottom-2 left-2">
                                                                <a
                                                                    href={file.preview}
                                                                    download={file.name}
                                                                    title="Download PDF"
                                                                    className="flex items-center justify-center w-8 h-8 rounded-full border border-blue-900 hover:bg-gray-200 text-red-600"
                                                                >
                                                                    <FaFilePdf size={18} />
                                                                </a>
                                                            </div>

                                                            <div className="absolute bottom-2 right-2">
                                                                <div
                                                                    onClick={() => handleTechDocDelete(index, setTechImages)}
                                                                    className="flex items-center justify-center w-8 h-8 rounded-full border border-blue-900 bg-opacity-50 cursor-pointer hover:bg-opacity-75"
                                                                >
                                                                    <img
                                                                        src={Trash}
                                                                        className="w-4 h-4 filter brightness-0 contrast-100"
                                                                        alt="Delete"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
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
                                <label className="block font-normal text-sm font-Outfit mb-1.5">
                                    Available Quantity
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-3 font-medium text-xs text-slate-500 font-Gilroy"
                                    placeholder="Enter Available Quantity"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block font-normal text-sm font-Outfit mb-1.5">Unit of measurement</label>
                                <div className="relative">
                                    <select className="w-full p-3 border rounded-lg font-medium text-xs text-slate-400 appearance-none">
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
                            </div>
                            <div className="flex-1 min-w-[250px] max-w-[340px]">
                                <label className="block font-normal text-sm font-Outfit mb-1">Price</label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-3 font-medium text-xs text-slate-500 font-Gilroy"
                                    placeholder="Enter Price"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-3">

                            <div className="flex-1 min-w-[250px] max-w-[340px]">
                                <label className="block font-normal text-sm font-Outfit mb-1 flex items-center gap-1">
                                    Currency
                                    <span className="text-red-500 text-sm">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-3 font-medium text-xs text-slate-500 font-Gilroy"
                                    placeholder="Enter Product Name"
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleChange}
                                />

                                {errors.currency && (
                                    <p className="text-red-500 mt-1 text-xs flex items-center gap-1">
                                        <MdError className="text-red-500 text-xs mt-0.5" />
                                        {errors.currency}
                                    </p>
                                )}
                            </div>

                            <div className="flex-1 min-w-[250px] max-w-[340px]">
                                <label className="block font-normal text-sm font-Outfit mb-1">Weight</label>
                                <div className="relative">
                                    <select className="w-full p-3 border border-gray-300 rounded-lg font-medium text-xs text-slate-400 appearance-none font-Gilroy">
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
                                <label className="block font-normal text-sm font-Outfit mb-1">Discount</label>
                                <div className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden">
                                    <div className="px-3 py-2 border-r text-slate-400 text-sm">%</div>
                                    <input
                                        type="text"
                                        placeholder="Enter Discount"
                                        className="w-full px-3 py-3 font-medium text-xs text-slate-400 focus:outline-none font-Gilroy"
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
                                    className="w-full border border-gray-300 rounded-lg px-3 py-3 font-medium text-xs text-slate-500 font-Gilroy"
                                    placeholder="Enter Currency"
                                />
                            </div>
                            <div className="flex-1 min-w-[250px] max-w-[340px]">
                                <label className="block font-normal text-sm font-Outfit mb-1">Gst</label>
                                <div className="flex items-center w-full border border-gray-300 rounded-lg overflow-hidden">
                                    <div className="px-3 py-2 border-r text-slate-400 text-sm">%</div>
                                    <input
                                        type="text"
                                        placeholder="Enter GST"
                                        className="w-full px-3 py-3 font-medium text-xs text-slate-400 focus:outline-none font-Gilroy"
                                    />
                                </div>
                            </div>
                            <div className="flex-1 min-w-[250px] max-w-[340px]">
                                <label className="block font-normal text-sm font-Outfit mb-1">Serial No</label>
                                <input
                                    type="text"
                                    value={formData.serialNo}
                                    onChange={handleChange}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-3 font-medium text-xs text-slate-500 font-Gilroy"
                                    placeholder="Enter Serial No"
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 mb-3">
                            <div className="flex-1">
                                <label className="block font-normal text-sm font-Outfit mb-1.5">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-3 font-medium text-xs text-slate-500 font-Gilroy"
                                    placeholder="Enter Category"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block font-normal text-sm font-Outfit mb-1.5">
                                    Sub Category
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-3 font-medium text-xs text-slate-500 font-Gilroy"
                                    placeholder="Enter Sub Category"
                                />
                            </div>
                            <div className="flex-1 min-w-[250px] max-w-[340px]">
                                <label className="block font-normal text-sm font-Outfit mb-1">Make</label>
                                <div className="relative">
                                    <select className="w-full p-3 border border-gray-300 rounded-lg font-medium text-xs text-slate-400 appearance-none font-Gilroy">
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
                        </div>

                        <div className="flex flex-wrap gap-3 mb-3">
                            <div className="flex-1 max-w-[290px]">
                                <label className="block font-normal text-sm font-Outfit mb-1">Country of Origin</label>
                                <div className="relative">
                                    <select className="w-full p-3 border border-gray-300 rounded-lg font-medium text-xs text-slate-400 appearance-none font-Gilroy">
                                        <option value="" disabled>
                                            Enter Country of Origin
                                        </option>
                                        <option value="india">India</option>
                                        <option value="usa">United States</option>
                                        <option value="china">China</option>
                                        <option value="germany">Germany</option>
                                        <option value="japan">Japan</option>                                         <option value="uk">United Kingdom</option>
                                    </select>

                                    <svg className="w-4 h-4 text-[#4B5563] absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>

                            <div className="flex-1 ">
                                <label className="block text-xs font-Gilroy font-medium text-[#1F2937] mb-2">
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
                                <label className="block font-normal text-sm font-Outfit mb-1">State</label>
                                <div className="relative">
                                    <select className="w-full p-3 border border-gray-300 rounded-lg font-medium text-xs text-slate-400 appearance-none font-Gilroy">
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
                                <label className="block font-normal text-sm font-Outfit mb-1">
                                    District
                                </label>
                                <input
                                    type="text"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-3 font-medium text-xs text-slate-500 font-Gilroy"
                                    placeholder="Enter District"
                                />
                            </div>



                        </div>
                    </div>


                    <div className="flex flex-wrap -mx-2 mb-3">
                        {displayItems.length > 0 &&
                            displayItems.map((field, index) => (
                                <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4 max-w-[100%]">
                                    {field.type === "text" && (
                                        <div>
                                            <label className="block font-normal text-sm font-Outfit mb-1.5">
                                                {field.title}
                                            </label>
                                            <input
                                                type="text"
                                                value={formValues[field.title] || ""}
                                                placeholder={field.placeholder}
                                                onChange={(e) =>
                                                    textInputCallbackForName(field.title, e.target.value)
                                                }
                                                className="w-full border border-gray-300 rounded-lg font-medium text-xs text-slate-400 py-3 px-3 font-Gilroy"
                                            />
                                        </div>
                                    )}


                                    {field.type === "radio" && (
                                        <div>
                                            <label className="block font-normal text-sm font-Outfit mb-1.5 capitalize">
                                                {field.title}
                                            </label>
                                            <div className="flex flex-wrap gap-4">
                                                {field.options?.map((option, idx) => (
                                                    <label key={idx} className="inline-flex items-center space-x-2 text-xs text-gray-600 font-Outfit">
                                                        <input
                                                            type="radio"
                                                            id={`radio-${index}-${idx}`}
                                                            name={field.name}
                                                            value={option}
                                                            checked={field.value === option}
                                                            onChange={() => RadioOptionsChange(field.title, option)}
                                                            className="w-3 h-3 text-blue-600 border-gray-300 focus:ring-blue-500 font-Gilroy"
                                                        />
                                                        <span>{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {field.type === "checkbox" && (
                                        <div>
                                            <label className="block text-sm font-Outfit mb-1.5 capitalize text-black">
                                                {field.title}
                                            </label>
                                            <div className="flex flex-wrap gap-4">
                                                {field.options?.map((option, idx) => (
                                                    <label
                                                        key={idx}
                                                        className="flex items-center w-[calc(33.333%-0.5rem)] space-x-2 text-xs text-gray-600 font-Outfit"
                                                    >
                                                        <input
                                                            type="checkbox"
                                                            name={field.name}
                                                            value={option}
                                                            checked={field.defaultValue?.includes(option)}
                                                            onChange={() => CheckboxOptionsChange(field.title, option)}
                                                            className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500 font-Gilroy"
                                                        />
                                                        <span>{option}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {field.type === "select" && (
                                        <div>
                                            <label className="block font-normal text-sm font-Outfit mb-1.5 capitalize text-black">
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
        </div>
    );
}
AddProduct.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
    placeholder: PropTypes.string,
};
export default AddProduct;