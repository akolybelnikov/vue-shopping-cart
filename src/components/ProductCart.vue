<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            Cart
            <v-spacer></v-spacer>
            <v-btn v-show="cart.length" @click="empty()" raised color="warning"
              >Empty cart</v-btn
            >
            <v-spacer></v-spacer>
            <v-chip dark>Total amount: {{ total }} €</v-chip>
          </v-card-title>
          <v-card-title>
            <v-form ref="form" @submit.prevent="submitCode()">
              <v-container>
                <v-row>
                  <v-col cols="12" xs="12">
                    <v-text-field
                      v-model="discount"
                      ref="discount"
                      :error-messages="codeMessage"
                      :disabled="!cart.length || discounted"
                      label="Discount code"
                      clearable
                      @blur="submitCode()"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
            <v-spacer></v-spacer>
            <v-chip v-show="discounted" color="primary" dark
              >Discounted amount: {{ discountedTotal }} €</v-chip
            >
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
import Vue, { VueConstructor } from 'vue'
import { Product } from '@/models/product'
import { CartItem } from '@/models/cartItem'
import VForm from '@/plugins/vuetify'

export default (Vue as VueConstructor<
  Vue & {
    $refs: {
      discount: InstanceType<typeof VForm>
      form: InstanceType<typeof VForm>
    }
  }
>).extend({
  name: 'ProductCart',

  data: () => ({
    discount: '',
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
    form() {
      return {
        discount: this.discount,
      }
    },
    discounted(): boolean {
      return this.$store.state.discounted
    },
    codeMessage(): string {
      return this.$store.state.codeMessage
    },
    discountedTotal(): number {
      return this.$store.state.discountedTotal
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
      this.$store.commit('remove', item)
    },
    empty() {
      this.$store.commit('empty')
    },
    submitCode() {
      this.$store.commit('apply', this.form.discount)
    },
    resetError() {
      this.$store.commit('reset')
    },
  },
})
</script>
