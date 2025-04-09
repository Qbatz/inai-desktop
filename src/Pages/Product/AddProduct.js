import React, { useState, useEffect, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Trash from "../../Asset/Icon/trash.svg";
import addcircle from "../../Asset/Icon/add-circle.svg";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays } from "lucide-react";
import { format } from "date-fns";
import Arrow from "../../Asset/Icon/Arrow.svg";
import FormDisplay from '../../FormBuilderComponent/FormDisplay';
import { FaFilePdf } from "react-icons/fa";
import FormBuilder from '../../FormBuilderComponent/AdditionalFormField';
import TextInput from '../../Components/TextInput';
import Radio from '../../Components/Radio';


export default function AddProduct() {

    const [selectedDate, setSelectedDate] = useState(null);
    const [images, setImages] = useState([]);
    const [techImages, setTechImages] = useState([]);
    const [showAdditionalFields, setShowAdditionalFields] = useState(false)
    const [displayItems, setDisplayItems] = useState([])



    useEffect(() => {
        const storedImages = localStorage.getItem("uploadedImages");
        if (storedImages) {
            setImages(JSON.parse(storedImages));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("uploadedImages", JSON.stringify(images));
    }, [images]);


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

    const textInputCallbackForName = (title, newValue) => {
      
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


    const CustomInput = forwardRef(({ value, onClick, placeholder }, ref) => (
        <div
            className="flex items-center border rounded-md px-3 py-2.5 text-sm text-gray-700 cursor-pointer"
            onClick={onClick}
            ref={ref}
            style={{ width: "310px" }}
        >
            <input
                type="text"
                value={value}
                onChange={() => { }}
                placeholder={placeholder}
                className="flex-1 outline-none placeholder-gray-400"
                readOnly
            />
            <CalendarDays className="text-gray-400 ml-2" size={18} />
        </div>
    ));


    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div
                className="absolute -left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
                onClick={onClick}
            >
                <img src={Arrow} className="w-7 h-7 rotate-180" alt="prev" />
            </div>
        );
    };
    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <div
                className="absolute -right-1 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
                onClick={onClick}
            >
                <img src={Arrow} className="w-7 h-7" alt="next" />
            </div>
        );
    };



    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: Math.min(images.length, 3),
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    const techSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: Math.min(techImages.length, 3),
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };



    return (
        <div className="bg-gray-100 p-6 min-h-screen flex w-full justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                <h2 className="text-xl font-semibold mb-4">Add Product</h2>

                <div className="flex justify-between">
                    {/* Left Section (Fixed Width) */}
                    <div className="w-[350px] space-y-4">
                        <div className="w-[330px] space-y-4">
                            <div>
                                <label className="block font-normal text-sm font-Outfit">
                                    Product Code (Unique) <span className="text-red-500 text-lg">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Product Code"
                                    className="mt-1 w-[330px] p-3 border rounded-lg font-medium text-xs text-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block font-normal text-sm font-Outfit">
                                    Product Name <span className="text-red-500 text-lg">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Select Product Name"
                                    className="mt-1 w-[330px] p-3 border rounded-lg font-medium text-xs text-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block font-normal text-sm font-Outfit">
                                    Description<span className="text-red-500 text-lg">*</span>
                                </label>
                                <textarea
                                    placeholder="Enter Description"
                                    className="mt-1 w-[330px] p-4 border rounded-lg h-36 font-medium text-xs text-slate-500"
                                />
                            </div>
                            <div>
                                <label className="block font-normal text-sm font-Outfit mb-1">
                                    Available Quantity
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Available Quantity"
                                    className="mt-1 w-[330px] p-3 border rounded-lg font-medium text-xs text-gray-500"
                                />
                            </div>
                            <div>
                                <label className="block font-normal text-sm font-Outfit mb-px">
                                    Currency <span className="text-red-500 text-lg inline leading-none">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Available Quantity"
                                    className="mt-1 w-[330px] p-3 border rounded-lg font-medium text-xs text-gray-500"
                                />
                            </div>
                            <div>
                                <label className="block font-normal text-sm font-Outfit mb-1">
                                    MSN
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Currrency"
                                    className="mt-1 w-[330px] p-3 border rounded-lg font-medium text-xs text-gray-500"
                                />
                            </div>
                            <div>
                                <label className="block font-normal text-sm font-Outfit mb-px">
                                    Category
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Category"
                                    className="mt-1 w-[330px] p-3 border rounded-lg font-medium text-xs text-gray-500"
                                />
                            </div>
                            <div>
                                <label className="block text-[13px] font-medium text-[#1F2937] mb-2">
                                    Country of Origin
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-[330px] appearance-none border border-[#E5E7EB] rounded-lg p-3 font-medium text-xs text-gray-400"
                                    >
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
                            <div>
                                <label className="block text-[13px] font-medium text-[#1F2937] mb-2">
                                    State
                                </label>
                                <div className="relative">
                                    <select
                                        className="w-[330px] appearance-none border border-[#E5E7EB] rounded-lg p-3 font-medium text-xs text-gray-400"
                                    >
                                        <option value="" disabled>
                                            Select State
                                        </option>
                                        <option value="andhra">Andhra Pradesh</option>
                                        <option value="arunachal">Arunachal Pradesh</option>
                                        <option value="karnataka">Karnataka</option>
                                        <option value="kerala">Kerala</option>
                                        <option value="madhya">Madhya Pradesh</option>
                                        <option value="maharashtra">Maharashtra</option>
                                        <option value="manipur">Manipur</option>
                                        <option value="meghalaya">Meghalaya</option>
                                        <option value="mizoram">Mizoram</option>
                                        <option value="nagaland">Nagaland</option>
                                        <option value="odisha">Odisha</option>
                                        <option value="punjab">Punjab</option>
                                        <option value="rajasthan">Rajasthan</option>
                                        <option value="sikkim">Sikkim</option>
                                        <option value="tamilnadu">Tamil Nadu</option>
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
                        </div>
                    </div>

                    {/* Right Section (Full Width) */}
                    <div className="flex-1 space-y-4">

                        <div className="w-full p-0 bg-white">

                            <label className="block font-normal text-sm font-Outfit">Add Photos</label>

                            <div className="flex gap-">
                                {images?.length > 0 && (
                                    <div className=" mt-2">
                                        <Slider {...settings}>
                                            {images.map((img, index) => (
                                                <div key={index} className="px-2 mt-2">
                                                    <div className="relative w-36 h-[135px] border rounded-md overflow-hidden">
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
                                        </Slider>
                                    </div>
                                )}


                                <div className="px-2 mt-4">
                                    <div className="w-36 h-[135px] border-dashed border flex items-center justify-center rounded-md cursor-pointer">
                                        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                            <img src={addcircle} alt="addcircle" className="w-6 h-6 mb-1" />
                                            <span className="font-Gilroy font-semibold text-xs text-blue-700 text-center">Add Image</span>
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

                            </div>

                            <label className="block font-normal text-sm font-Outfit mt-2">Technical</label>

                            <div className="mt-2 flex gap-4 items-start">
                                {techImages?.length > 0 && (
                                    <div className="max-w-[480px] w-full">
                                        <Slider {...techSettings}>
                                            {techImages.map((file, index) => (
                                                <div key={index} className="px-1">
                                                    <div className="relative w-36 h-[140px] border rounded-md flex items-center justify-center text-center">
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
                                        </Slider>
                                    </div>
                                )}
                                <label className="w-36 h-[142px] border-dashed border flex flex-col items-center justify-center rounded-md cursor-pointer">
                                    <img src={addcircle} alt="addcircle" className="w-6 h-6 mb-1" />
                                    <span className="font-Gilroy font-semibold text-xs text-blue-700 text-center">
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




                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                                <div>
                                    <label className="block text-[13px] font-Gilroy font-medium text-[#1F2937] mb-2">Unit of measurement</label>
                                    <div className="relative">
                                        <select className="w-full p-3 border rounded-lg font-Gilroy font-medium text-xs text-gray-400 appearance-none">
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

                                <div>
                                    <label className="block font-normal text-sm font-Outfit mb-2">Price</label>
                                    <input type="text" placeholder="Enter Price" className="w-full p-3 border rounded-lg font-Gilroy font-medium text-xs text-gray-500" />
                                </div>
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                <div>
                                    <label className="block text-[13px] font-Gilroy font-medium text-[#1F2937] mb-2">Weight</label>
                                    <div className="relative">
                                        <select className="w-full p-3 border rounded-lg font-Gilroy font-medium text-xs text-gray-400 appearance-none">
                                            <option value="" disabled selected>Select Weight</option>
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

                                <div>
                                    <label className="block text-[13px] font-Gilroy font-medium text-[#1F2937] mb-2">Discount</label>
                                    <div className="flex items-center w-full border rounded-lg overflow-hidden">
                                        <div className="px-3 py-2 border-r text-slate-400 text-sm">%</div>
                                        <input type="text" placeholder="Enter Discount" className="w-full px-3 py-3 text-xs font-medium text-slate-500 font-Gilroy focus:outline-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                                <div className="">
                                    <label className="block text-[13px] font-[Gilroy] font-medium text-[#1F2937] mb-2">
                                        GST
                                    </label>
                                    <div className="flex items-center w-full border rounded-lg overflow-hidden">
                                        <div className="px-3 py-2 border-r text-slate-400 text-sm">
                                            %
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Enter Gst"
                                            className="w-full px-3 py-3 text-xs font-medium text-slate-500 font-Gilroy focus:outline-none"

                                        />
                                    </div>


                                </div>

                                <div className="">
                                    <label className="block font-normal text-sm font-Outfit mb-0.5">
                                        Serial No
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Serial No"
                                        className="mt-1 w-full p-3 border rounded-lg font-Gilroy font-medium text-xs text-gray-500 font-Gilroy"
                                    />
                                </div>



                            </div>




                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-5">
                                <div>
                                    <label className="block font-normal text-sm font-Outfit mb-px">Sub Category</label>
                                    <input type="text" placeholder="Enter Sub Category" className="w-full p-3 border rounded-lg font-Gilroy font-medium text-xs text-gray-500 mt-1" />
                                </div>

                                <div>
                                    <label className="block text-[13px] font-Gilroy font-medium text-[#1F2937] mb-1 mt-0.5">Make</label>
                                    <div className="relative">
                                        <select className="w-full p-3 border rounded-lg font-Gilroy font-medium text-xs text-gray-400 appearance-none">
                                            <option value="" disabled selected>Select Make</option>
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
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
                                <div className="flex flex-col justify-end">
                                    <label className="block text-xs font-Gilroy font-medium text-[#1F2937] mb-2">Month and Year of Manufacture</label>
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                        dateFormat="dd/MM/yyyy"
                                        customInput={
                                            <CustomInput
                                                value={selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""}
                                                placeholder="Month and Year of Manufacture"
                                            />
                                        }
                                    />

                                </div>
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 mt-4">
                                <div className="w-[310px]">
                                    <label className="block font-normal text-sm font-Outfit mb-1">District</label>
                                    <input type="text" placeholder="Enter District" className="w-full p-3 border rounded-lg font-Gilroy font-medium text-xs text-gray-500 mt-1" />
                                </div>
                            </div>
                        </div>





                    </div>
                </div>
                <div className='flex flex-row flex-wrap'>
                    {displayItems.length > 0 && displayItems.map((field, index) => {
                        return <div key={index} className='flex-33%' >
                            <div >
                            {field.type === "text" && (
                                <TextInput value={field.title || ""} title={field.title} placeholder={field.placeholder} callback={(newValue) => textInputCallbackForName(field.title, newValue)} />
                            )}
                          </div>
                        </div>
                    })}
                </div>
                <div className='-ml-5'> {
                    showAdditionalFields && <FormBuilder update={updateDisplayItems} handleClose={handleCloseForm} />}

                </div>

                <button className='bg-blue-900 px-4 py-3 rounded-lg text-base font-bold text-white flex items-center m-5 ' onClick={updateShowAdditionalFields} >+ Additional Field</button>

                <div className="flex flex-col md:flex-row items-center gap-4 mt-6">
                    <button className="bg-white border border-rose-600 text-rose-600 font-medium py-2 px-6 rounded-lg">
                        Cancel
                    </button>
                    <button className="bg-blue-900 text-white font-medium py-2 px-6 rounded-lg">
                        Submit
                    </button>
                </div>

            </div>
        </div>
    );
}
