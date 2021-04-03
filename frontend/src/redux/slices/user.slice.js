import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import loginApi from 'apis/loginApi';

// get user
export const getUser = createAsyncThunk(
  'user/getUser',
  async (params, thunkAPI) => {
    try {
      const result = await loginApi.getUser();
      if (result) {
        const { username } = result.data;
        thunkAPI.dispatch(setUser(username));
      }
    } catch (error) {
      thunkAPI.dispatch(setUser(''));
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: { username: '' },
  reducers: {
    setUser(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: {},
});

const { reducer, actions } = userSlice;
export const { setUser } = actions;
export default reducer;
