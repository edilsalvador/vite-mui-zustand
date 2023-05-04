import _ from 'lodash';
import base64 from 'base-64';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { encryptStorage } from 'src/utils/storage';

interface StoreState {
  set: (key: string) => any;
  get: (key: string, defaultValue?: any) => any;
  getAndSet: (key: string, defaultValue?: any) => any;
  reset: () => any;
}

type SetterParams = {
  [key: string]: any;
};

export interface WithStoreResponse {
  getState: () => object;
  setState: (data: object) => any;
}

// zustand
export const createStore = (
  storeKey: string,
  initialStore: object,
  version: number = 0,
) => {
  const initializer = (
    setter: (param: SetterParams) => void,
    getter: () => any,
  ) => ({
    ...initialStore,
    setter,
    getter,
    set: (key: string) => (data: any) => setter({ [key]: data }),
    get: (key: string, defaultValue?: any) => {
      const storeValues = getter();
      const value = _.get(storeValues, key, null);
      if (!value && defaultValue) {
        setter({ [key]: defaultValue }); // set default value
        return defaultValue;
      }
      return value;
    },
    getAndSet: (key: string, defaultValue?: any) => {
      const storeValues = getter();
      const value = _.get(storeValues, key, null);
      const setValue = (data: any) => setter({ [key]: data });
      if (!value && defaultValue) {
        setter({ [key]: defaultValue }); // set default value
        return [defaultValue, setValue];
      }
      return [value, setValue];
    },
    reset: () => {
      return () => setter(initialStore);
    },
  });

  return create(
    persist(initializer, {
      version,
      name: storeKey,
      getStorage: () => encryptStorage,
      deserialize: (str: string) => JSON.parse(base64.decode(str)),
      serialize: (state: Object) => base64.encode(JSON.stringify(state)),
    }),
  );
};

type StateObject = {
  [key in string]: any;
};

export const withStore = (
  storeKey: string,
  initialStore: object,
  version: number = 0,
) => {
  const store = createStore(storeKey, initialStore, version);
  return () => ({
    getState: () => {
      const state = store.getState();
      const stateResponse: StateObject = _.omit(state, [
        'set',
        'get',
        'getAndSet',
        'reset',
        'setter',
        'getter',
      ]);
      return stateResponse;
    },
    setState: () => (newState: StateObject) =>
      store.setState(prevState => ({ ...prevState, ...newState })),
    set: (key: string) => store((state: StoreState) => state.set(key)),
    get: (key: string, defaultValue?: any) =>
      store((state: StoreState) => state.get(key, defaultValue)),
    getAndSet: (key: string, defaultValue?: any) =>
      store((state: StoreState) => state.getAndSet(key, defaultValue)),
    reset: () => store((state: StoreState) => state.reset()),
  });
};
