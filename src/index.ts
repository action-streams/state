import { Action } from '@action-streams/core';

type Reducer<State> = (state: State, action: Action) => State;

const combineReducers = <State>(
  obj: {
    [Key in keyof State]: Reducer<State[Key]>;
  }
): Reducer<State> => (state: State, action: Action) => {
  const keys = Object.keys(obj) as (keyof State)[];

  return keys.reduce<Partial<State>>((acc, key) => {
    const reducer: Reducer<State[typeof key]> = obj[key];

    acc[key] = reducer(state[key], action);

    return acc;
  }, {}) as State;
};

export { combineReducers, Reducer };
