import React, { useEffect, useRef, useState } from 'react'
import {motion} from 'framer-motion'
import { TiArrowBack, TiArrowForward } from 'react-icons/ti';
import { useAtom, useAtomValue } from 'jotai';
// Global states
import { 
  currentDateObjState,    
  currentMonthState, } from '../../store/ExpensesState';
// Import json
import calendar from '../../../public/calendar.json'
// Hooks
import useGetDate from '../../hooks/useGetDate';
// Import Common Js Functions
import { currentDayGetter ,dateUpdater} from '../../common/DateGetter';

function MonthPicker() {
    // Call hook
    useGetDate();
    const [currentMonthDate,setCurrentMonthDate] = useAtom(currentMonthState);
    const [dateObj,setDateObj] = useAtom(currentDateObjState);

    const dateRef = useRef(null);

    // Change Handler For Input
    const dateChangeHandler = (e) => {
      setCurrentMonthDate(e.target.value);
    }
  
    // Function to update the next date
    const nextDate = (updateParam) => {
      const {day,nextDay} = currentDayGetter(currentMonthDate);
      if(updateParam === 'add'){
        nextDay.setMonth(day.getMonth() + 1);
      }else{
        nextDay.setMonth(day.getMonth() - 1);
      }
      dateUpdater(nextDay,setCurrentMonthDate);
    } 

    // Function to open date picker
    const dateInputClickHandler = (event) =>{
        try {
          const element = document.getElementById('month-picker');
          element.showPicker();
        } catch (error) {
          alert("error opening date prompt:",error);
        }
    };

    useEffect(()=>{
        if (currentMonthDate === '') return;
        const currentMonthObj = new Date(currentMonthDate);
        const object = calendar.find(months => months.number === (currentMonthObj.getMonth() + 1));
        setDateObj((prev) =>{
            return {...prev,...object,'year':currentMonthObj.getFullYear()}
        });
    },[currentMonthDate])
  return (
    <>
        <div className="relative w-2/3 sm:w-1/3 md:w-1/4 xl:w-1/5 h-full">
            <div className=' flex justify-around items-center '>
              <motion.span 
                whileTap={{scale: 0.9}}
                whileHover={{scale : 1.1}}
              >
                <TiArrowBack 
                  onClick={() =>nextDate('sub')}
                  className='w-7 h-7 cursor-pointer text-white'/>
              </motion.span> 

                <button
                    className="dark:bg-gray-900 dark:text-white w-3/5 h-12 rounded font-semibold"
                    onClick={dateInputClickHandler}
                >
                    {dateObj &&
                     <>
                      {dateObj.month} &nbsp;
                      {dateObj.year}
                     </>
                    }
                </button>
                <input id='month-picker' type="date" value={currentMonthDate} placeholder="Select date"
                ref={dateRef}
                onChange={dateChangeHandler}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 pointer-events-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white w-3/5 h-12 cursor-pointer"/>
            
              <motion.span 
                whileTap={{scale:0.9}}
                whileHover={{scale : 1.1}}
              >
                <TiArrowForward 
                  onClick={() => nextDate('add')}
                  className='w-7 h-7 cursor-pointer'/>
              </motion.span>
            </div>
        </div>
    </>
  )
}

export default MonthPicker