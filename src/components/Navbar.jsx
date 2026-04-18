import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import useGameStore from '../store/useGameStore';
import worldMap from '../data/worldMap.json';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const playerName = useGameStore((state) => state.playerName);
  const currentLocationId = useGameStore((state) => state.currentLocationId);

  const currentRoom = worldMap.find((r) => r.id === currentLocationId);

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/game', label: 'Game' },
    { to: '/map', label: 'Map' },
  ];

  return (
    <nav
      className="flex items-center justify-between px-6 py-3 shadow-lg transition-colors duration-300"
      style={{ backgroundColor: 'var(--bg-nav)' }}
    >
      <div className="flex items-center gap-6">
        <span
          className="text-lg font-bold tracking-wide"
          style={{ color: 'var(--text-nav)' }}
        >
          ⚔️ Dungeon Navigator
        </span>

        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
                location.pathname === link.to
                  ? 'opacity-100'
                  : 'opacity-70 hover:opacity-100'
              }`}
              style={{ color: 'var(--text-nav)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        {playerName && (
          <span
            className="text-sm font-medium"
            style={{ color: 'var(--text-nav)' }}
          >
            {playerName}: <strong>[{currentRoom?.nombre}]</strong>
          </span>
        )}

        <button
          onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110 cursor-pointer"
          style={{
            backgroundColor: theme === 'dark' ? '#374151' : 'rgba(255,255,255,0.2)',
          }}
          title={theme === 'dark' ? 'Modo Pergamino' : 'Modo Calabozo'}
        >
          <span className="text-xl">
            {theme === 'dark' ? '🌙' : '☀️'}
          </span>
        </button>
      </div>
    </nav>
  );
}
