import React, { useEffect, useRef, useState } from 'react'
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// Components
import ExpenseForm from '../components/ExpenseForm';
import DatePicker from '../components/DatePicker';
import ExpenseRenderer from '../components/renderer/ExpenseRenderer';
import LogOut from '../components/LogOut';
import ViewHandler from '../components/ViewHandler';
import MonthPicker from '../components/MonthPicker';
import CommonExpenseRenderer from '../components/renderer/CommonExpenseRenderer';
import YearPicker from '../components/YearPicker';
import DaywiseRenderer from '../components/renderer/DaywiseRenderer';
// Utils
import ExpenseFormToggle from '../utils/ExpenseFormToggle';
// Global States
import { 
  activatePromptState,
  categoryToggleState,
  currentDateState,
  expenseIdState,
  expensesArrayState,
  expensesState, 
  viewState} from '../store/ExpensesState';
// Services
import { expensesGetter } from '../services/ExpenseGetterService';
import { editExpense } from '../services/ExpenseEditorService'

function Expenses() {
  const renderRef = useRef(true);

  const [expenseData,setExpenseData] = useAtom(expensesState);
  const currentDate = useAtomValue(currentDateState);

  const [expenseId,setExpenseId] = useAtom(expenseIdState);

  const setActivatePrompt = useSetAtom(activatePromptState);
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

  const updateExpense = async() =>{
    await editExpense(expenseData,currentDate,expenseId,setExpenseId,setExpenseData,setActivatePrompt,setCategoryToggle,toast,navigator)
    expensesGetter(setExpensesArray,navigator);
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
      <div className='w-full min-h-screen overflow-y-hidden flex flex-col justify-start items-center relative bg-inherit'>
        {/* Components */}
        <LogOut />
        <ViewHandler />
        { view === 'day'
          ? 
            (
              <>
                <DatePicker />
                <ExpenseRenderer />
                <ExpenseFormToggle addExpense={addExpense} updateExpense={updateExpense}/>
                <ExpenseForm/>
              </>
            )
          :
          view === 'month'
          ?
            (
              <>
                <MonthPicker />
                <CommonExpenseRenderer view={view} />
                <DaywiseRenderer view={view}/>
              </>
            )
          :
          view === 'year'
          &&
            (
              <>
                <YearPicker />
                <CommonExpenseRenderer view={view} />
                <DaywiseRenderer view={view}/>
              </>
            )
        }
      </div>
    </>
  )
}

export default Expenses