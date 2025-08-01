import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../store/store";
import { createTask, getTodos, removeTask, updateTask } from '../store/todoSlice';
import type { RootState } from "../store/appState";
import type { Task } from "../store/todoSlice";

export type FilterType = "active" | "completed" | "all";

interface UseTodoReturn {
    tasks: Task[];
    loading: boolean;
    error: string | null;
    totalPage: number;
    total: number;
    addTask: (text: string) => void;
    removeTask: (id: string) => void;
    updateTask: (task: { id: string; text: string; completed: boolean }) => void;
    getTodos: (params: { page: number; limit: number; filter: FilterType }) => void;
}

export const useTodo = (): UseTodoReturn => {
    const dispatch = useAppDispatch();
    const { 
        tasks, 
        loading, 
        error, 
        totalPage, 
        limit, 
        total 
    } = useSelector((state: RootState) => state.todo);

    const fetchTodos = (params: { page: number; limit: number; filter: FilterType }) => {
        dispatch(getTodos(params));
    };

    useEffect(() => {
        fetchTodos({ page: totalPage, limit, filter: 'all' });
    }, [dispatch, totalPage, limit]);

    return {
        tasks,
        loading: loading ?? false,
        error: error ?? null,
        totalPage,
        total,
        addTask: (text: string) => {
        if (text.trim()) {
            dispatch(createTask(text));
        }
        },
        removeTask: (id: string) => dispatch(removeTask(id)),
        updateTask: (task: { id: string; text: string; completed: boolean }) => {
        dispatch(updateTask(task));
        },
        getTodos: fetchTodos
    };
};