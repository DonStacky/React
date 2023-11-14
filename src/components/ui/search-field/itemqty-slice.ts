import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const localItemQty = Number(localStorage.getItem('itemQtyRSG'));

interface itemQtyState {
  value: number;
}

const initialState: itemQtyState = {
  value: localItemQty || 8,
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
