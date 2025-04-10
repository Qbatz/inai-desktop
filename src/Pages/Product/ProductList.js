import React, { useState, useRef, useEffect } from 'react';
import PlusCircle from '../../Asset/Images/Plus_Circle.svg';
import { SearchNormal1, Calendar, Edit, Trash } from "iconsax-react";
import Filter from '../../Asset/Images/filter.png';
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { enGB } from "date-fns/locale";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Vectors from "../../Asset/Icon/Vectors.svg";
import KurtiSets from "../../Asset/Icon/KurtiSets.svg";
import LongSleeve from "../../Asset/Icon/LongSleeve.svg";
import Salwar from "../../Asset/Icon/Salwar.svg";
import CollarTshirt from "../../Asset/Icon/CollarTshirt.svg";
import CottonBlend from "../../Asset/Icon/CottonBlend.svg";
import RoundNeck from "../../Asset/Icon/Round Neck.svg";
import SolidTShirt from "../../Asset/Icon/SolidTShirt.svg";
import Stylish from "../../Asset/Icon/Stylish.svg";
import { useNavigate } from 'react-router-dom';
import DeleteProduct from './DeleteProduct';

function ProductList() {


  const navigate = useNavigate()

    const [showPicker, setShowPicker] = useState(false);
    const [showPopup, setShowPopUp] = useState(null);
    const [showDeleteProduct, setShowDeleteProduct] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const popupRef = useRef(null);
    const pickerRef = useRef(null);


    const [dateRange, setDateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopUp(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target)) {
                setShowPicker(false);
            }
        };

        if (showPicker) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showPicker]);

    const handleSelect = (ranges) => {
        setDateRange([ranges.selection]);
        setShowPicker(false);
    };

    const handleShowPopup = (id, event) => {
        const { top, left, height } = event.target.getBoundingClientRect();
        setPopupPosition({
            top: top + height + 5,
            left: left - 150,
        });
        setShowPopUp(showPopup === id ? null : id);
    };
    const handleDeleteProductPopup = (id) => {
        setShowDeleteProduct(true);
        setShowPopUp(null);
        setDeleteProductId(id)
      };
    const handleCloseForDeleteProduct = () => {
        setShowDeleteProduct(false);
      };
   
    const imageMapping = {
        kurtiSets: KurtiSets,
        Longsleeves: LongSleeve,
        Salwar: Salwar,
        SolidTShirt: SolidTShirt,
        CottonBlend: CottonBlend,
        RoundNeck: RoundNeck,
        Stylish: Stylish,
        CollarTshirt: CollarTshirt,
    };

    const Data = [
        {
            image: "kurtiSets",
            productName: "Kurta With Dupatta",
            quantity: 457,
            year: 2023,
            price: "₹ 2,500",
            totalPrice: "₹ 2,500",
            status: "Pending",
        },
        {
            image: "Longsleeves",
            productName: "Long Sleeves Pattern",
            quantity: 360,
            year: 2023,
            price: "₹ 2,500",
            totalPrice: "₹ 2,500",
            status: "Completed",
        },
        {
            image: "Salwar",
            productName: "Three-Quarter Sleeves",
            quantity: 219,
            year: 2023,
            price: "₹ 2,500",
            totalPrice: "₹ 2,500",
            status: "Cancel",
        },
        {
            image: "SolidTShirt",
            productName: "Collar T Shirt for Men",
            quantity: 249,
            year: 2023,
            price: "₹ 2,500",
            totalPrice: "₹ 2,500",
            status: "Pending",
        },
        {
            image: "CottonBlend",
            productName: "Cotton Blend Solid T-shirt",
            quantity: 321,
            year: 2023,
            price: "₹ 2,500",
            totalPrice: "₹ 2,500",
            status: "Cancel",
        },
        {
            image: "Round Neck",
            productName: "Men Printed Round Neck",
            quantity: 523,
            year: 2023,
            price: "₹ 2,500",
            totalPrice: "₹ 2,500",
            status: "Pending",
        },
        {
            image: "Stylish",
            productName: "Sample Product",
            quantity: 334,
            year: 2023,
            price: "₹ 2,500",
            totalPrice: "₹ 2,500",
            status: "Completed",
        },
    ];

 

    return (
        <div className='bg-slate-100 flex-1 flex w-full p-4 rounded-tl-lg rounded-tr-lg m-0'>

    <div className='bg-white flex-1 flex flex-col rounded-2xl ps-5 pt-3 pe-5 relative'>

                <div className='flex flex-col xs:items-center sm:flex-row md:flex-row justify-between items-center gap-2 sticky left-0 top-0 right-0 '>
                    <div>
                        <h2 className="text-xl font-semibold mb-2 font-Gilroy text-black">ProductList</h2>
                    </div>

                    <div className="">
                        <button
                            onClick={() => {navigate('/add-Products')}}
                            className="px-6 md:px-8 lg:px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat text-xs md:text-base font-medium flex items-center gap-2">
                            <img src={PlusCircle} alt="plus" className='w-4 md:w-5 lg:w-4' /> AddProduct</button>
                    </div>
                </div>

                <div className='grid md:grid-cols-12 sm:grid-cols-2 gap-3 mb-2 pt-4'>
                    <div className="relative  col-span-7">
                        <SearchNormal1
                            size="16"
                            color="gray"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black-500"
                        />
                        <input
                            type="text"
                            placeholder='Search by ID, Support, or others'
                            className="w-full bg-slate-100 border-slate-100 pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#205DA8] text-gray-500 font-Gilroy  text-sm font-medium"
                        />
                    </div>
                    <div className=" col-span-2 bg-slate-100  rounded-lg flex items-center gap-2 justify-center  cursor-pointer">
                        <img alt="plus" src={Filter}
                            className=" text-gray-500 h-4 w-4"
                        />

                        <label className='block text-gray-500 font-Gilroy  text-sm font-medium'>Filters</label>
                    </div>



                    <div className="relative col-span-3 bg-slate-100 rounded-lg cursor-pointer">
                        <div
                            className="flex items-center cursor-pointer"
                            onClick={() => setShowPicker(!showPicker)}
                        >
                            <Calendar
                                size="16"
                                color="gray"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                            />
                            <input
                                type="text"
                                value={`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
                                readOnly
                                className="w-full pl-10 pr-4 py-2 bg-transparent outline-none cursor-pointer block text-gray-500 font-Gilroy  text-sm font-medium"
                            />
                        </div>

                        {showPicker && (
                            <div ref={pickerRef} className="absolute top-15 right-0  mt-2 shadow-lg border rounded-lg bg-white z-20">
                                <DateRangePicker
                                    ranges={dateRange}
                                    onChange={handleSelect}
                                    moveRangeOnFirstSelection={false}
                                    editableDateInputs={true}
                                    locale={enGB}
                                />
                            </div>
                        )}
                    </div>

                </div>


                <div
                    className="flex-1 flex flex-col"
                >
                    <div className='overflow-x-auto rounded-xl border border-slate-200 max-h-[380px] overflow-y-auto p-0 mt-4 mb-extra'>
                        <table

                            className="w-full table-auto border-collapse rounded-xl border-b-0 border-[#E1E8F0]"
                        >
                            <thead className="bg-slate-100 sticky top-0 z-10">
                                <tr>


                                    <th className="px-4 py-4 text-center text-neutral-600 text-sm font-medium font-Gilroy ">
                                        <div className="flex items-center justify-start gap-4 ml-4">
                                            Product Name
                                            <img src={Vectors} alt="icon" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-2 text-center text-neutral-800 text-sm font-medium font-Gilroy">
                                        <div className="flex items-center justify-center gap-4">
                                            Ava. Qty
                                            <img src={Vectors} alt="icon" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-2 text-center text-neutral-800 text-sm font-medium font-Gilroy">
                                        <div className="flex items-center justify-center gap-4">
                                            Make
                                            <img src={Vectors} alt="icon" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-2 text-center text-neutral-800 text-sm font-medium font-Gilroy">
                                        <div className="flex items-center justify-center gap-4">
                                            Price
                                            <img src={Vectors} alt="icon" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-2 text-center text-neutral-800 text-sm font-medium font-Gilroy">
                                        <div className="flex items-center justify-center gap-4">
                                            Currency
                                            <img src={Vectors} alt="icon" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-2 text-center text-neutral-800 text-sm font-medium font-Gilroy">
                                        <div className="flex items-center justify-center gap-4">
                                            Status
                                            <img src={Vectors} alt="icon" />
                                        </div>
                                    </th>
                                    <th className="px-4 py-2 text-center text-neutral-800 text-sm font-medium font-Gilroy">
                                        <div className="flex items-center justify-center gap-4">
                                            Action
                                            <img src={Vectors} alt="icon" />
                                        </div>
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {Data.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center text-red-600 font-Gilroy py-4">
                                            No Data Found
                                        </td>
                                    </tr>
                                ) : (
                                    Data.map((item, index) => (
                                        <tr key={index} className="border-0 mt-4">
                                          
                                            <td className="flex items-center px-6 py-3 font-Gilroy font-semibold text-sm text-black cursor-pointer">

                                                <img
                                                    src={imageMapping[item.image]}
                                                    alt={item.productName}
                                                    className="w-10 h-10 rounded-md mr-4"
                                                    onError={(e) => e.target.src = "/images/default.jpg"}
                                                />

                                                {item.productName}
                                            </td>

                                            <td className="py-3 pl-8 text-start text-black text-sm font-medium font-Gilroy mr-2">
                                                {item.quantity}
                                            </td>

                                            <td className="pl-6 text-start py-2 text-center text-black text-sm font-medium font-Gilroy">
                                                {item.year}
                                            </td>
                                            <td className="pl-4 text-start py-2 text-black text-sm font-medium font-Gilroy">
                                                {item.price}
                                            </td>

                                            <td className="pl-7 text-start py-2 text-black text-sm font-medium font-Gilroy">
                                                {item.totalPrice}
                                            </td>

                                            <td
                                                className={`pl-6 text-start py-2 text-sm font-semibold font-Gilroy ${item.status === "Pending"
                                                    ? "text-orange-500"
                                                    : item.status === "Completed"
                                                        ? "text-green-500"
                                                        : "text-red-500"
                                                    }`}
                                            >
                                                {item.status}
                                            </td>

                                            <td className="px-4 py-2 text-center text-black text-sm font-medium font-Gilroy relative">
                                                <div
                                                    onClick={(e) => handleShowPopup(index, e)}
                                                    className="w-8 h-8 rounded-full border border-[#E1E8F0] flex items-center justify-center cursor-pointer hover:bg-slate-100 transition duration-200 ml-4"
                                                >
                                                    <HiOutlineDotsVertical className="text-black p-0" />
                                                    {showPopup === index && (
                                                        <div
                                                            ref={popupRef}
                                                            style={{
                                                                position: "fixed",
                                                                top: popupPosition.top,
                                                                left: popupPosition.left,
                                                                zIndex: 50,
                                                            }}
                                                            className="w-32 bg-slate-100 shadow-lg rounded-md z-50"
                                                        >
                                                            <div className="px-4 py-2 cursor-pointer flex items-center gap-2 font-Gilroy">
                                                                <Edit size="16" color="#205DA8" /> Edit
                                                            </div>
                                                            <div className="px-4 py-2 cursor-pointer flex items-center gap-2 font-Gilroy text-red-700"
                                                            onClick={() => handleDeleteProductPopup(item.productId)}
                                                            >
                                                                <Trash size="16" color="#B91C1C" /> Delete
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>



                        </table>
                    </div>
                </div>

              



            </div>
 {showDeleteProduct && <DeleteProduct handleClose={handleCloseForDeleteProduct} deleteProductId={deleteProductId} />}

        </div>
    );
}

export default ProductList;
