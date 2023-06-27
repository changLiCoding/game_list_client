import {
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
  createSlice,
} from '@reduxjs/toolkit';

interface GenericState<T> {
  data?: T;
  status: 'loading' | 'finished' | 'error';
}

const createGenericSlice = <
  T,
  Reducers extends SliceCaseReducers<GenericState<T>>
>({
  name = '',
  initialState,
  reducers,
}: {
  name: string;
  initialState: GenericState<T>;
  reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>;
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      start(state: GenericState<T>) {
        state.status = 'loading';
        state.status = '';
      },

      success(state: GenericState<T>, action: PayloadAction<T>) {
        state.data = action.payload;
        state.status = 'finished';
      },
      ...reducers,
    },
  });
};

const wrappedSlice = createGenericSlice({
  name: 'test',
  initialState: { status: 'loading' } as GenericState<string>,
  reducers: {
    magic(state) {
      state.status = 'error';
      state.status = 'finished';
      state.data = 'hocus pocus';
    },
  },
});

wrappedSlice.actions.magic();
