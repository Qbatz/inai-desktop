import React from 'react'
import PropTypes from 'prop-types';



function Checkbox({ name, value, Checked, key, callback = '' }) {
    return (
        <div className='w-[400px] ps-4 flex gap-2 '>
           
                <input
                    type="checkbox"
                    className="ml-2 accent-[#205DA8]"
                    name={name}
                    value={value}
                    defaultChecked={Checked}
                    onChange={(e) => callback(e.target.value)}
                />
                 <label key={key} className="mr-4 block  text-gray-500 font-semibold capitalize font-Gilroy">
                {value}
            </label>
        </div>
    )
}
Checkbox.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    Checked: PropTypes.bool.isRequired,
    key: PropTypes.number.isRequired,
    callback: PropTypes.func
}
export default Checkbox