import React from 'react';
import { useAtom } from 'jotai';
// Icons
import { TiArrowBack, TiArrowForward } from "react-icons/ti";
// Hooks
import useGetDate from '../hooks/useGetDate';
// Global States
import { 
  currentDateState } from '../state/ExpensesState';

function DatePicker() {
  // Call the custom hook
  useGetDate();
  
  const [currentDate,setCurrentDate] = useAtom(currentDateState);

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

  return (
    <>
      <div className="relative max-w-sm">
        <div className='flex justify-around items-center'>
           <TiArrowBack onClick={() =>nextDate('sub')}
           className='w-7 h-7 cursor-pointer'/>

          <input datepicker="true" type="date" value={currentDate} onChange={dateChangeHandler} 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white w-[200px] h-[50px] " placeholder="Select date"/>

          <TiArrowForward onClick={() => nextDate('add')}
          className='w-7 h-7 cursor-pointer'/>
        </div>
      </div>
    </>
  )
}

export default DatePicker