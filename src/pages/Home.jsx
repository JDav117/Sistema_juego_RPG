import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGameStore from '../store/useGameStore';

export default function Home() {
  const [name, setName] = useState('');
  const setPlayerName = useGameStore((state) => state.setPlayerName);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    setPlayerName(trimmed);
    navigate('/game');
  };

  return (
    <div
      className="w-full max-w-md rounded-xl shadow-2xl p-8 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border)',
      }}
    >
      <div className="text-center mb-6">
        <span className="text-5xl mb-3 block">🏰</span>
        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          Dungeon Navigator
        </h1>
        <p
          className="text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          Adéntrate en las profundidades de la cueva...
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="heroName"
            className="block text-sm font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Nombre del Héroe:
          </label>
          <input
            id="heroName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa tu nombre..."
            maxLength={20}
            className="w-full px-4 py-3 rounded-lg text-base outline-none transition-all duration-200 focus:ring-2"
            style={{
              backgroundColor: 'var(--bg-primary)',
              border: '2px solid var(--border)',
              color: 'var(--text-primary)',
              focusRingColor: 'var(--accent)',
            }}
          />
        </div>

        <button
          type="submit"
          disabled={!name.trim()}
          className="w-full py-3 rounded-lg font-bold text-base tracking-wide transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
          style={{
            backgroundColor: name.trim() ? 'var(--btn-primary)' : 'var(--btn-disabled)',
            color: name.trim() ? '#fff' : 'var(--btn-disabled-text)',
          }}
          onMouseEnter={(e) => {
            if (name.trim()) e.target.style.backgroundColor = 'var(--btn-primary-hover)';
          }}
          onMouseLeave={(e) => {
            if (name.trim()) e.target.style.backgroundColor = 'var(--btn-primary)';
          }}
        >
          ⚔️ Comenzar Aventura
        </button>
      </form>
    </div>
  );
}
