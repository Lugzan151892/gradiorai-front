import { combineReducers } from '@reduxjs/toolkit';
import loadingSlice from '@/features/loading/loadingSlice';
import userSlice from '@/store/user/userSlice';
import techSlice from '@/store/tech/techSlice';
import randomButtonSlice from '@/store/randomButton/randomButtonSlice';

export const rootReducer = combineReducers({
  loading: loadingSlice,
  user: userSlice,
  tech: techSlice,
  randomButton: randomButtonSlice,
});
