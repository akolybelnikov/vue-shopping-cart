import Vue from 'vue'
import Vuex from 'vuex'
import { products } from '@/mocks/data'
import { CartItem } from '@/models/cartItem'

Vue.use(Vuex)

const cart: CartItem[] = []

export default new Vuex.Store({
  state: {
    products,
    cart,
    total: 0,
  },
  mutations: {
    add(state, product) {
      const exists = state.cart.find(p => p.item.id === product.id)

      if (exists) {
        exists.amount++
        exists.total = round(product.price * exists.amount)
        state.total = round(state.total + exists.item.price)
      } else {
        state.cart.push({ item: product, amount: 1, total: product.price })
        state.total = round(state.total + product.price)
      }
    },
    increase(state, product) {
      const cartItem = state.cart.find(i => i.item.id === product.item.id)
      if (cartItem) {
        cartItem.amount++
        cartItem.total = round(cartItem.total + product.item.price)
        state.total = round(state.total + product.item.price)
      }
    },
    decrease(state, product) {
      const i = state.cart.findIndex(i => i.item.id === product.item.id)
      if (i !== -1) {
        if (cart[i].amount > 1) {
          cart[i].amount--
          cart[i].total = round(cart[i].total - product.item.price)
          state.total = round(state.total - product.item.price)
        } else {
          cart.splice(i, 1)
          state.total = round(state.total - product.item.price)
        }
      }
    },
    delete(state, product) {
      const i = state.cart.findIndex(i => i.item.id === product.item.id)
      if (i !== -1) {
        cart.splice(i, 1)
        state.total = round(state.total - product.item.price)
      }
    },
  },
  actions: {},
  modules: {},
})

// Avoiding rounding problem by using numbers represented in exponential notation:
function round(amount: number) {
  return Number(Math.round(Number(amount + 'e2')) + 'e-2')
}
