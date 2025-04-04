import Profile from "../Asset/Images/Profile_S.svg";
import DownArrow from '../Asset/Icon/arrow-down.svg';
import Notification from '../Asset/Icon/notification.svg';
import Search from '../Asset/Icon/search-normal.svg';

export default function Navbar() {
    return (
        <nav className="bg-white px-4 py-2 flex items-center justify-end md:justify-end w-full">

       
            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full md:w-1/3 mr-2">
                <img src={Search} alt="Search" className="w-4 h-4 sm:w-5 sm:h-5" />
                <input
                    type="text"
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
                    <img src={Profile} alt="Profile" className="w-6 h-6 sm:w-8 sm:h-8" />
                    <div className="hidden md:block">
                        <p className="text-xs sm:text-sm font-semibold font-Gilroy">Rakul Preet</p>
                        <p className="text-[10px] sm:text-xs text-gray-500 font-Gilroy">rakulpreet@gmail.com</p>
                    </div>
                    <button className="text-gray-600">
                        <img src={DownArrow} alt="DownArrow" className="w-3 sm:w-4" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
