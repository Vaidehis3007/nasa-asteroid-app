// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import asteroidReducer from '../features/asteroidSlice';

export const store = configureStore({
  reducer: {
    asteroid: asteroidReducer,
  },
});

export default store;
