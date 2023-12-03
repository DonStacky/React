import { createSlice } from '@reduxjs/toolkit';
import { countries } from './countries';

interface CountryState {
  value: string[];
}

const initialValue: CountryState = {
  value: countries,
};

const countrySlice = createSlice({
  name: 'countries',
  initialState: initialValue,
  reducers: {},
});

export default countrySlice.reducer;
