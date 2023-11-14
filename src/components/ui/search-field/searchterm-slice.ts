import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const localSearchTerm = localStorage.getItem('searchTermRSG');

interface searchTermState {
  value: string;
}

const initialState: searchTermState = {
  value: localSearchTerm ?? '',
};

export const searchTermSlice = createSlice({
  name: 'searchTerm',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setSearchTerm } = searchTermSlice.actions;
export default searchTermSlice.reducer;
