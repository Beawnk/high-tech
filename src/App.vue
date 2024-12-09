<template> 
  <Alert v-show="cart.alert" class="success">{{ cart.alertMsg }}</Alert>
  <Header @toggle-modal="cartModal = !cartModal" />
  <Cart v-show="cartModal" @close-modal="cartModal = false" :class="{open: cartModal}"/>
  <ProductsList />
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useCartStore } from "./stores/cart.js";
import ProductsList from './components/ProductsList.vue';
import Alert from './components/Alert.vue';
import Header from './components/Header.vue';
import Cart from './components/Cart.vue';

const cart = useCartStore();

const cartModal = ref(false);

</script>

<style lang="scss" scoped>
@use "./assets/style/variables" as v;

</style>
