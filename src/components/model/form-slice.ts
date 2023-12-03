import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataObject } from '../../shared/types';

interface FormState {
  value: DataObject[];
}

const initialValue: FormState = {
  value: [],
};

const formSlice = createSlice({
  name: 'customForm',
  initialState: initialValue,
  reducers: {
    pushFormData: (state, action: PayloadAction<DataObject>) => {
      state.value.push(action.payload);
    },
  },
});

export default formSlice.reducer;
export const { pushFormData } = formSlice.actions;
