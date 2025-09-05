import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ButtonItem } from '@/hooks/useRandomButton';

interface RandomButtonState {
  selectedButton: ButtonItem | null;
  isInitialized: boolean;
}

const initialState: RandomButtonState = {
  selectedButton: null,
  isInitialized: false,
};

const randomButtonSlice = createSlice({
  name: 'randomButton',
  initialState,
  reducers: {
    setSelectedButton: (state, action: PayloadAction<ButtonItem>) => {
      state.selectedButton = action.payload;
      state.isInitialized = true;
    },
    resetRandomButton: (state) => {
      state.selectedButton = null;
      state.isInitialized = false;
    },
  },
});

export const { setSelectedButton, resetRandomButton } = randomButtonSlice.actions;
export default randomButtonSlice.reducer;
