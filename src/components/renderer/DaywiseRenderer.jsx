import React, { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai';
import { Collapse } from '@mui/material'
import { TransitionGroup } from 'react-transition-group';
import { HiOutlineChartPie } from "react-icons/hi2";
// Import json
import calendar from '../../../public/calendar.json';
// Global states
import { 
    currentDateObjState,
    expensesArrayState, } from '../../store/ExpensesState';
// Components
import RenderItem from '../../utils/RenderItem';
import PieChartComponent from '../charts/PieChartComponent';
import BarChartComponent from '../charts/BarChartComponent';
// Common functions
import { 
  monthWiseExpenseCalculator,
  dayWiseExpenseCalculator} from '../../common/ExpenseCalculator';

function DaywiseRenderer({view}) {
    const dateObj = useAtomValue(currentDateObjState);
    const expensesArray = useAtomValue(expensesArrayState);
    
    const [monthsExpenses,setMonthsExpenses] = useState([]);

    const [chartType,setChartType] = useState('bar');

    const BarChartSvg = () => {
      return(
        <>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
            strokeWidth={1.5} stroke="currentColor" 
            onClick={()=> setChartType('bar')}
            className={`w-7 h-7 cursor-pointer stroke-white ${chartType === 'bar' ? `fill-white` : `fill-black `}`} 
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
          </svg>
        </>
      )
    }

    useEffect(() => {
        if (!expensesArray.length && !dateObj ) return;

        if(view === 'month'){
            const filteredExpenses = expensesArray.filter((expense) => {
              const currentMonthObj = new Date(expense.exp_created);
                if((currentMonthObj.getMonth() + 1) === dateObj.number && currentMonthObj.getFullYear() === dateObj.year) return expense ;
            });

            const finalArray = dayWiseExpenseCalculator(filteredExpenses);
            setMonthsExpenses([...finalArray]);
        }else{
            const filteredExpenses = expensesArray.filter((expense) => {
                const currentMonthObj = new Date(expense.exp_created);
                if(currentMonthObj.getFullYear() === dateObj.year) return expense
            })

            const finalArray = monthWiseExpenseCalculator(filteredExpenses,calendar);
            setMonthsExpenses([...finalArray]);
        }
      },[dateObj,expensesArray])
  return (
    <>
        <div className='w-2/3 sm:w-1/2 md:w-[40%] lg:w-[30%] 2xl:w-1/4 my-2 text-lg font-semibold'>
          <span className='w-full my-1 flex justify-evenly items-center '>
            <span className='w-1/2 text-start '>Date</span>
            <span className='w-1/2 text-start'>Exp Amount</span>
          </span>
        </div>

        <div className='my-2 text-lg overflow-y-auto overflow-x-auto
      w-2/3 max-h-[210px]
      sm:w-1/2 sm:max-h-[240px]
      md:w-[40%] md:max-h-[240px]
      lg:w-[30%] lg:max-h-[240px]
      2xl:w-1/4 2xl:max-h-[300px]'>
        <TransitionGroup>
          {monthsExpenses.map((item,index) => (
            <Collapse key={index}>            
              <RenderItem item={item} renderer={'daywise'}/>
            </Collapse>
          ))}
        </TransitionGroup>
      </div>
      
      {/* Render Charts Option */}
      {
        monthsExpenses.length > 0 && (
        <div className='flex justify-start items-center w-1/4 gap-5 my-5'>
          <BarChartSvg />
          <HiOutlineChartPie 
            onClick={()=> setChartType('pie')}
            className={`w-7 h-7 cursor-pointer stroke-white ${chartType === 'pie' ? `fill-white` : `fill-black stroke-white`}`}
          />
        </div>
        )
      }
      
      {/* Render Charts */}
      { monthsExpenses.length > 0 &&
        chartType === 'bar' ? (
          <BarChartComponent expenses={monthsExpenses}/>
        )
        : chartType === 'pie' && (
          <PieChartComponent expenses={monthsExpenses}/>
        )
      }
    </>
  )
}

export default DaywiseRenderer