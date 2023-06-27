/* eslint-disable no-console */
// TODO: Remove this ^
import { createMachine, interpret } from 'xstate';
import { Draft, PayloadAction } from '@reduxjs/toolkit';
import { createGameFiltersSlice } from './gameFiltersSlice';
import { GameFiltersSortType } from '@/types/global';

// TODO: Move this to global types
export type HomeGameFilters = {
  search: string | undefined;
  genres: {
    included: string[] | undefined;
    excluded: string[] | undefined;
  };
  platforms: {
    included: string[] | undefined;
    excluded: string[] | undefined;
  };
  tags: {
    included: string[] | undefined;
    excluded: string[] | undefined;
  };
  year: number | undefined;
  sortBy: GameFiltersSortType | undefined;
  state: string;
};

type PayloadType = {
  category: 'genres';
  entry: string;
  test?: keyof HomeGameFilters;
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

// const entryCache = new Map();
// const stateCache = new Map();
// // const test = new Map<
// //   Category,
// //   {
// //     states: Map<string, State>;
// //     allEntries: [];
// //   }
// // >();

// const stateMachine = createMachine(
//   {
//     id: 'includeExcludeMachine',
//     predictableActionArguments: true,
//     initial: 'off',
//     states: {
//       off: {
//         on: {
//           TOGGLE: 'included',
//           INCREMENT: 'included',
//         },
//       },

//       included: {
//         on: {
//           TOGGLE: {
//             target: 'off',
//             actions: (context, event) => {
//               console.log('activating...');
//               console.log('context: ', context);
//               console.log('event: ', event);
//             },
//           },
//           INCREMENT: 'excluded',
//         },
//       },

//       excluded: {
//         on: {
//           TOGGLE: 'included',
//           INCREMENT: 'off',
//         },
//       },
//     },
//   }

export const bigTest = () => {
  const entryCache = new Map();
  const stateCache = new Map();
  // const test = new Map<
  //   Category,
  //   {
  //     states: Map<string, State>;
  //     allEntries: [];
  //   }
  // >();

  const stateMachine = createMachine({
    id: 'includeExcludeMachine',
    predictableActionArguments: true,
    initial: 'off',
    states: {
      off: {
        on: {
          TOGGLE: 'included',
          INCREMENT: 'included',
        },
      },

      included: {
        on: {
          TOGGLE: {
            target: 'off',
            actions: (context, event) => {
              console.log('activating...');
              console.log('context: ', context);
              console.log('event: ', event);
            },
          },
          INCREMENT: 'excluded',
        },
      },

      excluded: {
        on: {
          TOGGLE: 'included',
          INCREMENT: 'off',
        },
      },
    },
  });

  const entry = 'Puzzle';

  return createGameFiltersSlice({
    name: 'test',
    initialState: defaultGameFilters,
    reducers: {
      // This is a user selecting an item from the dropdown menu, can only be in the 'off' or 'included' state
      toggleItem: (state, action: PayloadAction<PayloadType>) => {
        console.log('toggleItem entry = ', entry);
        const existingItem = entryCache.get(entry);
        console.log('toggleItem existingItem = ', existingItem);
        const next = stateMachine.transition(existingItem, {
          type: 'TOGGLE',
        });
        console.log('toggleItem next.value = ', next.value);
        entryCache.set(entry, next.value);

        // const next = stateMachine.transition('included', { type: 'INCREMENT' });
        // console.log('Toggle Next = ', next);
        // console.log('Toggle Payload (from machine) = ', next.event);

        // eslint-disable-next-line no-param-reassign
        state.state = next.value;
        // entryCache.set('entry', next.value);
      },

      incrementItem: (state, action: PayloadAction<PayloadType>) => {
        console.log('incrementItem entry = ', entry);
        const existingItem = entryCache.get(entry);
        console.log('incrementItem existingItem = ', existingItem);
        const next = stateMachine.transition(existingItem, {
          type: 'INCREMENT',
        });
        console.log('incrementItem next.value = ', next.value);
        entryCache.set(entry, next.value);

        // console.log('incrementItem test = ', entry);
        // const existingItem = entryCache.get(entry);
        // const next = stateMachine.transition(existingItem, {
        //   type: 'INCREMENT',
        // });
        // entryCache.set(entry, next.value);

        // const nextt = machineActor.send('INCREMENT');
        // eslint-disable-next-line no-param-reassign
        state.state = next.value;
      },

      clearCategory: (state, action: PayloadAction<keyof HomeGameFilters>) => {
        // TODO: Actually select correct category
        // TODO: Update the cache

        // TODO: Just use reset() ?
        const filterKey = action.payload;
        return { ...state, [filterKey]: defaultGameFilters[filterKey] };
      },

      // Only keep the sortBy filter as is, the user probably doesn't want to reset this
      clearAll: (state) => {
        // TODO: Clear cache?

        console.log('cleared all');
        const oldState = state;
        return {
          ...defaultGameFilters,
          sortBy: oldState.sortBy,
        };
      },
    },
  });
};

// const gameFiltersSlice = createGameFiltersSlice<HomeGameFilters>(
//   'bigTest',
//   defaultGameFilters,
//   {
//     toggleItem: (state, action: PayloadAction<PayloadType>) => {
//       const test = action;
//       console.log('test = ', test);
//       // Custom logic for toggleItem reducer
//     },
//     // Add more custom reducers here
//   }
// );

// const { toggleItem } = gameFiltersSlice.actions; // Extract toggleItem reducer

// // Use the reducers as needed
// const { reducer } = gameFiltersSlice;

// return {
//   reducer,
//   setFilters: gameFiltersSlice.actions.setFilters,
//   resetFilter: gameFiltersSlice.actions.resetFilter,
//   reset: gameFiltersSlice.actions.reset,
//   toggleItem,
// };
