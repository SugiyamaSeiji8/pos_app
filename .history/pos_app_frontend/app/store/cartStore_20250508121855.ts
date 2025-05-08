import { create } from 'zustand';
import { Product } from '../api/client';

interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  updateQuantity: (prd_id: number, quantity: number) => void;
  removeItem: (prd_id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (product) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.prd_id === product.prd_id);
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.prd_id === product.prd_id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }),
  updateQuantity: (prd_id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.prd_id === prd_id ? { ...item, quantity: Math.max(0, quantity) } : item
      ),
    })),
  removeItem: (prd_id) =>
    set((state) => ({
      items: state.items.filter((item) => item.prd_id !== prd_id),
    })),
  clearCart: () => set({ items: [] }),
})); 