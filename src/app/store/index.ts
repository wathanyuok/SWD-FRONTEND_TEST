import { configureStore } from '@reduxjs/toolkit';
import personReducer from './personSlice';

export const store = configureStore({
  reducer: {
    person: personReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
