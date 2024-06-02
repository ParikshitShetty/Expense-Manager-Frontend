import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// Icons
import { RiUser3Fill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";

function LogOut() {
    const [toggle,setToggle] = useState(false);

    const navigator = useNavigate();

    const loginOut = async() =>{
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
        <div className='relative w-1/3 my-8'>
            <RiUser3Fill onClick={() => setToggle(!toggle)}
            className='absolute right-16 -top-14 w-7 h-7 text-white cursor-pointer'/>
            {
                toggle &&
                <>
                    <button onClick={loginOut}
                    className='border-2 p-2 rounded-md absolute right-0 -top-3 inline-flex cursor-pointer'>
                        Logout &nbsp;
                        <IoLogOut className=' w-7 h-7 text-white '/>
                    </button>
                </>
            }
        </div>
    </>
  )
}

export default LogOut