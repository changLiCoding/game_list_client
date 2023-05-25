import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FiltersWithUndefined } from '@/types/global';

const initialState: FiltersWithUndefined = {
  genres: [],
  platforms: [],
  tags: [],
  year: undefined,
};

export const gameFiltersSlice = createSlice({
  name: 'gameFiltersSlice',
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<FiltersWithUndefined>>
    ) => {
      return { ...state, ...action.payload };
    },

    resetFilter: (state, action: PayloadAction<keyof FiltersWithUndefined>) => {
      const filterKey = action.payload;
      return { ...state, [filterKey]: initialState[filterKey] };
    },

    reset() {
      return initialState;
    },
  },
});

export const { setFilters, resetFilter, reset } = gameFiltersSlice.actions;

export default gameFiltersSlice.reducer;
