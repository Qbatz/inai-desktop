import React, { useState } from 'react'
import AdditionalFormField from './AdditionalFormField'
import TextInput from '../Components/TextInput';
import TextAreaComponent from '../Components/TextAreaComponent';
import Radio from '../Components/Radio';
import Checkbox from '../Components/CheckBox';
import SelectComponent from '../Components/Select';

function FormDisplay() {

    const [display, setDisplay] = useState(false)
    const [displayItems, setDisplayItems] = useState([])

    const [formValues, setFormValues] = useState({});

    const handleAdditionalField = () => {
        setDisplay(true)
    }

    const handleCloseForm = () => {
        setDisplay(false)
    }



    const updateDisplayItems = (item, isVisible) => {
        setDisplayItems([...displayItems, item])
        setFormValues((prev) => ({ ...prev, [item.title]: item.value || "" }));
        setDisplay(isVisible)
    }



    const textInputCallbackForName = (title, newValue) => {
      

        setFormValues((prev) => ({
            ...prev,
            [title]: newValue,
        }));
        const updatedItems = displayItems.map((item) =>
            item.title === title ? { ...item, value: newValue } : item
        );
        setDisplayItems(updatedItems);
    };


    const CallbackForTextArea = (title, newValue) => {
      
        setFormValues((prev) => ({
            ...prev,
            [title]: newValue,
        }));
        const updatedItems = displayItems.map((item) =>
            item.title === title ? { ...item, value: newValue } : item
        );
        setDisplayItems(updatedItems);
    }


    const RadioOptionsChange = (title, newValue) => {
      
        const updatedItems = displayItems.map((item) =>
            item.title === title ? { ...item, value: newValue } : item
        );
        setDisplayItems(updatedItems);
    }


    const CheckboxOptionsChange = (title, newValue) => {
      
        const updatedItems = displayItems.map((item) =>
            item.title === title ? { ...item, value: newValue } : item
        );
        setDisplayItems(updatedItems);
    }



    const SelectOptionsChange = (title, newValue) => {
     
        const updatedItems = displayItems.map((item) =>
            item.title === title ? { ...item, value: newValue } : item
        );
        setDisplayItems(updatedItems);
  }


    return (
        <div >

            <div className='w-[500px]'>



                {displayItems.length > 0 && (
                    displayItems.map((field, index) => (
                        <div key={index} className="mb-4">

                            {field.type === "text" && (
                                <TextInput value={formValues[field.title] || ""} title={field.title} placeholder={field.placeholder} callback={(newValue) => textInputCallbackForName(field.title, newValue)} />
                            )}

                            {field.type === "radio" && <div>
                                <label className="ps-4 block text-black mb-2 font-semibold capitalize font-Gilroy">{field.title}</label>
                                {field.options?.map((option, idx) => {
                                   
                                    return <Radio id={`radio-${index}`} name={field.name} value={option} checked={field.value === option} key={idx} callback={()=>RadioOptionsChange(field.title, option)} />
                                })}
                            </div>
                            }


                            {field.type === "checkbox" && <div>
                                <label className="ps-4 block text-black mb-2 font-semibold capitalize font-Gilroy">{field.title}</label>
                                {field.options?.map((option, idx) => (
                                    <Checkbox title={field.title} name={field.name} value={option} Checked={field.defaultValue?.includes(option)} key={idx} callback={()=>CheckboxOptionsChange(field.title, option)} />
                                ))}

                            </div>
                            }

                            {field.type === "select" && (
                                <SelectComponent title={field.title} field={field.options} callback={(newValue)=>SelectOptionsChange(field.title,newValue)} />
                            )}
                            

                            {field.type === "textarea" && (
                                <TextAreaComponent placeholder={field.placeholder} value={field.value} title={field.title} callback={(newValue) =>CallbackForTextArea(field.title, newValue)} />

                            )}
                        </div>
                    ))
                )
                }
            </div>

            <button className='bg-blue-900 px-4 py-3 rounded-lg text-base font-bold text-white flex items-center m-5 ' onClick={handleAdditionalField} >+ Additional Field</button>

            {
                display && <AdditionalFormField update={updateDisplayItems} handleClose={handleCloseForm} />
            }

        </div>
    )
}

export default FormDisplay