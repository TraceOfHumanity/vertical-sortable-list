import { configureStore } from '@reduxjs/toolkit';
import sorting from './slices/data';

const store = configureStore({
  reducer: {
    sorting
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
