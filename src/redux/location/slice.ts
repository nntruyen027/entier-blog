import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { District, LocationState, Province, Ward } from '~/types';

const initialState: LocationState = {
  provinces: [],
  districts: [],
  wards: [],
  fullData: null,
  selectedLocation: null,
  loading: false,
  error: null
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    getProvincesStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDistrictsStart: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    getWardsStart: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    getProvincesSuccess: (state, action: PayloadAction<Province[]>) => {
      state.loading = false;
      state.provinces = action.payload;
    },
    getDistrictsSuccess: (state, action: PayloadAction<District[]>) => {
      state.loading = false;
      state.districts = action.payload;
    },
    getWardsSuccess: (state, action: PayloadAction<Ward[]>) => {
      state.loading = false;
      state.wards = action.payload;
    },
    getError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const {
  getWardsStart,
  getDistrictsStart,
  getProvincesStart,
  getProvincesSuccess,
  getDistrictsSuccess,
  getWardsSuccess,
  getError
} = locationSlice.actions;

export default locationSlice.reducer;
