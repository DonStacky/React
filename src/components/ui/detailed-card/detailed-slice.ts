import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DetailsData } from '../../../shared/types';

interface detailedState {
  value: DetailsData;
}

const initialState: detailedState = {
  value: {
    name: '',
    image: '',
    abilities: [],
    types: '',
    height: '',
    weight: '',
    evolutionData: [],
  },
};

export const detailedSlice = createSlice({
  name: 'detailedSlice',
  initialState,
  reducers: {
    setDetailed: (state, action: PayloadAction<DetailsData>) => {
      state.value = action.payload;
    },
  },
});

export const { setDetailed } = detailedSlice.actions;
export default detailedSlice.reducer;
