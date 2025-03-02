import { combineReducers } from '@reduxjs/toolkit';
import loadingSlice from '@/features/loading/loadingSlice';

export const rootReducer = combineReducers({
  loading: loadingSlice,
});
