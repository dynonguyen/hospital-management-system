import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import loginApi from 'apis/loginApi';
import helper from 'helper';

// get user
export const getUser = createAsyncThunk(
  'user/getUser',
  async (params, thunkAPI) => {
    try {
      const result = await loginApi.getUser();
      if (result) {
        const { username, roles } = result.data;
        thunkAPI.dispatch(setUser({ username, roles }));
      }
    } catch (error) {
      thunkAPI.dispatch(setUser(''));
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: { username: '', role: 'default' },
  reducers: {
    setUser(state, action) {
      state.username = action.payload.username;
      state.role = helper.analystRole(action.payload.roles);
    },
  },
  extraReducers: {},
});

const { reducer, actions } = userSlice;
export const { setUser } = actions;
export default reducer;
