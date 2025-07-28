// localStorageMiddleware.ts
import type { Middleware } from '@reduxjs/toolkit';
import type { RootState } from './appState';

const localStorageMiddleware: Middleware<{}, RootState> = 
  (store) => 
  (next) => 
  (action) => {
    const result = next(action);
    
    if (typeof action === 'object' && action && 'type' in action && 
        typeof action.type === 'string' && 
        action.type.startsWith('todo/')) {
      const state = store.getState();
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('tasks', JSON.stringify(state.todo.tasks));
        }
      } catch (error) {
        console.error('Failed to save tasks to localStorage', error);
      }
    }
    
    return result;
};

export default localStorageMiddleware;


