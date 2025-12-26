import { configureStore } from '@reduxjs/toolkit';
import userReducer from './authSlice';
import gameEventsReducer from './gameEventsSlice';
import usersReducer from './usersSlice';
export const store = configureStore({
  reducer: {
    auth: userReducer,
    users: usersReducer,
    gameEvents: gameEventsReducer,
  },
});