import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import systemApi from 'apis/systemApi';

export const getSysInitVal = createAsyncThunk(
  'system/getSysInitVal',
  async (params, thunkAPI) => {
    try {
      const result = await systemApi.getSystemInitVal();
      if (result) {
        thunkAPI.dispatch(
          setInitState({ ...result.data, tempTableSpaceList: ['TEMP'] }),
        );
      }
    } catch (error) {}
  },
);

const systemSlice = createSlice({
  name: 'system',
  initialState: {
    tableSpaceList: [],
    tempTableSpaceList: ['TEMP'],
    usernameList: [],
    roleList: [],
    sysPrivList: [],
    userTableList: [],
    colTableList: [],
  },
  reducers: {
    setInitState(state, action) {
      return { ...action.payload };
    },
  },
});

const { reducer, actions } = systemSlice;
export const { setInitState } = actions;
export default reducer;
