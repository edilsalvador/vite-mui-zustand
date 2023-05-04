import { withStore } from 'src/store';

// store name
export const USER_STORE_KEY = 'user-store';

// initial values
const initialState = {
  address: '',
  email: '',
};

// key mapping
export const USER_STORE = {
  address: 'address',
  email: 'email',
};

export const useUserStore = withStore(USER_STORE_KEY, initialState);
