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
    toggleMainLoader: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { toggleMainLoader } = mainLoaderSlice.actions;
export default mainLoaderSlice.reducer;
