import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'redux/slices/user.slice';
import systemReducer from 'redux/slices/system.slice';
import sqlReducer from 'redux/slices/sql.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    system: systemReducer,
    sql: sqlReducer,
  },
  devTools: true,
});

export default store;
