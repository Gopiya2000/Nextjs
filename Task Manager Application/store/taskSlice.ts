import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Task {
    id: string;
    userId: string;
    taskName: string;
    description: string;
    dueDate: string;
    priority: string;
}

interface TaskState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: TaskState = {
    tasks: [],
    loading: false,
    error: null,
};

// Async thunk to add a new task
export const addTask = createAsyncThunk(
    'tasks/addTask',
    async (taskData: Omit<Task, 'id'>, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/task', taskData);
            return response.data.task;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add task');
        }
    }
);


const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default taskSlice.reducer;
