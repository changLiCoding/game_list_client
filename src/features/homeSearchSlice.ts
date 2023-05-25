import { createSlice } from '@reduxjs/toolkit';
import type { HomeSearchSlice } from './types';

const initialState: HomeSearchSlice = {
  filters: {
    platforms: [],
    tags: [],
    genres: [],
    year: -1,
  },
  lastSelected: {
    platforms: '',
    tags: '',
    genres: '',
  },
  view: 'grid',
};

const remove = (array: any[], value: any) => {
  const index = array.indexOf(value);
  if (index > -1) {
    array.splice(index, 1);
  }
};

export const homeSearchSlice = createSlice({
  name: 'homeSearchSlice',
  initialState,
  reducers: {
    addFilter: (state, action) => {
      const payloadValue = action.payload.value[0] as string;
      if (action.payload.type === 'Platform') {
        if (state.filters.platforms.includes(payloadValue)) {
          remove(state.filters.platforms, payloadValue);
          return;
        }
        state.filters.platforms.push(payloadValue);
        state.lastSelected.platforms = payloadValue;
      } else if (action.payload.type === 'Tag') {
        if (state.filters.tags.includes(payloadValue)) {
          remove(state.filters.tags, payloadValue);
          return;
        }
        state.filters.tags.push(payloadValue);
        state.lastSelected.tags = payloadValue;
      } else if (action.payload.type === 'Genre') {
        if (state.filters.genres.includes(payloadValue)) {
          remove(state.filters.genres, payloadValue);
          return;
        }
        state.filters.genres.push(payloadValue);
        state.lastSelected.genres = payloadValue;
      } else if (action.payload.type === 'Year') {
        state.filters.year = Number(payloadValue);
      }
    },

    removeFilter: (state, action) => {
      let payloadValue = action.payload.value;
      if (action.payload.type === 'Platform') {
        if (!payloadValue) {
          payloadValue = state.lastSelected.platforms;
          state.lastSelected.platforms = '';
        }
        state.filters.platforms = state.filters.platforms.filter(
          (platform) => platform !== payloadValue
        );
      } else if (action.payload.type === 'Tag') {
        if (!payloadValue) {
          payloadValue = state.lastSelected.tags;
          state.lastSelected.tags = '';
        }
        state.filters.tags = state.filters.tags.filter(
          (tag) => tag !== payloadValue
        );
      } else if (action.payload.type === 'Genre') {
        if (!payloadValue) {
          payloadValue = state.lastSelected.genres;
          state.lastSelected.genres = '';
        }
        state.filters.genres = state.filters.genres.filter(
          (genre) => genre !== payloadValue
        );
      } else if (action.payload.type === 'Year') {
        state.filters.year = -1;
      }
    },

    setView(state, action: { payload: 'grid' | 'list' }) {
      state.view = action.payload;
    },

    clearAll() {
      return initialState;
    },
  },
});

export const { addFilter, removeFilter, setView, clearAll } =
  homeSearchSlice.actions;

export default homeSearchSlice.reducer;
