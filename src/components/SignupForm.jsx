import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
// Icons
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

function SignupForm() {
  const [eyeToggle,setEyeToggle] = useState(false);
  const [signUpData,setSignUpData] = useState({
    email:'',
    user_name:'',
    password:''
  });

  const navigator = useNavigate();

  const InputHandler = (event) =>{
    const {name, value} = event.target;
    setSignUpData((data)=>{
        return { ...data, [name]:value };
    });
  };

  const passwordToggle = () => {
    setEyeToggle(!eyeToggle);
  }
   
  const SignUpFormSubmit = async(event) =>{
    event.preventDefault();
    try {
      const url = import.meta.env.VITE_SIGNUP_URL;
      const options = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer", 
        body: JSON.stringify(signUpData)
      };
    
      const response = await fetch(url, options);
      const respJson = await response.json();
      console.log("respJson",respJson);

      if (!response.ok) {
        throw new Error("Signup Failed");
      }
      toast.success("Singed Up", {
        position: "top-right"
      });
      
      navigator('/login');
    } catch (error) {
      console.error("Error while signing up",error);
      toast.error(error.message, {
        position: "top-right"
      });
    }  
  };

  console.log(signUpData)
  return (
    <>
    <div className='w-full min-h-screen flex justify-center items-center'>
        <form className="w-2/3 sm:w-1/3 md:w-1/3 lg:w-1/4 h-full mx-auto" onSubmit={SignUpFormSubmit}>
          <p className='w-full text-center font-semibold text-2xl'>Sign Up</p>
          <div className="my-5">
            <label htmlFor="email" className="block mb-2 text-md font-medium  ">Your email</label>

            <input type="email" id="email" name='email' placeholder="name@flowbite.com" 
            className="bg-transparent border-2 border-gray-300 text-gray-50 text-sm rounded-lg block w-full p-2.5" 
            value={signUpData.email} onChange={InputHandler} required />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-md font-medium  ">User name</label>
            <input type="user_name" id="user_name" name='user_name'
              className="bg-transparent border-2 border-gray-300 text-gray-50 text-sm rounded-lg block w-full p-2.5 " 
              placeholder="user name" required 
              value={signUpData.user_name} onChange={InputHandler}/>
          </div>

          <div className="mb-5 relative ">
            <label htmlFor="password" className="block mb-2 text-md font-medium  ">Your password</label>
            <input type={eyeToggle ? 'text' : "password"} id="password" name='password'
            className="bg-transparent border-2 border-gray-300 text-gray-50   text-sm rounded-lg  block w-full p-2.5  "
            placeholder='••••••••' required value={signUpData.password} onChange={InputHandler}/>
            {
              eyeToggle 
              ? 
              <IoMdEyeOff onClick={passwordToggle} className='w-6 h-6 text-white cursor-pointer absolute right-1.5 bottom-2'/> 
              :
               <IoMdEye onClick={passwordToggle} className='w-6 h-6 text-white cursor-pointer absolute right-1.5 bottom-2'/>
            }           
          </div>
          
          <div className="flex flex-col items-center justify-center mb-5">
            <button type="submit" className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Submit
              </span>
            </button>
            <label htmlFor="remember" className="ms-2 text-md font-medium text-gray-900 dark:text-gray-300">Have an account? &nbsp;
              <span onClick={() => navigator('/login')} className='font-medium text-primary-600 hover:underline cursor-pointer dark:text-blue-500'>login</span>
            </label>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignupForm