import * as React from 'react';
import {
  Paper,
  Typography,
  TextField,
  Box,
  MenuItem,
  Button,
} from '@mui/material';
import TransactionsService from '../services/service';

const ExpenseModal = ({
  onSubmit,
  formTitle,
  submitText,
  initValues,

}) => {
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState(initValues?.categoryId ?? '');
  const [amount, setAmount] = React.useState(initValues?.amount ?? '');
  const [date, setDate] = React.useState(initValues?.date ?? '');

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit({
      categoryId: category,
      amount: Number(amount),
      date,
    });
  };

  React.useEffect(() => {
    (async () => {
      const fethedCategories = await TransactionsService.fetchExpensesCategories();
      setCategories(fethedCategories);
    })();
  }, []);

  return (

    <Paper component="form" onSubmit={handleSubmit}>
      <Box sx={{ px: 3, py: 5 }}>
        <Typography variant="h4">{formTitle}</Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          pt: 3,
        }}
        >
          <TextField
            label="Category"
            fullWidth
            select
            variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {categories.map(({ id, title }) => (
              <MenuItem key={id} value={id}>{title}</MenuItem>
            ))}
          </TextField>
          <TextField
            label="Amount"
            type="number"
            fullWidth
            variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
          <TextField
            label="Date"
            type="date"
            fullWidth
            variant="filled"
            InputLabelProps={{
              shrink: true,
            }}
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ alighn: 'center' }}
          >
            {submitText}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default ExpenseModal;
