import { createSlice } from '@reduxjs/toolkit';
import { Task } from '../../types/responseTask';

interface IinitialState {
  isAuth: boolean;
  user: string | null;
  graid: string | null;
  address: string | null;
  tasks: Task[] | null;
}

const initialState: IinitialState = {
  isAuth: false,
  user: null,
  graid: null,
  address: null,
  tasks: null,
};

export const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuth = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuth = false;
    },
    setUserData(state, action) {
      if (!state.graid || !state.address || !state.tasks) {
        state.graid = action.payload.graid;
        state.address = action.payload.address;
        state.tasks = action.payload.tasks;
      }
    },
  },
});

export default authSlice.reducer;
export const { login, logout, setUserData } = authSlice.actions;
