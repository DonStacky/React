import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataObject } from '../../../shared/types';

interface hookFormState {
  value: DataObject[];
}

const initialValue: hookFormState = {
  value: [],
};

const hookFormSlice = createSlice({
  name: 'hookForm',
  initialState: initialValue,
  reducers: {
    pushHookFormData: (state, action: PayloadAction<DataObject>) => {
      state.value.push(action.payload);
    },
  },
});

export default hookFormSlice.reducer;
export const { pushHookFormData } = hookFormSlice.actions;
