import React from 'react'
import { CircularProgress } from '@mui/material'

function ExpensesLoader() {
  return (
    <>
        <div className='w-full h-full inline-grid place-items-center bg-inherit
          absolute top-0 left-0 '>
            <CircularProgress color="secondary" size={45}/>
        </div>
    </>
  )
}

export default ExpensesLoader