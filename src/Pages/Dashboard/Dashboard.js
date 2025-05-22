
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { GET_USER_INFO_SAGA } from '../../Utils/Constant';

function Dashboard() {


  const { token, type } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(state => state)

  useEffect(() => {
    if (token) {
      const cookies = new Cookies();
      cookies.set('inai-token', token, { path: '/' });
    } else {
      console.log("No token found in URL.");
    }
  }, [token]);


  useEffect(() => {
    dispatch({ type: GET_USER_INFO_SAGA });
  }, []);

  useEffect(() => {
    if (state.Common.successCode === 200) {
      switch (type) {
        case "client":
          navigate("/client");
          break;
        case "product":
          navigate("/product");
          break;
        case "vendor":
          navigate("/vendor");
          break;
        case "invoice":
          navigate("/invoice");
          break;
        default:
          console.warn("type in URL");
          break;
      }
    }
  }, [state.Common.successCode]);



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