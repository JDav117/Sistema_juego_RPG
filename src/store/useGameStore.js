import { create } from 'zustand';
import worldMap from '../data/worldMap.json';

const useGameStore = create((set, get) => ({
  playerName: '',
  currentLocationId: 'entrada',

  setPlayerName: (name) => set({ playerName: name }),

  move: (direction) => {
    const { currentLocationId } = get();
    const currentRoom = worldMap.find((room) => room.id === currentLocationId);
    if (!currentRoom) return;

    const nextRoomId = currentRoom.direcciones[direction];
    if (nextRoomId) {
      set({ currentLocationId: nextRoomId });
    }
  },

  getCurrentRoom: () => {
    const { currentLocationId } = get();
    return worldMap.find((room) => room.id === currentLocationId);
  },

  resetGame: () => set({ playerName: '', currentLocationId: 'entrada' }),
}));

export default useGameStore;
