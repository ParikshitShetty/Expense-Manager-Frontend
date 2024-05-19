import React from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { Slide } from '@mui/material';
// Global States
import { 
  activatePromptState, 
  expensesState } from '../state/ExpensesState';


function ExpenseForm() {
  const [expenseData,setExpenseData] = useAtom(expensesState);
  const activatePrompt = useAtomValue(activatePromptState);

  // Input handler
  const changeHandler = (event) =>{
    const { name,value } = event.target;
    setExpenseData((data)=>{
      return { ...data, [name]:value };
    });
  }
  return (
    <>
      <Slide in={activatePrompt} direction='up'>
        <div>
          <div>
              <label htmlFor="exp_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expense Name</label>
              <input type="text" id="small-input" name='exp_name' placeholder='Lunch'
               value={expenseData.exp_name} onChange={changeHandler}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
          </div>
          <div>
              <label htmlFor="exp_amt" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Expense Amount</label>
              <input type="number" id="exp_amt" name='exp_amt' placeholder='100.0'
              value={expenseData.exp_amt} onChange={changeHandler} 
              onKeyDown={(e) => {
                // Allow only numbers and a single decimal point
                const allowedChars = /[0-9.]/;
                if (!allowedChars.test(e.key) && e.key !== 'Backspace') {
                  e.preventDefault();
                }
              }}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
          </div>
          <div>
              <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
              <input type="text" id="category" name='category' placeholder='Personal'
              value={expenseData.category} onChange={changeHandler}
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
          </div>
            
          <div className="mb-6">
              <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note</label>
              <textarea type="text" id="note" name='note' placeholder='Write something you want'
              value={expenseData.note} onChange={changeHandler}
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
          </div>
        </div>
      </Slide>
    </>
  )
}

export default ExpenseForm