import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getFromStorage, removeFromStorage, saveToStorage } from '@repositories/storage';
import { Movie } from '@models/movie';

interface WatchlistStore {
    watchlist: Movie[];
    addToWatchlist: (movie: Movie) => void;
    removeFromWatchlist: (id: string) => void;
    clearWatchlist: () => void;
}

export const useWatchlistStore = create<WatchlistStore>()(
    persist(
        (set, get) => ({
            watchlist: [],
            addToWatchlist: movie => {
                const exists = get().watchlist.find(m => m.id === movie.id);
                if (!exists) {
                    set({ watchlist: [...get().watchlist, movie] });
                }
            },
            removeFromWatchlist: id => {
                set({ watchlist: get().watchlist.filter(m => m.id !== id) });
            },
            clearWatchlist: () => {
                set({ watchlist: [] });
            },
        }),
        {
            name: 'watchlist-storage', // key in AsyncStorage
            storage: {
                getItem: async <T>(key: string) => {
                    return getFromStorage<T>(key);
                },
                setItem: async (name, value) => {
                    await saveToStorage(name, value);
                },
                removeItem: async name => {
                    await removeFromStorage(name);
                },
            },
        }
    )
);
