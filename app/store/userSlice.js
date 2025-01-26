import { createSlice } from '@reduxjs/toolkit';
import { userTemplate } from './userTemplate';

const userSlice = createSlice({
  name: 'User',
  initialState:  userTemplate ,
  reducers: {
    setUserInfo: (state, action) => {
      return {
        ...state, // Spread the current state to keep other fields intact
        profileInfo: {
          ...state.profileInfo, // Spread the existing profileInfo to keep previous values
          ...action.payload.profileInfo, // Update only the fields you need to change
        },
        // You can add other fields to update here if necessary
        ...action.payload, // This will overwrite the top-level fields, not nested fields
      };
    },
      resetUserInfo: () => initialState,
}});

export const { setUserInfo,resetUserInfo } = userSlice.actions;

export default userSlice.reducer;