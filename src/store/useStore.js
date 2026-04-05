import { create } from 'zustand';
import mockTransactions from '../data/mockTransactions';

// Load transactions from localStorage or fall back to mock data
function loadTransactions() {
  try {
    const saved = localStorage.getItem('nexfin-transactions');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn('Failed to load from localStorage:', e);
  }
  return mockTransactions;
}

// Save transactions to localStorage
function saveTransactions(transactions) {
  try {
    localStorage.setItem('nexfin-transactions', JSON.stringify(transactions));
  } catch (e) {
    console.warn('Failed to save to localStorage:', e);
  }
}

const useStore = create((set, get) => ({
  // ─── Transactions ───
  transactions: loadTransactions(),

  addTransaction: (transaction) => {
    set(state => {
      const updated = [transaction, ...state.transactions];
      saveTransactions(updated);
      return { transactions: updated };
    });
  },

  deleteTransaction: (id) => {
    set(state => {
      const updated = state.transactions.filter(tx => tx.id !== id);
      saveTransactions(updated);
      return { transactions: updated };
    });
  },

  resetTransactions: () => {
    saveTransactions(mockTransactions);
    set({ transactions: mockTransactions });
  },

  // ─── Role ───
  activeRole: 'admin', // 'viewer' | 'admin'

  setActiveRole: (role) => set({ activeRole: role }),

  // ─── Filters ───
  filters: {
    search: '',
    type: 'all', // 'all' | 'income' | 'expense'
    category: 'all',
    sortBy: 'date', // 'date' | 'amount'
    sortOrder: 'desc', // 'asc' | 'desc'
  },

  setFilter: (key, value) => {
    set(state => ({
      filters: { ...state.filters, [key]: value },
    }));
  },

  resetFilters: () => {
    set({
      filters: {
        search: '',
        type: 'all',
        category: 'all',
        sortBy: 'date',
        sortOrder: 'desc',
      },
    });
  },

  // ─── UI State ───
  darkMode: true,
  toggleDarkMode: () => set(state => ({ darkMode: !state.darkMode })),

  activeSection: 'overview', // 'overview' | 'transactions' | 'insights'
  setActiveSection: (section) => set({ activeSection: section }),

  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),

  // ─── Derived: Filtered Transactions ───
  getFilteredTransactions: () => {
    const { transactions, filters } = get();
    let result = [...transactions];

    // Search
    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(tx =>
        tx.description.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (filters.type !== 'all') {
      result = result.filter(tx => tx.type === filters.type);
    }

    // Category filter
    if (filters.category !== 'all') {
      result = result.filter(tx => tx.category === filters.category);
    }

    // Sort
    result.sort((a, b) => {
      let cmp = 0;
      if (filters.sortBy === 'date') {
        cmp = new Date(a.date) - new Date(b.date);
      } else {
        cmp = a.amount - b.amount;
      }
      return filters.sortOrder === 'desc' ? -cmp : cmp;
    });

    return result;
  },
}));

export default useStore;
