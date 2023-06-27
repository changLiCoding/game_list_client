import {
  Draft,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';

// export type GenericGameFilterOptions<T, R extends SliceCaseReducers<T>> = {
//   name: string;
//   initialState: T;
//   reducers: ValidateSliceCaseReducers<T, R>;
// };

// export function createGameFiltersSlice<
//   T,
//   Reducers extends SliceCaseReducers<T>
// >({ name, initialState, reducers }: GenericGameFilterOptions<T, Reducers>) {
//   return createSlice({
//     name,
//     initialState,
//     reducers: {
//       setFilters: (state: Draft<T>, action: PayloadAction<Partial<T>>) => {
//         return { ...state, ...action.payload };
//       },

//       resetFilter: (state: Draft<T>, action: PayloadAction<keyof T>) => {
//         const filterKey = action.payload;
//         return { ...state, [filterKey]: initialState[filterKey] };
//       },

//       reset: () => initialState,

//       ...reducers,
//     },
//   });
// }

// const wrappedSlice = createGameFiltersSlice({
//   name: 'test',
//   initialState: {
//     t: '',
//   },
//   reducers: {
//     magic(state) {
//       state.t = '';
//     },
//   },
// });

// export type GenericGameFilterOptions<
//   T,
//   Reducers extends SliceCaseReducers<T>
// > = {
//   name: string;
//   initialState: T;
//   reducers: ValidateSliceCaseReducers<T, Reducers>;
// };

export function createGameFiltersSlice<
  T,
  Reducers extends SliceCaseReducers<T>
>({
  name,
  initialState,
  reducers,
}: {
  name: string;
  initialState: T;
  reducers: ValidateSliceCaseReducers<T, Reducers>;
}) {
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

const wrappedSlice = createGameFiltersSlice({
  name: 'test',
  initialState: {
    t: '',
  },
  reducers: {
    magic(state) {
      state.t = '';
    },
  },
});
