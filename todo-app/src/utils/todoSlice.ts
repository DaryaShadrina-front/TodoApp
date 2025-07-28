import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { generateId } from './helper';

export interface Task {
    id: string;
    text: string;
    createdAt: number;
    completed: boolean;
}

export interface ToDoState {
    tasks: Task[];
}

const initialState: ToDoState = {
    tasks: [],
};

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        createTask: (state, action: PayloadAction<string>) => {
            const newTask: Task = {
                id: generateId(),
                text: action.payload,
                createdAt: Date.now(),
                completed: false
            };
            state.tasks.unshift(newTask);
        },
        updateTask: (state, action: PayloadAction<{ id: string; text?: string; completed?: boolean }>) => {
            const { id, text, completed } = action.payload;
            const task = state.tasks.find(task => task.id === id);
            if (task) {
                if (text !== undefined) task.text = text;
                if (completed !== undefined) task.completed = completed;
            }
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
    },
});

export const { createTask, updateTask, removeTask } = todoSlice.actions;

export default todoSlice.reducer;


