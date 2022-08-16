const serverAddress = 'http://localhost:8000';

const formatTransaction = ({
  id,
  amount,
  date,
  categoryId,
  category,
}) => ({
  id,
  amount,
  date,
  type: category.type,
  categoryId,
  category: category.title,
});

const fetchAll = async () => {
  const response = await fetch(`${serverAddress}/transactions?_expand=category`);
  const transactions = await response.json();

  return transactions.map(formatTransaction).reverse();
};

const createExpense = async (expenseProps) => {
  const response = await fetch(`${serverAddress}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(expenseProps),
  });

  const expense = await response.json();

  return expense;
};

const update = async (id, transactionsProps) => {
  const response = await fetch(`${serverAddress}/transactions/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transactionsProps),
  });

  const expense = await response.json();

  return expense;
};

const remove = async (id) => {
  await fetch(`${serverAddress}/transactions/${id}`, {
    method: 'DELETE',
  });

  return true;
};

const fetchExpensesCategories = async () => {
  const response = await fetch(`${serverAddress}/categories/?type=expense`);
  const categories = await response.json();

  return categories;
};

const TransactionsService = {
  fetchAll,
  remove,
  fetchExpensesCategories,
  update,
  createExpense,
};

export default TransactionsService;
