// Mock transaction data — 30 realistic transactions across 3 months
const mockTransactions = [
  // ─── January 2025 ───
  { id: 'tx-001', date: '2025-01-05', description: 'Monthly Salary — TechCorp', amount: 85000, category: 'Salary', type: 'income' },
  { id: 'tx-002', date: '2025-01-07', description: 'Uber Ride to Airport', amount: 1250, category: 'Transport', type: 'expense' },
  { id: 'tx-003', date: '2025-01-10', description: 'Swiggy — Weekly Groceries', amount: 3400, category: 'Food', type: 'expense' },
  { id: 'tx-004', date: '2025-01-12', description: 'Netflix Subscription', amount: 649, category: 'Entertainment', type: 'expense' },
  { id: 'tx-005', date: '2025-01-15', description: 'Freelance — Logo Design', amount: 12000, category: 'Freelance', type: 'income' },
  { id: 'tx-006', date: '2025-01-18', description: 'Electricity Bill — Jan', amount: 2800, category: 'Bills', type: 'expense' },
  { id: 'tx-007', date: '2025-01-20', description: 'Amazon — Wireless Headphones', amount: 4999, category: 'Shopping', type: 'expense' },
  { id: 'tx-008', date: '2025-01-22', description: 'Dentist Checkup — Apollo', amount: 1500, category: 'Healthcare', type: 'expense' },
  { id: 'tx-009', date: '2025-01-25', description: 'Metro Card Recharge', amount: 500, category: 'Transport', type: 'expense' },
  { id: 'tx-010', date: '2025-01-28', description: 'Zomato — Dinner Order', amount: 850, category: 'Food', type: 'expense' },

  // ─── February 2025 ───
  { id: 'tx-011', date: '2025-02-05', description: 'Monthly Salary — TechCorp', amount: 85000, category: 'Salary', type: 'income' },
  { id: 'tx-012', date: '2025-02-06', description: 'Mobile Recharge — Airtel', amount: 599, category: 'Bills', type: 'expense' },
  { id: 'tx-013', date: '2025-02-08', description: 'BigBasket — Monthly Groceries', amount: 5200, category: 'Food', type: 'expense' },
  { id: 'tx-014', date: '2025-02-10', description: 'Spotify Premium', amount: 119, category: 'Entertainment', type: 'expense' },
  { id: 'tx-015', date: '2025-02-12', description: 'Ola Cab — Office Commute', amount: 680, category: 'Transport', type: 'expense' },
  { id: 'tx-016', date: '2025-02-14', description: 'Valentine Dinner — Olive Garden', amount: 3200, category: 'Food', type: 'expense' },
  { id: 'tx-017', date: '2025-02-18', description: 'Freelance — Website Redesign', amount: 25000, category: 'Freelance', type: 'income' },
  { id: 'tx-018', date: '2025-02-20', description: 'Internet Bill — Airtel Fiber', amount: 1199, category: 'Bills', type: 'expense' },
  { id: 'tx-019', date: '2025-02-22', description: 'Myntra — Winter Jacket', amount: 3499, category: 'Shopping', type: 'expense' },
  { id: 'tx-020', date: '2025-02-25', description: 'Pharmacy — Medicines', amount: 780, category: 'Healthcare', type: 'expense' },

  // ─── March 2025 ───
  { id: 'tx-021', date: '2025-03-05', description: 'Monthly Salary — TechCorp', amount: 85000, category: 'Salary', type: 'income' },
  { id: 'tx-022', date: '2025-03-07', description: 'Petrol — Bike', amount: 1100, category: 'Transport', type: 'expense' },
  { id: 'tx-023', date: '2025-03-09', description: 'Dominos — Team Party', amount: 2400, category: 'Food', type: 'expense' },
  { id: 'tx-024', date: '2025-03-11', description: 'Disney+ Hotstar — Annual', amount: 1499, category: 'Entertainment', type: 'expense' },
  { id: 'tx-025', date: '2025-03-13', description: 'Electricity Bill — Mar', amount: 3100, category: 'Bills', type: 'expense' },
  { id: 'tx-026', date: '2025-03-15', description: 'Freelance — UI Illustrations', amount: 8000, category: 'Freelance', type: 'income' },
  { id: 'tx-027', date: '2025-03-18', description: 'Flipkart — Mechanical Keyboard', amount: 6999, category: 'Shopping', type: 'expense' },
  { id: 'tx-028', date: '2025-03-20', description: 'Eye Checkup — Max Hospital', amount: 2000, category: 'Healthcare', type: 'expense' },
  { id: 'tx-029', date: '2025-03-23', description: 'Uber Pool — Weekend Trip', amount: 450, category: 'Transport', type: 'expense' },
  { id: 'tx-030', date: '2025-03-25', description: 'Cafe Coffee Day — Client Meet', amount: 620, category: 'Food', type: 'expense' },
];

export const CATEGORIES = ['Salary', 'Freelance', 'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Healthcare'];
export const EXPENSE_CATEGORIES = CATEGORIES.filter(c => c !== 'Salary' && c !== 'Freelance');

export default mockTransactions;
