import React from 'react';
import PropTypes from 'prop-types';


const TextInput = ({placeholder, value, title, callback = ''}) => {
   
    const handleChange = (e) => {
        const inputValue = e.target.value;
        callback(inputValue);
    
               if (inputValue === "") {
          
        }
      };
    
    return <div className='w-full ps-4 '>
        <label className="block text-black mb-2  font-semibold capitalize  font-Gilroy text-base">{title}</label>
        <input type='text' className="w-full px-3 py-2 border rounded-md focus:outline-none  font-Gilroy text-md" placeholder={placeholder} value={value}
         onChange={handleChange}
          />
    </div>
}

TextInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    title: PropTypes.string,
    callback: PropTypes.func
}
export default TextInput;