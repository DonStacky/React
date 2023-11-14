import { configureStore } from '@reduxjs/toolkit';
import searchTermReducer from '../../components/ui/search-field/searchTermSlice';
import itemQtyReducer from '../../components/ui/search-field/itemQtySlice';

export const store = configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    itemQty: itemQtyReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
