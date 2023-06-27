import { createMachine, interpret } from 'xstate';

export const stateMachine = createMachine({
  id: 'includeExcludeMachine',
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
        TOGGLE: 'off',
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

export const machineActor = interpret(stateMachine);
machineActor.start();
