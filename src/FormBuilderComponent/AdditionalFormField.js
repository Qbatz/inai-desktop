import PropTypes from "prop-types";
import React, { useState, useEffect, useRef } from "react";
import { InfoCircle } from "iconsax-react";

function FormBuilder(props) {

    const [newOption, setNewOption] = useState("");
    const [type, setType] = useState("text");
    const [error, setError] = useState('')
    const [hide, setHide] = useState(false);
    const dropdownRef = useRef(null);


    const [formData, setFormData] = useState({
        title: "",
        placeholder: "",
        value: "",
        type: type,
        options: []
    });

    const tabs = [
        { label: "Text Input", value: "text" },
        { label: "Radio Button", value: "radio" },
        { label: "Checkbox", value: "checkbox" },
        { label: "Select", value: "select" },
        { label: "TextArea", value: "textarea" }
    ];



    const handleTabClick = (type) => {
        setError("")
        setType(type)
        setFormData({ title: "", placeholder: "", value: "", type: type, options: [] });
    };


    const handleChange = (key, value) => {

        setError("")
        setFormData((prev) => ({ ...prev, [key]: value }));
    }




    const handleSubmit = (e) => {
        e.preventDefault();
        const { title, value, options, type } = formData;

        let tempError = {};
        let isValid = true;

        if (!title.trim()) {
            tempError.titleError = "Title is Required";
            isValid = false;
        }

        if (type === "text" || type === "textarea") {
            if (!value.trim()) {
                tempError.valueError = "Value is Required";
                isValid = false;
            }
        }

        if (type === "radio") {
            if (!options || options.length === 0) {
                tempError.radioOptionError = "At least two options are required";
                isValid = false;
            } else if (options.length < 2) {
                tempError.radioOptionError = "At least two options are required";
                isValid = false;
            }
        }

        if (type === "checkbox") {
            if (!options || options.length === 0) {
                tempError.checkboxOptionError = "At least two options are required";
                isValid = false;
            } else if (options.length < 2) {
                tempError.checkboxOptionError = "At least two options are required";
                isValid = false;
            }
        }

        if (type === "select") {
            if (!options || options.length === 0) {
                tempError.selectOptionError = "At least one options are required";
                isValid = false;
            }
        }



        setError(tempError);

        if (isValid) {
            props.update(formData, false);
            setFormData({ title: "", placeholder: "", value: "", options: [] });
        }
    };






    const handleAddOption = () => {
        const trimmedOption = newOption.trim();

        if (trimmedOption !== "" && !formData.options.includes(trimmedOption)) {
            setFormData((prev) => ({
                ...prev,
                options: [...prev.options, trimmedOption],
            }));
            setNewOption("");
            setHide(true);


        }
    };


    const handleDeleteOption = (index) => {
        setFormData((prev) => ({
            ...prev,
            options: prev.options.filter((_, i) => i !== index)
        }));
    };


    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setHide(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="flex flex-col items-center  min-h-screen p-6">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
                    <div className="flex justify-between" >
                        <h2 className="text-2xl font-semibold mb-4 text-center font-Gilroy">Customized Form </h2>


                        <div className="font-bold cursor-pointer" onClick={props.handleClose}>X</div>

                    </div>
                    <div className="flex justify-center gap-2  mb-4">
                        {tabs.map((tab) => (
                            <button
                                key={tab.value}
                                className={`px-4 py-2 font-Gilroy ${type === tab.value
                                    ? "border-b-4 border-[#205DA8] text-[#205DA8] font-semibold"
                                    : "text-gray-500 border-neutral-100 border-b-4"
                                    } transition-all duration-600`}
                                onClick={() => handleTabClick(tab.value)}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>



                    <div className="space-y-4">





                        {
                            type === 'text' && <>

                                <div className='mb-2 gap-8 items-center'>
                                  
                                    <label className='block text-gray-700 mb-2 text-start font-Gilroy'>
                                        Title <span className='text-red-600 -ml-1'>*</span>
                                    </label>

                                    <input
                                        id='clientId'
                                        type='text'
                                        placeholder='Enter your title'
                                        onChange={(e) => handleChange("title", e.target.value)}
                                        className='  w-[400px]  px-3 py-2 border rounded-xl focus:outline-none   md:text-lg font-Gilroy'
                                    />
                                    {
                                        error.titleError && <p className="mt-2 ms-1 text-red-500 text-xs flex items-center gap-1 font-Gilroy">
                                            <InfoCircle size={16} color="#DC2626" />
                                            {error.titleError}
                                        </p>

                                    }
                                </div>

                                <div className='mb-2 gap-8'>
                                    <label className='block text-gray-700 mb-2 text-start font-Gilroy'>Placeholder</label>
                                    <input
                                        id='clientId'
                                        type='text'
                                        placeholder='Enter your placeholder'
                                        onChange={(e) => handleChange("placeholder", e.target.value)}
                                        className=' w-[400px] px-3 py-2 border rounded-xl focus:outline-none   md:text-lg font-Gilroy'
                                    />
                                </div>
                                <div className='mb-2  gap-8'>
                                    <label className='block text-gray-700 mb-2 text-start font-Gilroy'>
                                       Value <span className='text-red-600 -ml-1'>*</span>
                                    </label>
                                    <input
                                        id='clientId'
                                        type='text'
                                        placeholder='Enter your value'
                                        onChange={(e) => handleChange("value", e.target.value)}
                                        className=' w-[400px] px-3 py-2 border rounded-xl focus:outline-none   md:text-lg font-Gilroy'
                                    />
                                    {
                                        error.valueError && <p className="mt-2 ms-1 text-red-500 text-xs flex items-center gap-1 font-Gilroy">
                                            <InfoCircle size={16} color="#DC2626" />
                                            {error.valueError}
                                        </p>

                                    }

                                </div>
                                <div className="flex justify-center">
                                    <button className="px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Gilroy" onClick={handleSubmit}>Submit</button>

                                </div>

                            </>
                        }


                        {
                            type === 'textarea' && <>

                                <div className='mb-2  gap-8'>
                                     <label className='block text-gray-700 mb-2 text-start font-Gilroy'>
                                        Title <span className='text-red-600 -ml-1'>*</span>
                                    </label>
                                  <input
                                        id='clientId'
                                        type='text'
                                        placeholder='Enter your title'
                                        onChange={(e) => handleChange("title", e.target.value)}
                                        className='  w-[400px]  px-3 py-2 border rounded-xl focus:outline-none   md:text-lg font-Gilroy'
                                    />
                                    {
                                        error.titleError && <p className="mt-2 ms-1 text-red-500 text-xs flex items-center gap-1 font-Gilroy">
                                            <InfoCircle size={16} color="#DC2626" />
                                            {error.titleError}
                                        </p>

                                    }
                                </div>

                                <div className='mb-2  gap-8'>
                                    <label className='block text-gray-700 mb-2 text-start font-Gilroy'>placeholder</label>
                                    <input
                                        id='clientId'
                                        type='text'
                                        placeholder='Enter your Placeholder'
                                        onChange={(e) => handleChange("placeholder", e.target.value)}
                                        className=' w-[400px] px-3 py-2 border rounded-xl focus:outline-none   md:text-lg font-Gilroy'
                                    />
                                </div>
                                <div className='mb-2 gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>
                                       Value <span className='text-red-600 -ml-1'>*</span>
                                    </label>
                                  <input
                                        id='clientId'
                                        type='text'
                                        placeholder='Enter your value'
                                        onChange={(e) => handleChange("value", e.target.value)}
                                        className=' w-[400px] px-3 py-2 border rounded-xl focus:outline-none   md:text-lg font-Gilroy'
                                    />
                                    {
                                        error.valueError && <p className="mt-2 ms-1 text-red-500 text-xs flex items-center gap-1 font-Gilroy">
                                            <InfoCircle size={16} color="#DC2626" />
                                            {error.valueError}
                                        </p>

                                    }
                                </div>

                                <div className="flex justify-center">
                                    <button className="px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Gilroy" onClick={handleSubmit}>Submit</button>

                                </div>



                            </>
                        }


                        {type === "select" && (
                            <>
                                <div className='mb-2  gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>
                                        Title <span className='text-red-600 -ml-1'>*</span>
                                    </label>
                                   <input
                                        type='text'
                                        placeholder='Enter your title'
                                        onChange={(e) => handleChange("title", e.target.value)}
                                        className='w-[400px] px-3 py-2 border rounded-xl focus:outline-none md:text-lg font-Gilroy'
                                    />
                                    {
                                        error.titleError && <p className="mt-2 ms-1 text-red-500 text-xs flex items-center gap-1 font-Gilroy">
                                            <InfoCircle size={16} color="#DC2626" />
                                            {error.titleError}
                                        </p>

                                    }
                                </div>

                                <div className='mb-2  gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>
                                       Options <span className='text-red-600 -ml-1'>*</span>
                                    </label>
                                   <div className="flex gap-4 relative">
                                        <input
                                            type='text'
                                            placeholder='Enter option name'
                                            value={newOption}
                                            onChange={(e) => { setNewOption(e.target.value); setHide(true); setError("") }}
                                            className='w-[400px] px-3 py-2 border rounded-xl focus:outline-none md:text-lg font-Gilroy relative'
                                        />
                                        <label onClick={handleAddOption} className="px-3 py-2   rounded-lg text-[#205DA8] font-semibold font-Gilroy"> + Add Option </label>


                                        {formData.options.length > 0 && hide && (
                                            <ul ref={dropdownRef} className="absolute top-[110%] w-[400px] bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto mt-1">
                                                {formData.options.map((option, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex justify-between items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                                    >
                                                        <span className="text-gray-700">{option}</span>
                                                        <button
                                                            className="text-red-500 font-semibold"
                                                            onClick={() => handleDeleteOption(index)}
                                                        >
                                                            ✖
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                    </div>

                                    {
                                        error.selectOptionError && <p className="mt-2 ms-1 text-red-500 text-xs flex items-center gap-1 font-Gilroy">
                                            <InfoCircle size={16} color="#DC2626" />
                                            {error.selectOptionError}
                                        </p>

                                    }


                                </div>



                                <div className="flex justify-end">
                                    <button className="px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Gilroy" onClick={handleSubmit}>Submit</button>

                                </div>
                            </>
                        )}


                        {type === "radio" && (
                            <>
                                <div className='mb-2 gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>
                                        Title <span className='text-red-600 -ml-1'>*</span>
                                    </label>
                                   <input
                                        type='text'
                                        placeholder='Enter your title'
                                        onChange={(e) => handleChange("title", e.target.value)}
                                        className='w-[400px] px-3 py-2 border rounded-xl focus:outline-none md:text-lg font-Gilroy'
                                    />
                                    {
                                        error.titleError && <p className="mt-2 ms-1 text-red-500 text-xs flex items-center gap-1 font-Gilroy">
                                            <InfoCircle size={16} color="#DC2626" />
                                            {error.titleError}
                                        </p>

                                    }
                                </div>

                                <div className='mb-2 gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>
                                       Options <span className='text-red-600 -ml-1'>*</span>
                                    </label>
                                   <div className="flex gap-4 relative ">
                                        <input
                                            type='text'
                                            placeholder='Enter option name'
                                            value={newOption}
                                            onChange={(e) => { setNewOption(e.target.value); setHide(true); setError("") }}
                                            className='w-[400px] px-3 py-2 border rounded-xl focus:outline-none md:text-lg font-Gilroy'
                                        />
                                        <label onClick={handleAddOption} className="px-3 py-2   rounded-lg text-[#205DA8] font-semibold font-Gilroy"> + Add Option </label>


                                        {formData.options.length > 0 && hide && (
                                            <ul ref={dropdownRef} className='absolute top-[110%] w-[400px] bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto mt-1'>
                                                {formData.options.map((option, index) => (
                                                    <li key={index} className="flex justify-between items-center px-3 py-2 hover:bg-gray-100 cursor-pointer">
                                                        <div>
                                                          
                                                            <span className="text-gray-700">{option}</span></div>
                                                        <button
                                                            className="text-red-500"
                                                            onClick={() => handleDeleteOption(index)}
                                                        >
                                                            X
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    {
                                        error.radioOptionError && <p className="mt-2 ms-1 text-red-500 text-xs flex items-center gap-1 font-Gilroy">
                                            <InfoCircle size={16} color="#DC2626" />
                                            {error.radioOptionError}
                                        </p>

                                    }

                                </div>
                                <div className="flex justify-end">
                                    <button className="px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Gilroy" onClick={handleSubmit}>Submit</button>

                                </div>
                            </>
                        )}

                        {type === "checkbox" && (
                            <>
                                <div className='mb-2 gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>
                                        Title <span className='text-red-600 -ml-1'>*</span>
                                    </label><input
                                        type='text'
                                        placeholder='Enter your title'
                                        onChange={(e) => handleChange("title", e.target.value)}
                                        className='w-[400px] px-3 py-2 border rounded-xl focus:outline-none md:text-lg font-Gilroy'
                                    />
                                    {
                                        error.titleError && <p className="mt-2 ms-1 text-red-500 text-xs flex items-center gap-1 font-Gilroy">
                                            <InfoCircle size={16} color="#DC2626" />
                                            {error.titleError}
                                        </p>

                                    }
                                </div>

                                <div className='mb-2 gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>
                                       Options <span className='text-red-600 -ml-1'>*</span>
                                    </label>
                                   <div className="flex gap-4 relative ">
                                        <input
                                            type='text'
                                            placeholder='Enter option name'
                                            value={newOption}
                                            onChange={(e) => { setNewOption(e.target.value); setHide(true); setError("") }}
                                            className='w-[400px] px-3 py-2 border rounded-xl focus:outline-none md:text-lg font-Gilroy'
                                        />
                                        <label onClick={handleAddOption} className="px-3 py-2   rounded-lg text-[#205DA8] font-semibold font-Gilroy"> + Add Option </label>
                                        {formData.options.length > 0 && hide && (
                                            <ul ref={dropdownRef} className='absolute top-[110%] w-[400px] bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto mt-1'>
                                                {formData.options.map((option, index) => (
                                                    <li key={index} className="flex justify-between items-center px-3 py-2 hover:bg-gray-100 cursor-pointer">
                                                        <div>
                                                            {/* <input
                                                                type="checkbox"
                                                                value={option}
                                                                className="mr-2"
                                                            /> */}
                                                            <span className="text-gray-700">{option}</span></div>
                                                        <button
                                                            className="text-red-500"
                                                            onClick={() => handleDeleteOption(index)}
                                                        >
                                                            X
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    {
                                        error.checkboxOptionError && <p className="mt-2 ms-1 text-red-500 text-xs flex items-center gap-1 font-Gilroy">
                                            <InfoCircle size={16} color="#DC2626" />
                                            {error.checkboxOptionError}
                                        </p>

                                    }
                                </div>



                                <div className="flex justify-end">
                                    <button className="px-10 py-2 bg-[#205DA8] rounded-lg text-white font-Gilroy" onClick={handleSubmit}>Submit</button>

                                </div>
                            </>
                        )}



                    </div>
                </div>
            </div>
        </div>
    );
}

FormBuilder.propTypes = {
    update: PropTypes.func,
    handleClose: PropTypes.func
}

export default FormBuilder;