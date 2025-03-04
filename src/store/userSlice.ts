import Api from '@/core/api/api';
import { IUser } from '@/core/interfaces/types';
import { setLoading } from '@/features/loading/loadingSlice';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getUserData = createAsyncThunk(
  'user/getUserData',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const user = await Api.get<
        undefined,
        { data: IUser; accessToken: string }
      >('/auth/user');
      return user;
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null as null | IUser, loading: false },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('accessToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload.payload.data;
        }
      })
      .addCase(getUserData.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
