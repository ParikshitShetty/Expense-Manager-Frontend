import { useAtom } from 'jotai';
import React from 'react'
// Globals States
import { 
    viewState, } from '../store/ExpensesState';

function ViewHandler() {
    const [view, setView] = useAtom(viewState);
  return (
    <>
        <div className='w-2/3 sm:w-1/2 md:w-1/3 lg:w-1/4 my-5 text-lg font-semibold text-center rounded flex justify-evenly items-center'>
            <button onClick={() => setView('day')}
            className={`w-1/3 p-2 ${view === 'day' && 'bg-gray-100 text-gray-950 rounded-lg'}`}>
                Day</button>
            <button onClick={() => setView('month')}
            className={`w-1/3 p-2 ${view === 'month' && 'bg-gray-100 text-gray-950 rounded-lg'}`}>
                Month</button>
            <button onClick={() => setView('year')}
            className={`w-1/3 p-2 ${view === 'year' && 'bg-gray-100 text-gray-950 rounded-lg'}`}>
                Year</button>
        </div>
    </>
  )
}

export default ViewHandler