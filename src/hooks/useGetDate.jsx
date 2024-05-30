

import React, { useEffect, useRef } from 'react'
import { useAtom } from 'jotai';
import { currentDateState } from '../state/ExpensesState';

function useGetDate() {
    const [currentDate,setCurrentDate] = useAtom(currentDateState);
    const renderRef = useRef(true);

    useEffect(()=>{
        if (currentDate === "" && renderRef.current) {       
            const dateObj = new Date();
            const paddedDay = dateObj.getDate().toString().padStart(2, "0");
            const paddedMonth = (dateObj.getMonth() + 1).toString().padStart(2,"0")
            const date = dateObj.getFullYear() + '-' + paddedMonth + '-' + paddedDay;

            setCurrentDate(date);
            renderRef.current = false;
        }
    },[]);
    return null
}

export default useGetDate