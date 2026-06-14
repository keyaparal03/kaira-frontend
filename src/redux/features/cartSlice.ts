import {
  createSlice
} from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: []
};

const cartSlice =
  createSlice({
    name: "cart",

    initialState,

    reducers: {

      addToCart:
        (state, action) => {

          const existingItem =
            state.cartItems.find(
              (item) =>
                item._id ===
                action.payload._id
            );

          if (existingItem) {

            existingItem.quantity += 1;

          } else {

            state.cartItems.push({
              ...action.payload,
              quantity: 1
            });

          }
        },

      removeFromCart:
        (state, action) => {

          state.cartItems =
            state.cartItems.filter(
              (item) =>
                item._id !==
                action.payload
            );
        },

      increaseQty:
        (state, action) => {

          const item =
            state.cartItems.find(
              (item) =>
                item._id ===
                action.payload
            );

          if (item) {
            item.quantity += 1;
          }
        },

      decreaseQty:
        (state, action) => {

          const item =
            state.cartItems.find(
              (item) =>
                item._id ===
                action.payload
            );

          if (
            item &&
            item.quantity > 1
          ) {
            item.quantity -= 1;
          }
        }
    }
  });

export const {

  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty

} = cartSlice.actions;

export default
  cartSlice.reducer;