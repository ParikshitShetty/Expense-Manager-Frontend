import React from 'react'
import { useAtomValue } from 'jotai';
// Global States
import { 
    currentDateState, 
    expensesArrayState } from '../state/ExpensesState';

function ExpenseRenderer() {
    const expensesArray = useAtomValue(expensesArrayState);
    const currentDate = useAtomValue(currentDateState);

  return (
    <>
    {
        [...expensesArray.filter((expense) => expense.exp_created === currentDate)].length 

        ?
        <div className='w-1/4 mt-2 flex justify-evenly items-center '>
            <span className='w-1/2'>Expense </span>
            <span className='w-1/2'>exp_amt </span>
        </div>
        :
        <></>
    }

    {
      expensesArray &&
      [...expensesArray.filter((expense) => expense.exp_created === currentDate)].map((item,index) =>(
        <div key={index} className='w-1/4 mt-2 flex justify-evenly items-center '>
            <span className='w-1/2'>{item.exp_name}</span>
            <span className='w-1/2'>&#8377; {item.exp_amt}</span>
        </div>
      ))
    }
    </>
  )
}

export default ExpenseRenderer