import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatXP(xp: number): string {
  if (xp >= 1000000) return `${(xp / 1000000).toFixed(1)}M`;
  if (xp >= 1000) return `${(xp / 1000).toFixed(1)}K`;
  return xp.toString();
}

export function getXPProgress(currentXp: number, currentLevelXp: number, nextLevelXp: number): number {
  const range = nextLevelXp - currentLevelXp;
  const progress = currentXp - currentLevelXp;
  return Math.min(Math.max((progress / range) * 100, 0), 100);
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'easy': return 'badge-green';
    case 'medium': return 'badge-yellow';
    case 'hard': return 'badge-red';
    case 'expert': return 'badge-purple';
    default: return 'badge-blue';
  }
}

export function getDifficultyLabel(difficulty: string): string {
  switch (difficulty) {
    case 'easy': return 'Fácil';
    case 'medium': return 'Médio';
    case 'hard': return 'Difícil';
    case 'expert': return 'Especialista';
    default: return difficulty;
  }
}

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'common': return '#94a3b8';
    case 'rare': return '#3b82f6';
    case 'epic': return '#8b5cf6';
    case 'legendary': return '#f59e0b';
    case 'mythic': return '#ef4444';
    default: return '#94a3b8';
  }
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function timeAgo(date: string): string {
  const now = new Date();
  const then = new Date(date);
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diff < 60) return 'agora';
  if (diff < 3600) return `${Math.floor(diff / 60)}min`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return `${Math.floor(diff / 604800)}sem`;
}
