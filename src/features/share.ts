import { PayloadAction } from '@reduxjs/toolkit';

export function setFilters<S>(state: S, action: PayloadAction<Partial<S>>) {
  return { ...state, ...action.payload };
}

export function resetFilter<S>(
  state: S,
  action: PayloadAction<keyof S>,
  initialState: S
) {
  const filterKey = action.payload;
  return { ...state, [filterKey]: initialState[filterKey] };
}
export function reset<S>(initialState: S) {
  return initialState;
}
