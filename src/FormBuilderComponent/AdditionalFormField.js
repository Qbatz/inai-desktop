import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormBuilder() {


    const navigate = useNavigate();

    const [newOption, setNewOption] = useState("");

    const [type, setType] = useState('')
    const [fields, setFields] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        placeholder: "",
        value: "",
        options: []
    });

    const addField = (type) => {
        setType(type)
        setFormData({ title: "", placeholder: "", value: "", options: [] });
    };



    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    }

    // const handleSubmit = (e) => {
    //     const newFields = [...fields, { type, ...formData }];
    //     setFields(newFields);
    //     navigate("/", { state: { fields: newFields } });
    //     setFormData({ title: "", placeholder: "", value: "", options: [] });
    //     setType("");
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        setFields((prevFields) => [...prevFields, { type, ...formData }]);

        navigate("/", { state: { fields: [...fields, { type, ...formData }] } });

        setFormData({ title: "", placeholder: "", value: "", options: [] });
        setType("");
    };



    const handleAddOption = () => {
        if (newOption.trim() !== "") {
            setFormData((prev) => ({ ...prev, options: [...prev.options, newOption.trim()] }));
            setNewOption("");
        }
    };

    const handleDeleteOption = (index) => {
        setFormData((prev) => ({
            ...prev,
            options: prev.options.filter((_, i) => i !== index)
        }));
    };
    console.log("formData", formData)



    return (
        <div className="flex flex-col items-center bg-gray-100 min-h-screen p-6">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Customized Form </h2>


                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-lg" onClick={() => addField("text")}>
                        Text Input
                    </button>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-lg" onClick={() => addField("radio")}>
                        Radio Button
                    </button>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-lg" onClick={() => addField("checkbox")}>
                        Checkbox
                    </button>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-lg" onClick={() => addField("select")}>
                        Select Dropdown
                    </button>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-lg" onClick={() => addField("textarea")}>
                        TextArea
                    </button>
                </div>


                <div className="space-y-4">
                    {
                        type === 'text' && <>

                            <div className='mb-2 flex gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>Title</label>
                                <input
                                    id='clientId'
                                    type='text'
                                    placeholder='Enter your title'
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    className='  w-[400px]  px-3 py-2 border rounded-xl focus:outline-none   md:text-lg font-Gilroy'
                                />
                            </div>

                            <div className='mb-2 flex gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>placeholder</label>
                                <input
                                    id='clientId'
                                    type='text'
                                    placeholder='Enter your Placeholder'
                                    onChange={(e) => handleChange("placeholder", e.target.value)}
                                    className=' w-[400px] px-3 py-2 border rounded-xl focus:outline-none   md:text-lg font-Gilroy'
                                />
                            </div>
                            <div className='mb-2 flex gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>Value</label>
                                <input
                                    id='clientId'
                                    type='text'
                                    placeholder='Enter your Placeholder'
                                    onChange={(e) => handleChange("value", e.target.value)}
                                    className=' w-[400px] px-3 py-2 border rounded-xl focus:outline-none   md:text-lg font-Gilroy'
                                />
                            </div>

                            <button className="px-4 py-4 bg-blue-800 rounded-md text-white" onClick={handleSubmit}>Submit</button>



                        </>
                    }


                    {
                        type === 'textarea' && <>

                            <div className='mb-2 flex gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>Title</label>
                                <input
                                    id='clientId'
                                    type='text'
                                    placeholder='Enter your title'
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    className='  w-[400px]  px-3 py-2 border rounded-xl focus:outline-none   md:text-lg font-Gilroy'
                                />
                            </div>

                            <div className='mb-2 flex gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>placeholder</label>
                                <input
                                    id='clientId'
                                    type='text'
                                    placeholder='Enter your Placeholder'
                                    onChange={(e) => handleChange("placeholder", e.target.value)}
                                    className=' w-[400px] px-3 py-2 border rounded-xl focus:outline-none   md:text-lg font-Gilroy'
                                />
                            </div>
                            <div className='mb-2 flex gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>Value</label>
                                <input
                                    id='clientId'
                                    type='text'
                                    placeholder='Enter your Placeholder'
                                    onChange={(e) => handleChange("value", e.target.value)}
                                    className=' w-[400px] px-3 py-2 border rounded-xl focus:outline-none   md:text-lg font-Gilroy'
                                />
                            </div>

                            <button className="px-4 py-4 bg-blue-800 rounded-md text-white" onClick={handleSubmit}>Submit</button>



                        </>
                    }


                    {type === "select" && (
                        <>
                            <div className='mb-2 flex gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>Title</label>
                                <input
                                    type='text'
                                    placeholder='Enter your title'
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    className='w-[400px] px-3 py-2 border rounded-xl focus:outline-none md:text-lg font-Gilroy'
                                />
                            </div>

                            <div className='mb-2 flex gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>Add Options</label>
                                <input
                                    type='text'
                                    placeholder='Enter option name'
                                    value={newOption}
                                    onChange={(e) => setNewOption(e.target.value)}
                                    className='w-[300px] px-3 py-2 border rounded-xl focus:outline-none md:text-lg font-Gilroy'
                                />
                                <button onClick={handleAddOption} className="px-3 py-2 bg-green-500 text-white rounded-lg">Add</button>
                            </div>

                            <ul className='mb-4'>
                                {formData.options.map((option, index) => (
                                    <li key={index} className="flex gap-5 items-center mb-2">
                                        <span className="text-gray-700">{option}</span>
                                        <button
                                            className="text-red-500"
                                            onClick={() => handleDeleteOption(index)}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <button className="px-4 py-4 bg-blue-800 rounded-md text-white" onClick={handleSubmit}>Submit</button>
                        </>
                    )}

                    {type === "radio" && (
                        <>
                            <div className='mb-2 flex gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>Title</label>
                                <input
                                    type='text'
                                    placeholder='Enter your title'
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    className='w-[400px] px-3 py-2 border rounded-xl focus:outline-none md:text-lg font-Gilroy'
                                />
                            </div>

                            <div className='mb-2 flex gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>Add Options</label>
                                <input
                                    type='text'
                                    placeholder='Enter option name'
                                    value={newOption}
                                    onChange={(e) => setNewOption(e.target.value)}
                                    className='w-[300px] px-3 py-2 border rounded-xl focus:outline-none md:text-lg font-Gilroy'
                                />
                                <button onClick={handleAddOption} className="px-3 py-2 bg-green-500 text-white rounded-lg">Add</button>
                            </div>

                            <ul className='mb-4'>
                                {formData.options.map((option, index) => (
                                    <li key={index} className="flex gap-5 items-center mb-2">
                                        <input
                                            type="radio"
                                            name="custom-radio"
                                            value={option}
                                            className="mr-2"
                                        />
                                        <span className="text-gray-700">{option}</span>
                                        <button
                                            className="text-red-500"
                                            onClick={() => handleDeleteOption(index)}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <button className="px-4 py-4 bg-blue-800 rounded-md text-white" onClick={handleSubmit}>Submit</button>
                        </>
                    )}

                    {type === "checkbox" && (
                        <>
                            <div className='mb-2 flex gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>Title</label>
                                <input
                                    type='text'
                                    placeholder='Enter your title'
                                    onChange={(e) => handleChange("title", e.target.value)}
                                    className='w-[400px] px-3 py-2 border rounded-xl focus:outline-none md:text-lg font-Gilroy'
                                />
                            </div>

                            <div className='mb-2 flex gap-8'>
                                <label className='block text-gray-700 mb-2 text-start font-Gilroy'>Add Options</label>
                                <input
                                    type='text'
                                    placeholder='Enter option name'
                                    value={newOption}
                                    onChange={(e) => setNewOption(e.target.value)}
                                    className='w-[300px] px-3 py-2 border rounded-xl focus:outline-none md:text-lg font-Gilroy'
                                />
                                <button onClick={handleAddOption} className="px-3 py-2 bg-green-500 text-white rounded-lg">Add</button>
                            </div>

                            <ul className='mb-4'>
                                {formData.options.map((option, index) => (
                                    <li key={index} className="flex gap-5 items-center mb-2">
                                        <input
                                            type="checkbox"
                                            value={option}
                                            className="mr-2"
                                        />
                                        <span className="text-gray-700">{option}</span>
                                        <button
                                            className="text-red-500"
                                            onClick={() => handleDeleteOption(index)}
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <button className="px-4 py-4 bg-blue-800 rounded-md text-white" onClick={handleSubmit}>Submit</button>
                        </>
                    )}



                </div>
            </div>
        </div>
    );
}

export default FormBuilder;



















