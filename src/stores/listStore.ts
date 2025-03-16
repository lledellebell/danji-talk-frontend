import { create } from 'zustand';

interface ListItem {
  id: number;
  text: string;
}

interface ListState {
  items: ListItem[];
  addItem: (text: string) => void;
  removeItem: (id: number) => void;
}

export const useListStore = create<ListState>((set) => ({
  items: [],
  addItem: (text) =>
    set((state) => ({
      items: [...state.items, { id: Date.now(), text }],
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}));
