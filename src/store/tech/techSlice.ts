import { createSlice } from '@reduxjs/toolkit';

type TInfoModalIconType = 'success' | 'error' | 'warning';
interface IInfoModalSettings {
  type: TInfoModalIconType;
  text: string | React.ReactNode;
  buttonText: string;
  redirect: string;
  errorStatus?: number;
  onClick?: () => void;
}

const defaultModalSettings = (): IInfoModalSettings => ({
  type: 'success',
  text: '',
  buttonText: 'main.accept',
  redirect: '',
  errorStatus: 400,
});

const techSlice = createSlice({
  name: 'tech',
  initialState: {
    mainModal: false,
    mainModalSettings: defaultModalSettings(),
  },
  reducers: {
    openModal(
      state,
      {
        payload,
      }: {
        payload: {
          text: string | React.ReactNode;
          redirect?: string;
          type?: TInfoModalIconType;
          status?: number;
          onClick?: () => void;
        };
      }
    ) {
      state.mainModalSettings.text = payload.text;
      state.mainModalSettings.type = payload.type || 'success';
      state.mainModalSettings.redirect = payload.redirect || '';
      state.mainModalSettings.errorStatus = payload.status || 500;
      state.mainModalSettings.onClick = payload.onClick;
      state.mainModal = true;
    },
    closeModal(state) {
      state.mainModal = false;
      if (state.mainModalSettings.onClick) {
        state.mainModalSettings.onClick();
      }

      // setTimeout(() => {
      //   state.mainModalSettings = defaultModalSettings();
      // }, 500);
    },

    resetModalSettings(state) {
      state.mainModalSettings = defaultModalSettings();
    },
  },
});

export const { openModal, closeModal, resetModalSettings } = techSlice.actions;
export default techSlice.reducer;
