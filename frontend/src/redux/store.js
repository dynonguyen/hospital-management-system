import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'redux/slices/user.slice';
import systemReducer from 'redux/slices/system.slice';
import sqlReducer from 'redux/slices/sql.slice';
import userRoleReducer from 'redux/slices/userRole.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    system: systemReducer,
    sql: sqlReducer,
    userRole: userRoleReducer,
  },
  devTools: true,
});

export default store;
