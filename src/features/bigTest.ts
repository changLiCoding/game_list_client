/* eslint-disable no-console */
// TODO: Remove this ^
import { createMachine, interpret } from 'xstate';
import { PayloadAction } from '@reduxjs/toolkit';
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

/* 
  Messages:
  - toggle
    {
      'tags'
      'Action'
    }
  - CLEAR_CATEGORY
    {
      tags
    }
  
  - CLEAR_ALL

  - increment
    {
      'tags'
      'Action'
    }
    - This could be from off -> include, and include -> exclude, and exclude -> off 
*/

/*
  const test = new Map<Category, { 
    states: Map<string, State>
    allEntries: []
  }

*/
export function createBigTest<T>() {
  const entryCache = new Map();
  const stateCache = new Map();
  // const test = new Map<
  //   Category,
  //   {
  //     states: Map<string, State>;
  //     allEntries: [];
  //   }
  // >();

  const stateMachine = createMachine(
    {
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
    }

    // {
    //   actions: {
    //     // action implementations
    //     activate: (context, event) => {
    //       console.log('activating...');
    //       console.log('context: ', context);
    //       console.log('event: ', event);
    //     },
    //     notifyActive: (context, event) => {
    //       console.log('active!');
    //     },
    //     notifyInactive: (context, event) => {
    //       console.log('inactive!');
    //     },
    //     sendTelemetry: (context, event) => {
    //       console.log('time:', Date.now());
    //     },
    //   },
    // }
  );

  type PayloadType = {
    category: 'genres';
    entry: string;
    test?: keyof HomeGameFilters;
  };

  const machineActor = interpret(stateMachine);
  machineActor.start();

  function rebuildCache() {}

  // export type HomeGameFilters = {
  //   search: string | undefined;
  //   genres: {
  //     included: string[] | undefined;
  //     excluded: string[] | undefined;
  //   };
  //   platforms: {
  //     included: string[] | undefined;
  //     excluded: string[] | undefined;
  //   };
  //   tags: {
  //     included: string[] | undefined;
  //     excluded: string[] | undefined;
  //   };
  //   year: number | undefined;
  //   sortBy: GameFiltersSortType | undefined;
  //   state: string;
  // };

  return createGameFiltersSlice<HomeGameFilters>(
    'bigTest',
    defaultGameFilters,
    {
      // This is a user selecting an item from the dropdown menu, can only be in the 'off' or 'included' state
      toggleItem: (state, action: PayloadAction<PayloadType>) => {
        const test = action;
        console.log('test = ', test);
        // const exsistingItem = entryCache.get(
        const next = machineActor.send('TOGGLE', {
          payload: action.payload,
        });

        console.log('Toggle Next = ', next);
        console.log('Toggle Payload (from machine) = ', next.event);
        state.state = next.value;

        // entryCache.set('entry', next.value);
      },

      incrementItem: (state, action) => {
        const next = machineActor.send('INCREMENT');
        state.state = next.value;
        console.log('Increment Next = ', next.value);
      },

      clearCategory: (state, action) => {
        const next = machineActor.send('INCREMENT');
        state.state = next.value;
        console.log('Increment Next = ', next.value);
      },

      // clearAll: (state, action) => {
      //   const next = machineActor.send('INCREMENT');
      //   state.state = next.value;
      //   console.log('Increment Next = ', next.value);
      // },
    }
  );
}
export const { setView } = homeSearchSlice.actions;

// return createSlice({
//   name: 'ds',
//   initialState: defaultGameFilters,
//   reducers: {
//     setFilter: (state, action) => {
//       setFilters(state, action);
//     },
//     resetFilter: (state, action) => {
//       setFilters(state, action);
//     },

//     clear: (state, action) => {
//       setFilters(state, action);
//     },
//     // This is a user selecting an item from the dropdown menu, can only be in the 'off' or 'included' state
//     toggleItem: (state, action) => {
//       const next = machineActor.send('TOGGLE', {});
//       console.log('Toggle Next = ', next);
//       state.state = next.value;

//       entryCache.set('entry', next.value);
//     },

//     incrementItem: (state, action) => {
//       const next = machineActor.send('INCREMENT');
//       state.state = next.value;
//       console.log('Increment Next = ', next.value);
//     },

//     // clearCategory: (state, action) => {
//     //   const next = machineActor.send('INCREMENT');
//     //   state.state = next.value;
//     //   console.log('Increment Next = ', next.value);
//     // },

//     // clearAll: (state, action) => {
//     //   const next = machineActor.send('INCREMENT');
//     //   state.state = next.value;
//     //   console.log('Increment Next = ', next.value);
//     // },
//   },
// });
