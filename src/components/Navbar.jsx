import { useState } from 'react';
import useStore from '../store/useStore';
import { Sun, Moon, Shield, Eye, BarChart3, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { activeRole, setActiveRole, darkMode, toggleDarkMode, activeSection, setActiveSection } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: '◈' },
    { id: 'transactions', label: 'Transactions', icon: '◇' },
    { id: 'insights', label: 'Insights', icon: '◆' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-abyss)]/95 backdrop-blur-xl">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 flex items-center justify-center bg-[var(--color-cyan)] text-[var(--color-void)]">
                <BarChart3 size={18} strokeWidth={2.5} />
              </div>
              <span className="font-[var(--font-heading)] text-xl font-bold tracking-tight text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-heading)' }}>
                NEX<span className="text-[var(--color-cyan)]">FIN</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 border border-transparent
                  ${activeSection === item.id
                    ? 'text-[var(--color-cyan)] border-[var(--color-cyan)]/30 bg-[var(--color-cyan-glow)]'
                    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-elevated)]'
                  }`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span className="mr-2 opacity-60">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          {/* Right controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Role Switcher */}
            <div className="flex items-center gap-2 px-3 py-1.5 border border-[var(--color-border)] bg-[var(--color-surface)]">
              {activeRole === 'admin' ? (
                <Shield size={14} className="text-[var(--color-amber)]" />
              ) : (
                <Eye size={14} className="text-[var(--color-text-secondary)]" />
              )}
              <select
                id="role-switcher"
                value={activeRole}
                onChange={e => setActiveRole(e.target.value)}
                className="bg-transparent text-xs font-medium text-[var(--color-text-primary)] outline-none cursor-pointer"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <option value="admin" className="bg-[var(--color-surface)] text-[var(--color-text-primary)]">ADMIN</option>
                <option value="viewer" className="bg-[var(--color-surface)] text-[var(--color-text-primary)]">VIEWER</option>
              </select>
            </div>

            {/* Role Indicator */}
            <div className={`px-2 py-1 text-[10px] font-bold tracking-widest uppercase ${
              activeRole === 'admin'
                ? 'bg-[var(--color-amber-glow)] text-[var(--color-amber)] border border-[var(--color-amber)]/30'
                : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
            }`}
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {activeRole === 'admin' ? '● ADMIN' : '○ VIEWER'}
            </div>

            {/* Dark Mode Toggle */}
            <button
              id="dark-mode-toggle"
              onClick={toggleDarkMode}
              className="p-2 border border-[var(--color-border)] hover:border-[var(--color-border-light)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all duration-200 bg-[var(--color-surface)]"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[var(--color-text-secondary)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-abyss)] animate-fade-down">
          <div className="px-4 py-3 space-y-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id); setMobileMenuOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'text-[var(--color-cyan)] bg-[var(--color-cyan-glow)] border-l-2 border-[var(--color-cyan)]'
                    : 'text-[var(--color-text-secondary)]'
                }`}
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <span className="mr-2">{item.icon}</span>{item.label}
              </button>
            ))}
            <div className="flex items-center gap-3 pt-3 border-t border-[var(--color-border)]">
              <select
                value={activeRole}
                onChange={e => setActiveRole(e.target.value)}
                className="flex-1 bg-[var(--color-surface)] text-xs text-[var(--color-text-primary)] border border-[var(--color-border)] px-3 py-2 outline-none"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <option value="admin">ADMIN</option>
                <option value="viewer">VIEWER</option>
              </select>
              <button
                onClick={toggleDarkMode}
                className="p-2 border border-[var(--color-border)] text-[var(--color-text-secondary)] bg-[var(--color-surface)]"
              >
                {darkMode ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
