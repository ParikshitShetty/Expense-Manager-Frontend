import { useAtomValue } from 'jotai';
import React, { useEffect, useState } from 'react'
// Global states
import { 
  currentDateObjState,
  expensesArrayState, } from '../../store/ExpensesState';

function CommonExpenseRenderer({view}) {
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
      if (view === 'month') {
        if((currentMonthObj.getMonth() + 1) === dateObj.number && currentMonthObj.getFullYear() === dateObj.year) return expense ;
      }else{//For year
        if(currentMonthObj.getFullYear() === dateObj.year) return expense
      }
    });
    filteredExpenses.forEach( expense => {
      price += expense.exp_amt;
    });
    setTotalPrice(price);
  },[dateObj,expensesArray])
  return (
    <>
      <div className='my-4 w-2/3 sm:w-1/2 md:w-[40%] lg:w-[30%] 2xl:w-1/4 text-lg font-semibold flex justify-evenly items-center '>
        <span className='w-1/2 text-center'>Total Expense</span>
        <span className='w-1/2 text-center'>&#8377; {totalPrice}</span>
      </div>
    </>
  )
}

export default CommonExpenseRenderer