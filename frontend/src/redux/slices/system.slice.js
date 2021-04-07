import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import systemApi from 'apis/systemApi';

export const getSysInitVal = createAsyncThunk(
  'system/getSysInitVal',
  async (params, thunkAPI) => {
    try {
      await systemApi.getSystemInitVal();
    } catch (error) {}
  },
);

const systemSlice = createSlice({
  name: 'system',
  initialState: {
    defaultTableSpaceList: [],
    tempTableSpaceList: [],
    usernameList: [],
    roleNameList: [],
    systemPrivList: [],
    tableNameList: [],
  },
  reducers: {
    setInitState(state, action) {
      state = { ...action.payload };
    },
  },
});

const { reducer, actions } = systemSlice;
export const {} = actions;
export default reducer;
