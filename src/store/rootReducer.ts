import { combineReducers } from '@reduxjs/toolkit';
import loadingSlice from '@/features/loading/loadingSlice';
import userSlice from '@/store/userSlice';

export const rootReducer = combineReducers({
  loading: loadingSlice,
  user: userSlice,
});
