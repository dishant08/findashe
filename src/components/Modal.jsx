import { useState } from 'react';
import useStore from '../store/useStore';
import { CATEGORIES } from '../data/mockTransactions';
import { generateId } from '../utils/helpers';
import { X as XIcon, Plus } from 'lucide-react';

export default function Modal() {
  const { isModalOpen, closeModal, addTransaction } = useStore();

  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    category: 'Food',
    type: 'expense',
  });
  const [errors, setErrors] = useState({});

  if (!isModalOpen) return null;

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.description.trim()) newErrors.description = 'Description is required';
    if (!form.amount || parseFloat(form.amount) <= 0) newErrors.amount = 'Valid amount is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    addTransaction({
      id: generateId(),
      date: form.date,
      description: form.description.trim(),
      amount: parseFloat(form.amount),
      category: form.category,
      type: form.type,
    });

    setForm({
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: '',
      category: 'Food',
      type: 'expense',
    });
    closeModal();
  };

  const inputClasses = (field) =>
    `w-full px-3 py-2.5 text-sm bg-[var(--color-elevated)] border ${
      errors[field] ? 'border-[var(--color-loss)]' : 'border-[var(--color-border)]'
    } text-[var(--color-text-primary)] outline-none focus:border-[var(--color-cyan)]/50 transition-colors`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center modal-backdrop animate-fade-in" onClick={closeModal}>
      <div
        className="w-full max-w-md bg-[var(--color-deep)] border border-[var(--color-border)] shadow-2xl animate-scale-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2">
            <Plus size={16} className="text-[var(--color-cyan)]" />
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
              New Transaction
            </h3>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-elevated)] transition-all"
          >
            <XIcon size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Type Toggle */}
          <div>
            <label className="data-label block mb-2" style={{ fontFamily: 'var(--font-mono)' }}>Type</label>
            <div className="grid grid-cols-2 gap-0">
              <button
                type="button"
                onClick={() => handleChange('type', 'expense')}
                className={`py-2.5 text-xs font-bold tracking-wider transition-all ${
                  form.type === 'expense'
                    ? 'bg-[var(--color-loss-glow)] text-[var(--color-loss)] border border-[var(--color-loss)]/30'
                    : 'bg-[var(--color-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
                }`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                EXPENSE
              </button>
              <button
                type="button"
                onClick={() => handleChange('type', 'income')}
                className={`py-2.5 text-xs font-bold tracking-wider transition-all ${
                  form.type === 'income'
                    ? 'bg-[var(--color-profit-glow)] text-[var(--color-profit)] border border-[var(--color-profit)]/30'
                    : 'bg-[var(--color-elevated)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
                }`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                INCOME
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="data-label block mb-2" style={{ fontFamily: 'var(--font-mono)' }}>Description</label>
            <input
              id="modal-description"
              type="text"
              value={form.description}
              onChange={e => handleChange('description', e.target.value)}
              placeholder="e.g. Monthly Salary, Uber Ride"
              className={inputClasses('description')}
              style={{ fontFamily: 'var(--font-mono)' }}
            />
            {errors.description && (
              <p className="text-[11px] text-[var(--color-loss)] mt-1" style={{ fontFamily: 'var(--font-mono)' }}>{errors.description}</p>
            )}
          </div>

          {/* Amount + Date Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="data-label block mb-2" style={{ fontFamily: 'var(--font-mono)' }}>Amount (₹)</label>
              <input
                id="modal-amount"
                type="number"
                value={form.amount}
                onChange={e => handleChange('amount', e.target.value)}
                placeholder="5000"
                min="1"
                className={inputClasses('amount')}
                style={{ fontFamily: 'var(--font-mono)' }}
              />
              {errors.amount && (
                <p className="text-[11px] text-[var(--color-loss)] mt-1" style={{ fontFamily: 'var(--font-mono)' }}>{errors.amount}</p>
              )}
            </div>
            <div>
              <label className="data-label block mb-2" style={{ fontFamily: 'var(--font-mono)' }}>Date</label>
              <input
                id="modal-date"
                type="date"
                value={form.date}
                onChange={e => handleChange('date', e.target.value)}
                className={inputClasses('date')}
                style={{ fontFamily: 'var(--font-mono)' }}
              />
              {errors.date && (
                <p className="text-[11px] text-[var(--color-loss)] mt-1" style={{ fontFamily: 'var(--font-mono)' }}>{errors.date}</p>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="data-label block mb-2" style={{ fontFamily: 'var(--font-mono)' }}>Category</label>
            <select
              id="modal-category"
              value={form.category}
              onChange={e => handleChange('category', e.target.value)}
              className={inputClasses('category')}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            id="modal-submit"
            className="w-full py-3 text-sm font-bold tracking-widest bg-[var(--color-cyan)] text-[var(--color-void)] hover:bg-[var(--color-cyan-dim)] transition-colors"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            ADD TRANSACTION
          </button>
        </form>
      </div>
    </div>
  );
}
