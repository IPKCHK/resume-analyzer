import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            token: null,
            user: null,
            // Call this on login
            setAuth: (token, user) => set({ token, user }),
            // Call this on logout
            logout: () => set({ token: null, user: null }),
        }),
        {
            name: 'auth-storage', // The key used in localStorage
        }
    )
);