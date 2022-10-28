import create from 'zustand'

interface AppState {
  loading: boolean,
  setLoading: (load: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    loading: false,
    setLoading: (load) =>
    set((state) => ({
      ...state,
        load
    })),
}))


