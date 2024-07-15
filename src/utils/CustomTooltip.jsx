import React from "react";
import { useAtomValue } from "jotai";
// Global States
import { 
  viewState } from "../store/ExpensesState";

const CustomTooltip = ({ active, payload, label }) => {
  const view = useAtomValue(viewState);
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip bg-gray-900 shadow-md rounded-md p-1 shadow-black">
          <p className="label">{`${view === 'month' ? `Date` : `Month` } : ${payload[0]?.payload?.payload?.exp_created}`}</p>
          <p className="desc">Amount : &#8377;{payload[0].value}</p>
        </div>
      );
    }
  
    return null;
};

export default CustomTooltip;