import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { GameFilters } from '@/graphql/__generated__/graphql';
import { remove } from '@/utils/utils';

// type FiltersWithLastSelected = {
//   [K in keyof Filters]: {
//     value: Filters[K];
//     lastSelected?: Filters[K] extends Array<infer T> ? T : Filters[K];
//   };
// };

// type GetFiltersType<K extends FilterKeys> = Filters[K] extends Array<infer T>
//   ? T
//   : Filters[K];

// export function withPayloadType<K extends keyof Filters>(
//   key: K,
//   value: GetFiltersType<K>
// ) {
//   // Dispatch the action with the key and value
//   // Example implementation:
// }
// function test() {
//   withPayloadType('genres', []);
//   withPayloadType('platforms', 2);
//   withPayloadType('year', 21);
// }

// export function typeTest<T extends keyof Filters, K extends Filters[T]>(
//   key: T,
//   value: K
// ) {}

// function testCode() {
//   typeTest('genres', []);
//   typeTest('platforms', []);
//   typeTest('year', 21);
//   typeTest('tags', []);
//   // Fails
//   typeTest('year', '21');
//   typeTest('tags', [3]);
// }

// function setFilter<T extends FilterKeys, K extends Filters[T]>(
//   filter: T,
//   value: K
// ) {
//   return {
//     type: 'SET_FILTER',
//     payload: {
//       filter,
//       value,
//     },
//   };
// }

// type SetFilterType<T extends keyof Filters> = {
//   key: T;
//   value: Filters[T];
// };

// function withPayloadType<T>() {
//   return (t: T) => ({ payload: t });
// }
// createAction('SET_FILTER', withPayloadType<SetFilterType>());

type Filters = Omit<GameFilters, '__typename' | 'errors'>;
type FilterKeys = keyof Filters;

type FiltersWithUndefined = {
  [K in keyof Filters]: Filters[K] | undefined;
};

type GetFiltersType<T extends FilterKeys> = T extends keyof Filters
  ? Filters[T] | undefined
  : never;

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

    // setFilter22: <T extends keyof Filters>(
    //   state: Filters,
    //   action: PayloadAction<{ key: T; value: GetFiltersType<T> }>
    // ) => {
    //   const { key, value } = action.payload;
    //   state[key] = value;
    // },

    // removeFilter: <T extends keyof Filters>(
    //   state: Filters,
    //   action: PayloadAction<{ key: T; value: GetFiltersType<T> }>
    // ) => {
    //   const { key, value } = action.payload;
    //   const t = state[key];

    //   if (Array.isArray(t)) {
    //     remove(t, value);
    //   } else {
    //     state[key] = initialState[key];
    //   }
    // },

    // resetFilter: <T extends keyof Filters>(
    //   state: Filters,
    //   action: PayloadAction<{ key: T; value: GetFiltersType<T> }>
    // ) => {
    //   const { key } = action.payload;
    //   state[key] = initialState[key];
    // },

    reset() {
      return initialState;
    },
  },
});

export const { setFilters } = gameFiltersSlice.actions;

export default gameFiltersSlice.reducer;

// const filtersReducer = homeSearchSlice.reducer;

// export { setFilter, filtersReducer };
