import { configureStore } from '@reduxjs/toolkit';
import userReducer from 'redux/slices/user.slice';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: true,
});

export default store;
