import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import gameEventsReducer from './gameEventsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    gameEvents: gameEventsReducer
  },
});