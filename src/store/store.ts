import create, {StateCreator} from 'zustand'
import { persist } from 'zustand/middleware'
import {PersistOptions} from "zustand/middleware/persist";

interface AppState {
    loading: boolean,
    setLoading: (load: boolean) => void;
    progress: number,
    setProgress: (progress: number) => void;
    housesData: Array<object>;
    setHousesData: (data: Array<object>) => void;
    selectedHouse: string;
    setSelectedHouse: (selectedHouse: string) => void;
}
type MyPersist = (
    config: StateCreator<AppState>,
    options: PersistOptions<AppState>
) => StateCreator<AppState>
export const useAppStore = create<AppState>(
    (persist as unknown as MyPersist)(
        (set, get) => ({
            loading: false,
            setLoading: (load) =>
                set((state) => ({
                    ...state,
                    load
                })),
            progress: 0,
            setProgress: (progress) =>
                set((state) => ({
                    ...state,
                    progress
                })),
            housesData: [],
            setHousesData: (housesData) =>
                set((state) => ({
                    ...state,
                    housesData
                })),
            selectedHouse: '',
            setSelectedHouse: (selectedHouse) =>
                set((state) => ({
                    ...state,
                    selectedHouse
                })),
        }),
        {
            name: 'houses-data', // name of item in the storage (must be unique)
            getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
            // @ts-ignore
            partialize: (state) => ({ housesData: state.housesData, selectedHouse: state.selectedHouse }),
        }
    )
)
