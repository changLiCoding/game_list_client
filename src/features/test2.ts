import {
  SliceCaseReducers,
  createSlice,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';

export interface StoreState<T> {
  data: T;
  status: 'succeeded' | 'failed' | 'idle';
  error: string | null;
}

interface StoreSliceProps<T, R extends SliceCaseReducers<StoreState<T>>> {
  sliceName: string;
  defaultState: T;
  reducers: ValidateSliceCaseReducers<StoreState<T>, R>;
}

export function createStoreSlice<T, R extends SliceCaseReducers<StoreState<T>>>(
  props: StoreSliceProps<T, R>
) {
  const { sliceName, reducers, defaultState } = props;

  const initialState: StoreState<T> = {
    data: defaultState,
    status: 'idle',
    error: null,
  };

  return createSlice({
    name: sliceName,
    initialState,
    reducers: {
      ...reducers,
      reset: (state) => {
        Object.assign(state, initialState);
      },
      updateStatus: (state, action) => {
        state.status = action.payload;
      },
    },
  });
}

export const genericSlice = createStoreSlice({
  sliceName: 'someSliceName',
  defaultState: { someField: 'some value' },
  reducers: {
    setSomeField: (state, action) => {
      const { payload } = action;
      state.data.someField = payload;
    },
  },
});

export const { reset, updateStatus, setSomeField, fakeReducer } =
  genericSlice.actions; // only fakeReducer throws error as unknown as expected
