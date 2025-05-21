import { localStorageKeys } from '../constants/localstorage';
const authStorage = {
  remove: () => localStorage.removeItem(localStorageKeys.auth),
  set: (value: string) => localStorage.setItem(localStorageKeys.auth, value),
  get: () => localStorage.getItem(localStorageKeys.auth),
};

export default authStorage;
