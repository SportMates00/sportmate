import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { users_list } from "../js files/users";

/* ============================================================================
   ENTITY ADAPTER (NORMALIZED STATE)
   ============================================================================
   Resulting state structure:

   {
     ids: ['u1','u2'],
     entities: {
       u1:{...},
       u2:{...}
     }
   }
============================================================================ */

export const usersAdapter = createEntityAdapter({
  selectId: (user) => user.id,
});

/* ============================================================================
   INITIAL STATE (PRELOADED WITH TEST USERS)
============================================================================ */

const initialState = usersAdapter.setAll(
  usersAdapter.getInitialState(),
  users_list
);

/* ============================================================================
   FUTURE-READY — EXAMPLE ASYNC FETCH (optional backend)
============================================================================ */

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  // later — call your API here
  return users_list;
});

/* ============================================================================
   SLICE
============================================================================ */

const usersSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    /* -------- UPSERT ONE USER (create OR update) -------- */
    upsertUser: usersAdapter.upsertOne,

    /* -------- UPSERT MANY USERS -------- */
    upsertUsers: usersAdapter.upsertMany,

    /* -------- REPLACE ENTIRE LIST -------- */
    setUsers: usersAdapter.setAll,

    /* -------- REMOVE USER -------- */
    removeUser: usersAdapter.removeOne,

    /* -------- UPDATE PROFILE FIELDS --------
       changes = ONLY what you want to update
       e.g. changes:{ location:'Miami' }
    */
    updateUserProfile: (state, action) => {
      const { id, changes } = action.payload;
      const user = state.entities[id];
      if (!user) return;

      Object.assign(user, changes);

      if (changes.profileInfo) {
        user.profileInfo = {
          ...user.profileInfo,
          ...changes.profileInfo,
        };
      }
    },

    /* -------- UPDATE PROFILE COMPLETION % -------- */
    setProfileCompletion: (state, action) => {
      const { userId, percentage } = action.payload;
      const user = state.entities[userId];
      if (!user) return;

      user.profileInfo.profileCompletePer = percentage;
    },

    /* -------- DELETE SPORT FROM USER -------- */
    deleteSportForUser: (state, action) => {
      const { userId, sportId } = action.payload;
      const user = state.entities[userId];
      if (!user) return;

      user.profileInfo.sportsList = user.profileInfo.sportsList.filter(
        (s) => s.id !== sportId
      );
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      usersAdapter.setAll(state, action.payload);
    });
  },
});

/* ============================================================================
   EXPORT ACTIONS
============================================================================ */

export const {
  upsertUser,
  upsertUsers,
  setUsers,
  removeUser,
  updateUserProfile,
  deleteSportForUser,
  setProfileCompletion,
} = usersSlice.actions;

/* ============================================================================
   SELECTORS (FAST + MEMOIZED)
============================================================================ */

export const usersSelectors = usersAdapter.getSelectors(
  (state) => state.users
);

export default usersSlice.reducer;
