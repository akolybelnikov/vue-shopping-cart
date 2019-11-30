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
            v-model="selected"
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

      <v-container> </v-container>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            Cart
          </v-card-title>
          <v-spacer></v-spacer>
          <v-data-table
            v-model="cart"
            :headers="cartHeaders"
            :items="cart"
            :hide-default-footer="true"
            item-key="id"
            class="elevation-0"
          ></v-data-table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ProductList',

  data: () => ({
    singleSelect: false,
    selected: [],
    headers: [
      {
        text: 'Product name',
        align: 'left',
        sortable: 'true',
        value: 'productName',
      },
      {
        text: 'Price, Euro',
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
    products: [],
    cart: [],
    cartHeaders: [
      {
        text: 'Product',
        align: 'left',
        sortable: 'true',
        value: 'productName',
      },
      {
        text: 'Price, Euro',
        align: 'left',
        sortable: 'true',
        value: 'price',
      },
      {
        text: 'Discounted Price',
        align: 'left',
        sortable: 'true',
        value: 'price',
      },
      { text: 'Actions', value: 'add', sortable: false },
    ],
  }),

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
        this.products = this.$store.state.products
    },
    addItem(item: any) {
      console.log(item)
    },
  },
})
</script>
