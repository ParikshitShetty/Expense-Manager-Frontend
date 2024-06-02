import React, { useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import { Slide } from '@mui/material';
// Global States
import { 
  activatePromptState, 
  categoryToggleState, 
  expensesState } from '../store/ExpensesState';
// Import json
import categoryJson from '../../public/category.json'

function ExpenseForm() {
  const [expenseData,setExpenseData] = useAtom(expensesState);
  const activatePrompt = useAtomValue(activatePromptState);
  const [ categoryToggle, setCategoryToggle ] = useAtom(categoryToggleState);

  // Input handler
  const changeHandler = (event) =>{
    const { name,value } = event.target;
    setExpenseData((data)=>{
      return { ...data, [name]:value };
    });
    if (name === "category" && value === "other") {
      setCategoryToggle(true);
    }
  }
  return (
    <>
      <Slide in={activatePrompt} direction='up'>
        <div>
          <div>
              <label htmlFor="exp_name" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Expense Name</label>
              <input type="text" id="small-input" name='exp_name' placeholder='Lunch'
               value={expenseData.exp_name} onChange={changeHandler}
              className="block w-full p-2 text-gray-900 border-2 border-gray-300 rounded-lg bg-transparent text-md dark:placeholder-gray-400 dark:text-white" required/>
          </div>
          <div>
              <label htmlFor="exp_amt" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Expense Amount</label>
              <input type="text" id="exp_amt" name='exp_amt' placeholder='100.0'
              value={expenseData.exp_amt} onChange={changeHandler} 
              onKeyDown={(e) => {
                // Allow only numbers and a single decimal point
                const allowedChars = /[0-9.]/;
                if (!allowedChars.test(e.key) && e.key !== 'Backspace') {
                  e.preventDefault();
                }
              }}
              className="block w-full p-2 text-gray-900 border-2 border-gray-300 rounded-lg  text-md bg-transparent dark:placeholder-gray-400 dark:text-white" required/>
          </div>
          
          {
            categoryToggle
            ?
              <div>
                <label htmlFor="category" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Category</label>
                <input type="text" id="category" name='category' placeholder='Personal'
                value={expenseData.category} onChange={changeHandler}
                className="block w-full p-2 text-gray-900 border-2 border-gray-300 rounded-lg bg-transparent text-md dark:placeholder-gray-400 dark:text-white " required/>
              </div>
            :
              <div className="max-w-sm mx-auto">
                <label htmlFor="category" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Select an Category</label>
                <select id="category" name='category' className="block w-full p-2 text-gray-900 border-2 border-gray-300 rounded-lg text-md bg-black dark:placeholder-gray-400 dark:text-white cursor-pointer"
                 defaultValue={expenseData.category} onChange={changeHandler}
                >
                  <option defaultValue="" selected
                  className='block w-full p-2 text-gray-900 border-2 border-gray-300 rounded-lg  text-md bg-inherit dark:placeholder-gray-400 dark:text-white cursor-pointer'
                  >Select an Category</option>
                  {categoryJson.map((category)=>(
                    <option value={category.value} className='block w-full p-2 text-gray-900 border-2 border-gray-300 rounded-lg text-md bg-gray-950 dark:placeholder-gray-400 dark:text-white cursor-pointer'>{category.name}</option>
                  ))}
                </select>
              </div>
          }
            
          <div className="mb-6">
              <label htmlFor="note" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Note</label>
              <textarea type="text" id="note" name='note' placeholder='Note something!!'
              value={expenseData.note} onChange={changeHandler}
              className="block w-full p-4 text-gray-900 text-md border-2 border-gray-300 rounded-lg bg-transparent text-base dark:placeholder-gray-400 dark:text-white "/>
          </div>
        </div>
      </Slide>
    </>
  )
}

export default ExpenseForm