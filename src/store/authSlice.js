import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Example future async login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }) => {
    // TODO: call API here
    return {
      userId: 'u1',
      token: 'test-token',
    };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUserId: null,
    token: null,
    status: 'idle',
    error: null,
  },

  reducers: {
    logout: (state) => {
      state.currentUserId = null;
      state.token = null;
    },

    setCurrentUser: (state, action) => {
      state.currentUserId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUserId = action.payload.userId;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message;
      });
  },
});

export const { logout, setCurrentUser } = authSlice.actions;
export default authSlice.reducer;
