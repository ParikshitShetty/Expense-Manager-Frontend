import React, { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { motion } from "framer-motion"
// Icons
import { TiArrowBack, TiArrowForward } from "react-icons/ti";
// Hooks
import useGetDate from '../hooks/useGetDate';
// Global States
import { 
  currentDateState } from '../store/ExpensesState';
// Import json
import calendar from '../../public/calendar.json'

function DatePicker() {
  // Call the custom hook
  useGetDate();
  
  const [currentDate,setCurrentDate] = useAtom(currentDateState);

  const [dateObj,setDateObj] = useState({});

  // Change Handler For Input
  const dateChangeHandler = (e) => {
    setCurrentDate(e.target.value);
  }

  // To get the current and nextday objects
  const currentDayGetter = (currentDate) =>{
    const day = new Date(currentDate);
    const nextDay = new Date(day);
    return { day,nextDay };
  }

  // To update the date state accodingly
  const dateUpdater = (nextDay) => {
    const paddedMonth = (nextDay.getMonth() + 1).toString().padStart(2, "0");
    const paddedDay = nextDay.getDate().toString().padStart(2, "0");
    const date = nextDay.getFullYear() + '-' + paddedMonth + '-' + paddedDay;
    
    setCurrentDate(date);
  }

  // Function to update the next date
  const nextDate = (updateParam) => {
    const {day,nextDay} = currentDayGetter(currentDate);

    if(updateParam === 'add'){
      nextDay.setDate(day.getDate() + 1);
    }else{
      nextDay.setDate(day.getDate() - 1);
    }

    dateUpdater(nextDay);
  } 

  // Function to open date picker
  const dateInputClickHandler = (event) =>{
    try {
      const element = document.getElementById('date-picker');
      element.showPicker();
    } catch (error) {
      alert("error opening date prompt:",error);
    }
  };

  useEffect(()=>{
    if (currentDate === '') return;
    const currentMonthObj = new Date(currentDate);
    const object = calendar.find(months => months.number === (currentMonthObj.getMonth() + 1));
    setDateObj((prev) =>{
        return {...prev,...object,year:currentMonthObj.getFullYear(),date:currentMonthObj.getDate()}
    });
},[currentDate])

  return (
    <>
      <div className="relative w-1/5 h-full ">
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
            className="dark:bg-gray-900 dark:text-white w-3/5 h-12 rounded"
            onClick={dateInputClickHandler}
            >
              {dateObj &&
                <>
                 {dateObj.date}&nbsp;
                 {dateObj.month}&nbsp;
                 {dateObj.year}
                </>
              }
          </button>
          <input id='date-picker' datepicker="true" type="date" value={currentDate} placeholder="Select date"
          onChange={dateChangeHandler} onClick={dateInputClickHandler}
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

export default DatePicker