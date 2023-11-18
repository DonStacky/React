import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PageData } from '../../../shared/types';

interface pageDataState {
  value: PageData;
}

const initialState: pageDataState = {
  value: {
    pageItems: [],
    lastPage: 1,
    currentPage: 1,
    itemQty: 8,
  },
};

export const pageDataSlice = createSlice({
  name: 'pageData',
  initialState,
  reducers: {
    setPageData: (state, action: PayloadAction<PageData>) => {
      state.value = action.payload;
    },
  },
});

export const { setPageData } = pageDataSlice.actions;
export default pageDataSlice.reducer;
