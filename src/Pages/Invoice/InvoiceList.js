/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PlusCircle from '../../Asset/Images/Plus_Circle.svg';
import { useNavigate } from 'react-router-dom';






function InvoiceList() {

    const navigate = useNavigate();





    const handleAddinvoice = () => {
        navigate('/add-invoice')
    }







    return (
        <div className='bg-slate-100 flex-1 flex w-full p-4 rounded-tl-lg rounded-tr-lg m-0 relative'>
        <div className='flex w-full  justify-between left-0 top-0 right-0 '>
            <div>
                <h2 className="text-xl font-semibold mb-2 font-Gilroy text-black">Invoice</h2>
            </div>

            <div className="">
                <button onClick={handleAddinvoice} className="px-6 md:px-8 lg:px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Montserrat text-xs md:text-base font-medium flex items-center gap-2">
                    <img src={PlusCircle} alt="plus" className='w-4 md:w-5 lg:w-4' /> Add Invoice</button>
            </div>
        </div>
        </div>
    )
}

export default InvoiceList