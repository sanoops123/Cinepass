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
