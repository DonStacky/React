import { configureStore } from '@reduxjs/toolkit';
import itemQtyReducer from '../../components/ui/search-field/itemqty-slice';
import searchTermReducer from '../../components/ui/search-field/searchterm-slice';
import mainLoaderSlice from '../../components/ui/result-field/main-loader-slice';
import detailedLoaderSlice from '../../components/ui/detailed-card/detailed-loader-slice';

export const store = configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    itemQty: itemQtyReducer,
    isMainLoading: mainLoaderSlice,
    isDetailedLoading: detailedLoaderSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
