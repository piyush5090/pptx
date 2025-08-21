import { configureStore } from '@reduxjs/toolkit';
import presentationSlice from './slices/presentationSlice';

export const store = configureStore({
  reducer: {
    presentation: presentationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export default store;