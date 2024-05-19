import React from 'react'
import { useAtom } from 'jotai';
// Components
import { 
  activatePromptState, } from '../state/ExpensesState';
// Icons
import { RxCross2 } from "react-icons/rx";
import { FiPlusCircle } from 'react-icons/fi';

function ExpenseFormToggle() {
    const [activatePrompt,setActivatePrompt] = useAtom(activatePromptState);

    const promptToggle = () =>{
      setActivatePrompt(!activatePrompt);
    };
    
  return (
    <>
        <div className=' w-3/12 flex justify-end items-center'>
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
    </>
  )
}

export default ExpenseFormToggle