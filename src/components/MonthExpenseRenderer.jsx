import { useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react'
// Global states
import { 
  currentDateObjState,
  expensesArrayState, } from '../store/ExpensesState';

function MonthExpenseRenderer() {
  const dateObj = useAtomValue(currentDateObjState);
  const expensesArray = useAtomValue(expensesArrayState);

  const [totalPrice,setTotalPrice] = useState(0);

  useEffect(() => {
    if (!expensesArray.length && !dateObj ){
      setTotalPrice(0);
      return
    };

    let price = 0;
    const filteredExpenses = expensesArray.filter((expense) => {
      const currentMonthObj = new Date(expense.exp_created);   
      if((currentMonthObj.getMonth() + 1) === dateObj.number && currentMonthObj.getFullYear() === dateObj.year) return expense
    });
    filteredExpenses.forEach( expense => {
      price += expense.exp_amt;
    });
    setTotalPrice(price);
  },[dateObj,expensesArray])
  return (
    <>
      <div className='w-1/5 my-4 text-lg font-semibold flex justify-evenly items-center '>
        <span className='w-1/2 text-center'>Total Expense</span>
        <span className='w-1/2 text-center'>&#8377; {totalPrice}</span>
      </div>
    </>
  )
}

export default MonthExpenseRenderer