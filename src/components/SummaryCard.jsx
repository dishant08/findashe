import { formatCurrency } from '../utils/helpers';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, Percent } from 'lucide-react';

const iconMap = {
  balance: Wallet,
  income: TrendingUp,
  expenses: TrendingDown,
  savings: Percent,
};

const accentMap = {
  balance: { color: 'var(--color-cyan)', glow: 'glow-cyan', bg: 'var(--color-cyan-glow)' },
  income: { color: 'var(--color-profit)', glow: 'glow-profit', bg: 'var(--color-profit-glow)' },
  expenses: { color: 'var(--color-loss)', glow: 'glow-loss', bg: 'var(--color-loss-glow)' },
  savings: { color: 'var(--color-amber)', glow: 'glow-amber', bg: 'var(--color-amber-glow)' },
};

export default function SummaryCard({ type, label, value, subtitle, delay = 0 }) {
  const Icon = iconMap[type];
  const accent = accentMap[type];
  const isPercent = type === 'savings';
  const displayValue = isPercent ? `${value}%` : formatCurrency(value);

  return (
    <div
      className="card p-5 relative overflow-hidden group animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-500 group-hover:h-[3px]"
        style={{ backgroundColor: accent.color }}
      />

      {/* Content */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="data-label"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {label}
        </div>
        <div
          className="w-9 h-9 flex items-center justify-center"
          style={{ backgroundColor: accent.bg }}
        >
          <Icon size={18} style={{ color: accent.color }} />
        </div>
      </div>

      <div
        className="text-2xl sm:text-3xl font-bold tracking-tight animate-count-up"
        style={{
          fontFamily: 'var(--font-mono)',
          color: accent.color,
          animationDelay: `${delay + 200}ms`,
        }}
      >
        {displayValue}
      </div>

      {subtitle && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
          {type === 'income' && <ArrowUpRight size={12} className="text-[var(--color-profit)]" />}
          {type === 'expenses' && <ArrowDownRight size={12} className="text-[var(--color-loss)]" />}
          {subtitle}
        </div>
      )}

      {/* Hover glow */}
      <div
        className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
        style={{ backgroundColor: accent.color }}
      />
    </div>
  );
}
