import { Navigate } from 'react-router-dom';
import useGameStore from '../store/useGameStore';

export default function ProtectedRoute({ children }) {
  const playerName = useGameStore((state) => state.playerName);

  if (!playerName) {
    return <Navigate to="/" replace />;
  }

  return children;
}
