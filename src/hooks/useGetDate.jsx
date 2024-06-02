

import React, { useEffect, useRef } from 'react'
import { useSetAtom } from 'jotai';
// Global state
import { 
    currentDateState,
    currentMonthState, } from '../store/ExpensesState';

function useGetDate() {
    const setCurrentDate = useSetAtom(currentDateState);
    const setCurrentMonthDate = useSetAtom(currentMonthState);
    const renderRef = useRef(true);

    useEffect(()=>{
        if (renderRef.current) {       
            const dateObj = new Date();
            const paddedDay = dateObj.getDate().toString().padStart(2, "0");
            const paddedMonth = (dateObj.getMonth() + 1).toString().padStart(2,"0")
            const date = dateObj.getFullYear() + '-' + paddedMonth + '-' + paddedDay;
            
            setCurrentDate(date);
            setCurrentMonthDate(date);
            renderRef.current = false;
        }
    },[]);
    return null
}

export default useGetDate