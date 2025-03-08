import Api from '@/core/api/api';
import { IUser } from '@/core/interfaces/types';
import { setLoading } from '@/features/loading/loadingSlice';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getUserData = createAsyncThunk(
  'user/getUserData',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true));
      const user = await Api.get<
        undefined,
        { data: IUser; accessToken: string }
      >('/auth/user');
      return user;
    } catch (e) {
      return rejectWithValue(e);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null as null | IUser, unAuth: false },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.unAuth = true;
      localStorage.removeItem('accessToken');
    },

    setUnAuth: (state, { payload }) => {
      state.unAuth = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.fulfilled, (state, action) => {
        state.unAuth = false;
        if (action.payload) {
          state.user = action.payload.payload.data;
        }
      })
      .addCase(getUserData.rejected, (state) => {
        state.unAuth = true;
      });
  },
});

export const { logout, setUnAuth } = userSlice.actions;
export default userSlice.reducer;
