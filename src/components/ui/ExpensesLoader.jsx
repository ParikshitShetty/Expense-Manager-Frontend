import React from 'react'
import { CircularProgress } from '@mui/material'

function ExpensesLoader({size,color,children}) {
  console.log("children",children)
  return (
    <>
        <div className='w-full h-full inline-grid place-items-center bg-inherit
          absolute top-0 left-0 '>
            {children}
            <CircularProgress color={color} size={size}/>
        </div>
    </>
  )
}

export default ExpensesLoader