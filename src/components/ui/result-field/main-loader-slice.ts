import { createSlice } from '@reduxjs/toolkit';

interface initialState {
  value: boolean;
}

const initialState: initialState = {
  value: true,
};

const mainLoaderSlice = createSlice({
  name: 'isMainLoading',
  initialState,
  reducers: {
    toggleDetailedLoader: (state) => {
      state.value = !state.value;
    },
  },
});

export default mainLoaderSlice.reducer;
