import create from 'zustand'

interface AppState {
  loading: boolean,
  setLoading: (load: boolean) => void;
  progress: number,
    setProgress: (progress: number) => void
}

export const useAppStore = create<AppState>((set) => ({
    loading: false,
    setLoading: (load) =>
    set((state) => ({
      ...state,
        load
    })),
    progress: 0,
    setProgress: (progress)=>
        set((state) => ({
            ...state,
            progress
        })),
}))


