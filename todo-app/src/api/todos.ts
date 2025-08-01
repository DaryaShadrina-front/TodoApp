import axios from 'axios';
import type { FilterType } from '../hooks/useTodo';

const API_URL = '/api';

export const fetchTodos = async (page: number, limit: number, filter: FilterType) => {
    const response = await axios.get(`${API_URL}/todos`, {
        params: {
            page,
            limit,
            status: filter === 'all' ? undefined : filter
        }
    });
    return response.data;
};

export const addTodo = async (text: string) => {
    const response = await axios.post(`${API_URL}/todos`, { text });
    return response.data;
};

export const updateTodo = async (id: string, text: string, completed: boolean) => {
    const response = await axios.put(`${API_URL}/todos/${id}`, { text, completed });
    return response.data;
};

export const deleteTodo = async (id: string) => {
    const response = await axios.delete(`${API_URL}/todos/${id}`);
    return response.data;
};

export const toggleTodo = async (id: string) => {
    const response = await axios.patch(`${API_URL}/todos/${id}/toggle`);
    return response.data;
};
