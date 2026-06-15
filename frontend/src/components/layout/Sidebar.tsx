'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  GraduationCap,
  Code2,
  FolderKanban,
  MessageCircle,
  Trophy,
  Target,
  User,
  Flame,
  Star,
  ChevronLeft,
  ChevronRight,
  Mic,
  Menu,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { currentUser } from '@/lib/mock-data';
import { getXPProgress } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/tracks', label: 'Trilhas', icon: GraduationCap },
  { href: '/exercises', label: 'Exercícios', icon: Code2 },
  { href: '/projects', label: 'Projetos', icon: FolderKanban },
  { href: '/mentor', label: 'Mentor IA', icon: MessageCircle, badge: 'IA' },
  { href: '/interviews', label: 'Entrevistas', icon: Mic },
  { href: '/achievements', label: 'Conquistas', icon: Trophy },
  { href: '/ranking', label: 'Ranking', icon: Star },
  { href: '/goals', label: 'Metas', icon: Target },
  { href: '/profile', label: 'Perfil', icon: User },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--current-sidebar-width',
      collapsed ? '80px' : '260px'
    );
  }, [collapsed]);

  const xpProgress = getXPProgress(
    currentUser.totalXp,
    currentUser.currentLevelXp,
    currentUser.nextLevelXp
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Menu"
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''} ${mobileOpen ? 'sidebar-mobile-open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <Link href="/dashboard" className="sidebar-logo-link">
            <div className="sidebar-logo-icon">
              <svg width="24" height="24" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 20 C20 20, 20 80, 50 80 C80 80, 80 50, 50 50 C40 50, 40 40, 50 40" stroke="var(--accent-indigo)" strokeWidth="6" fill="none" strokeLinecap="round" />
                <ellipse cx="50" cy="50" rx="40" ry="15" transform="rotate(30 50 50)" stroke="var(--accent-purple)" strokeWidth="4" fill="none" />
                <ellipse cx="50" cy="50" rx="40" ry="15" transform="rotate(-30 50 50)" stroke="var(--accent-pink)" strokeWidth="4" fill="none" />
                <text x="50" y="55" fontSize="20" fill="var(--accent-green)" textAnchor="middle" fontWeight="bold">&lt; &gt;</text>
              </svg>
            </div>
            {!collapsed && (
              <div className="sidebar-logo-text">
                <span className="sidebar-logo-title">DEV</span>
                <span className="sidebar-logo-subtitle">GALÁXIAS</span>
              </div>
            )}
          </Link>
        </div>

        {/* User mini card */}
        <div className="sidebar-user">
          <div className="sidebar-avatar">
            <span>{currentUser.displayName[0]}</span>
          </div>
          {!collapsed && (
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">{currentUser.displayName}</span>
              <div className="sidebar-user-level">
                <Flame size={12} className="streak-icon" />
                <span>{currentUser.streak} dias</span>
                <span className="sidebar-user-dot">•</span>
                <span>Nível {currentUser.level}</span>
              </div>
              <div className="sidebar-xp-bar">
                <div
                  className="sidebar-xp-fill"
                  style={{ width: `${xpProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={20} />
                {!collapsed && (
                  <>
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="sidebar-badge">{item.badge}</span>
                    )}
                  </>
                )}
                {isActive && <div className="sidebar-active-indicator" />}
              </Link>
            );
          })}
        </nav>

        {/* Collapse button (desktop only) */}
        <button
          className="sidebar-collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? 'Expandir' : 'Recolher'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </aside>
    </>
  );
}
