import { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { computeBalanceTrend, computeSpendingByCategory, formatCurrency, CHART_COLORS } from '../utils/helpers';
import useStore from '../store/useStore';

/* ═══════════════════════════════════
   Custom Tooltip for Area Chart
   ═══════════════════════════════════ */
function BalanceTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0]?.payload;
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-3 shadow-xl"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <div className="text-xs text-[var(--color-text-muted)] mb-2 uppercase tracking-wider">{data?.fullMonth || label}</div>
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 bg-[var(--color-profit)]" />
          <span className="text-[var(--color-text-secondary)]">Income:</span>
          <span className="text-[var(--color-profit)] font-medium">{formatCurrency(data?.income || 0)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 bg-[var(--color-loss)]" />
          <span className="text-[var(--color-text-secondary)]">Expenses:</span>
          <span className="text-[var(--color-loss)] font-medium">{formatCurrency(data?.expenses || 0)}</span>
        </div>
        <div className="flex items-center gap-2 text-xs pt-1 border-t border-[var(--color-border)]">
          <span className="w-2 h-2 bg-[var(--color-cyan)]" />
          <span className="text-[var(--color-text-secondary)]">Balance:</span>
          <span className="text-[var(--color-cyan)] font-bold">{formatCurrency(data?.balance || 0)}</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Custom Tooltip for Pie Chart
   ═══════════════════════════════════ */
function CategoryTooltip({ active, payload }) {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0];
  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] p-3 shadow-xl"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <div className="flex items-center gap-2 text-xs">
        <span className="w-3 h-3" style={{ backgroundColor: data.payload?.fill }} />
        <span className="text-[var(--color-text-primary)] font-medium">{data.name}</span>
      </div>
      <div className="text-sm font-bold text-[var(--color-cyan)] mt-1">
        {formatCurrency(data.value)}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Custom Legend for Pie
   ═══════════════════════════════════ */
function CustomLegend({ payload }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5 justify-center mt-2">
      {payload?.map((entry, index) => (
        <div key={index} className="flex items-center gap-1.5 text-[11px]" style={{ fontFamily: 'var(--font-mono)' }}>
          <span className="w-2.5 h-2.5" style={{ backgroundColor: entry.color }} />
          <span className="text-[var(--color-text-secondary)]">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════
   Balance Trend Chart
   ═══════════════════════════════════ */
export function BalanceTrendChart() {
  const transactions = useStore(state => state.transactions);
  const data = useMemo(() => computeBalanceTrend(transactions), [transactions]);

  return (
    <div className="card p-5 animate-fade-up" style={{ animationDelay: '300ms' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
            Balance Trend
          </h3>
          <p className="data-label mt-1" style={{ fontFamily: 'var(--font-mono)' }}>Last 3 months cumulative</p>
        </div>
        <div className="w-2 h-2 bg-[var(--color-cyan)] animate-pulse" />
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00e5ff" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#00e5ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00e676" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#00e676" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: 'var(--color-text-muted)', fontSize: 11, fontFamily: 'DM Mono' }}
              axisLine={{ stroke: 'var(--color-border)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'var(--color-text-muted)', fontSize: 11, fontFamily: 'DM Mono' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`}
              width={55}
            />
            <Tooltip content={<BalanceTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="#00e676"
              strokeWidth={1.5}
              fill="url(#incomeGradient)"
              dot={false}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#00e5ff"
              strokeWidth={2}
              fill="url(#balanceGradient)"
              dot={{ r: 4, fill: '#00e5ff', strokeWidth: 0 }}
              activeDot={{ r: 6, fill: '#00e5ff', stroke: 'var(--color-surface)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════
   Spending Breakdown Pie Chart
   ═══════════════════════════════════ */
export function SpendingBreakdownChart() {
  const transactions = useStore(state => state.transactions);
  const data = useMemo(() => computeSpendingByCategory(transactions), [transactions]);

  return (
    <div className="card p-5 animate-fade-up" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
            Spending Breakdown
          </h3>
          <p className="data-label mt-1" style={{ fontFamily: 'var(--font-mono)' }}>By category</p>
        </div>
        <div className="w-2 h-2 bg-[var(--color-amber)] animate-pulse" />
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              stroke="var(--color-surface)"
              strokeWidth={2}
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CategoryTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
