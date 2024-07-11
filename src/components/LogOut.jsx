import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
// Icons
import { RiUser3Fill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";

function LogOut() {
    const [toggle,setToggle] = useState(false);

    const navigator = useNavigate();

    const logOut = async() =>{
        try {
          const url = import.meta.env.VITE_LOGOUT_URL;
          const options = {
              method: "GET", // *GET, POST, PUT, DELETE, etc.
              mode: "cors", // no-cors, *cors, same-origin
              cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
              credentials: "include", //include is used to set cookies
              headers: {
                "Content-Type": "application/json",
              },
              redirect: "follow",
              referrerPolicy: "no-referrer",
          };
        
          const response = await fetch(url, options);
          if (!response.ok) {
            throw new Error("Authentication failed");
          }
          const respJson = await response.json();
          console.log("response",respJson);
  
          toast.success("Signed Out", {
            position: "top-right"
          });
          navigator('/login');
        } catch (error) {
          console.error("Error while making api request:",error);
          toast.error(error.message, {
            position: "top-right"
          });
        }
    };
  return (
    <>
        <div className='relative w-2/3 sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 mt-5 h-24'>
            <RiUser3Fill onClick={() => setToggle(!toggle)}
            className='absolute right-16 w-7 h-7 text-white cursor-pointer'/>
            {
                toggle &&
                <>
                    <motion.button 
                    onClick={logOut}
                    whileTap={{scale: 0.9}}
                    className='border-2 p-2 rounded-md absolute right-0 top-10 inline-flex cursor-pointer text-white hover:text-black hover:bg-gray-200 transition-all ease-in-out duration-500'>
                        Logout &nbsp;
                        <IoLogOut className='w-7 h-7'/>
                    </motion.button>
                </>
            }
        </div>
    </>
  )
}

export default LogOut