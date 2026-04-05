const mockTransactions = [
  { id: 'tx-001', date: '2026-04-02', description: 'Received from Divyansh ^_^', amount: 10, category: 'Others', type: 'income' },
  { id: 'tx-002', date: '2026-04-02', description: 'Paid to Yash Automobiles', amount: 213, category: 'Others', type: 'expense' },

  { id: 'tx-003', date: '2026-03-31', description: 'Paid to ANKUSH GUPTA', amount: 5000, category: 'Others', type: 'expense' },
  { id: 'tx-004', date: '2026-03-31', description: 'Received from Divyansh ^_^', amount: 200, category: 'Others', type: 'income' },
  { id: 'tx-005', date: '2026-03-31', description: 'Paid to Gwalior Dugdha Sangh', amount: 213, category: 'Others', type: 'expense' },

  { id: 'tx-006', date: '2026-03-30', description: 'Paid to Kalyani Retail Mart', amount: 375, category: 'Others', type: 'expense' },
  { id: 'tx-007', date: '2026-03-27', description: 'Payment to Google', amount: 59, category: 'Others', type: 'expense' },

  { id: 'tx-008', date: '2026-03-25', description: 'Paid to Deepak Rao', amount: 190, category: 'Others', type: 'expense' },
  { id: 'tx-009', date: '2026-03-24', description: 'Paid to Deepak Savita', amount: 100, category: 'Others', type: 'expense' },
  { id: 'tx-010', date: '2026-03-24', description: 'Mobile Recharge Airtel', amount: 222, category: 'Others', type: 'expense' },

  { id: 'tx-011', date: '2026-03-23', description: 'Paid to Manas Pal', amount: 100, category: 'Others', type: 'expense' },
  { id: 'tx-012', date: '2026-03-22', description: 'Paid to Palak Agrawal', amount: 40, category: 'Others', type: 'expense' },

  { id: 'tx-013', date: '2026-03-21', description: 'Received from Papa', amount: 30000, category: 'Others', type: 'income' },
  { id: 'tx-014', date: '2026-03-21', description: 'Paid to Ram Shree Medical Store', amount: 270, category: 'Others', type: 'expense' },
  { id: 'tx-015', date: '2026-03-21', description: 'Paid to EASY TECH', amount: 150, category: 'Others', type: 'expense' },

  { id: 'tx-016', date: '2026-03-20', description: 'Paid to Petrol Pump', amount: 464, category: 'Others', type: 'expense' },

  { id: 'tx-017', date: '2026-03-15', description: 'Paid to Prem Mobile', amount: 150, category: 'Others', type: 'expense' },
  { id: 'tx-018', date: '2026-03-15', description: 'Paid to Gwalior Dugdha Sangh', amount: 227.86, category: 'Others', type: 'expense' },

  { id: 'tx-019', date: '2026-03-14', description: 'Received from ******0044', amount: 700, category: 'Others', type: 'income' },
  { id: 'tx-020', date: '2026-03-14', description: 'Paid to Ratan Das Dairy', amount: 1400, category: 'Others', type: 'expense' },
  { id: 'tx-021', date: '2026-03-14', description: 'Paid to Deepak', amount: 50, category: 'Others', type: 'expense' },

  { id: 'tx-022', date: '2026-03-13', description: 'Paid to Kalyani Retail Mart', amount: 80, category: 'Others', type: 'expense' },
  { id: 'tx-023', date: '2026-03-13', description: 'Paid to Gwalior Poha', amount: 60, category: 'Others', type: 'expense' },

  { id: 'tx-024', date: '2026-03-11', description: 'Paid to Gwalior Dugdha Sangh', amount: 227.86, category: 'Others', type: 'expense' },
  { id: 'tx-025', date: '2026-03-11', description: 'Paid to Laxmi Chauhan', amount: 130, category: 'Others', type: 'expense' },

  { id: 'tx-026', date: '2026-03-10', description: 'Paid to Jitendra Verma', amount: 235, category: 'Others', type: 'expense' },
  { id: 'tx-027', date: '2026-03-10', description: 'Paid to Kushwah Patties Corner', amount: 60, category: 'Others', type: 'expense' },

  { id: 'tx-028', date: '2026-03-07', description: 'Received from Harsh Panth', amount: 20, category: 'Others', type: 'income' },
  { id: 'tx-029', date: '2026-03-07', description: 'Paid to Sunil Kumar', amount: 100, category: 'Others', type: 'expense' },
  { id: 'tx-030', date: '2026-03-07', description: 'Received from Papa', amount: 50000, category: 'Others', type: 'income' },
]

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
