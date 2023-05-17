import { createSlice } from '@reduxjs/toolkit';

type HomeSliceProps = {
  filters: {
    platforms: string[];
    tags: string[];
    genres: string[];
  };
};

const initialState: HomeSliceProps = {
  filters: {
    platforms: [],
    tags: [],
    genres: [],
  },
};

export const homeSearchSlice = createSlice({
  name: 'homeSearchSlice',
  initialState,
  reducers: {
    addFilter: (state, action) => {
      if (action.payload.type === 'Platform') {
        state.filters.platforms.push(action.payload.value);
      } else if (action.payload.type === 'Tag') {
        state.filters.tags.push(action.payload.value);
      } else if (action.payload.type === 'Genre') {
        state.filters.genres.push(action.payload.value);
      }
    },

    removeFilter: (state, action) => {
      if (action.payload.type === 'Platform') {
        state.filters.platforms = state.filters.platforms.filter(
          (platform) => platform !== action.payload.value
        );
      } else if (action.payload.type === 'Tag') {
        state.filters.tags = state.filters.tags.filter(
          (tag) => tag !== action.payload.value
        );
      } else if (action.payload.type === 'Genre') {
        state.filters.genres = state.filters.genres.filter(
          (genre) => genre !== action.payload.value
        );
      }
    },

    clearAll() {
      return initialState;
    },
  },
});

export const { addFilter, removeFilter, clearAll } = homeSearchSlice.actions;

export default homeSearchSlice.reducer;
