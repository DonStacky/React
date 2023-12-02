import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DataObject } from '../../../shared/types';

interface customFormState {
  value: DataObject[];
}

const initialValue: customFormState = {
  value: [],
};

const customFormSlice = createSlice({
  name: 'customForm',
  initialState: initialValue,
  reducers: {
    pushFormData: (state, action: PayloadAction<DataObject>) => {
      state.value.push(action.payload);
    },
  },
});

export default customFormSlice.reducer;
export const { pushFormData } = customFormSlice.actions;
