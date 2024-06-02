import React, { useEffect, useRef, useState } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// Components
import ExpenseForm from '../components/ExpenseForm';
import DatePicker from '../components/DatePicker';
import ExpenseRenderer from '../components/ExpenseRenderer';
import LogOut from '../components/LogOut';
import ViewHandler from '../components/ViewHandler';
import MonthPicker from '../components/MonthPicker';
import MonthExpenseRenderer from '../components/MonthExpenseRenderer';
// Utils
import ExpenseFormToggle from '../utils/ExpenseFormToggle';
// Global States
import { 
  activatePromptState,
  categoryToggleState,
  currentDateState,
  expensesArrayState,
  expensesState, 
  viewState} from '../store/ExpensesState';
// Services
import { expensesGetter } from '../services/ExpenseGetterService';

function Expenses() {
  const renderRef = useRef(true);

  const [activatePrompt,setActivatePrompt] = useAtom(activatePromptState);
  const [expenseData,setExpenseData] = useAtom(expensesState);
  const currentDate = useAtomValue(currentDateState);

  const setExpensesArray = useSetAtom(expensesArrayState);
  const setCategoryToggle = useSetAtom(categoryToggleState);

  // For view switch
  const view = useAtomValue(viewState);

  const navigator = useNavigate();

  const notify = () =>{
    toast.info("Please select the expense to be added", {
      position: "top-right"
    });
  };

  const addExpense = async() => {
    const form_validator = expenseData.exp_name !== "" && expenseData.exp_amt !== "" && expenseData.category !== "" && currentDate !== "";

    if (!form_validator) {
      notify();
      return
    } 
    try {
      const url = import.meta.env.VITE_EXPENSES_ADDER_URL;
      const options = {
        method: "POST", 
        mode: "cors", 
        cache: "no-cache", 
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer", 
        body: JSON.stringify({...expenseData,"date":currentDate})
      };
      const response = await fetch(url,options);
      if (!response.ok) {
        if (response.status === 401) navigator('/login');
        throw new Error("Error while adding expense");
      }

      const respJson = await response.json();
      console.log("respJson",respJson);

      toast.success("Expense Added", {
        position: "top-right"
      });
      setExpenseData({
        exp_name :'',
        exp_amt : 0.0,
        category : '',
        note : ''
      });
      setActivatePrompt(false);
      setCategoryToggle(false);
      // Call getter function to update the latest expenses
      expensesGetter(setExpensesArray,navigator);
    } catch (error) {
      toast.error("Error while adding expense", {
        position: "top-right"
      });
      console.error("Error while making api request",error);
    }
  }

  useEffect(()=>{
    if(renderRef.current){
      // Call getter function to update the latest expenses
      expensesGetter(setExpensesArray,navigator);
      renderRef.current = false;
    }
  },[])
  
  return (
    <>
      <div className='w-full min-h-screen flex flex-col justify-center items-center'>
        {/* Components */}
        <LogOut />
        <ViewHandler />
        { view === 'day'
          ? 
            (
              <>
                <DatePicker />
                <ExpenseRenderer />
                <ExpenseFormToggle addExpense={addExpense}/>
                { activatePrompt &&
                  <ExpenseForm/>
                }
              </>
            )
          :
          view === 'month'
          ?
            (
              <>
                <MonthPicker />
                <MonthExpenseRenderer />
              </>
            )
          :
          <></>
        }
      </div>
    </>
  )
}

export default Expenses