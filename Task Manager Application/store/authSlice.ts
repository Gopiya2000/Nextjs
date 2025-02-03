import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
    user: null | { userId: string; name?: string; email: string };
    loading: boolean;
    error: Record<string, string> | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null,
};

// Login Action
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/auth/login', credentials);
            console.log('response', response);
            return { email: credentials.email, userId: response.data.userId };
        } catch (error: any) {
            if (error.response?.data?.errors) {
                return rejectWithValue(error.response.data.errors);
            }
            return rejectWithValue({ general: error.response?.data?.message || 'Login failed' });
        }
    }
);

// Signup Action
export const signupUser = createAsyncThunk(
    'auth/signupUser',
    async (userData: { name: string; email: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await axios.post('/api/auth/signup', userData);
            return { email: userData.email, name: userData.name, userId: response.data.userId };
        } catch (error: any) {
            if (error.response?.data?.errors) {
                return rejectWithValue(error.response.data.errors);
            }
            return rejectWithValue({ general: error.response?.data?.message || 'Signup failed' });
        }
    }
);

// Logout Action
export const logoutUser = createAsyncThunk(
    'auth/logoutUser', 
    async (_, { rejectWithValue }) => {
        try {
            await axios.post('/api/auth/logout');
            return null;
        } catch (error: any) {
            return rejectWithValue({ general: 'Logout failed' });
        }
    }
);

// Create a slice for authentication with reducers and extra reducers for async actions
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle login action states
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = { email: action.payload.email, userId: action.payload.userId };
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as Record<string, string>;
            })

            // Handle signup action states
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = { email: action.payload.email, name: action.payload.name, userId: action.payload.userId };
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as Record<string, string>;
            })

            // Handle logout action states
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as Record<string, string>;
            });
    },
});

export default authSlice.reducer;
