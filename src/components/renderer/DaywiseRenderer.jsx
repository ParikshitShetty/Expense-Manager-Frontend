import React, { useEffect, useState } from 'react'
import { useAtomValue } from 'jotai';
import { Collapse } from '@mui/material'
import { TransitionGroup } from 'react-transition-group';
// Import json
import calendar from '../../../public/calendar.json';
// Global states
import { 
    currentDateObjState,
    expensesArrayState, } from '../../store/ExpensesState';
// Components
import RenderItem from '../../utils/RenderItem';
import PieChartComponent from '../charts/PieChartComponent';
// Common functions
import { 
  monthWiseExpenseCalculator,
  dayWiseExpenseCalculator} from '../../common/ExpenseCalculator';

function DaywiseRenderer({view}) {
    const dateObj = useAtomValue(currentDateObjState);
    const expensesArray = useAtomValue(expensesArrayState);
    
    const [monthsExpenses,setMonthsExpenses] = useState([]);

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
      <PieChartComponent monthsExpenses={monthsExpenses}/>
    </>
  )
}

export default DaywiseRenderer