import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface itemQtyState {
  value: number;
}

const initialState: itemQtyState = {
  value: 8,
};

export const itemQtySlice = createSlice({
  name: 'itemQty',
  initialState,
  reducers: {
    setItemQty: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setItemQty } = itemQtySlice.actions;
export default itemQtySlice.reducer;
