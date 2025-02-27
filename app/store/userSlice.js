import { createSlice } from '@reduxjs/toolkit';
import { userTemplate } from './userTemplate';
import { users_list } from '../js files/users';

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
    editUserInfo: (state, action) => {
      return {
        ...state,
        ...action.payload, // Update only the top-level fields like firstName, lastName, etc.
        profileInfo: {
          ...state.profileInfo, // Keep the previous profileInfo data
          ...action.payload.profileInfo, // Only update the changed fields within profileInfo
          availability: {
            ...state.profileInfo.availability, // Keep the old availability data
            ...action.payload.profileInfo?.availability, // Only update provided availability fields
          },
        },
      };
    },
    deleteSport: (state, action) => {
      return {
        ...state,
        profileInfo: {
          ...state.profileInfo,
          sportsList: state.profileInfo.sportsList.filter(
            sport => sport.sport !== action.payload
          ),
        },
      };
    },
    profileCompletePer: (state,action) => {
      return {
        ...state,
        profileInfo:{
          ...state.profileInfo,
          profileCompletePer: action.payload
        }
      }
    },
    deleteAccount: (state, action) => {
      const email = action.payload; // Assuming user ID is passed when calling this action
      const userIndex = users_list.findIndex(user => user.email === email);
    
      if (userIndex !== -1) {
        users_list.splice(userIndex, 1); // Remove user from users_list
      }
    
      return userTemplate; // Reset user state
    },
    resetUserInfo: () => userTemplate,
}});

export const { setUserInfo,resetUserInfo, editUserInfo, profileCompletePer, deleteSport, deleteAccount } = userSlice.actions;

export default userSlice.reducer;