import React from 'react'
import PropTypes from 'prop-types';



function SelectComponent({title, field, callback = '' }) {
    return (
        <div className='w-[400px] ps-4 '>
            <label className='block text-black mb-2 font-semibold capitalize font-Gilroy'>{title}</label>
              <select className="w-full px-3 py-2 border rounded-md focus:outline-none font-semibold capitalize font-Gilroy" onChange={(e) => callback(e.target.value)}>
                                    {field.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
           
        </div>
    )
}
SelectComponent.propTypes = {

    field: PropTypes.arrayOf(PropTypes.string).isRequired,
       callback: PropTypes.func
}
export default SelectComponent;