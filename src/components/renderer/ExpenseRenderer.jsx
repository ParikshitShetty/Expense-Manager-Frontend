import React, { useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai';
import { Collapse } from '@mui/material'
import { TransitionGroup } from 'react-transition-group';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// Global States
import { 
    currentDateState, 
    expensesArrayState } from '../../store/ExpensesState';
// Import components
import RenderItem from '../../utils/RenderItem';
// API Services
import { expensesGetter } from '../../services/ExpenseGetterService'

function ExpenseRenderer() {
    const [expensesArray,setExpensesArray] = useAtom(expensesArrayState);
    const currentDate = useAtomValue(currentDateState);

    const [todaysExpenses,setTodaysExpenses] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);

    const navigator = useNavigate();

    const removeExpense = async(expense) => {
      if (expense) {
        try {
          const url = import.meta.env.VITE_EXPENSES_REMOVER_URL;
          const options = {
            method: "POST", 
            mode: "cors", 
            cache: "no-cache", 
            credentials: "include", 
            headers: {
              "Content-Type": "application/json",
            },
            redirect: "follow",
            referrerPolicy: "no-referrer", 
            body: JSON.stringify({"exp_id":expense.exp_id})
          };
          const response = await fetch(url,options);
          if (!response.ok) {
            throw new Error("Error while adding expense");
          }
          const respJson = await response.json();
          console.log("respJson",respJson);
  
          toast.success("Expense Removed", {
            position: "top-right"
          });
          // Call getter function to update the latest expenses
          expensesGetter(setExpensesArray,navigator);
        } catch (error) {
          console.error("Error while making api request",error);
        }  
      }
    }

    useEffect(() =>{
      const filteredArray = [...expensesArray.filter((expense) => expense.exp_created === currentDate)];
      setTodaysExpenses([...filteredArray]);

      if (filteredArray.length) {
        let price = 0;
        filteredArray.forEach( expense => {
          price += expense.exp_amt;
        });
        setTotalPrice(price);
        return
      }
      setTotalPrice(0);
    },[expensesArray,currentDate])

  return (
    <>
    { todaysExpenses.length 
        ?
        <div className='w-2/3 sm:w-1/2 md:w-[40%] lg:w-[30%] 2xl:w-1/4 my-2 text-lg font-semibold'>
          <span className='w-full my-1 flex justify-evenly items-center '>
            <span className='w-1/2 text-start '>Expense Name</span>
            <span className='w-1/2 text-start'>Exp Amount</span>
          </span>
        </div>
        :
        <div className='w-1/4 my-2 text-lg font-semibold'>
          <span className='w-full my-1 flex justify-evenly items-center '>
            No Expenses to Show
          </span>
        </div>
    }

    
      <div className='my-2 text-lg overflow-y-auto overflow-x-auto
      w-2/3 max-h-[210px]
      sm:w-1/2 sm:max-h-[240px]
      md:w-[40%] md:max-h-[240px]
      lg:w-[30%] lg:max-h-[240px]
      2xl:w-1/4 2xl:max-h-[300px]'>
        <TransitionGroup>
          {todaysExpenses?.map((item,index) => (
            <Collapse key={index}>            
              <RenderItem item={item} removeExpense={removeExpense} renderer={'expense_name'}/>
            </Collapse>
          ))}
        </TransitionGroup>
      </div>
      <div className='w-2/3 sm:w-1/2 md:w-[40%] lg:w-[30%] 2xl:w-1/4 text-lg'>
        { totalPrice ?
          (
            <span className='w-full flex justify-center items-center border-t-2 text-lg'>
              <span className='w-1/2 text-end '>&#8377;&nbsp;</span>
              <span className='w-1/2 text-start '>{totalPrice}</span>
            </span>
          )
          :
          <></>
        }
      </div>
    </>
  )
}

export default ExpenseRenderer