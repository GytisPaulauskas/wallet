import * as React from 'react';
import {
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import SouthIcon from '@mui/icons-material/South';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// savybės kurios buvo perduotos Item componentas jas reikia priiti ({title, date...})
// kai yra priimtos jas galime atvaizduoti jas pačioje kortelėje su skliaustais pvz {title}
const Item = ({
  date,
  amount,
  type,
  category,
  remove,
  update,
}) => (
  <Box
    sx={{
      bgcolor: '#ffffff',
      borderBottom: 1,
      borderColor: 'text.primary',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
  >
    <Box sx={{ ml: 2, mr: 2 }}>
      <SouthIcon sx={{ color: 'red' }} />
    </Box>
    <Typography align="left" sx={{ width: '10em' }}>{category}</Typography>
    <Typography>{date}</Typography>
    <Typography align="right" sx={{ width: '5em' }}>{`${type === 'expense' ? '-' : ' '}${amount} €`}</Typography>
    <Box sx={{ mr: 1, ml: 2 }}>
      <IconButton
        size="small"
        onClick={update}
      >
        <EditIcon sx={{ color: 'primary.main' }} />
      </IconButton>
      <IconButton
        size="small"
        onClick={remove}
      >
        <DeleteIcon sx={{ color: 'error.main' }} />
      </IconButton>
    </Box>
  </Box>
);
export default Item;
