import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { useAtom } from 'jotai';
// Icons
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
// Global States
import { loginLoadingState } from '../store/ExpensesState';
// Components
import ExpensesLoader from './ui/ExpensesLoader';

function LoginForm() {
  const [eyeToggle,setEyeToggle] = useState(false);
  const [loginData,setLoginData] = useState({
      // email:'',
      user_name:'',
      password:''
  });

  const [loginLoading,setLoginLoading] = useAtom(loginLoadingState);

  const navigator = useNavigate();

  const InputHandler = (event) =>{
      const {name, value} = event.target;
      setLoginData((data)=>{
          return { ...data, [name]:value };
      });
  };

  const passwordToggle = () => {
    setEyeToggle(!eyeToggle);
  }

  const LoginFormSubmit = async(event) =>{
      event.preventDefault();
      try {
        setLoginLoading(true);
        const url = import.meta.env.VITE_LOGIN_URL;
        const options = {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include", //include is used to set cookies
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer", 
            body: JSON.stringify(loginData)
        };
      
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error("Authentication failed");
        }
        const respJson = await response.json();
        console.log("response",respJson);

        toast.success("Signed In", {
          position: "top-right"
        });
        navigator('/');
      } catch (error) {
        console.error("Error while making api request:",error);
        toast.error(error.message, {
          position: "top-right"
        });
      }finally{
        setLoginLoading(false);
      }
  };

  return (
    <>
        <div className='w-full min-h-screen flex flex-col justify-center items-center bg-inherit'>
            <span className='font-semibold text-2xl'>Login here</span>
            <form className="w-2/3 sm:w-1/3 md:w-1/3 lg:w-1/4 h-full mx-auto" onSubmit={LoginFormSubmit}>
              <div className="my-5 ">
                <label htmlFor="email" className="block mb-2 text-md font-medium">Your Username</label>
                {/* <input type="email" id="email" name='email'
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " 
                    placeholder="name@flowbite.com" required 
                    value={loginData.email} onChange={InputHandler}/> */}

                <input type="user_name" id="user_name" name='user_name'
                    className="bg-transparent border-2 border-gray-300 text-gray-50 text-sm rounded-lg block w-full p-2.5 " 
                    placeholder="user name" required 
                    value={loginData.email} onChange={InputHandler}/>
              </div>
              <div className="mb-5 relative">
                <label htmlFor="password" className="block mb-2 text-md font-medium">Your password</label>
                <input type={eyeToggle ? 'text' : "password"} id="password" name='password'
                    className="bg-transparent border-2 border-gray-300 text-gray-50 text-sm rounded-lg block w-full p-2.5" 
                    placeholder='••••••••' required 
                    value={loginData.password} onChange={InputHandler}/>
                {
                  eyeToggle 
                  ? 
                  <IoMdEyeOff onClick={passwordToggle} 
                  className='w-6 h-6 text-white cursor-pointer absolute right-1 bottom-2'
                  /> 
                  :
                   <IoMdEye onClick={passwordToggle} 
                   className='w-6 h-6 text-white cursor-pointer absolute right-1 bottom-2'
                   />
                } 
              </div>

              {/* <div className="flex items-start mb-5">
                <div className="flex items-center h-5">
                  <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300   dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                </div>
                <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
              </div> */}
              <div className="flex flex-col items-center justify-center mb-5">
                <button type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                  <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    Login
                  </span>
                </button>
                <label htmlFor="remember" className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300">Don't have an account yet? &nbsp;
                  <span onClick={() => navigator('/signup')} className='font-medium text-primary-600 hover:underline cursor-pointer dark:text-blue-500'>signup</span>
                </label>
              </div>
            </form>
            {loginLoading && (
              <>
                {/* <ExpensesLoader size={50} color={'inherit'}/> */}
                <ExpensesLoader size={50} color={'inherit'}> 
                  <span className=' text-white absolute top-[40%] font-semibold text-xl'>Logging you in</span>
                </ExpensesLoader>
              </>
            )}
          </div>
    </>
  )
}

export default LoginForm