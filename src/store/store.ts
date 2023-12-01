import {
  configureStore,
  combineReducers,
  PreloadedState,
} from '@reduxjs/toolkit';
import countrySliceReducer from '../components/model/country/country-slice';
import formDataReducer from '../components/ui/custom-form/custom-form-slice';

export const rootReducer = combineReducers({
  country: countrySliceReducer,
  formData: formDataReducer,
});

export default function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
