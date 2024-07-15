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
import ExpensesLoader from '../components/ui/ExpensesLoader';
// Global States
import { 
  activatePromptState,
  categoryToggleState,
  currentDateState,
  expenseGetterLoaderState,
  expenseIdState,
  expensesArrayState,
  expensesState, 
  logoutLoadingState, 
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

  const setLoading = useSetAtom(expenseGetterLoaderState);
  const [initLoading,setInitLoading] = useState(false);

  const logoutLoading = useAtomValue(logoutLoadingState);

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
      setLoading(true);
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
      await expensesGetter(setExpensesArray,navigator);
    } catch (error) {
      toast.error("Error while adding expense", {
        position: "top-right"
      });
      console.error("Error while making api request",error);
    }finally{
      setLoading(false);
    }
  }

  const updateExpense = async() =>{
    try {
      setLoading(true);
      await editExpense(expenseData,currentDate,expenseId,setExpenseId,setExpenseData,setActivatePrompt,setCategoryToggle,toast,navigator)
      await expensesGetter(setExpensesArray,navigator);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error while updating expense: ",error)
    }
  }

  const firstExpenseGetter = async() => {
    setInitLoading(true);
    await expensesGetter(setExpensesArray,navigator);
    setInitLoading(false);
  }

  useEffect(()=>{
    if(renderRef.current){
      // Call getter function to update the latest expenses
      firstExpenseGetter();
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
        {/* Loader for logout */}
        { logoutLoading && (
          <ExpensesLoader size={50} color={'inherit'}> 
            <span className=' text-white absolute top-[40%] font-semibold text-xl'>Signing you Out</span>
          </ExpensesLoader>
        )}
        {/* Loader for Fetching Data initially */}
        { initLoading && (
          <ExpensesLoader size={50} color={'inherit'}> 
            <span className=' text-white absolute top-[40%] font-semibold text-xl'>Fetching Data</span>
          </ExpensesLoader>
        )}

      </div>
    </>
  )
}

export default Expenses