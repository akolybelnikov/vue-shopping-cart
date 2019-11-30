import { products } from "@/mocks/data";
import { CartAction } from "@/models/cartAction";
import { CartItem } from "@/models/cartItem";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const cart: CartItem[] = [];
const actions: CartAction[] = [];

export default new Vuex.Store({
  state: {
    products,
    cart,
    total: 0,
    actions,
    discounted: false,
    codeMessage: "",
    discountedTotal: 0
  },
  mutations: {
    add(state, product) {
      const exists = state.cart.find(p => p.item.id === product.id);

      if (exists) {
        exists.amount++;
        exists.total = round(product.price * exists.amount);
        state.total = round(state.total + exists.item.price);
      } else {
        state.cart.push({ item: product, amount: 1, total: product.price });
        state.total = round(state.total + product.price);
      }

      state.discountedTotal = 0;
      state.discounted = false;
      state.codeMessage = "";

      state.actions.push({
        type: "add",
        datetime: new Date(),
        productId: product.id
      });
    },
    increase(state, product) {
      const cartItem = state.cart.find(i => i.item.id === product.item.id);
      if (cartItem && cartItem.amount < 1000) {
        cartItem.amount++;
        cartItem.total = round(cartItem.total + product.item.price);
        state.total = round(state.total + product.item.price);

        state.discountedTotal = 0;
        state.discounted = false;
        state.codeMessage = "";

        state.actions.push({
          type: "increase",
          datetime: new Date(),
          productId: product.item.id
        });
      }
    },
    decrease(state, product) {
      const i = state.cart.findIndex(i => i.item.id === product.item.id);
      if (i !== -1) {
        if (state.cart[i].amount > 1) {
          state.cart[i].amount--;
          state.cart[i].total = round(state.cart[i].total - product.item.price);
          state.total = round(state.total - product.item.price);
        } else {
          state.cart.splice(i, 1);
          state.total = round(state.total - product.item.price);
        }

        state.discountedTotal = 0;
        state.discounted = false;
        state.codeMessage = "";

        state.actions.push({
          type: "decrease",
          datetime: new Date(),
          productId: product.item.id
        });
      }
    },
    remove(state, product) {
      const i = state.cart.findIndex(i => i.item.id === product.item.id);
      if (i !== -1) {
        state.total = round(state.total - state.cart[i].total);
        state.cart.splice(i, 1);

        state.discountedTotal = 0;
        state.discounted = false;
        state.codeMessage = "";

        state.actions.push({
          type: "remove",
          datetime: new Date(),
          productId: product.item.id
        });
      }
    },
    empty(state) {
      state.cart = [];
      state.total = 0;
      state.discountedTotal = 0;
      state.discounted = false;
      state.codeMessage = "";

      state.actions.push({
        type: "empty",
        datetime: new Date()
      });
    },
    apply(state, code) {
      if (code === "12345") {
        state.discounted = true;
        state.codeMessage = "Applied discount - 10%";
        state.discountedTotal = round((state.total / 100) * 90);
      } else {
        state.codeMessage = "Invalid discount code";
        state.discounted = false;
      }
    },
    reset(state) {
      state.codeMessage = "";
    }
  },
  actions: {},
  modules: {}
});

// Avoiding rounding problem by using numbers represented in exponential notation:
function round(amount: number) {
  return Number(Math.round(Number(amount + "e2")) + "e-2");
}
