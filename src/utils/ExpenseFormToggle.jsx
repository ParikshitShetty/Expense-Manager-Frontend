import React from 'react'
import { useAtom } from 'jotai';
import { Slide } from '@mui/material';
// Components
import { 
  activatePromptState,
  expenseSourceState, } from '../store/ExpensesState';
// Icons
import { RxCross2 } from "react-icons/rx";
import { FiPlusCircle } from 'react-icons/fi';
import { IoMdCheckmark } from 'react-icons/io';


function ExpenseFormToggle({source,addExpense,updateExpense}) {
    const [activatePrompt,setActivatePrompt] = useAtom(activatePromptState);
    const [expenseSource,setExpenseSource] = useAtom(expenseSourceState);

    const promptToggle = (param) =>{
      setExpenseSource(param);
      setActivatePrompt(!activatePrompt);
    };
    
  return (
    <>
      <div className='w-1/3 h-full relative '>
        <div className={` w-full h-full flex flex-col justify-start items-end
        absolute ${activatePrompt ? `top-0` : `top-6`} 
        2xl:right-20 xl:right-12 lg:right-7 md:-right-5 sm:-right-14 -right-24`}>
            
          <Slide in={activatePrompt} direction='up'>
            <div className='w-1/6 h-20 absolute top-0 inline-flex flex-col justify-between items-end'>
              <span>
                <RxCross2 
                onClick={() => promptToggle('')} 
                className='w-8 h-8 cursor-pointer'/>
              </span>
              <span>
                <IoMdCheckmark 
                onClick={expenseSource === 'update' ? updateExpense : addExpense }
                className='w-7 h-7 cursor-pointer'/>
              </span>
            </div>
          </Slide>
              
          <Slide in={!activatePrompt} direction='up'>
            <div className='absolute top-0 w-1/6 h-full flex flex-col justify-around items-end'>
              <span className=''>
                <FiPlusCircle
                  onClick={() => promptToggle('add')} 
                  className='w-8 h-8 cursor-pointer' />
              </span>
            </div>
          </Slide>
        </div>
      </div>
    </>
  )
}

export default ExpenseFormToggle