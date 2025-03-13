import React, { useState } from 'react';
import LoginImage from '../Images/Login_Image.svg';
import InaiLogo from '../Images/Inai_Logo.svg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Robot from '../Images/Robot.svg'
function Login() {




  const [isNotRobot, setIsNotRobot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='bg-slate-100 w-screen  min-h-screen flex items-center justify-center p-4'>
      <div className='bg-white  h-auto max-w-6xl rounded-3xl shadow-lg !mt-[8px] !mb-[10px]'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>

          <div className='flex flex-col items-center justify-center'>
            <img src={LoginImage} className='w-full h-auto max-w-md object-contain' alt='Login' />
            <div className='text-center mt-4 ps-24 pe-24'>
              <label className='block text-black text-2xl font-bold font-Montserrat mb-3 '>Communication is the heart of Business.</label>
              <label className='block text-neutral-600 font-Montserrat text-base'>Stay connected with the Right Supplier and Buyer!</label>
            </div>
          </div>


          <div className='Right_Side m-3 flex flex-col justify-center'>
            <div className='flex justify-start mb-2'>
              <img src={InaiLogo} alt='INAI Logo' className='h-12' />
            </div>

            <div className='text-start mb-2'>
              <label className='block text-2xl font-semibold font-Gilroy'>Welcome back!</label>
              <label className='block text-neutral-600 font-Montserrat font-normal text-base'>Enter your details below to access your INAI account.</label>
            </div>


            <div className='w-full max-w-[450px]'>

              <div className='mb-2'>
                <label className='block text-black mb-2 text-start font-Gilroy font-medium text-sm' htmlFor='clientId'>Client ID</label>
                <input
                  id='clientId'
                  type='text'
                  placeholder='Enter your Client ID'
                  className=' w-full px-3 py-2 border rounded-xl focus:outline-none   md:text-md font-Gilroy  font-medium text-neutral-600' 
                />
              </div>


              <div className='mb-2'>
                <label className='block text-black mb-2 text-start font-Gilroy font-medium text-sm' htmlFor='userId'>User ID</label>
                <input
                  id='userId'
                  type='text'
                  name='username'
                  autoComplete='username'
                  autoCorrect='off'
                  placeholder='Enter your User ID'
                  className='w-full px-3 py-2 border rounded-xl focus:outline-none  md:text-md font-Gilroy  font-medium text-neutral-600'
                />
              </div>
              <div className='mb-2 relative'>
                <label className='block text-black mb-2 text-start font-Gilroy font-medium text-sm' htmlFor='password'>Password</label>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  autoComplete='new-password'
                  autoCorrect='off'
                  placeholder='Enter your password'
                  className='w-full px-3 py-2 border rounded-xl focus:outline-none  pr-10 md:text-md font-Gilroy  font-medium text-neutral-600'
                />
                <span
                  className='absolute right-3 top-10 cursor-pointer text-gray-500'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>


              <div className='mb-4 flex items-center justify-between' >
                <div>  <input id='staySignedIn' type='checkbox' className='mr-2' />
                  <label htmlFor='staySignedIn' className='text-black font-Gilroy text-sm font-medium'>Stay signed in</label></div>
                <div>
                  <label className='text-blue-800 font-Gilroy text-sm font-medium'>Username/Client ID/Password?</label>
                </div>
              </div>

              <div className="mb-2 flex items-center justify-between w-full border border-gray-300 rounded-xl shadow-sm bg-white">
                <div className="flex items-center gap-2 p-3">
                  <input
                    type="checkbox"
                    id="notRobot"
                    className="w-6 h-6 accent-blue-500 cursor-pointer"
                  />
                  <label htmlFor="notRobot" className="text-neutral-600 text-lg cursor-pointer font-Gilroy text-sm font-medium">
                    I'm not a robot
                  </label>
                </div>
                <div className="bg-blue-800 text-white flex items-center justify-center px-4 py-2 rounded-tr-xl rounded-br-xl">
                  <img src={Robot} />
                </div>
              </div>


              <button type='submit' disabled={!isNotRobot} className='mt-2 font-Montserrat font-semibold text-base w-full bg-blue-800 text-white p-[10px] rounded-xl hover:bg-blue-700 transition duration-300 sm:text-lg'>
                Sign In
              </button>


              <div className="text-start mt-1">
                <p className="text-black font-Montserrat font-normal text-base">
                  Don't have an account?{' '}
                  <a
                    href="/signup"
                    className="text-blue-500 hover:text-blue-800 font-semibold transition duration-300 font-Montserrat"
                  >
                    Create an account
                  </a>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;