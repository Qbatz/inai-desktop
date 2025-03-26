import React from 'react';
import LoginImage from '../Images/Login_Image.svg';
import InaiLogo from '../Images/Inai_Logo.svg';
import Robot from '../Images/Robot.svg'
import {useNavigate} from 'react-router-dom'

function UserName() {

    const navigate =  useNavigate()


    return (
        <div className='bg-slate-100 w-screen  min-h-screen flex items-center justify-center '>
           
            <div className='bg-white  h-full   max-w-6xl w-full rounded-3xl shadow-lg'>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-10'>

                    <div className='flex flex-col items-center justify-center'>
                        <img src={LoginImage} className='w-full h-auto max-w-md object-contain' alt='Login' />
                        <div className="text-center ">
                            <div className="mx-auto w-full max-w-[340px]">
                                <label className="block text-black text-3xl font-bold font-Montserrat mb-3">
                                    Communication is the heart of Business.
                                </label>
                                <label className="block text-neutral-600 font-Montserrat text-base font-normal">
                                    Stay connected with a Right Supplier and Buyer!!
                                </label>
                            </div>
                        </div>

                    </div>


                    <div className='Right_Side m-3 flex flex-col justify-center'>
                        <div className='flex justify-start mb-2'>
                            <img src={InaiLogo} alt='INAI Logo' className='h-<fraction> w-<fraction>' />
                        </div>

                        <div className='text-start mb-2'>
                            <label className='block text-28px font-semibold font-Gilroy pt-4'>Forgot Username</label>
                        </div>


                        <div className='w-full max-w-[450px]'>




                            <div className='mb-2'>
                                <label className='block text-black mb-2 text-start font-Gilroy font-normal text-sm' htmlFor='userId'>Verify Your Email</label>
                                <input
                                    id='userId'
                                    type='text'
                                    name='username'
                                    autoComplete='username'
                                    autoCorrect='off'
                                    placeholder='Enter Verify Your Email'
                                    className='w-full h-14 px-3 py-2 border rounded-xl focus:outline-none  text-sm font-Gilroy  font-medium text-neutral-600'
                                />
                            </div>





                            <div className="mt-6 flex items-center justify-between w-full border border-gray-300 rounded-xl shadow-sm bg-white">
                                <div className="flex items-center gap-2 p-2 pl-4">
                                    <input
                                        type="checkbox"
                                        id="notRobot"
                                        className="w-6 h-6 accent-[#205DA8] cursor-pointer"
                                    />
                                    <label htmlFor="notRobot" className="text-neutral-600 text-lg cursor-pointer font-Gilroy text-sm font-medium">
                                        I'm not a robot
                                    </label>
                                </div>
                                <div className="bg-[#205DA8] text-white flex items-center justify-center px-4 py-2 rounded-tr-xl rounded-br-xl">

                                    <img src={Robot} alt='Robot' className="h-10 w-10 sm:h-14 sm:w-12 md:h-10 md:w-14 object-contain" />
                                </div>
                            </div>


                            <button type='submit'className='mt-6 font-Montserrat font-semibold text-base w-full bg-[#205DA8] text-white p-[14px] rounded-xl hover:bg-blue-700 transition duration-300 sm:text-lg'>
                                Submit
                            </button>


                            <div className="text-start mt-4">
                                <p className="text-black font-Montserrat font-normal text-base">
                                    Already have an account?{' '}
                                    <span onClick={() => navigate("/")}
                                        className=" cursor-pointer text-[#205DA8] hover:text-[#205DA8] font-semibold transition duration-300 font-Montserrat"
                                    >
                                        Sign In
                                    </span>
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserName;