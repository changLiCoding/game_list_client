/* eslint-disable no-console */
// TODO: Remove this ^
import { StateValue, createMachine, interpret } from 'xstate';
import { PayloadAction } from '@reduxjs/toolkit';
import { createGameFiltersSlice } from './gameFiltersSlice';
import { GameFiltersSortType } from '@/types/global';
import { remove } from '@/utils/utils';

// TODO: Move this to global types
export type HomeGameFilters = {
  search: string | undefined;
  genres: {
    included: string[];
    excluded: string[];
  };
  platforms: {
    included: string[];
    excluded: string[];
  };
  tags: {
    included: string[];
    excluded: string[];
  };
  year: number | undefined;
  sortBy: GameFiltersSortType | undefined;
  state: string;
};

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
  state: 'off',
};

// TODO: Remove this
type State = string;

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
        | { type: 'INCREMENT'; payload: StatePayloadType },
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
            actions: [
              'included',
              // (context) => console.log(`Before: ${context.count}`), // "Before: 0"
              // // assign({ count: (context) => context.count + 1 }), // count === 2
            ],
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
      // excluded: (context, event) => {
      //   console.log('excluded');
      // },
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
      // removeIncluded: assign({
      //   count: (context) => {
      //     return context.count + 1;
      //   },
      // }),

      // included: (context, event) => {
      //   console.log('included context', context);
      //   const { category, entry } = event.payload;
      //   // assign({ count: (context) => context });
      //   // Off -> Included
      //   // context.stateMap.set(entry, 'included');

      //   // const { state } = event.payload;
      //   // state.genres.included?.push(event.payload.entry);
      //   // entryCache.set(event.payload.entry, 'included');
      //   // const { category, entry } = event.payload;
      //   // const thing = { copy: [...context.filters[category].included] };
      //   // console.log('thing ', thing);
      //   // console.log('category, entry ', category, entry);
      //   // console.log('t', thing);
      //   // thing.copy.push('dd');

      //   // assign({ count: (context) => context.count + 1 }); // count === 1
      //   // return assign({ count: (context) => context.count + 1 }); // count === 2

      //   // console.log(`After: ${JSON.stringify(context.genres)}`);
      // },
    },
  }
);

const filters1 = {
  genres: { ...defaultGameFilters.genres },
  platforms: { ...defaultGameFilters.platforms },
  tags: { ...defaultGameFilters.tags },
};

export const bigTest = () => {
  const entryCache = new Map();
  // const test = new Map<
  //   Category,
  //   {
  //     states: Map<string, State>;
  //     allEntries: [];
  //   }
  // >();

  const test = new Map<
    CorrectFiltersKeys,
    | {
        states: Map<string, State>;
        allEntries: [];
      }
    | undefined
  >();

  const again = interpret(stateMachine);

  return createGameFiltersSlice({
    name: 'test',
    initialState: defaultGameFilters,
    reducers: {
      // This is a user selecting an item from the dropdown menu, can only be in the 'off' or 'included' state
      toggleItem: (state, action: PayloadAction<PayloadType>) => {
        const { category, entry } = action.payload;
        const existingItem =
          stateMachine.context.entryCache.get(entry) ||
          stateMachine.initialState;

        // const testAgain = interpret(stateMachine).start(existingItem);

        // const send = testAgain.send('TOGGLE', {
        //   payload: {
        //     category,
        //     entry,
        //     state,
        //   },
        // });
        const service = stateMachine.transition(existingItem, {
          type: 'TOGGLE',
          payload: {
            category,
            entry,
            state,
          },
        });
        again.execute(service);

        console.log('after - send', service.context);
        console.log('filters test 13 - ', filters1);
        stateMachine.context.entryCache.set(entry, service.value);
        // const service = interpret(stateMachine)
        //   .start(existingItem)
        //   .send('TOGGLE', {
        // payload: {
        //   category,
        //   entry,
        //   state,
        // },
        //   });
        // console.log('existingItem', existingItem);

        // stateMachine.context.entryCache.set(entry, service);

        // const next = service.start(existingItem).send('TOGGLE', {
        //   payload: {
        //     category,
        //     entry,
        //     state,
        //   },
        // });
        // stateMachine.context.stateMap.set(entry, next.value);

        // entryCache.set(entry, next);
        //
        //
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

      clearCategory: (state, action: PayloadAction<keyof CorrectFilters>) => {
        // TODO: Actually select correct category
        // TODO: Update the cache

        // TODO: Just use reset() ?
        stateMachine.context.entryCache.clear();
        const filterKey = action.payload;
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
