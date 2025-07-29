import { configureStore } from '@reduxjs/toolkit';
import localStorageMiddleware from '../utils/localStorage';
import { rootReducer, type PreloadedState } from './appState';

// загрузкa initialState из localStorage
const loadFromLocalStorage = (): PreloadedState | undefined => {
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) return undefined;
    return {
      todo: {
        tasks: JSON.parse(serializedState)
      }
    };
  } catch (e) {
    console.warn("Failed to load state from localStorage", e);
    return undefined;
  }
};

const preloadedState = loadFromLocalStorage();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

