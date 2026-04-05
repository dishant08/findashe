import { useMemo } from 'react';
import useStore from '../store/useStore';
import { formatCurrency, formatDate, transactionsToCSV, downloadFile, CATEGORY_ICONS } from '../utils/helpers';
import { CATEGORIES } from '../data/mockTransactions';
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Trash2, Plus, Download, RotateCcw, FileX } from 'lucide-react';

export default function TransactionTable() {
  const {
    filters, setFilter, resetFilters,
    activeRole, deleteTransaction, openModal,
    getFilteredTransactions,
  } = useStore();

  const filteredTransactions = useMemo(() => getFilteredTransactions(), [
    useStore(s => s.transactions),
    useStore(s => s.filters),
  ]);

  const handleExportCSV = () => {
    const csv = transactionsToCSV(filteredTransactions);
    downloadFile(csv, `nexfin-transactions-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const toggleSort = (field) => {
    if (filters.sortBy === field) {
      setFilter('sortOrder', filters.sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setFilter('sortBy', field);
      setFilter('sortOrder', 'desc');
    }
  };

  const SortIcon = ({ field }) => {
    if (filters.sortBy !== field) return <ArrowUpDown size={12} className="opacity-30" />;
    return filters.sortOrder === 'desc'
      ? <ArrowDown size={12} className="text-[var(--color-cyan)]" />
      : <ArrowUp size={12} className="text-[var(--color-cyan)]" />;
  };

  return (
    <div className="card animate-fade-up" style={{ animationDelay: '100ms' }}>
      {/* Header */}
      <div className="p-5 border-b border-[var(--color-border)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
              Transactions
            </h2>
            <p className="data-label mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
              {filteredTransactions.length} records
            </p>
          </div>
          <div className="flex items-center gap-2">
            {activeRole === 'admin' && (
              <button
                id="add-transaction-btn"
                onClick={openModal}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-[var(--color-cyan)] text-[var(--color-void)] hover:bg-[var(--color-cyan-dim)] transition-colors"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <Plus size={14} />
                ADD
              </button>
            )}
            <button
              id="export-csv-btn"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-light)] transition-colors bg-[var(--color-surface)]"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <Download size={14} />
              CSV
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              id="search-input"
              type="text"
              placeholder="Search transactions..."
              value={filters.search}
              onChange={e => setFilter('search', e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm bg-[var(--color-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none focus:border-[var(--color-cyan)]/50 transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            />
          </div>
          <select
            id="type-filter"
            value={filters.type}
            onChange={e => setFilter('type', e.target.value)}
            className="px-3 py-2 text-xs bg-[var(--color-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-cyan)]/50 transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <option value="all">ALL TYPES</option>
            <option value="income">INCOME</option>
            <option value="expense">EXPENSE</option>
          </select>
          <select
            id="category-filter"
            value={filters.category}
            onChange={e => setFilter('category', e.target.value)}
            className="px-3 py-2 text-xs bg-[var(--color-elevated)] border border-[var(--color-border)] text-[var(--color-text-primary)] outline-none focus:border-[var(--color-cyan)]/50 transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <option value="all">ALL CATEGORIES</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c.toUpperCase()}</option>
            ))}
          </select>
          {(filters.search || filters.type !== 'all' || filters.category !== 'all') && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 px-3 py-2 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] border border-[var(--color-border)] bg-[var(--color-elevated)] transition-colors"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              <RotateCcw size={12} />
              RESET
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {filteredTransactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 animate-fade-in">
            <FileX size={48} className="text-[var(--color-text-muted)] mb-4" />
            <p className="text-sm text-[var(--color-text-secondary)] mb-1" style={{ fontFamily: 'var(--font-heading)' }}>
              No transactions found
            </p>
            <p className="text-xs text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
              Try adjusting your filters or search query
            </p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--color-border)]">
                <th className="text-left px-5 py-3">
                  <button onClick={() => toggleSort('date')} className="flex items-center gap-1.5 data-label hover:text-[var(--color-text-secondary)] transition-colors" style={{ fontFamily: 'var(--font-mono)' }}>
                    DATE <SortIcon field="date" />
                  </button>
                </th>
                <th className="text-left px-5 py-3 data-label" style={{ fontFamily: 'var(--font-mono)' }}>DESCRIPTION</th>
                <th className="text-left px-5 py-3 data-label" style={{ fontFamily: 'var(--font-mono)' }}>CATEGORY</th>
                <th className="text-right px-5 py-3">
                  <button onClick={() => toggleSort('amount')} className="flex items-center gap-1.5 data-label ml-auto hover:text-[var(--color-text-secondary)] transition-colors" style={{ fontFamily: 'var(--font-mono)' }}>
                    AMOUNT <SortIcon field="amount" />
                  </button>
                </th>
                {activeRole === 'admin' && (
                  <th className="text-center px-5 py-3 data-label" style={{ fontFamily: 'var(--font-mono)' }}>ACTION</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx, idx) => (
                <tr
                  key={tx.id}
                  className={`tx-row border-b border-[var(--color-border)]/50 animate-fade-up ${
                    tx.type === 'income'
                      ? 'border-l-2 border-l-[var(--color-profit)]/40'
                      : 'border-l-2 border-l-[var(--color-loss)]/40'
                  }`}
                  style={{ animationDelay: `${idx * 30}ms` }}
                >
                  <td className="px-5 py-3.5 text-xs text-[var(--color-text-muted)] whitespace-nowrap" style={{ fontFamily: 'var(--font-mono)' }}>
                    {formatDate(tx.date)}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="text-sm text-[var(--color-text-primary)]">{tx.description}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[11px] font-medium border border-[var(--color-border)] text-[var(--color-text-secondary)] bg-[var(--color-elevated)]"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      <span>{CATEGORY_ICONS[tx.category] || '•'}</span>
                      {tx.category}
                    </span>
                  </td>
                  <td className={`px-5 py-3.5 text-right text-sm font-semibold whitespace-nowrap ${
                    tx.type === 'income' ? 'text-[var(--color-profit)]' : 'text-[var(--color-loss)]'
                  }`} style={{ fontFamily: 'var(--font-mono)' }}>
                    {tx.type === 'income' ? '+' : '−'}{formatCurrency(tx.amount)}
                  </td>
                  {activeRole === 'admin' && (
                    <td className="px-5 py-3.5 text-center">
                      <button
                        onClick={() => deleteTransaction(tx.id)}
                        className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-loss)] hover:bg-[var(--color-loss-glow)] transition-all"
                        aria-label={`Delete transaction: ${tx.description}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
