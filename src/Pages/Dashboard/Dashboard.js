
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_INFO_SAGA, LOG_IN } from '../../Utils/Constant';
import { encryptData } from '../../Crypto/crypto';



function Dashboard() {


  const { type, token } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state)
  const cookies = new Cookies();


  useEffect(() => {
    if (token) {
      cookies.set('inai-token', token, { path: '/' });
    }
  }, [token]);



  useEffect(() => {
    dispatch({ type: GET_USER_INFO_SAGA });
     }, []);

  useEffect(() => {
    if (state.Common.successCode === 200 && type) {
      setTimeout(() => {
        switch (type) {
          case "customer":
            navigate("/client");
            break;
          case "supplier":
            navigate("/vendor");
            break;
          case "invoice":
            navigate("/invoice");
            break;
          default:
            break;
        }
      }, 0);
    }
  }, [state.Common.successCode, type]);


const value = localStorage.getItem("isLoginSuccess");
const isLogin = value !== null ? JSON.parse(value) : false;



  useEffect(() => {
    if (!isLogin) {
      if (token) {
        dispatch({ type: LOG_IN })
        const encryptData_Login = encryptData(JSON.stringify(true));
        localStorage.setItem("inai_login", encryptData_Login.toString());
        const cookies = new Cookies();
        cookies.set('inai-token', token, { path: '/' });
        if (type) {
          switch (type) {
            case "customer":
              navigate("/client");
              break;
            case "supplier":
              navigate("/vendor");
              break;
            case "invoice":
              navigate("/invoice");
              break;
            default:

              break;
          }
        }
      }
    }
  }, [isLogin]);




 



 

  return (
    <div className='bg-slate-100  h-screen w-full p-4 rounded-tl-lg rounded-tr-lg   m-0 '>


      <div className='bg-white rounded-2xl h-screen  ps-5 pt-3 pe-5 relative'>

        <div className='flex flex-col xs:items-center sm:flex-row md:flex-row justify-between items-center gap-2 sticky left-0 top-0 right-0 '>
          <div>
            <h2 className="text-xl font-semibold mb-2 font-Gilroy text-black">Dashboard</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;