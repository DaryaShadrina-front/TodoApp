import { configureStore } from '@reduxjs/toolkit';
import localStorageMiddleware from '../utils/localStorage';
import { rootReducer, type PreloadedState } from './appState';
import { useDispatch } from 'react-redux';

// загрузкa initialState из localStorage
const loadFromLocalStorage = (): PreloadedState | undefined => {
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) return undefined;
    const tasks = JSON.parse(serializedState);
    return {
            todo: {
                tasks: tasks,
                totalPage: 1,
                limit: 10,
                loading: false,
                error: null,
                total: 0,
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
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;

