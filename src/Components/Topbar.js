/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, connect } from 'react-redux';
import DownArrow from '../Asset/Icon/arrow-down.svg';
import Notification from '../Asset/Icon/notification.svg';
import Search from '../Asset/Icon/search-normal.svg';
import { GET_USER_INFO_SAGA } from '../Utils/Constant';
import PropTypes from 'prop-types';

function Navbar({ state }) {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({ type: GET_USER_INFO_SAGA });
    }, []);
    return (
        <nav className="bg-white px-4 py-2 flex items-center justify-end md:justify-end w-full">


            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full md:w-1/3 mr-2">
                <img src={Search} alt="Search" className="w-4 h-4 sm:w-5 sm:h-5 cursor-pointer" />
                <input
                    type="text"
                    autoComplete="new"
                    autoCorrect="off"
                    placeholder="Search"
                    className="bg-transparent outline-none ml-2 w-full text-xs sm:text-sm"
                />
            </div>


            <div className="flex items-center space-x-4 sm:space-x-6">

                <div className="bg-gray-200 p-2 sm:p-3  rounded-full relative cursor-pointer">
                    <img src={Notification} alt="Notification" className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                <div className="hidden lg:block h-8 border-l border-gray-300"></div>


                <div className="flex items-center space-x-2">

                    <div className="hidden sm:hidden md:hidden lg:flex flex-col">
                     
                        <p className="text-sm font-semibold font-Gilroy">
                            {state.firstName || state.lastName ? `${state.firstName}${state.lastName}` : "Admin"}
                        </p>

                        <p className="text-xs text-gray-500 font-Gilroy">{state.email || ""}</p>
                    </div>
                    <button className="text-gray-600">
                        <img src={DownArrow} alt="DownArrow" className="w-3 sm:w-4" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
const mapsToProps = (stateInfo) => {
    return {
        state: stateInfo.userInfo?.userDetails,
    };
};


Navbar.propTypes = {
    state: PropTypes.object
};

export default connect(mapsToProps)(Navbar);
