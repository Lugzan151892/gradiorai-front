import { combineReducers } from '@reduxjs/toolkit';
import loadingSlice from '@/features/loading/loadingSlice';
import userSlice from '@/store/user/userSlice';
import techSlice from '@/store/tech/techSlice';

export const rootReducer = combineReducers({
  loading: loadingSlice,
  user: userSlice,
  tech: techSlice,
});
