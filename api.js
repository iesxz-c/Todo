import axios from 'axios';

const API_URL = 'https://web-production-4da0.up.railway.app'; 

export const fetchTodos = async () => {
    const response = await axios.get(`${API_URL}/todos/`);
    return response.data;
};

export const createTodo = async (todo) => {
    const response = await axios.post(`${API_URL}/todos/`, todo);
    return response.data;
};

export const updateTodo = async (id, todo) => {
    const response = await axios.put(`${API_URL}/todo/${id}`, todo);
    return response.data;
};

export const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/todo/${id}`);
};

export const fetchTodoById = async (id) => {
    const response = await axios.get(`${API_URL}/todo/${id}`); // Adjust the URL as needed
    return response.data;
};