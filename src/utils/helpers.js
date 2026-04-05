/**
 * Format a number as Indian Rupee currency
 * Uses the Indian numbering system (lakhs, crores)
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format a date string to a readable format like "Mar 12, 2025"
 */
export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format a date string to month-year like "Jan 2025"
 */
export function formatMonthYear(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Get month key for grouping (e.g., "2025-01")
 */
export function getMonthKey(dateStr) {
  return dateStr.substring(0, 7);
}

/**
 * Compute total income from an array of transactions
 */
export function computeTotalIncome(transactions) {
  return transactions
    .filter(tx => tx.type === 'income')
    .reduce((sum, tx) => sum + tx.amount, 0);
}

/**
 * Compute total expenses from an array of transactions
 */
export function computeTotalExpenses(transactions) {
  return transactions
    .filter(tx => tx.type === 'expense')
    .reduce((sum, tx) => sum + tx.amount, 0);
}

/**
 * Compute savings rate percentage
 */
export function computeSavingsRate(income, expenses) {
  if (income === 0) return 0;
  return Math.round(((income - expenses) / income) * 100);
}

/**
 * Compute spending by category
 */
export function computeSpendingByCategory(transactions) {
  const categoryTotals = {};
  transactions
    .filter(tx => tx.type === 'expense')
    .forEach(tx => {
      categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + tx.amount;
    });
  return Object.entries(categoryTotals)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

/**
 * Compute monthly balance trend — shows cumulative
 */
export function computeBalanceTrend(transactions) {
  const monthlyData = {};

  // Sort by date
  const sorted = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  sorted.forEach(tx => {
    const key = getMonthKey(tx.date);
    if (!monthlyData[key]) {
      monthlyData[key] = { month: key, income: 0, expenses: 0 };
    }
    if (tx.type === 'income') {
      monthlyData[key].income += tx.amount;
    } else {
      monthlyData[key].expenses += tx.amount;
    }
  });

  let cumulativeBalance = 0;
  return Object.values(monthlyData).map(item => {
    cumulativeBalance += item.income - item.expenses;
    const date = new Date(item.month + '-01');
    return {
      month: date.toLocaleDateString('en-IN', { month: 'short' }),
      fullMonth: date.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }),
      income: item.income,
      expenses: item.expenses,
      balance: cumulativeBalance,
    };
  });
}

/**
 * Get insights from transactions
 */
export function computeInsights(transactions) {
  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));
  const months = [...new Set(sorted.map(tx => getMonthKey(tx.date)))].sort().reverse();

  const currentMonth = months[0] || '';
  const previousMonth = months[1] || '';

  const currentMonthTxns = transactions.filter(tx => getMonthKey(tx.date) === currentMonth);
  const previousMonthTxns = transactions.filter(tx => getMonthKey(tx.date) === previousMonth);

  const currentExpenses = computeTotalExpenses(currentMonthTxns);
  const previousExpenses = computeTotalExpenses(previousMonthTxns);

  const expenseChange = previousExpenses === 0
    ? 0
    : Math.round(((currentExpenses - previousExpenses) / previousExpenses) * 100);

  // Spending by category for current month
  const currentCategorySpending = computeSpendingByCategory(currentMonthTxns);
  const highestCategory = currentCategorySpending[0] || { name: 'N/A', value: 0 };

  // Biggest single expense
  const allExpenses = transactions.filter(tx => tx.type === 'expense');
  const biggestExpense = allExpenses.length > 0
    ? allExpenses.reduce((max, tx) => tx.amount > max.amount ? tx : max, allExpenses[0])
    : null;

  const totalIncome = computeTotalIncome(transactions);
  const totalExpenses = computeTotalExpenses(transactions);
  const savingsRate = computeSavingsRate(totalIncome, totalExpenses);

  // Generate text insight
  let textInsight = '';
  if (currentCategorySpending.length > 0) {
    const topCat = currentCategorySpending[0];
    if (expenseChange > 0) {
      textInsight = `You spent ${expenseChange}% more this month compared to last month. Your highest spending category is ${topCat.name} at ${formatCurrency(topCat.value)}.`;
    } else if (expenseChange < 0) {
      textInsight = `Great news! You reduced spending by ${Math.abs(expenseChange)}% this month. ${topCat.name} remains your top category at ${formatCurrency(topCat.value)}.`;
    } else {
      textInsight = `Your spending is consistent month-over-month. ${topCat.name} leads at ${formatCurrency(topCat.value)}.`;
    }
  }

  return {
    highestCategory,
    currentExpenses,
    previousExpenses,
    expenseChange,
    biggestExpense,
    savingsRate,
    totalIncome,
    totalExpenses,
    textInsight,
    currentMonth,
    previousMonth,
  };
}

/**
 * Generate a unique ID for new transactions
 */
export function generateId() {
  return 'tx-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 5);
}

/**
 * Convert transactions to CSV string
 */
export function transactionsToCSV(transactions) {
  const headers = ['Date', 'Description', 'Amount (₹)', 'Category', 'Type'];
  const rows = transactions.map(tx => [
    tx.date,
    `"${tx.description}"`,
    tx.amount,
    tx.category,
    tx.type,
  ]);
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

/**
 * Trigger a file download
 */
export function downloadFile(content, filename, mimeType = 'text/csv') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Chart color palette
export const CHART_COLORS = [
  '#00e5ff', // cyan
  '#ffab00', // amber
  '#00e676', // green
  '#ff1744', // red
  '#7c4dff', // purple
  '#ff6d00', // orange
  '#00bfa5', // teal
  '#f50057', // pink
];

// Category to icon mapping (emoji fallback)
export const CATEGORY_ICONS = {
  Salary: '💰',
  Freelance: '💼',
  Food: '🍕',
  Transport: '🚕',
  Shopping: '🛒',
  Bills: '📄',
  Entertainment: '🎬',
  Healthcare: '🏥',
};
