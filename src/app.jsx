import * as React from 'react';
import { Box, Modal, Button } from '@mui/material';
import ExpenseModal from './components/expenseModal';
import TransactionsService from './services/service';
import Item from './components/item';

const App = () => {
  const [transactions, setTransactions] = React.useState([]);
  const [expenseModalOpen, setExpenseModalOpen] = React.useState(false);
  const [editTransaction, setEditTransaction] = React.useState(null);

  const closeModal = () => {
    setExpenseModalOpen(false);
    setEditTransaction(null);
  };

  const expenseOpenModal = () => setExpenseModalOpen(true);

  const fetchAllTransactions = async () => {
    const fetchedTransactions = await TransactionsService.fetchAll();
    setTransactions(fetchedTransactions);
  };

  const createExpense = async (expenseProps) => {
    await TransactionsService.createExpense(expenseProps);
    await fetchAllTransactions();
    closeModal();
  };

  const removeTransaction = async (id) => {
    const transactionDeleted = await TransactionsService.remove(id);
    if (transactionDeleted) {
      const fetchedTransactions = await TransactionsService.fetchAll();
      setTransactions(fetchedTransactions);
    }
  };

  const editOneTransaction = (id) => {
    const foundTransaction = transactions.find((transaction) => transaction.id === id);
    setEditTransaction(foundTransaction);
    setExpenseModalOpen(true);
  };

  const updateTransaction = async (transactionsProps) => {
    await TransactionsService.update(editTransaction.id, transactionsProps);
    await fetchAllTransactions();
    closeModal();
  };

  const sum = transactions.map((bill) => bill.amount).reduce((acc, amount) => acc + amount, 0);

  React.useEffect(() => {
    (async () => {
      const fetchedTransactions = await TransactionsService.fetchAll();
      setTransactions(fetchedTransactions);
    })();
  }, []);

  return (
    <Box sx={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
    }}
    >
      <Box>
        <Box sx={{
          mb: 1,
          maxWidth: '80vh',
          maxHeight: '15vh',
          textAlign: 'center',
          bgcolor: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        >
          <Box sx={{ ml: 5 }}>
            <Button
              variant="contained"
              sx={{ ml: 2, fontSize: 24, bgcolor: 'error.main' }}
              onClick={expenseOpenModal}
            >
              Expense
            </Button>
            <Modal
              open={expenseModalOpen}
              onClose={closeModal}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <ExpenseModal
                  onSubmit={editTransaction ? updateTransaction : createExpense}
                  formTitle={editTransaction ? 'Edit Transaction' : 'Create New Transaction'}
                  submitText={editTransaction ? 'Edit' : 'Create'}
                  initValues={editTransaction}
                />
              </Box>
            </Modal>
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mr: 5,
            fontSize: 24,
          }}
          >
            <Box sx={{ mr: 2, color: 'error.main' }}>
              <Box>Expense</Box>
              <Box>{sum}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box>
          <Box sx={{
            MaxWidth: '80vh',
            MaxHeight: '60vh',
            textAlign: 'center',
            bgcolor: '#ffffff',
          }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: '101vh',
                position: 'relative',
                overflow: 'auto',
                maxHeight: '60vh',
                '& ul': { padding: 0 },
              }}
              subheader={<li />}
            >
              {transactions.map(({
                id,
                amount,
                date,
                type,
                category,
              }) => (
                <Item
                  key={id}
                  amount={amount}
                  date={date}
                  type={type}
                  category={category}
                  remove={() => removeTransaction(id)}
                  update={() => editOneTransaction(id)}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
