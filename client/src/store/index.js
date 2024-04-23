import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import transactionReducer from './slices/transactionSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    transactions: transactionReducer,
  },
});
