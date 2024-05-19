import React, { useState } from 'react'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from 'react-router-dom'

function SignupForm() {
  const [eyeToggle,setEyeToggle] = useState(false);
  const [signUpData,setSignUpData] = useState({
    email:'',
    user_name:'',
    password:''
  });

  const naviagtor = useNavigate();

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
    const url = "http://localhost:5000/user/signup";
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
        // body: JSON.stringify(loginData), // body data type must match "Content-Type" header
        body: JSON.stringify(signUpData)
    };
    
    const response = await fetch(url, options);
    const respJson = await response.json();
    console.log("respJson",respJson);

    naviagtor('/login')
  };

  console.log(signUpData)
  return (
    <>
    <div className='w-full min-h-screen flex justify-center items-center'>
        <form className="w-1/4 h-full mx-auto" onSubmit={SignUpFormSubmit}>
          <p className='w-full text-center'>Sign Up</p>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium  ">Your email</label>

            <input type="email" id="email" name='email' placeholder="name@flowbite.com" 
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5" 
            value={signUpData.email} onChange={InputHandler} required />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium  ">User name</label>
            <input type="user_name" id="user_name" name='user_name'
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 " 
              placeholder="user name" required 
              value={signUpData.user_name} onChange={InputHandler}/>
          </div>

          <div className="mb-5 relative ">
            <label htmlFor="password" className="block mb-2 text-sm font-medium  ">Your password</label>
            <input type={eyeToggle ? 'text' : "password"} id="password" name='password'
            className=" border border-gray-300 text-gray-900  text-sm rounded-lg  block w-full p-2.5  "
            placeholder='••••••••' required value={signUpData.password} onChange={InputHandler}/>
            {
              eyeToggle 
              ? 
              <IoMdEyeOff onClick={passwordToggle} className='w-6 h-6 text-black cursor-pointer absolute right-1 bottom-2'/> 
              :
               <IoMdEye onClick={passwordToggle} className='w-6 h-6 text-black cursor-pointer absolute right-1 bottom-2'/>
            }           
          </div>
          
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
      </div>
    </>
  )
}

export default SignupForm