import * as zustand from 'zustand'

export const useItemsStore = zustand.create<{
  items: String[]
  add: (item: String) => void
  remove: (index: number) => void
  setItems: (items: String[]) => void
}>((set) => ({
  items: [],
  add: (item) => set((state) => ({ items: [...state.items, item] })),
  remove: (index) => set((state) => ({ items: state.items.filter((_, i) => i !== index) })),
  setItems: (items) => set({ items }),
}))
