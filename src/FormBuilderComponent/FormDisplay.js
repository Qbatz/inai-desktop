import React, { useState } from 'react'
import AdditionalFormField from './AdditionalFormField'
import { useLocation } from "react-router-dom";

function FormDisplay() {

    const { state } = useLocation();
    const fields = state?.fields || [];

    console.log("state", state)


    const [display, setDisplay] = useState(false)

    const handleAdditionalField = () => {
        setDisplay(true)
    }


    return (
        <div >

            <div className='w-[500px]'>



                {fields.length > 0 && (
                    fields.map((field, index) => (
                        <div key={index} className="mb-4">
                            <label className="block text-gray-700 mb-2 font-bold">{field.title}</label>

                            {field.type === "text" && (
                                <input
                                    type="text"
                                    placeholder={field.placeholder}
                                    defaultValue={field.value}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                />
                            )}

                            {field.type === "radio" && field.options?.map((option, idx) => (
                                <label key={idx} className="mr-4">
                                    <input
                                        type="radio"
                                        className="ml-2"
                                        name={field.name}
                                        value={option}
                                        defaultChecked={field.defaultValue === option}
                                    />
                                    {option}
                                </label>
                            ))}

                            {field.type === "checkbox" && field.options?.map((option, idx) => (
                                <label key={idx} className="mr-4">
                                    <input
                                        type="checkbox"
                                        className="ml-2"
                                        value={option}
                                        defaultChecked={field.defaultValue?.includes(option)}
                                    />
                                    {option}
                                </label>
                            ))}

                            {field.type === "select" && (
                                <select className="w-full px-3 py-2 border rounded-md focus:outline-none">
                                    {field.options.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            )}

                            {field.type === "textarea" && (
                                <textarea
                                    placeholder={field.placeholder}
                                    defaultValue={field.value}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none"
                                />
                            )}
                        </div>
                    ))
                )
                }
            </div>

            <button className='bg-lime-600' onClick={handleAdditionalField} >+ Additional Field</button>

            {
                display && <AdditionalFormField />
            }

        </div>
    )
}

export default FormDisplay