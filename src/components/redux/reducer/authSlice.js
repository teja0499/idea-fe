import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  admin: false,
  id:0,
  username:'',
  password:'',
  userData:{}
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.admin = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { setAdmin, setUser_id,setId,setPassword , setUserData} = authSlice.actions;
export default authSlice.reducer;
