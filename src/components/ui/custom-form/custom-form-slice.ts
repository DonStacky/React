import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataObject } from '../../../shared/types';

interface formDataState {
  value: DataObject[];
}

const initialValue: formDataState = {
  value: [],
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState: initialValue,
  reducers: {
    pushFormData: (state, action: PayloadAction<DataObject>) => {
      state.value.push(action.payload);
    },
  },
});

export default formDataSlice.reducer;
export const { pushFormData } = formDataSlice.actions;
