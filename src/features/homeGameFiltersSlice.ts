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

export type CorrectFiltersKeys = keyof CorrectFilters;

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
      },
      events: {} as
        | { type: 'TOGGLE'; payload: StatePayloadType }
        | { type: 'INCREMENT'; payload: StatePayloadType }
        | { type: 'REMOVE_ITEM'; payload: StatePayloadType },
    },
    context: {
      entryCache: new Map<string, StateValue>(),
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

  // Look into creating shallow copies instead of updating the state directly? - https://developer.mozilla.org/en-US/docs/Glossary/Shallow_copy
  {
    actions: {
      included: (_context, event) => {
        const { category, entry, state } = event.payload;
        state[category].included.push(entry);
      },
      removeIncluded: (_context, event) => {
        console.log('removeIncluded');
        const { category, entry, state } = event.payload;
        state[category].included = remove(state[category].included, entry);
      },
      removeExcluded: (_context, event) => {
        console.log('removeExcluded');
        const { category, entry, state } = event.payload;
        state[category].excluded = remove(state[category].excluded, entry);
      },
      includedToExcluded: (_context, event) => {
        console.log('removeIncluded');
        const { category, entry, state } = event.payload;
        state[category].excluded.push(entry);
        state[category].included = remove(state[category].included, entry);
      },
      excludedToIncluded: (_context, event) => {
        console.log('removeIncluded');
        const { category, entry, state } = event.payload;
        state[category].included.push(entry);
        state[category].excluded = remove(state[category].excluded, entry);
      },
    },
  }
);

const interpreter = interpret(stateMachine);

export const createHomeGameFiltersSlice = () => {
  const entryCache = new Map();
  const test = new Map<CorrectFiltersKeys, Map<string, StateValue>>([
    ['genres', new Map<string, StateValue>()],
    ['platforms', new Map<string, StateValue>()],
    ['tags', new Map<string, StateValue>()],
  ]);

  return createGameFiltersSlice({
    name: 'homeGameFilters',
    initialState: defaultGameFilters,
    reducers: {
      // This is a user selecting an item from the dropdown menu, can only be in the 'off' or 'included' state
      toggleItem: (state, action: PayloadAction<PayloadType>) => {
        const { category, entry } = action.payload;
        const get = test.get(category);
        const existingItem = get?.get(entry) || stateMachine.initialState;

        const transition = stateMachine.transition(existingItem, {
          type: 'TOGGLE',
          payload: {
            category,
            entry,
            state,
          },
        });
        interpreter.execute(transition);
        get?.set(entry, transition.value);
        // stateMachine.context.entryCache.set(entry, transition.value);
      },

      incrementItem: (state, action: PayloadAction<PayloadType>) => {
        const { category, entry } = action.payload;
        const get = test.get(category);
        const existingItem = get?.get(entry) || stateMachine.initialState;
        const service = stateMachine.transition(existingItem, {
          type: 'INCREMENT',
          payload: {
            category,
            entry,
            state,
          },
        });
        interpreter.execute(service);
        stateMachine.context.entryCache.set(entry, service.value);
        get?.set(entry, service.value);
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
        interpreter.execute(service);

        test.get(category)?.delete(entry);
      },

      clearCategory: (state, action: PayloadAction<keyof CorrectFilters>) => {
        // TODO: Actually select correct category
        // TODO: Update the cache
        const category = action.payload;
        // TODO: Just use reset() ?
        stateMachine.context.entryCache.clear();
        const filterKey = action.payload;
        // eslint-disable-next-line no-param-reassign
        state[filterKey] = defaultGameFilters[filterKey];
        test.get(category)?.clear();
        // return { ...state, [filterKey]: defaultGameFilters[filterKey] };
      },

      // Overridden from base game filters reducer. We wan't to reset all variables excluding the sortBy filter.
      reset: (state) => {
        entryCache.clear();

        // TODO: Loop through every entry in test map and clear THAT hashmap
        test.forEach((e) => e.clear());
        const oldState = state;
        return {
          ...defaultGameFilters,
          sortBy: oldState.sortBy,
        };
      },
    },
  });
};
