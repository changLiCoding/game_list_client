import { Draft, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GenericGameFilterOptions } from './types';

export function createGameFiltersSlice<T>({
  name,
  initialState,
  reducers,
}: GenericGameFilterOptions<T>) {
  return createSlice({
    name,
    initialState,
    reducers: {
      setFilters: (state: Draft<T>, action: PayloadAction<Partial<T>>) => {
        return { ...state, ...action.payload };
      },
      resetFilter: (state: Draft<T>, action: PayloadAction<keyof T>) => {
        const filterKey = action.payload;
        return { ...state, [filterKey]: initialState[filterKey] };
      },
      reset: () => initialState,
      ...reducers,
    },
  });
}
