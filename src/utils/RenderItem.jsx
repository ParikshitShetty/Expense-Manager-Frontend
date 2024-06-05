import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function RenderItem({ item , removeExpense, renderer,expenseEditor }) {
    return (
      <>
        <span className='w-full my-1 flex justify-evenly items-center overflow-x-clip'>
          <span className='w-1/2 h-full text-start first-letter:uppercase '>{renderer === 'expense_name' ? item.exp_name : item.exp_created}</span>
          <span className='w-1/2 h-full text-start '>&#8377; &nbsp;{item.exp_amt}</span>
          {
            renderer === 'expense_name' ?
            <>
              <IconButton
                edge="start"
                aria-label="edit"
                title="Edit"
                onClick={() => expenseEditor(item)}
              >
                <EditIcon sx={{
                  fill:'white'
                }}/>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                title="Delete"
                onClick={() => removeExpense(item)}
              >
                <DeleteIcon sx={{
                  fill:'white'
                }}/>
              </IconButton>
            </>
            :
            <></>
          }
        </span>
      </>    
    );
  }