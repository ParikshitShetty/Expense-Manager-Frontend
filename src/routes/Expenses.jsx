import React, { useEffect, useState } from 'react'
import { FiPlusCircle } from 'react-icons/fi';
import { useAtom, useAtomValue } from 'jotai';
import { ToastContainer, toast } from 'react-toastify';
// Components
import ExpenseForm from '../components/ExpenseForm'
// Icons
import { IoMdCheckmark } from "react-icons/io";
import { expensesState } from '../state/ExpensesState';
import { RxCross2 } from "react-icons/rx";

function Expenses() {
  const [activatePrompt,setActivatePrompt] = useState(false);
  const [expenseData,setExpenseData] = useAtom(expensesState);

  const promptToggle = () =>{
    setActivatePrompt(!activatePrompt);
  };

  const notify = () =>{
    toast.info("Please fill the details", {
      position: "top-right"
    });
  };

  const addExpense = async() => {
    const form_validator = expenseData.exp_name !== "" && expenseData.exp_amt !== "" && expenseData.category !== "" && expenseData.note !== "";

    if (form_validator) {
      try {
        const url = "http://localhost:5000/expenses/adder";
        const options = {
          method: "POST", 
          mode: "cors", 
          cache: "no-cache", 
          credentials: "same-origin", 
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJwdnMiLCJpYXQiOjE3MTU3NzEyNDYsImV4cCI6MTcxNTgxNDQ0Nn0.xrSoqNehaRDrxOGVcT8px-C0eCjPEvSHehexRa1gXmQ',
          },
          redirect: "follow",
          referrerPolicy: "no-referrer", 
          body: JSON.stringify(expenseData)
        };
        const response = await fetch(url,options);
        const respJson = await response.json();
        console.log("respJson",respJson);

        toast.success("Expense Added", {
          position: "top-right"
        });
        setExpenseData({
          exp_name :'',
          exp_amt : 0.0,
          category : '',
          note : ''
        });
      } catch (error) {
        console.error("Error while making api request",error);
      }  
    }else{
      notify();
    }
  }

  console.log(expenseData)
  
  return (
    <>
      <div className='w-full min-h-screen flex flex-col justify-center items-center'>
        <ToastContainer position='top-right' autoClose={3000}/>
        <div>
          { 
            activatePrompt
            ?
              <span className=''>
                <RxCross2 
                onClick={promptToggle} 
                className='w-8 h-8 cursor-pointer'/>
              </span>
            :
              <span className=''>
                <FiPlusCircle
                  onClick={promptToggle} 
                  className='w-8 h-8 cursor-pointer' />
              </span>
          }
        </div>
        {
          activatePrompt 
          &&
          (
            <>
              <ExpenseForm />
              <IoMdCheckmark onClick={addExpense}
              className='w-7 h-7 cursor-pointer'/>
            </>
          )
        }
      </div>
    </>
  )
}

export default Expenses