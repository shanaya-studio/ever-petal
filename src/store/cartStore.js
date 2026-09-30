import { create } from "zustand";
//Create a Store
const useCartStore = create((set) => ({
  // state
  cartItems: [],

  //Actions
  // Add item to cart
  addToCart: (flower, quantity) =>
    set((state) => {
      const existingItem = state.cartItems.find((item) => item.id === flower.id);

      // If flower already exists, increase quantity
      if (existingItem) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === flower.id
              ? {
                ...item,
                quantity: item.quantity + quantity,
              }
              : item
          ),
        };
      }

      // Otherwise add new flower
      return {
        cartItems: [
          ...state.cartItems,
          {
            ...flower,
            quantity: quantity,
          },
        ],
      };
    }),

  // Increase quantity
  increaseQuantity: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? {...item,quantity: item.quantity + 1,}: item
      ),
    })),

  // Decrease quantity
  decreaseQuantity: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id && item.quantity > 1 ? {...item,quantity: item.quantity - 1,}: item
      ),
    })),

  // Remove item
  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter(
        (item) => item.id !== id
      ),
    })),

  // Clear cart
  clearCart: () =>
    set({
      cartItems: [],
    }),
}));

export default useCartStore;
// What this store does

// You now have one central place for:

// cartItems
// addToCart()
// increaseQuantity()
// decreaseQuantity()
// removeItem()
// clearCart()