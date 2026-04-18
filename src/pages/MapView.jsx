import useGameStore from '../store/useGameStore';
import worldMap from '../data/worldMap.json';

const DIRECTION_ARROWS = {
  norte: '↑',
  sur: '↓',
  este: '→',
  oeste: '←',
};

export default function MapView() {
  const playerName = useGameStore((state) => state.playerName);
  const currentLocationId = useGameStore((state) => state.currentLocationId);

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-6">
        <h1
          className="text-3xl font-bold mb-1"
          style={{ color: 'var(--text-primary)' }}
        >
          🗺️ Mapa del Mundo
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Exploración de <strong>{playerName}</strong>
        </p>
      </div>

      <div className="grid gap-4">
        {worldMap.map((room) => {
          const isHere = room.id === currentLocationId;
          const connections = Object.entries(room.direcciones)
            .filter(([, target]) => target !== null)
            .map(([dir]) => `${DIRECTION_ARROWS[dir]} ${dir.charAt(0).toUpperCase() + dir.slice(1)}`);

          return (
            <div
              key={room.id}
              className="rounded-xl p-5 transition-all duration-300 relative"
              style={{
                backgroundColor: isHere ? 'var(--highlight-bg)' : 'var(--bg-card)',
                border: `2px solid ${isHere ? 'var(--highlight)' : 'var(--border)'}`,
                boxShadow: isHere ? '0 0 20px rgba(212, 160, 23, 0.2)' : 'none',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2
                      className="text-xl font-bold"
                      style={{ color: isHere ? 'var(--highlight)' : 'var(--text-primary)' }}
                    >
                      {room.nombre}
                    </h2>
                    {isHere && (
                      <span className="text-sm px-2 py-0.5 rounded-full font-semibold" style={{
                        backgroundColor: 'var(--highlight)',
                        color: '#1a1a2e',
                      }}>
                        🚩 ESTÁS AQUÍ
                      </span>
                    )}
                  </div>
                  <p
                    className="text-sm mb-3"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {room.descripcion}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {connections.map((conn) => (
                      <span
                        key={conn}
                        className="text-xs px-2 py-1 rounded-md font-medium"
                        style={{
                          backgroundColor: 'var(--bg-primary)',
                          color: 'var(--text-secondary)',
                          border: '1px solid var(--border)',
                        }}
                      >
                        {conn}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
