import React from 'react'
import PropTypes from 'prop-types';



function Radio({ name, value, checked, key, callback = '' }) {




    return ( 
        <div className='w-[400px] ps-4 flex gap-2 items-center'>

            <input
                type="radio"
                className="appearance-none w-4 h-4 border border-[#205DA8] rounded-full checked:bg-[#205DA8] text-black font-semibold  font-Gilroy cursor-pointer"
                name={name}
                value={value}
                checked={checked}
                onChange={(e) => callback(e.target.value)}
            />
            <label key={key} className="block text-gray-500 font-semibold capitalize font-Gilroy">
                {value}
            </label>
        </div>
    )
}
Radio.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    key: PropTypes.number.isRequired,
    callback: PropTypes.func
}
export default Radio