import { configureStore } from '@reduxjs/toolkit';
import detailedLoaderReducer from '../components/ui/detailed-card/detailed-loader-slice';
import mainLoaderReducer from '../components/ui/result-field/main-loader-slice';
import itemQtyReducer from '../components/ui/search-field/itemqty-slice';
import searchTermReducer from '../components/ui/search-field/searchterm-slice';
import { pokeapi } from '../components/api/pokeapi';
import pageDataReducer from '../components/ui/result-field/page-data-slice';

export const store = configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    itemQty: itemQtyReducer,
    isMainLoading: mainLoaderReducer,
    isDetailedLoading: detailedLoaderReducer,
    pageData: pageDataReducer,
    [pokeapi.reducerPath]: pokeapi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokeapi.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
