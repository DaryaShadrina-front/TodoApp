import { combineReducers } from '@reduxjs/toolkit';
import todoReducer, { type ToDoState} from './todoSlice';

export const rootReducer = combineReducers({
    todo: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export interface PreloadedState {
    todo?: ToDoState;
}