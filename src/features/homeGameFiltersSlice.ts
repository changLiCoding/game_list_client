/* eslint-disable no-console */
// TODO: Remove this ^
import { StateValue, createMachine, interpret } from 'xstate';
import { PayloadAction } from '@reduxjs/toolkit';
import { createGameFiltersSlice } from './gameFiltersSlice';
import { remove } from '@/utils/utils';
import { HomeGameFilters } from './types';

// TODO: Rename this
export type CorrectFilters = Pick<
  HomeGameFilters,
  'genres' | 'platforms' | 'tags'
>;

type CorrectFiltersKeys = keyof CorrectFilters;

export type PayloadType = {
  category: CorrectFiltersKeys;
  entry: string;
};

export type StatePayloadType = PayloadType & {
  state: HomeGameFilters;
};

const defaultGameFilters: HomeGameFilters = {
  genres: {
    included: [],
    excluded: [],
  },
  platforms: {
    included: [],
    excluded: [],
  },
  tags: {
    included: [],
    excluded: [],
  },
  year: undefined,
  search: '',
  sortBy: 'name',
};

const stateMachine = createMachine(
  {
    id: 'includeExcludeMachine',
    predictableActionArguments: true,
    preserveActionOrder: true,
    schema: {
      context: {} as {
        entryCache: Map<string, StateValue>;
        filters: CorrectFilters;
        count: number;
      },
      events: {} as
        | { type: 'TOGGLE'; payload: StatePayloadType }
        | { type: 'INCREMENT'; payload: StatePayloadType }
        | { type: 'REMOVE_ITEM'; payload: StatePayloadType },
    },
    context: {
      entryCache: new Map<string, string>(),
      filters: {
        genres: defaultGameFilters.genres,
        platforms: defaultGameFilters.platforms,
        tags: defaultGameFilters.tags,
      },
      count: 0,
    },
    initial: 'off',
    states: {
      off: {
        on: {
          TOGGLE: {
            target: 'included',
            actions: ['included'],
          },
          INCREMENT: {
            target: 'included',
            actions: ['included'],
          },
        },
      },

      included: {
        on: {
          TOGGLE: {
            target: 'off',
            actions: ['removeIncluded'],
          },
          INCREMENT: {
            target: 'excluded',
            actions: ['includedToExcluded'],
          },
          REMOVE_ITEM: {
            actions: ['removeIncluded'],
          },
        },
      },

      excluded: {
        on: {
          TOGGLE: {
            target: 'included',
            actions: ['excludedToIncluded'],
          },
          INCREMENT: {
            target: 'off',
            actions: ['removeExcluded'],
          },
          REMOVE_ITEM: {
            actions: ['removeIncluded'],
          },
        },
      },
    },
  },

  {
    actions: {
      included: (context, event) => {
        console.log('included context', context);
        const { category, entry, state } = event.payload;
        state[category].included.push(entry);
        // context.filters.genres.excluded.push('');
        // const value = thisOne.get(category);
      },
      removeIncluded: (context, event) => {
        console.log('removeIncluded');
        const { category, entry, state } = event.payload;
        state[category].included = remove(state[category].included, entry);
        // remove(filters1.genres.included, entry);
        // const { state } = event.payload;
        // const res = remove(state.genres.included, event.payload.entry);
        // console.log('removeIncluded res', res);
        // state.genres.included = res;
        // entryCache.delete(event.payload.entry);
      },
      removeExcluded: (context, event) => {
        console.log('removeExcluded');
        const { category, entry, state } = event.payload;
        state[category].excluded = remove(state[category].excluded, entry);
      },
      includedToExcluded: (context, event) => {
        console.log('removeIncluded');
        const { category, entry, state } = event.payload;
        state[category].excluded.push(entry);
        state[category].included = remove(state[category].included, entry);
      },
      excludedToIncluded: (context, event) => {
        console.log('removeIncluded');
        const { category, entry, state } = event.payload;
        state[category].included.push(entry);
        state[category].excluded = remove(state[category].excluded, entry);
      },
      // included: assign({
      //   count: (context, payload) => {
      //     console.log('this payload: ', payload);
      //     return context.count + 1;
      //   },
      // }),

      // included: assign({
      //   filters: (context, payload) => {
      //     console.log('this payload: ', payload);
      //     console.log('context here- ', context);
      //     const cloneSheepsES6 = [...context.filters.genres.included];

      //     cloneSheepsES6.push('hahaha');
      //     // context.filters.genres.included.push(payload.payload.entry);
      //     return {
      //       ...context.filters,
      //       genres: {
      //         included: cloneSheepsES6,
      //         excluded: context.filters.genres.excluded,
      //       },
      //     };
      //   },
      // }),
    },
  }
);

export const createHomeGameFiltersSlice = () => {
  const entryCache = new Map();
  // const test = new Map<
  //   Category,
  //   {
  //     states: Map<string, State>;
  //     allEntries: [];
  //   }
  // >();

  // const test = new Map<
  //   CorrectFiltersKeys,
  //   | {
  //       states: Map<string, State>;
  //       allEntries: [];
  //     }
  //   | undefined
  // >();

  const again = interpret(stateMachine);

  return createGameFiltersSlice({
    name: 'homeGameFilters',
    initialState: defaultGameFilters,
    reducers: {
      // This is a user selecting an item from the dropdown menu, can only be in the 'off' or 'included' state
      toggleItem: (state, action: PayloadAction<PayloadType>) => {
        const { category, entry } = action.payload;
        const existingItem =
          stateMachine.context.entryCache.get(entry) ||
          stateMachine.initialState;
        const service = stateMachine.transition(existingItem, {
          type: 'TOGGLE',
          payload: {
            category,
            entry,
            state,
          },
        });
        again.execute(service);

        // console.log('after - send', service.context);
        // console.log('filters test 13 - ', filters1);
        stateMachine.context.entryCache.set(entry, service.value);
      },

      incrementItem: (state, action: PayloadAction<PayloadType>) => {
        const { category, entry } = action.payload;
        const existingItem =
          stateMachine.context.entryCache.get(entry) ||
          stateMachine.initialState;
        const service = stateMachine.transition(existingItem, {
          type: 'INCREMENT',
          payload: {
            category,
            entry,
            state,
          },
        });
        again.execute(service);
        stateMachine.context.entryCache.set(entry, service.value);
      },

      removeItem: (state, action: PayloadAction<PayloadType>) => {
        const { category, entry } = action.payload;
        const existingItem =
          stateMachine.context.entryCache.get(entry) ||
          stateMachine.initialState;
        const service = stateMachine.transition(existingItem, {
          type: 'REMOVE_ITEM',
          payload: {
            category,
            entry,
            state,
          },
        });
        again.execute(service);
      },

      clearCategory: (state, action: PayloadAction<keyof CorrectFilters>) => {
        // TODO: Actually select correct category
        // TODO: Update the cache

        // TODO: Just use reset() ?
        stateMachine.context.entryCache.clear();
        const filterKey = action.payload;
        // eslint-disable-next-line no-param-reassign
        state[filterKey] = defaultGameFilters[filterKey];

        // return { ...state, [filterKey]: defaultGameFilters[filterKey] };
      },

      // Overridden from base game filters reducer. We wan't to reset all variables excluding the sortBy filter.
      reset: (state) => {
        entryCache.clear();

        const oldState = state;
        return {
          ...defaultGameFilters,
          sortBy: oldState.sortBy,
        };
      },
    },
  });
};
