import { createSelector } from '@reduxjs/toolkit';
import { usersSelectors } from './usersSlice';

// All users
export const selectAllUsers = (state) => usersSelectors.selectAll(state);

// Lookup by user id
export const selectUserById = (id) =>
  createSelector(
    (state) => usersSelectors.selectById(state, id),
    (user) => user
  );

// Logged-in user id
export const selectCurrentUserId = (state) => state.auth.currentUserId;

// Logged-in user object
export const selectCurrentUser = createSelector(
  [usersSelectors.selectEntities, selectCurrentUserId],
  (users, id) => (id ? users[id] : null)
);

// Is this my profile?
export const selectIsOwnProfile = (id) =>
  createSelector(selectCurrentUserId, (loggedId) => loggedId === id);
