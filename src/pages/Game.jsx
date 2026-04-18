import useGameStore from '../store/useGameStore';
import worldMap from '../data/worldMap.json';

const DIRECTION_LABELS = {
  norte: { label: 'N', full: 'Norte' },
  sur: { label: 'S', full: 'Sur' },
  este: { label: 'E', full: 'Este' },
  oeste: { label: 'O', full: 'Oeste' },
};

const DIRECTION_LAYOUT = [
  [null, 'norte', null],
  ['oeste', null, 'este'],
  [null, 'sur', null],
];

export default function Game() {
  const playerName = useGameStore((state) => state.playerName);
  const currentLocationId = useGameStore((state) => state.currentLocationId);
  const move = useGameStore((state) => state.move);

  const currentRoom = worldMap.find((room) => room.id === currentLocationId);

  if (!currentRoom) return null;

  return (
    <div className="w-full max-w-lg text-center">
      <div
        className="rounded-xl shadow-2xl p-8 mb-6 transition-colors duration-300"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
        }}
      >
        <div className="mb-6">
          <p
            className="text-sm font-medium mb-1"
            style={{ color: 'var(--text-secondary)' }}
          >
            {playerName} se encuentra en:
          </p>
          <h1
            className="text-3xl font-bold mb-3"
            style={{ color: 'var(--accent)' }}
          >
            {currentRoom.nombre}
          </h1>
          <p
            className="text-base leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {currentRoom.descripcion}
          </p>
        </div>

        <div className="border-t pt-6" style={{ borderColor: 'var(--border)' }}>
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-4"
            style={{ color: 'var(--text-secondary)' }}
          >
            Elige una dirección
          </p>

          <div className="inline-grid grid-cols-3 gap-2">
            {DIRECTION_LAYOUT.flat().map((dir, idx) => {
              if (!dir) {
                return <div key={idx} className="w-14 h-14" />;
              }

              const info = DIRECTION_LABELS[dir];
              const isAvailable = currentRoom.direcciones[dir] !== null;

              return (
                <button
                  key={dir}
                  onClick={() => move(dir)}
                  disabled={!isAvailable}
                  title={isAvailable ? `Ir al ${info.full}` : `No hay salida al ${info.full}`}
                  className="w-14 h-14 rounded-lg font-bold text-lg transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
                  style={{
                    backgroundColor: isAvailable ? 'var(--btn-primary)' : 'var(--btn-disabled)',
                    color: isAvailable ? '#fff' : 'var(--btn-disabled-text)',
                  }}
                  onMouseEnter={(e) => {
                    if (isAvailable) e.target.style.backgroundColor = 'var(--btn-primary-hover)';
                  }}
                  onMouseLeave={(e) => {
                    if (isAvailable) e.target.style.backgroundColor = 'var(--btn-primary)';
                  }}
                >
                  {info.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
