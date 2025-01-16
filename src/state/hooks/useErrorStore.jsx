import { create } from 'zustand';

const useErrorStore = create((set) => ({
  errorMessage: '',
  setErrorMessage: (message) => set({ errorMessage: message }),
  clearErrorMessage: () => set({ errorMessage: '' }),
}));

export default useErrorStore;
