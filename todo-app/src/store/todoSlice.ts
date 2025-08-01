import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from '../api/todos';
import type { FilterType } from '../hooks/useTodo';

export interface Task {
    id: string;
    text: string;
    createdAt: number;
    completed: boolean;
}

export interface ToDoState {
    tasks: Task[];
    totalPage: number;
    total: number;
    limit: number;
    loading: boolean;
    error: string | null;
}

const initialState: ToDoState = {
    tasks: [],
    totalPage: 1,
    limit: 10,
    loading: false,
    error: null,
    total: 0,
};

// Общая функция для обработки ошибок
const handleAsyncError = (state: ToDoState, action: any, defaultMessage: string) => {
    state.loading = false;
    state.error = action.error.message || 
                action.payload?.message || 
                defaultMessage;
    console.error('Error:', action.error || action.payload);
};

export const getTodos = createAsyncThunk(
    'todos/getTodos', 
    async (params: { page: number; limit: number; filter: FilterType }, { rejectWithValue }) => {
        try {
            const response = await fetchTodos(params.page, params.limit, params.filter);
            if (!response.data) throw new Error('Invalid response structure');
            return response;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch todos');
        }
    }
);

export const createTask = createAsyncThunk(
    'todos/createTask', 
    async (text: string, { rejectWithValue }) => {
        try {
            if (!text.trim()) throw new Error('Task text cannot be empty');
            const response = await addTodo(text);
            if (!response.id) throw new Error('Invalid task creation response');
            return response;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to create task');
        }
    }
);

export const updateTask = createAsyncThunk(
    'todos/updateTask', 
    async ({ id, text, completed }: { id: string; text: string; completed: boolean }, { rejectWithValue }) => {
        try {
            if (!id) throw new Error('Task ID is required');
            const response = await updateTodo(id, text, completed);
            if (!response.id) throw new Error('Invalid update response');
            return response;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to update task');
        }
    }
);

export const removeTask = createAsyncThunk(
    'todos/removeTask', 
    async (id: string, { rejectWithValue }) => {
        try {
            if (!id) throw new Error('Task ID is required');
            await deleteTodo(id);
            return id;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete task');
        }
    }
);

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setCurrentPage(state, action) {
            if (typeof action.payload === 'number' && action.payload > 0) {
                state.totalPage = action.payload;
            }
        },
        setLimit(state, action) {
            if (typeof action.payload === 'number' && action.payload > 0) {
                state.limit = action.payload;
            }
        },
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Обработка getTodos
            .addCase(getTodos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload.data || [];
                state.total = action.payload.total || 0;
                state.totalPage = action.payload.page || 1;
            })
            .addCase(getTodos.rejected, (state, action) => {
                handleAsyncError(state, action, 'Failed to fetch todos');
            })
            
            // Обработка createTask
            .addCase(createTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.tasks.unshift(action.payload);
                    state.total += 1;
                }
            })
            .addCase(createTask.rejected, (state, action) => {
                handleAsyncError(state, action, 'Failed to create task');
            })
            
            // Обработка updateTask
            .addCase(updateTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    const index = state.tasks.findIndex(task => task.id === action.payload.id);
                    if (index !== -1) {
                        state.tasks[index] = action.payload;
                    }
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                handleAsyncError(state, action, 'Failed to update task');
            })
            
            // Обработка removeTask
            .addCase(removeTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
                state.total = Math.max(0, state.total - 1);
            })
            .addCase(removeTask.rejected, (state, action) => {
                handleAsyncError(state, action, 'Failed to delete task');
            });
    },
});

export const { setCurrentPage, setLimit, clearError } = todoSlice.actions;

export default todoSlice.reducer;

