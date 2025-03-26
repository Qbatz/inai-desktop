import React from 'react';
import PropTypes from 'prop-types';


const TextAreaComponent = ({placeholder, value, title, callback = ''}) => {
   

    
    return <div className='w-[400px] ps-4 '>
        <label className="block text-black mb-2 font-semibold capitalize font-Gilroy">{title}</label>
        <textarea type='textarea' className="w-full px-3 py-2 border rounded-md focus:outline-none  font-Gilroy" placeholder={placeholder} value={value} onChange={(e) => callback(e.target.value)}    />
    </div>
}

TextAreaComponent.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    title: PropTypes.string,
    callback: PropTypes.func
}
export default TextAreaComponent;