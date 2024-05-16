import * as React from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { Routes,Route } from 'react-router-dom'
import { ErrorBoundary } from "react-error-boundary";
// Routes
import Expenses from './routes/Expenses'
import Signup from './routes/Signup'
import Login from './routes/Login'
import NotFound from './routes/NotFound'
// Utils
import FallbackComponent from './utils/FallbackComponent';


function App() {
  return (
  <>
    <div className='min-h-screen w-screen bg-black text-white'>
    <ErrorBoundary 
      FallbackComponent={FallbackComponent}
      onReset={(details) => {
        // Reset the state of your app so the error doesn't happen again
      }}
    >
      <Routes>
        <Route path='/' element={<Expenses />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </ErrorBoundary>
    </div>
  </>
  )
}

export default App