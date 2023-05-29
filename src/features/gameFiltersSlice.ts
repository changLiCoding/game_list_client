import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BaseFilters } from '@/types/global';

export function createGameFiltersSlice<T extends BaseFilters>(initialState: T) {
  return createSlice({
    name: 'gameFiltersSlice',
    initialState,
    reducers: {
      setFilters: (state, action: PayloadAction<Partial<T>>) => {
        return { ...state, ...action.payload };
      },
      resetFilter: (state, action: PayloadAction<keyof T>) => {
        const filterKey = action.payload;
        return { ...state, [filterKey]: initialState[filterKey] };
      },
      reset: () => initialState,
    },
  });
}
