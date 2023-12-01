import { createSlice } from '@reduxjs/toolkit';
import { countries } from './countries';

interface countryState {
  value: string[];
}

const initialValue: countryState = {
  value: countries,
};

const countrySlice = createSlice({
  name: 'countries',
  initialState: initialValue,
  reducers: {},
});

export default countrySlice.reducer;
