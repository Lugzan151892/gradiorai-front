import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '@/store/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Отключает предупреждение о non-serializable объектах
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
