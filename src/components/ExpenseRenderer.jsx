import React from 'react'
import { useAtomValue } from 'jotai';
import { Collapse,ListItem,ListItemText,List } from '@mui/material'
import { TransitionGroup } from 'react-transition-group';
// Global States
import { 
    currentDateState, 
    expensesArrayState } from '../state/ExpensesState';
// Import components
import RenderItem from '../utils/RenderItem';

function ExpenseRenderer() {
    const expensesArray = useAtomValue(expensesArrayState);
    const currentDate = useAtomValue(currentDateState);

  return (
    <>
    {
        [...expensesArray.filter((expense) => expense.exp_created === currentDate)].length 

        ?
        <List className='w-1/3'>
          <ListItem className='w-full my-1 flex justify-evenly items-center '>
          <ListItemText primary="Expense" className='w-1/3 text-center '/>
          <ListItemText primary="exp_amt" className='w-1/3 '/>
        </ListItem>
        </List>
        :
        <></>
    }

    {
      expensesArray && 
      <List className='w-1/3'>
        <TransitionGroup>
          {[...expensesArray.filter((expense) => expense.exp_created === currentDate)]
          .map(
            (item,index) => (
            <Collapse key={index}>            
              <RenderItem item={item}/>
            </Collapse>
          ))}
        </TransitionGroup>
      </List>
    }
    </>
  )
}

export default ExpenseRenderer