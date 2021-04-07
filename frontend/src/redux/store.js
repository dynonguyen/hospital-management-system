import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'redux/slices/user.slice';
import systemReducer from 'redux/slices/system.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
    system: systemReducer,
  },
  devTools: true,
});

export default store;
