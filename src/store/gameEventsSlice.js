import { createSlice } from "@reduxjs/toolkit";
import { gameEvents } from "@/src/js files/gamesEvents";

/* --------------------------------
   Initial State
-------------------------------- */
const initialState = {
  events: gameEvents, // already an array (correct DB)
};

/* --------------------------------
   Slice
-------------------------------- */
const gameEventsSlice = createSlice({
  name: "gameEvents",
  initialState,
  reducers: {
    /* -------- CREATE GAME -------- */
    addGameEvent: (state, action) => {
      state.events.unshift(action.payload);
      // newest game appears first
    },

    /* -------- REMOVE GAME -------- */
    removeGameEvent: (state, action) => {
      state.events = state.events.filter(
        (game) => game.id !== action.payload
      );
    },

    /* -------- UPDATE GAME -------- */
    updateGameEvent: (state, action) => {
      const index = state.events.findIndex(
        (game) => game.id === action.payload.id
      );

      if (index !== -1) {
        state.events[index] = {
          ...state.events[index],
          ...action.payload,
        };
      }
    },
  },
});

export const {
  addGameEvent,
  removeGameEvent,
  updateGameEvent,
} = gameEventsSlice.actions;

export default gameEventsSlice.reducer;
