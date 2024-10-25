// src/features/asteroidSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const NASA_API_KEY = "zoYCIfW6KpFUbJsNgJUs3KFt5mWBqj5CNrANAbow"; 
const NASA_BASE_URL = "https://api.nasa.gov/neo/rest/v1/neo/";

export const fetchAsteroidInfo = createAsyncThunk(
  'asteroid/fetchAsteroidInfo',
  async (asteroidId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${NASA_BASE_URL}${asteroidId}?api_key=${NASA_API_KEY}`);
      return response.data;
    } catch (err) {
      return rejectWithValue("Asteroid not found or invalid ID.");
    }
  }
);

export const fetchRandomAsteroid = createAsyncThunk(
  'asteroid/fetchRandomAsteroid',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${NASA_BASE_URL}browse?api_key=${NASA_API_KEY}`);
      const randomAsteroid = response.data.near_earth_objects[0]; // Modify for random selection
      return randomAsteroid;
    } catch (err) {
      return rejectWithValue("Failed to fetch a random asteroid.");
    }
  }
);

const asteroidSlice = createSlice({
  name: 'asteroid',
  initialState: {
    asteroidId: '',
    asteroidData: null,
    error: '',
  },
  reducers: {
    setAsteroidId: (state, action) => {
      state.asteroidId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsteroidInfo.fulfilled, (state, action) => {
        state.asteroidData = action.payload;
        state.error = '';
      })
      .addCase(fetchAsteroidInfo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchRandomAsteroid.fulfilled, (state, action) => {
        state.asteroidId = action.payload.id;
        state.asteroidData = action.payload;
        state.error = '';
      })
      .addCase(fetchRandomAsteroid.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setAsteroidId } = asteroidSlice.actions;
export default asteroidSlice.reducer;
