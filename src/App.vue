<template>
  <v-app>
    <v-app-bar app color="secondary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="20"
        />

        <v-subheader
          alt="App Name"
          class="shrink mt-1"
          contain
          min-width="100"
          width="100"
        >
          Vue Shopping Cart
        </v-subheader>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <ProductList />
      <ProductCart />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import ProductList from '@/components/ProductList.vue'
import ProductCart from '@/components/ProductCart.vue'

export default Vue.extend({
  name: 'App',

  components: {
    ProductList,
    ProductCart,
  },

  data: () => ({
    //
  }),
})
</script>
