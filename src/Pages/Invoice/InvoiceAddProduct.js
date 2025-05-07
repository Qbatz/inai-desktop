import React from 'react'
import Select from "react-select";
import { CloseCircle } from 'iconsax-react';
import PropTypes from "prop-types";


function InvoiceAddProduct({handleClose}) {



    const options = [
        { value: "Select Country", label: "Select Package Type" },
        { value: "ALUMINIUM DRUM", label: "ALUMINIUM DRUM" },
        { value: "BELT ROLL", label: "BELT ROLL" },
        { value: "BUNDLE", label: "BUNDLE" },
        { value: "CORRUGATED BOX", label: "CORRUGATED BOX" },
        { value: "CORTON BOX", label: "CORTON BOX" },
        { value: "GUNNY BAGS", label: "GUNNY BAGS" },
        { value: "MS FRAME", label: "MS FRAME" },
        { value: "PAPER BAG", label: "PAPER BAG" },
        { value: "PLASTIC FILM BAG", label: "PLASTIC FILM BAG" },
        { value: "PLASTIC PALLET", label: "PLASTIC PALLET" },
        { value: "PLASTIC TANK", label: "PLASTIC TANK" },
        { value: "PLASTICS DRUM", label: "PLASTICS DRUM" },
        { value: "PLYWOOD BOX", label: "PLYWOOD BOX" },
        { value: "STEEL DRUM", label: "STEEL DRUM" },
        { value: "STEEL JERRICANS", label: "STEEL JERRICANS" },
        { value: "TEXTILE BAG", label: "TEXTILE BAG" },
        { value: "WOODEN BOX", label: "WOODEN BOX" },
        { value: "WOODEN CRATE", label: "WOODEN CRATE" },
        { value: "WOODEN DRUM", label: "WOODEN DRUM" },
        { value: "WOODEN PALLETS", label: "WOODEN PALLETS" },
        { value: "WOVEN PLASTIC BAG", label: "WOVEN PLASTIC BAG" }
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
          fontFamily: 'Gilroy',
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
        singleValue: (base) => ({
          ...base,
          color: '#64748B',
          fontSize: '14px',
          fontFamily: 'Gilroy',
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
          fontFamily: "Gilroy, sans-serif",
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