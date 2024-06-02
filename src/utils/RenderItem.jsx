import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

export default function RenderItem({ item , removeExpense }) {
    return (
      <>
        <span className='w-full my-1 flex justify-evenly items-center '>
          <span className='w-1/2 h-full text-start '>{item.exp_name}</span>
          <span className='w-1/2 h-full text-start '>&#8377; &nbsp;{item.exp_amt}</span>
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
        </span>
      </>    
    );
  }