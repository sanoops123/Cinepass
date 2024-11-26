/*
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    admin: {},
    userAuthorized: false,
    adminAuthorized: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
      state.user.userId = action.payload._id; 
      state.userAuthorized = true;
    },
    saveAdmin: (state, action) => {
      state.admin = action.payload;
      //state.admin = action.payload._id; 
      state.adminAuthorized = true;
    },
    clearUser: (state) => {
      state.user = {};
      state.userAuthorized = false;
    },
    clearAdmin: (state) => {
      state.admin = {};
      state.adminAuthorized = false;
    },
  },
});

export const { saveUser, saveAdmin, clearUser, clearAdmin } = userSlice.actions;

export default userSlice.reducer;
*/
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || {}, // Restore from localStorage
  admin: {},
  userAuthorized: localStorage.getItem('userAuthorized') === 'true', // Restore state
  adminAuthorized: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload;
      state.user.userId = action.payload._id; 
      state.userAuthorized = true;
      // Persist to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('userAuthorized', true);
    },
    saveAdmin: (state, action) => {
      state.admin = action.payload;
      state.adminAuthorized = true;
    },
    clearUser: (state) => {
      state.user = {};
      state.userAuthorized = false;
      // Clear from localStorage
      localStorage.removeItem('user');
      localStorage.removeItem('userAuthorized');
    },
    clearAdmin: (state) => {
      state.admin = {};
      state.adminAuthorized = false;
    },
  },
});

export const { saveUser, saveAdmin, clearUser, clearAdmin } = userSlice.actions;

export default userSlice.reducer;
