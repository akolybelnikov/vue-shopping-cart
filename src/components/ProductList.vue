<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            Products
          </v-card-title>
          <v-spacer></v-spacer>
          <v-data-table
            :headers="headers"
            :items="products"
            :items-per-page="5"
            item-key="id"
            class="elevation-3"
          >
            <template v-slot:item.action="{ item }">
              <v-btn icon @click="addItem(item)">
                <v-icon>
                  fas fa-plus
                </v-icon>
              </v-btn>
            </template></v-data-table
          >
        </v-card>
      </v-flex>
    </v-layout>
</v-container>

</template>

<script lang="ts">
import Vue from 'vue'
import { Product } from '@/models/product'
import { CartItem } from '@/models/cartItem'

export default Vue.extend({
  name: 'ProductList',

  data: () => ({
    headers: [
      {
        text: 'Product name',
        align: 'left',
        sortable: 'true',
        value: 'productName',
      },
      {
        text: 'Price (€)',
        align: 'left',
        sortable: 'true',
        value: 'price',
      },
      {
        text: 'Add to cart',
        value: 'action',
        sortable: false,
        align: 'center',
      },
    ],
    products: [] as Product[],
  }),

  computed: {
    total(): number {
      return this.$store.state.total
    },
    cart(): CartItem[] {
      return this.$store.state.cart
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.products = this.$store.state.products
    },
    addItem(item: Product) {
      this.$store.commit('add', item)
    },
    increase(item: CartItem) {
      this.$store.commit('increase', item)
    },
    decrease(item: CartItem) {
      this.$store.commit('decrease', item)
    },
    remove(item: CartItem) {
      this.$store.commit('delete', item)
    },
  },
})
</script>
