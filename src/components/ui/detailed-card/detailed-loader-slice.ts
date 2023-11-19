import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialState {
  value: boolean;
}

const initialState: initialState = {
  value: true,
};

const detailedLoaderSlice = createSlice({
  name: 'isDetailedLoading',
  initialState,
  reducers: {
    toggleDetailedLoader: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { toggleDetailedLoader } = detailedLoaderSlice.actions;
export default detailedLoaderSlice.reducer;
