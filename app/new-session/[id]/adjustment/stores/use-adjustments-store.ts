import { BillAdjustment } from "@/app/actions/split-bill";
import { create } from "zustand";

type AdjustmentItem = {
  id?: string; //set to undefined when new item.
  name: string;
  type: BillAdjustment['type'];
  amount?: number;
  percentage?: number;
}

type AdjustmentsBearStore = {
  items: AdjustmentItem[],
}

export const useAdjustmentsStore = create<AdjustmentsBearStore>((set) => {
  return {
    items: [],
    addItem(newItem: AdjustmentItem) {
      return set((state) => ({ ...state, items: [...state.items, newItem] }))
    },
    removeItem(deletedIndex: number) {
      return set((state) => ({ ...state, items: state.items.filter((_, index) => deletedIndex !== index) }))
    },
    init(items: AdjustmentItem[]) {
      return set((_) => ({ items: items }));
    }
  }
})