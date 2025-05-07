import React, { useState, useRef } from 'react'
import Select from "react-select";
import { CloseCircle } from 'iconsax-react';
import PropTypes from "prop-types";
import { InfoCircle } from "iconsax-react";


function AddBox({ handleClose }) {



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

    const [packageType, setPackageType] = useState('');
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [depth, setDepth] = useState('');
    const [weight, setWeight] = useState('');
    const [numberOfPackages, setNumberOfPackages] = useState('');
    const [marks, setMarks] = useState('');


    const [errors, setErrors] = useState({
        packageType: '',
        length: '',
        width: '',
        depth: '',
        weight: '',
        numberOfPackages: '',
        marks: '',
    });

    const packageTypeRef = useRef(null);
    const lengthRef = useRef(null);
    const widthRef = useRef(null);
    const depthRef = useRef(null);
    const weightRef = useRef(null);
    const numberOfPackagesRef = useRef(null);
    const marksRef = useRef(null);



    const handlePackageTypeChange = (selectedOption) => {
        setPackageType(selectedOption ? selectedOption.value : '');
        if (errors.packageType) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                packageType: undefined
            }));
        }
    };

    const handleLengthChange = (e) => {
        setLength(e.target.value);
        if (errors.length) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                length: undefined
            }));
        }
    };

    const handleWidthChange = (e) => {
        setWidth(e.target.value);
        if (errors.width) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                width: undefined
            }));
        }
    };

    const handleDepthChange = (e) => {
        setDepth(e.target.value);
        if (errors.depth) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                depth: undefined
            }));
        }
    };

    const handleWeightChange = (e) => {
        setWeight(e.target.value);
        if (errors.weight) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                weight: undefined
            }));
        }
    };

    const handleNumberOfPackagesChange = (e) => {
        setNumberOfPackages(e.target.value);
        if (errors.numberOfPackages) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                numberOfPackages: undefined
            }));
        }
    };

    const handleMarksChange = (e) => {
        setMarks(e.target.value);
        if (errors.marks) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                marks: undefined
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            console.log('Form Submitted');
           
        }
    };




    const validate = () => {
        const newErrors = {};

        if (!packageType) newErrors.packageType = 'Package type is required';
        if (!length.trim()) newErrors.length = 'Length is required';
        if (!width.trim()) newErrors.width = 'Width is required';
        if (!depth.trim()) newErrors.depth = 'Depth is required';
        if (!weight.trim()) newErrors.weight = 'Weight is required';
        if (!numberOfPackages.trim()) newErrors.numberOfPackages = 'Number of packages is required';
        if (!marks.trim()) newErrors.marks = 'Marks are required';

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            const firstError = Object.keys(newErrors)[0];
            switch (firstError) {
                case 'packageType':
                    packageTypeRef.current?.focus();
                    break;
                case 'length':
                    lengthRef.current?.focus();
                    break;
                case 'width':
                    widthRef.current?.focus();
                    break;
                case 'depth':
                    depthRef.current?.focus();
                    break;
                case 'weight':
                    weightRef.current?.focus();
                    break;
                case 'numberOfPackages':
                    numberOfPackagesRef.current?.focus();
                    break;
                case 'marks':
                    marksRef.current?.focus();
                    break;
                default:
                    break;
            }
            return false;
        }

        return true;
    };





    return (
        <div className="fixed inset-0  z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-[24px] shadow-lg w-[450px] h-fit p-6 pb-[6px] ">
                <div className="flex justify-between items-center border-b-0 mb-3">
                    <h2 className="text-[20px] font-semibold text-[#222222]  flex-1 font-Gilroy">
                        Add Box
                    </h2>
                    <button type="button" className="text-[#222]" onClick={handleClose}>
                        <CloseCircle size="24" variant="Outline" color="#222222" />
                    </button>
                </div>
                <div className="w-full h-[1px] bg-[#E7E7E7] mb-3"></div>


                <div className='max-h-[450px] overflow-y-auto  
                    lg:scrollbar-thin scrollbar-thumb-[#dbdbdb] scrollbar-track-transparent pe-3'>

                    <div className='mb-2 items-center'>
                        <label className='block mb-2 text-start font-Gilroy font-normal text-sm text-neutral-800'>Package Type <span className='text-red-500'>*</span></label>
                        <Select
                            ref={packageTypeRef}
                            options={options}
                            placeholder="Select Package Type"
                            classNamePrefix="custom"
                            menuPlacement="auto"
                            styles={customSelectStateStyles}
                            value={options.find(o => o.value === packageType)}
                            onChange={handlePackageTypeChange}
                        />

                        {errors.packageType && (
                            <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                <InfoCircle size={16} color="#DC2626" />
                                <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.packageType}</p>
                            </div>
                        )}
                    </div>

                    <div className='mb-2 items-center'>
                        <label className='block mb-2 text-start font-Gilroy font-normal text-sm text-neutral-800'>Size in CM <span className='text-red-500'>*</span></label>
                        <div className='flex gap-2'>
                            <div>
                                <input
                                    type='text'
                                    ref={lengthRef}
                                    placeholder='Enter Length'
                                    value={length}
                                    onChange={handleLengthChange}
                                    className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                {errors.length && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                        <InfoCircle size={16} color="#DC2626" />
                                        <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.length}</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <input
                                    type='text'
                                    ref={widthRef}
                                    placeholder='Enter Width '
                                    value={width}
                                    onChange={handleWidthChange}
                                    className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                />

                                {errors.width && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                        <InfoCircle size={16} color="#DC2626" />
                                        <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.width}</p>
                                    </div>
                                )}
                            </div>
                            <div>
                                <input
                                    type='text'
                                    ref={depthRef}
                                    placeholder='Enter Depth'
                                    value={depth}
                                    onChange={handleDepthChange}
                                    className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                                />
                                {errors.depth && (
                                    <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                        <InfoCircle size={16} color="#DC2626" />
                                        <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.depth}</p>
                                    </div>
                                )}
                            </div>
                        </div>



                    </div>

                    <div className='mb-2 items-center'>
                        <label className='block mb-2 text-start font-Gilroy font-normal text-sm text-neutral-800'>Empty Weight of each package in Kg<span className='text-red-500'>*</span></label>
                        <input
                            type='text'
                            value={weight}
                            ref={weightRef}
                            onChange={handleWeightChange}
                            placeholder='Enter Empty Weight'
                            className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                        />

                        {errors.weight && (
                            <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                <InfoCircle size={16} color="#DC2626" />
                                <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.weight}</p>
                            </div>
                        )}
                    </div>

                    <div className='mb-2 items-center'>
                        <label className='block mb-2 text-start font-Gilroy font-normal text-sm text-neutral-800'>Number of Package<span className='text-red-500'>*</span></label>
                        <input
                            type='text'
                            ref={numberOfPackagesRef}
                            value={numberOfPackages}
                            onChange={handleNumberOfPackagesChange}
                            placeholder='Enter Number of Package'
                            className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                        />
                        {errors.numberOfPackages && (
                            <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                <InfoCircle size={16} color="#DC2626" />
                                <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.numberOfPackages}</p>
                            </div>
                        )}
                    </div>


                    <div className='mb-4 items-center'>
                        <label className='block mb-2 text-start font-Gilroy font-normal text-sm text-neutral-800'>Marks on Package<span className='text-red-500'>*</span></label>
                        <input
                            type='text'
                            value={marks}
                            ref={marksRef}
                            onChange={handleMarksChange}
                            placeholder='Enter Marks on Package'
                            className='w-full px-3 py-3 border rounded-xl focus:outline-none    font-Gilroy font-medium text-sm text-neutral-800'
                        />

                        {errors.marks && (
                            <div className='flex items-center text-red-500 text-xs font-Gilroy gap-1 mt-1 ps-1'>
                                <InfoCircle size={16} color="#DC2626" />
                                <p className="text-red-500 text-xs mt-1 font-Gilroy">{errors.marks}</p>
                            </div>
                        )}


                    </div>
                </div>
                <div className='mb-2 mt-2 items-center'>

                    <button onClick={handleSubmit} className="w-full px-10 py-3 bg-[#205DA8] rounded-lg text-white font-Montserrat text-sm font-semibold" >Add Box</button>

                </div>
            </div>
        </div>
    )
}
AddBox.propTypes = {
    handleClose: PropTypes.bool
}
export default AddBox
