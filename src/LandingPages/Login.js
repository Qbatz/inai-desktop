import React, { useState } from 'react';
import LoginImage from '../Images/Login_Image.svg';
import InaiLogo from '../Images/Inai_Logo.svg';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Robot from '../Images/Robot.svg';
import { useNavigate } from 'react-router-dom'


function Login() {

  const navigate = useNavigate()

  const [clientId, setClientId] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleClientIdChange = (e) => setClientId(e.target.value);
  const handleUserIdChange = (e) => setUserId(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const [isNotRobot, setIsNotRobot] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleNotRobotChange = (e) => setIsNotRobot(e.target.checked);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(clientId, userId, password);
  };


  const handleNavigateCreateAccount = () => {
    navigate('./create-account')
  }

  return (
    <div className='bg-slate-100 w-screen  min-h-screen flex items-center justify-center p-4'>
      <div className='bg-white  h-auto max-w-6xl rounded-3xl shadow-lg !mt-[8px] !mb-[10px]'>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
          <div className='Right_Side flex flex-col items-center justify-center xs:order-2 sm:order-2 md:order-1 '>
            <img src={LoginImage} className='w-full h-auto max-w-md object-contain' alt='Login' />
            <div className='text-center mt-4 ps-24 pe-24'>
              <label className='block text-black text-2xl font-bold font-Montserrat mb-3'>Communication is the heart of Business.</label>
              <label className='block text-neutral-600 font-Montserrat text-base'>Stay connected with the Right Supplier and Buyer!</label>
            </div>
          </div>


          <div className='Right_Side m-3 flex flex-col justify-center xs:order-1 sm:order-1 md:order-2'>
            <div className='flex md:justify-start sm:justify-center xs:justify-center mb-2'>
              <img src={InaiLogo} alt='INAI Logo' className='h-12' />
            </div>

            <div className='flex md:justify-start sm:justify-center xs:justify-center mb-2'>
              <label className='block text-2xl font-semibold font-Gilroy'>Welcome back!</label>
            </div>
            <div className='flex md:justify-start sm:justify-center xs:justify-center mb-2'>
              <label className='block text-neutral-600 font-Montserrat font-normal text-base'>Enter your details below to access your INAI account.</label>
            </div>

            <div className='w-full max-w-[450px]'>

              <div className='mb-2'>
                <label className='block text-black mb-2 text-start font-Gilroy font-medium text-sm' htmlFor='clientId'>Client ID <span className='text-red-500'>*</span></label>
                <input
                  id='clientId'
                  type='text'
                  value={clientId}
                  onChange={handleClientIdChange}
                  placeholder='Enter your Client ID'
                  className=' w-full px-3 py-2 border rounded-xl focus:outline-none   md:text-md font-Gilroy  font-medium text-neutral-600'
                />
              </div>


              <div className='mb-2'>
                <label className='block text-black mb-2 text-start font-Gilroy font-medium text-sm' htmlFor='userId'>User ID <span className='text-red-500'>*</span></label>
                <input
                  id='userId'
                  type='text'
                  placeholder='Enter your User ID'
                  value={userId}
                  onChange={handleUserIdChange}
                  className='w-full px-3 py-2 border rounded-xl focus:outline-none  md:text-md font-Gilroy  font-medium text-neutral-600'
                />
              </div>
              <div className='mb-2 relative'>
                <label className='block text-black mb-2 text-start font-Gilroy font-medium text-sm' htmlFor='password'>Password <span className='text-red-500'>*</span></label>
                <input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  autoComplete='new-password'
                  autoCorrect='off'
                  placeholder='Enter your password'
                  value={password}
                  onChange={handlePasswordChange}
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
                  <label className="text-[#205DA8] font-Gilroy text-sm font-medium">
                    <span onClick={() => navigate("/forgot-user-name")} className="cursor-pointer hover:underline">
                      Username
                    </span> /{" "}
                    <span onClick={() => navigate("/forgot-client-id")} className="cursor-pointer hover:underline">
                      Client ID
                    </span> /{" "}
                    <span onClick={() => navigate("/forgot-password")} className="cursor-pointer hover:underline">
                      Password?
                    </span>
                  </label>                </div>
              </div>

              <div className="mb-2 flex items-center justify-between w-full border border-[#205DA8] rounded-xl shadow-sm bg-white">
                <div className="flex items-center gap-2 p-3">
                  <input
                    type="checkbox"
                    id="notRobot"
                    checked={isNotRobot} onChange={handleNotRobotChange}
                    className="w-6 h-6 accent-[#205DA8] cursor-pointer"
                  />
                  <label htmlFor="notRobot" className="text-neutral-600 text-lg cursor-pointer font-Gilroy text-sm font-medium">
                    I'm not a robot
                  </label>
                </div>
                <div className="bg-[#205DA8] text-white border border-[#205DA8] flex items-center justify-center px-4 py-2 rounded-tr-xl rounded-br-xl">
                  <img src={Robot} alt="Robot" />
                </div>
              </div>


              <button type='submit'
                disabled={!isNotRobot}
                onClick={handleSubmit}
                className={`mt-2  font-Montserrat font-semibold text-base w-full p-[10px] rounded-xl transition duration-300 sm:text-lg ${isNotRobot
                    ? 'bg-[#205DA8] text-white cursor-pointer'
                    : 'bg-[#205DA8] text-white cursor-pointer'
                  }`}>
                Sign In
              </button>


              <div className="text-start mt-1">
                <p className="text-black font-Montserrat font-normal text-base">
                  Don't have an account?{' '}
                  <span
                    onClick={handleNavigateCreateAccount}
                    className=" cursor-pointer text-[#205DA8] hover:text-[#205DA8] font-semibold transition duration-300 font-Montserrat"
                  >
                    Create an account
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

export default Login;