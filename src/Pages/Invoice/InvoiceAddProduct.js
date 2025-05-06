import React from 'react'
import Select from "react-select";
import { CloseCircle } from 'iconsax-react';
import PropTypes from "prop-types";


function InvoiceAddProduct({handleClose}) {



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







  return (
    <div className="fixed inset-0  z-50 flex items-center justify-center bg-black bg-opacity-50">
               <div className="bg-white rounded-[24px] shadow-lg w-[450px] h-fit p-6 pb-[6px] ">
                   <div className="flex justify-between items-center border-b-0 mb-3">
                       <h2 className="text-[20px] font-semibold text-[#222222]  flex-1 font-Gilroy">
                           Add Product
                       </h2>
                       <button type="button" className="text-[#222]" onClick={handleClose}>
                           <CloseCircle size="24" variant="Outline"  color="#222222"/>
                       </button>
                   </div>
                   <div className="w-full h-[1px] bg-[#E7E7E7] mb-3"></div>
                  
   
   
   
                   <div className='mb-2 items-center'>
                       <label className='block mb-2 text-start font-Gilroy font-normal text-sm text-neutral-800'>Package Type <span className='text-red-500'>*</span></label>
                       <Select
                           options={options}
                           placeholder="Select Package Type"
                           classNamePrefix="custom"
                           menuPlacement="auto"
                           styles={customSelectStateStyles}
                       />
   
                   </div>
   
                  
   
                   <div className='mb-2 items-center'>
                       <label className='block mb-2 text-start font-Gilroy font-normal text-sm text-neutral-800'>Qty<span className='text-red-500'>*</span></label>
                       <input
                           type='text'
                           placeholder='Enter Qty'
                           className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                       />
                   </div>
   
                   <div className='mb-2 items-center'>
                       <label className='block mb-2 text-start font-Gilroy font-normal text-sm text-neutral-800'>Product Weight<span className='text-red-500'>*</span></label>
                       <input
                           type='text'
                           placeholder='Enter Product Weight'
                           className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                       />
                   </div>
   
   
                  
                   <div className='mb-2 mt-4 items-center'>
   
                       <button className="w-full px-10 py-3 bg-[#205DA8] rounded-lg text-white font-Montserrat text-sm font-semibold" >Add Product</button>
   
                   </div>
               </div>
           </div>
  )
}
InvoiceAddProduct.propTypes = {
    handleClose: PropTypes.bool
}
export default InvoiceAddProduct