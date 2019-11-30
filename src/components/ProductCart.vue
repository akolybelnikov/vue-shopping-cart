<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            Cart
            <v-spacer></v-spacer>
            <v-chip color="primary" dark>Total amount: {{ total }} €</v-chip>
          </v-card-title>
          <v-data-table
            :headers="cartHeaders"
            :items="cart"
            :items-per-page="10"
            :hide-default-footer="true"
            item-key="item.id"
            class="elevation-0"
          >
            <template v-slot:item.action="{ item }">
              <v-btn icon @click="increase(item)">
                <v-icon small>
                  fas fa-plus
                </v-icon>
              </v-btn>

              <v-btn icon @click="decrease(item)">
                <v-icon small>
                  fas fa-minus
                </v-icon>
              </v-btn>

              <v-btn icon @click="remove(item)">
                <v-icon small>
                  fas fa-trash
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
  name: 'ProductCart',

  data: () => ({
    cartHeaders: [
      {
        text: 'Product',
        align: 'left',
        sortable: 'false',
        value: 'item.productName',
      },
      {
        text: 'Amount',
        align: 'center',
        sortable: 'false',
        value: 'amount',
      },
      {
        text: 'Item price (€)',
        align: 'left',
        sortable: 'false',
        value: 'item.price',
      },
      {
        text: 'Total price (€)',
        align: 'left',
        sortable: 'true',
        value: 'total',
      },
      { text: 'Actions', align: 'center', value: 'action', sortable: false },
    ],
  }),

  computed: {
    total(): number {
      return this.$store.state.total
    },
    cart(): CartItem[] {
      return this.$store.state.cart
    },
  },

  methods: {
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
