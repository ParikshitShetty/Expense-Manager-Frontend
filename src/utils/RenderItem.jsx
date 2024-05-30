import { ListItem,ListItemText,IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';

export default function RenderItem({ item }) {
    return (
      <>
        <ListItem
          secondaryAction={
            <IconButton
              edge="end"
              aria-label="delete"
              title="Delete"
              // onClick={() => handleRemoveFruit(item)}
            >
              <DeleteIcon sx={{
                fill:'white'
              }}/>
            </IconButton>
          }
          className='w-full my-1 flex justify-evenly items-center '
        >
          <ListItemText primary={item.exp_name} className='w-1/3 text-center '/>
          &#8377; &nbsp;<ListItemText primary={item.exp_amt} className='w-1/3 '/>
        </ListItem>
      </>    
    );
  }