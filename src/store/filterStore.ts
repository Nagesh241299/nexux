import {create} from 'zustand'

type FilterState = {
    filters: any[]
    setFilters: (filters: any[]) => void
}

export const useFilterStore = create<FilterState>((set) => ({
    filters: [],
    setFilters: (filters) => set({ filters }),
}))
