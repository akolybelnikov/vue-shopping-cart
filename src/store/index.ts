import Vue from 'vue'
import Vuex from 'vuex'
import { Product } from '@/models/product'
import { CartItem } from '@/models/cartItem'

Vue.use(Vuex)

const cart: CartItem[] = []

const products: Product[] = [
  {
    id: 'bea0c670-5c17-420b-a682-db3fdbc609ba',
    productName: 'Soup - Cream Of Broccoli, Dry',
    price: 194.84,
  },
  {
    id: 'c70a90ff-823b-4d34-8d12-6ba32e9f685f',
    productName: 'Juice - Lemon',
    price: 386.31,
  },
  {
    id: '153dc45d-6adf-4bfc-995c-82f6d113ce93',
    productName: 'Paper Towel Touchless',
    price: 809.04,
  },
  {
    id: '7abb0be7-4a56-4398-95cc-bd7309458866',
    productName: 'Bread - Sour Sticks With Onion',
    price: 358.91,
  },
  {
    id: '125a25a2-b604-449a-8e2f-09e0743657a6',
    productName: 'Flour - Strong',
    price: 808.69,
  },
  {
    id: 'f809e081-ff34-4888-9224-23dd9f9afa05',
    productName: 'Pasta - Cheese / Spinach Bauletti',
    price: 959.04,
  },
  {
    id: '6943c1cf-68f4-4efa-a9e5-908e9548d18e',
    productName: 'Milk - Homo',
    price: 833.18,
  },
  {
    id: '2f2e283a-c5c3-492a-a289-e397ffb7890a',
    productName: 'Vodka - Lemon, Absolut',
    price: 356.96,
  },
  {
    id: 'e0e912ea-4244-42a7-8fd8-31d781e74734',
    productName: 'Urban Zen Drinks',
    price: 575.76,
  },
  {
    id: '83395b45-e653-4538-ba17-5c8aae089598',
    productName: 'Spinach - Baby',
    price: 334.8,
  },
  {
    id: 'de1ef779-9ee4-43f5-80ef-ed7d3ca0a259',
    productName: 'Wine - Touraine Azay - Le - Rideau',
    price: 841.72,
  },
  {
    id: '71d18736-82ce-46e1-a2b6-6582565425a3',
    productName: 'Kale - Red',
    price: 795.63,
  },
  {
    id: 'b05138d6-9f0a-4435-b091-39e6c4389c0c',
    productName: 'Wine - Chardonnay Mondavi',
    price: 723.17,
  },
  {
    id: 'af955dc3-6a0e-4db1-a639-0b8ebacf8148',
    productName: 'Nut - Peanut, Roasted',
    price: 818.27,
  },
  {
    id: '35094667-05ca-4a10-a491-498ae00a9617',
    productName: 'Beans - Turtle, Black, Dry',
    price: 944.04,
  },
  {
    id: '537f59fc-138e-4ce5-af2d-4ca9a631bf73',
    productName: 'Flour - Strong Pizza',
    price: 150.71,
  },
  {
    id: 'aeeb6ba5-1987-473c-938a-116f7a1a7fd5',
    productName: 'Grapes - Red',
    price: 458.76,
  },
]

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
        state.total = round(state.total + exists.total)
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
