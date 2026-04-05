import { useMemo } from 'react';
import useStore from '../store/useStore';
import { computeInsights, formatCurrency, formatMonthYear, CATEGORY_ICONS } from '../utils/helpers';
import { TrendingUp, TrendingDown, Zap, AlertTriangle, PiggyBank, MessageSquare } from 'lucide-react';

export default function InsightsPanel() {
  const transactions = useStore(state => state.transactions);
  const insights = useMemo(() => computeInsights(transactions), [transactions]);

  const {
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
  } = insights;

  const expenseChangePositive = expenseChange > 0;

  return (
    <div className="space-y-4 animate-fade-up" style={{ animationDelay: '150ms' }}>
      {/* AI-generated insight banner */}
      <div className="card p-5 border-l-2 border-l-[var(--color-cyan)]">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 w-8 h-8 flex items-center justify-center bg-[var(--color-cyan-glow)] shrink-0">
            <MessageSquare size={16} className="text-[var(--color-cyan)]" />
          </div>
          <div>
            <div className="data-label mb-2" style={{ fontFamily: 'var(--font-mono)' }}>AI Insight</div>
            <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">
              {textInsight || 'Add more transactions to generate insights.'}
            </p>
          </div>
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 stagger-children">
        {/* Highest Spending Category */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={14} className="text-[var(--color-amber)]" />
            <span className="data-label" style={{ fontFamily: 'var(--font-mono)' }}>Top Category</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{CATEGORY_ICONS[highestCategory.name] || '📊'}</span>
            <div>
              <div className="text-base font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                {highestCategory.name}
              </div>
              <div className="text-sm font-semibold text-[var(--color-amber)]" style={{ fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(highestCategory.value)}
              </div>
            </div>
          </div>
        </div>

        {/* Month-over-Month Comparison */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            {expenseChangePositive ? (
              <TrendingUp size={14} className="text-[var(--color-loss)]" />
            ) : (
              <TrendingDown size={14} className="text-[var(--color-profit)]" />
            )}
            <span className="data-label" style={{ fontFamily: 'var(--font-mono)' }}>MoM Change</span>
          </div>
          <div className={`text-2xl font-bold mb-1 ${
            expenseChangePositive ? 'text-[var(--color-loss)]' : 'text-[var(--color-profit)]'
          }`} style={{ fontFamily: 'var(--font-mono)' }}>
            {expenseChangePositive ? '+' : ''}{expenseChange}%
          </div>
          <div className="text-xs text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
            {formatCurrency(previousExpenses)} → {formatCurrency(currentExpenses)}
          </div>
        </div>

        {/* Biggest Single Expense */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle size={14} className="text-[var(--color-loss)]" />
            <span className="data-label" style={{ fontFamily: 'var(--font-mono)' }}>Biggest Expense</span>
          </div>
          {biggestExpense ? (
            <>
              <div className="text-sm text-[var(--color-text-primary)] mb-1 truncate">
                {biggestExpense.description}
              </div>
              <div className="text-lg font-bold text-[var(--color-loss)]" style={{ fontFamily: 'var(--font-mono)' }}>
                {formatCurrency(biggestExpense.amount)}
              </div>
            </>
          ) : (
            <div className="text-sm text-[var(--color-text-muted)]">No expenses recorded</div>
          )}
        </div>

        {/* Savings Rate */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <PiggyBank size={14} className="text-[var(--color-profit)]" />
            <span className="data-label" style={{ fontFamily: 'var(--font-mono)' }}>Savings Rate</span>
          </div>
          <div className="text-2xl font-bold text-[var(--color-profit)] mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
            {savingsRate}%
          </div>
          <div className="progress-bar-track h-2.5">
            <div
              className="progress-bar-fill h-full bg-gradient-to-r from-[var(--color-profit)] to-[var(--color-cyan)]"
              style={{ width: `${Math.max(0, Math.min(100, savingsRate))}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
            <span>0%</span>
            <span>SAVED: {formatCurrency(totalIncome - totalExpenses)}</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="card p-5">
        <div className="data-label mb-4" style={{ fontFamily: 'var(--font-mono)' }}>Financial Summary</div>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-[var(--color-border)]/50">
            <span className="text-sm text-[var(--color-text-secondary)]">Total Income</span>
            <span className="text-sm font-bold text-[var(--color-profit)]" style={{ fontFamily: 'var(--font-mono)' }}>
              {formatCurrency(totalIncome)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-[var(--color-border)]/50">
            <span className="text-sm text-[var(--color-text-secondary)]">Total Expenses</span>
            <span className="text-sm font-bold text-[var(--color-loss)]" style={{ fontFamily: 'var(--font-mono)' }}>
              {formatCurrency(totalExpenses)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-sm text-[var(--color-text-secondary)] font-medium">Net Savings</span>
            <span className="text-sm font-bold text-[var(--color-cyan)]" style={{ fontFamily: 'var(--font-mono)' }}>
              {formatCurrency(totalIncome - totalExpenses)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
