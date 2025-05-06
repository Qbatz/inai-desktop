/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import Select from "react-select";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Trash } from "iconsax-react";
import InvoiceAddProduct from "../../Pages/Invoice/InvoiceAddProduct";
import AddBox from "../../Pages/Invoice/AddBox";
import PropTypes from "prop-types";


function AddInvoice() {

    const [value, setValue] = useState(1);


    const [showBox, setShowBox] = useState(false)
    const [showProduct, setShowProduct] = useState(false)



    const [rows, setRows] = useState([
        { poNumber: '', date: null }
    ]);

    const [items, setItems] = useState([
        { itemNo: '', description: '', hsn: '', qty: '', unitCost: '', total: '', packageNo: '' }
    ]);

    const handleAddItem = () => {
        setItems([
            ...items,
            { itemNo: '', description: '', hsn: '', qty: '', unitCost: '', total: '', packageNo: '' }
        ]);
    };


    const handleAddRow = () => {
        setRows([...rows, { poNumber: '', date: null }]);
    };

    const handleRemoveRow = (index) => {
        const newRows = rows.filter((_, i) => i !== index);
        setRows(newRows);
    };

    const handleInputChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;
        setRows(updatedRows);
    };

    const tabs = [
        { id: 1, label: "Customer Detail" },
        { id: 2, label: "Invoice Detail" },
        { id: 3, label: "Item Detail" },
        { id: 4, label: "Packaging Detail" }

    ];

    const options = [
        { value: "Select Country", label: "Select Country" },
        { value: "India", label: "India" },
        { value: "United States", label: "United States" },
        { value: "United Kingdom", label: "United Kingdom" },
        { value: "Australia", label: "Australia" },
        { value: "Canada", label: "Canada" },
        { value: "Germany", label: "Germany" },
        { value: "France", label: "France" },
        { value: "Italy", label: "Italy" },
        { value: "Singapore", label: "Singapore" },
        { value: "Japan", label: "Japan" },
        { value: "China", label: "China" },
    ];

    const handleTabClick = (id) => {
        setValue(id);
    }

    const handleNextInvoiceDetail = () => {
        setValue(2)
    }

    const handleNextItemDetail = () => {
        setValue(3)
    }


    const handleNextPackageDetail = () =>{
        setValue(4)
}



    const customSelectStateStyles = {
        control: (base) => ({
            ...base,
            borderColor: '#E5E7EB',
            borderRadius: '0.6rem',
            boxShadow: 'none',
            cursor: 'pointer',
            padding: '4px 1px',
            minHeight: '40px',
            '&:hover': {
                borderColor: '#E5E7EB',
            },
        }),
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isFocused ? '#205DA8' : 'white',
            color: state.isFocused ? 'white' : 'black',
            fontWeight: 500,
            padding: '4px 10px',
            cursor: 'pointer',
            fontSize: "14px",
            fontFamily: 'Gilroy'
        }),
        menu: (base) => ({
            ...base,
            maxHeight: '120px',
            overflowY: 'auto',
            scrollbarWidth: 'thin',
            msOverflowStyle: 'auto',
        }),
        singleValue: (base) => ({
            ...base,
            color: '#64748B',
            fontSize: '14px',
            fontFamily: 'Gilroy'
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: '#94A3B8',
            padding: '0 8px',
        }),
        placeholder: (base) => ({
            ...base,
            color: '#262626',
            fontSize: "14px",
            fontWeight: 500,
            fontFamily: "Gilroy, sans-serif"
        }),


    };


    const CustomInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
        <input
            type="text"
            onClick={onClick}
            ref={ref}
            value={value}
            placeholder={placeholder}
            readOnly
            className="w-full px-3 py-3 border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800 cursor-pointer"
        />
    ));

    CustomInput.displayName = 'CustomInput';


    const handleAddProduct = () => {
        setShowProduct(true)
    }

    const handleCloseAddProduct = () => {
        setShowProduct(false)
    }


    const handleAddBox = () => {
        setShowBox(true)
    }




    const handleCloseAddBox = () => {
        setShowBox(false)
    }





    return (
        <div className='bg-slate-100 flex flex-1 flex-col p-2 sm:p-2 md:p-2 lg:p-4 rounded-t-2xl'>
            <div className='bg-white  rounded-2xl ps-5 pt-3 pe-5 pb-5 relative h-fit'>

                <div className='flex items-center justify-between pe-12 mb-1'>
                    <h2 className="text-xl font-semibold  font-Gilroy text[#222222]">Add Invoice</h2>
                </div>


                <div className="flex flex-col  justify-between   items-center sm:flex-row   border-gray-300">
                    <div className='gap-8 mb-3 flex flex-row '>


                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`px-0 py-2 font-Gilroy ${value === tab.id
                                    ? "border-b-4 border-[#205DA8] text-[#205DA8] font-semibold text-base"
                                    : "text-gray-500 border-neutral-100 border-b-4 text-base"
                                    } transition-all duration-600`}
                                onClick={() => handleTabClick(tab.id)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {
                        value === 4 &&
                        <div>
                            <label className='font-Gilroy text-base font-semibold text-[#205DA8] hover:underline cursor-pointer' onClick={handleAddBox}>+ Add Box</label>

                        </div>
                    }
                </div>


                
                


                {
                    value === 1 &&
                    <div className='max-h-[400px] overflow-y-auto  
                    lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3 ' >


                        <div className='mb-2 items-center w-[350px]'>
                            <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Customer</label>
                            <Select
                                options={options}
                                                                placeholder="Enter Select"
                                classNamePrefix="custom"
                                menuPlacement="auto"
                                styles={customSelectStateStyles}
                            />

                        </div>



                        <div className='grid md:grid-cols-2 sm:grid-cols-1 gap-3 mt-4'>

                            <div className='rounded-lg bg-[#EFF2F5] border-[#EFF2F5] min-h-[230px] p-4'>


                                <label className='block text-[#205DA8] text-xs font-Gilroy font-semibold'>Consignee</label>

                                <label className='block text-[#0F172A] text-lg font-Gilroy font-semibold'>Rakul Preet</label>

                                <label className='block text-[#0F172A] text-base font-Gilroy font-medium'>Flat No. G-2, Plot No. 19, Mullai Street, Sakthi Nagar, Adambakkam, Chennai – 600 088 </label>

                                <label className='block text-[#0F172A] text-base font-Gilroy font-medium'>inai@inaippl.com </label>
                                <label className='block text-[#0F172A] text-base font-Gilroy font-medium'>+91 6363636363</label>

                                <label className='block text-[#737982] text-base font-Gilroy font-medium'>GSTIN  :  </label>
                                <label className='block text-[#737982] text-base font-Gilroy font-medium'>IEC :</label>



                            </div>

                            <div className='rounded-lg bg-[#EFF2F5] border-[#EFF2F5] min-h-[230px] p-4'>


                                <label className='block text-[#205DA8] text-xs font-Gilroy font-semibold'>Consignee</label>

                                <label className='block text-[#0F172A] text-lg font-Gilroy font-semibold'>Rakul Preet</label>

                                <label className='block text-[#0F172A] text-base font-Gilroy font-medium'>Flat No. G-2, Plot No. 19, Mullai Street, Sakthi Nagar, Adambakkam, Chennai – 600 088 </label>

                                <label className='block text-[#0F172A] text-base font-Gilroy font-medium'>inai@inaippl.com </label>
                                <label className='block text-[#0F172A] text-base font-Gilroy font-medium'>+91 6363636363</label>

                                <label className='block text-[#737982] text-base font-Gilroy font-medium'>GSTIN  :  </label>
                                <label className='block text-[#737982] text-base font-Gilroy font-medium'>IEC :</label>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 h-fit items-center mt-8">


                            <button className="w-[167px] px-10 py-2  border border-[#205DA8] rounded-lg text-[#205DA8] font-Montserrat text-base font-semibold"  >Save & Exit</button>

                            <button className="w-[167px] px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat text-base font-semibold" onClick={handleNextInvoiceDetail} >Next</button>

                        </div>


                    </div>
                }





                {
                    value === 2 &&
                    <>
                        <div className='max-h-[350px] overflow-y-auto  lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3 ' >


                            <div className='grid md:grid-cols-3 sm:grid-cols-2 gap-3 mt-4'>
                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Invoice Type <span className='text-red-500'>*</span></label>
                                    <Select
                                        options={options}
                                        placeholder="Enter Select"
                                        classNamePrefix="custom"
                                        menuPlacement="auto"
                                        styles={customSelectStateStyles}
                                    />

                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block  mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Invoice No  <span className='text-red-500'>*</span></label>
                                    <input
                                        type='text'
                                        placeholder='Enter Invoice No '
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />

                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Currency <span className='text-red-500'>*</span></label>
                                    <Select
                                        options={options}
                                        placeholder="Select Currency"
                                        classNamePrefix="custom"
                                        menuPlacement="auto"
                                        styles={customSelectStateStyles}
                                    />

                                </div>


                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>
                                        Invoice Date <span className='text-red-500'>*</span>
                                    </label>
                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full"
                                        placeholderText="Select Invoice Date"
                                        customInput={<CustomInput />}
                                        wrapperClassName="w-full"
                                    />

                                </div>







                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Origin of Goods  <span className='text-red-500'>*</span></label>
                                    <Select
                                        options={options}
                                        placeholder="Select Origin of Goods"
                                        classNamePrefix="custom"
                                        menuPlacement="auto"
                                        styles={customSelectStateStyles}
                                    />

                                </div>
                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Port of Loading <span className='text-red-500'>*</span></label>
                                    <Select
                                        options={options}
                                        placeholder="Select Port of Loading "
                                        classNamePrefix="custom"
                                        menuPlacement="auto"
                                        styles={customSelectStateStyles}
                                    />

                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Port of Discharge <span className='text-red-500'>*</span></label>
                                    <Select
                                        options={options}
                                        placeholder="Select Port of Discharge"
                                        classNamePrefix="custom"
                                        menuPlacement="auto"
                                        styles={customSelectStateStyles}
                                    />

                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Destination Country  <span className='text-red-500'>*</span></label>
                                    <Select
                                        options={options}
                                        placeholder="Select Destination Country"
                                        classNamePrefix="custom"
                                        menuPlacement="auto"
                                        styles={customSelectStateStyles}
                                    />

                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Delivery Term (Incoterms) <span className='text-red-500'>*</span></label>
                                    <Select
                                        options={options}
                                        placeholder="Enter Delivery Term"
                                        classNamePrefix="custom"
                                        menuPlacement="auto"
                                        styles={customSelectStateStyles}
                                    />

                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Payment Term <span className='text-red-500'>*</span></label>
                                    <input
                                        type='text'
                                        placeholder='Enter Payment Term'
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />

                                </div>
                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Payment Term <span className='text-red-500'>*</span></label>

                                    <input
                                        type='text'
                                        placeholder='Enter Payment Term'
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Shipping Bill No.</label>

                                    <input
                                        type='text'
                                        placeholder='Enter Shipping Bill No.'
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>
                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Shipping Bill No. Date</label>

                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full"
                                        placeholderText="Select Shipping Bill No. Date"
                                        customInput={<CustomInput />}
                                        wrapperClassName="w-full"
                                    />
                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bank Payment Reference No. <span className='text-red-500'>*</span></label>

                                    <input
                                        type='text'
                                        placeholder='Enter Bank Payment Reference No.'
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>





                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bill of Lading </label>

                                    <input
                                        type='text'
                                        placeholder='Enter Bill of Lading'
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>


                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Bill of Lading Date </label>

                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        className="w-full"
                                        placeholderText="Select Bill of Lading Date"
                                        customInput={<CustomInput />}
                                        wrapperClassName="w-full"
                                    />
                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>No of Package</label>

                                    <input
                                        type='text'
                                        placeholder='Enter No of Package'
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Net Weight</label>

                                    <input
                                        type='text'
                                        placeholder='Enter Net Weight'
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>
                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Gross Weight</label>

                                    <input
                                        type='text'
                                        placeholder='Enter Gross Weight'
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Freight <span className='text-red-500'>*</span></label>

                                    <input
                                        type='text'
                                        placeholder='Enter Freight'
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>

                                <div className='mb-2 items-center'>
                                    <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>Insurance</label>

                                    <input
                                        type='text'
                                        placeholder='Enter Insurance'
                                        className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                    />
                                </div>

                            </div>








                            {rows.map((row, index) => (
                                <div key={index} className='grid md:grid-cols-3 sm:grid-cols-2 gap-3 mb-4 flex'>
                                    <div className='mb-2 items-center'>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>
                                            PO Number <span className='text-red-500'>*</span>
                                        </label>
                                        <input
                                            type='text'
                                            placeholder='Enter PO Number'
                                            value={row.poNumber}
                                            onChange={(e) => handleInputChange(index, 'poNumber', e.target.value)}
                                            className='w-full px-3 py-3 border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800'
                                        />
                                    </div>

                                    <div className='mb-2 items-center'>
                                        <label className='block mb-2 text-start font-Gilroy font-normal text-md text-neutral-800'>
                                            Date <span className='text-red-500'>*</span>
                                        </label>
                                        <DatePicker
                                            dateFormat="dd/MM/yyyy"
                                            selected={row.date}
                                            onChange={(date) => handleInputChange(index, 'date', date)}
                                            className="w-full"
                                            placeholderText="Select Date"
                                            customInput={<input className='w-full px-3 py-3 border rounded-xl focus:outline-none font-Gilroy font-medium text-sm text-neutral-800' />}
                                            wrapperClassName="w-full"
                                        />
                                    </div>

                                    <div className='flex gap-4 items-center mt-6'>
                                        {index === rows.length - 1 && (
                                            <button
                                                type="button"
                                                className="w-[52px] px-2 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat text-base font-semibold"
                                                onClick={handleAddRow}
                                            >
                                                +
                                            </button>
                                        )}
                                        {rows.length > 1 && (
                                            <button
                                                type="button"
                                                className="w-[52px] px-2 py-2.5 bg-[#fff] border border-[#EE0F0F] rounded-lg text-white font-Montserrat text-base font-semibold flex items-center justify-center"
                                                onClick={() => handleRemoveRow(index)}
                                            >
                                                <Trash size="16" color="#EE0F0F" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}


                        </div>

                        <div className="flex justify-end gap-3 h-fit items-center mt-4">


                            <button className="w-[167px] px-10 py-2  border border-[#205DA8] rounded-lg text-[#205DA8] font-Montserrat text-base font-semibold"  >Save & Exit</button>

                            <button className="w-[167px] px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat text-base font-semibold" onClick={handleNextItemDetail} >Next</button>

                        </div>
                    </>


                }


                {
                    value === 3 &&
                    <>
                        <div className='h-fit overflow-y-auto  lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3 ' >
                            <div
                                className="">
                                <div className='rounded-xl border border-slate-200 max-h-[240px] overflow-y-auto p-0 mt-4 '>

                                    <table className="w-full table-auto border-collapse rounded-xl border-b-0 border-[#E1E8F0]">
                                        <thead className="bg-[#205DA8] sticky top-0 z-10">
                                            <tr>
                                                <th className="px-4 py-2 text-center text-[#fff] text-base font-medium font-Gilroy">Item No.
                                                </th>
                                                <th className="px-4 py-2 text-center text-[#fff] text-sm font-medium font-Gilroy">Description</th>
                                                <th className="px-4 py-2 text-center text-[#fff] text-sm font-medium font-Gilroy">HSN</th>
                                                <th className="px-4 py-2 text-center text-[#fff] text-sm font-medium font-Gilroy">Quantity</th>
                                                <th className="px-4 py-2 text-center text-[#fff] text-sm font-medium font-Gilroy">Per Unit <br /> <span className='text-center text-[#fff] text-xs font-medium font-Gilroy'>Cost in USD</span></th>
                                                <th className="px-4 py-2 text-center text-[#fff] text-sm font-medium font-Gilroy">Total <br /><span className='text-center text-[#fff] text-xs font-medium font-Gilroy'>Cost in USD</span></th>
                                                <th className="px-4 py-2 text-center text-[#fff] text-sm font-medium font-Gilroy">Package No</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {items.map((item, index) => (
                                                <tr key={index} className="border-0">
                                                    <td className="px-2 py-2 text-center">
                                                        <input type="text" placeholder="Enter Item No." className="w-full px-3 py-3 border rounded-xl text-sm" />
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                        <input type="text" placeholder="Enter Description" className="w-full px-3 py-3 border rounded-xl text-sm" />
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                        <input type="text" placeholder="Enter HSN" className="w-full px-3 py-3 border rounded-xl text-sm" />
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                        <input type="text" placeholder="Enter Item QTY" className="w-full px-3 py-3 border rounded-xl text-sm" />
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                        <input type="text" placeholder="Enter Per Unit" className="w-full px-3 py-3 border rounded-xl text-sm" />
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                        <input type="text" placeholder="Total" className="w-full px-3 py-3 border rounded-xl text-sm" />
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                        <input type="text" placeholder="Enter No" className="w-full px-3 py-3 border rounded-xl text-sm" />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>

                                </div>
                            </div>


                            <div className='flex justify-end  items-center w-full mt-4'>
                                <input
                                    type='text'
                                    placeholder='Total Value'
                                    className=' w-[250px]  px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                />
                            </div>


                            <div className='flex justify-end  items-center w-full mt-4'>
                                <label className='font-Gilroy text-base font-semibold text-[#205DA8] hover:underline cursor-pointer' onClick={handleAddItem}>+ Add Item</label>
                            </div>

                        </div>

                        <div className="flex justify-end gap-3 h-fit items-center mt-2">


                            <button className="w-[167px] px-10 py-2  border border-[#205DA8] rounded-lg text-[#205DA8] font-Montserrat text-base font-semibold"  >Save & Exit</button>

                            <button className="w-[167px] px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat text-base font-semibold"  onClick={handleNextPackageDetail}>Next</button>

                        </div>
                    </>}


                {
                    value === 4 &&
                    <>
                        <div className='h-fit overflow-y-auto  lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3 ' >






                            <div
                                className="">
                                <div className='rounded-xl border border-slate-200 max-h-[230px] overflow-y-auto p-0 mt-4 '>

                                    <table className="w-full table-auto border-collapse rounded-xl border-b-0 border-[#E1E8F0]">
                                        <thead className="bg-[#F1F4F9] sticky top-0 z-10">
                                            <tr>
                                                <th className="px-4 py-2 text-center text-[#4B4B4B] text-base font-light font-Gilroy">Package Type
                                                </th>
                                                <th className="px-4 py-2 text-center text-[#4B4B4B] text-sm font-light font-Gilroy">Size in CM</th>
                                                <th className="px-4 py-2 text-center text-[#4B4B4B] text-sm font-light font-Gilroy">Empty Weight in Kg</th>
                                                <th className="px-4 py-2 text-center text-[#4B4B4B] text-sm font-light font-Gilroy">Gross Weight in kg</th>
                                                <th className="px-4 py-2 text-center text-[#4B4B4B] text-sm font-light font-Gilroy">Marks  on Package</th>
                                                <th className="px-4 py-2 text-center text-[#4B4B4B] text-sm font-light font-Gilroy">Number of Package</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {items.map((item, index) => (
                                                <tr key={index} className="border-0">
                                                    <td className="px-2 py-2 text-center">
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                    </td>
                                                    <td className="px-2 py-2 text-center">
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>

                                    </table>

                                </div>
                            </div>


                            <div className='flex justify-end  gap-4 items-center w-full mt-4'>
                                <input
                                    type='text'
                                    placeholder='Grand Total '
                                    className=' w-[200px]  px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                <input
                                    type='text'
                                    placeholder='Net Weight of Goods in Kg'
                                    className=' w-[200px]  px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                <input
                                    type='text'
                                    placeholder='Gross Weight in kg'
                                    className=' w-[200px]  px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                <input
                                    type='text'
                                    placeholder='Total Number of package '
                                    className=' w-[200px]  px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                />
                            </div>


                            <div className='flex justify-end  items-center w-full mt-6'>
                                <label className='font-Gilroy text-base font-semibold text-[#205DA8] hover:underline cursor-pointer' onClick={handleAddProduct}>+ Add product</label>
                            </div>

                        </div>

                        <div className="flex justify-end gap-3 h-fit items-center mt-3">


                            <button className="w-[167px] px-10 py-2  border border-[#205DA8] rounded-lg text-[#205DA8] font-Montserrat text-base font-semibold"  >Save & Exit</button>

                            <button className="w-[167px] px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat text-base font-semibold" >Submit</button>

                        </div>
                    </>}



                {showBox && <AddBox handleClose={handleCloseAddBox} />}

                {showProduct && <InvoiceAddProduct handleClose={handleCloseAddProduct} />}
            </div>





        </div>
    )
}



AddInvoice.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func,
    placeholder: PropTypes.string,
}

export default AddInvoice