import { create } from 'zustand';

const useStore = create((set) => ({
  task: {
    taskId: '',
    title: '',
    description: '',
    status: '',
  },
  setTask: (newTask) => set({ task: newTask }),
  resetTask: () =>
    set({
      task: {
        taskId: '',
        title: '',
        description: '',
        status: '',
      },
    }),
}));

export default useStore;
