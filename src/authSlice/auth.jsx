import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  isLoggedIn: false,
  token: null,
  cart: [],
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.token = action.payload?.token || null;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;
      state.cart = []; 
    },
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cart.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cart = state.cart.filter(item => item.id !== productId);
    },
    updateCartQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.cart.find(item => item.id === productId);
      if (item) {
        if (quantity <= 0) {
          state.cart = state.cart.filter(item => item.id !== productId);
        } else {
          item.quantity = quantity;
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
    placeOrder: (state, action) => {
      // Clear cart after successful order
      state.cart = [];
    },
  },
});
export const { 
  loginSuccess, 
  logout, 
  addToCart, 
  removeFromCart, 
  updateCartQuantity, 
  clearCart,
  placeOrder
} = authSlice.actions;
export default authSlice.reducer;