import * as zustand from 'zustand'

export const useParticipantsStore = zustand.create<{
  items: string[]
  add: (item: string) => void
  remove: (index: number) => void
  setItems: (items: string[]) => void
}>((set) => ({
  items: [],
  add: (item) => set((state) => ({ items: [...state.items, item] })),
  remove: (index) => set((state) => ({ items: state.items.filter((_, i) => i !== index) })),
  setItems: (items) => set({ items }),
}))
