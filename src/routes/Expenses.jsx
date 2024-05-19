import React, { useEffect, useRef, useState } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { ToastContainer, toast } from 'react-toastify';
// Components
import ExpenseForm from '../components/ExpenseForm';
import DatePicker from '../components/DatePicker';
import ExpenseRenderer from '../components/ExpenseRenderer';
// Utils
import ExpenseFormToggle from '../utils/ExpenseFormToggle';
// Icons
import { IoMdCheckmark } from "react-icons/io";
// Global States
import { 
  activatePromptState,
  currentDateState,
  expensesArrayState,
  expensesState } from '../state/ExpensesState';
import { 
  loggedInUserIdState } from '../state/userState';

function Expenses() {
  const renderRef = useRef(true);

  const [activatePrompt,setActivatePrompt] = useAtom(activatePromptState);
  const [expenseData,setExpenseData] = useAtom(expensesState);
  const currentDate = useAtomValue(currentDateState);
  const userId = useAtomValue(loggedInUserIdState);

  const setExpensesArray = useSetAtom(expensesArrayState)

  const notify = () =>{
    toast.info("Please fill the details", {
      position: "top-right"
    });
  };

  const addExpense = async() => {
    const form_validator = expenseData.exp_name !== "" && expenseData.exp_amt !== "" && expenseData.category !== "" && expenseData.note !== "" && currentDate !== "";

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
            'Authorization': import.meta.env.VITE_JWT,
          },
          redirect: "follow",
          referrerPolicy: "no-referrer", 
          body: JSON.stringify({...expenseData,"date":currentDate,"userId":userId})
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
        setActivatePrompt(false);
      } catch (error) {
        console.error("Error while making api request",error);
      }  
    }else{
      notify();
    }
  }

  const expensesGetter = async() => {
    try {
        const url = "http://localhost:5000/expenses/getter";
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
          body: JSON.stringify({"userId":userId})
        };
        const response = await fetch(url,options);
        const respJson = await response.json();
        setExpensesArray(respJson.data);
    } catch (error) {
        console.error("Error while making api request",error);
      }  
  }

  useEffect(()=>{
    if(renderRef.current){
      expensesGetter();
      renderRef.current = false;
    }
  },[])
  
  return (
    <>
      <div className='w-full min-h-screen flex flex-col justify-center items-center'>
        <ToastContainer position='top-right' autoClose={3000}/>
        {/* Components */}
        <DatePicker />
        <ExpenseRenderer />
        <ExpenseFormToggle />
        {
          activatePrompt 
          &&
          (
            <>
                <ExpenseForm/>
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