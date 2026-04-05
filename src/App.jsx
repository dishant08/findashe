import { useMemo } from 'react';
import useStore from './store/useStore';
import { computeTotalIncome, computeTotalExpenses, computeSavingsRate } from './utils/helpers';
import Navbar from './components/Navbar';
import SummaryCard from './components/SummaryCard';
import { BalanceTrendChart, SpendingBreakdownChart } from './components/Charts';
import TransactionTable from './components/TransactionTable';
import InsightsPanel from './components/InsightsPanel';
import Modal from './components/Modal';

function DashboardOverview() {
  const transactions = useStore(state => state.transactions);

  const totalIncome = useMemo(() => computeTotalIncome(transactions), [transactions]);
  const totalExpenses = useMemo(() => computeTotalExpenses(transactions), [transactions]);
  const balance = totalIncome - totalExpenses;
  const savingsRate = useMemo(() => computeSavingsRate(totalIncome, totalExpenses), [totalIncome, totalExpenses]);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
        <SummaryCard
          type="balance"
          label="Total Balance"
          value={balance}
          subtitle={`Net across ${transactions.length} transactions`}
          delay={0}
        />
        <SummaryCard
          type="income"
          label="Total Income"
          value={totalIncome}
          subtitle="All income sources"
          delay={80}
        />
        <SummaryCard
          type="expenses"
          label="Total Expenses"
          value={totalExpenses}
          subtitle="All spending categories"
          delay={160}
        />
        <SummaryCard
          type="savings"
          label="Savings Rate"
          value={savingsRate}
          subtitle={`${savingsRate >= 30 ? 'Healthy savings ✓' : 'Room to improve'}`}
          delay={240}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 dashboard-grid">
        <div className="lg:col-span-2">
          <BalanceTrendChart />
        </div>
        <div>
          <SpendingBreakdownChart />
        </div>
      </div>
    </div>
  );
}

function TransactionsSection() {
  return <TransactionTable />;
}

function InsightsSection() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
          Financial Insights
        </h2>
        <p className="data-label mt-1" style={{ fontFamily: 'var(--font-mono)' }}>
          AI-powered analysis of your finances
        </p>
      </div>
      <InsightsPanel />
    </div>
  );
}

export default function App() {
  const { darkMode, activeSection } = useStore();

  return (
    <div className={darkMode ? '' : 'light-mode'}>
      <div className="min-h-screen bg-[var(--color-void)] grid-texture">
        <Navbar />

        <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6 animate-fade-down">
            <div className="w-1 h-6 bg-[var(--color-cyan)]" />
            <h1
              className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text-primary)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {activeSection === 'overview' && 'Dashboard Overview'}
              {activeSection === 'transactions' && 'Transaction Ledger'}
              {activeSection === 'insights' && 'Financial Insights'}
            </h1>
            <div className="flex-1 h-px bg-gradient-to-r from-[var(--color-border)] to-transparent" />
            <span className="text-[10px] text-[var(--color-text-muted)] tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
              {new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          </div>

          {/* Content */}
          <div key={activeSection} className="animate-fade-up">
            {activeSection === 'overview' && <DashboardOverview />}
            {activeSection === 'transactions' && <TransactionsSection />}
            {activeSection === 'insights' && <InsightsSection />}
          </div>
        </main>

        {/* Modal */}
        <Modal />

        {/* Footer */}
        <footer className="border-t border-[var(--color-border)] py-4 mt-12">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-[11px] text-[var(--color-text-muted)] tracking-wider" style={{ fontFamily: 'var(--font-mono)' }}>
              © 2025 NEXFIN — FINANCIAL DASHBOARD
            </span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-profit)] animate-pulse" />
              <span className="text-[11px] text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
                ALL SYSTEMS OPERATIONAL
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
