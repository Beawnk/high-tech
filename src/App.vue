<template> 
  <Alert v-show="cart.alert" class="success">{{ cart.alertMsg }}</Alert>
  <Header />
  <ProductsList />
</template>

<script setup>
import { useCartStore } from "./stores/cart.js";
import ProductsList from './components/ProductsList.vue';
import Alert from './components/Alert.vue';
import Header from './components/Header.vue';

const cart = useCartStore();

</script>

<style lang="scss" scoped>
@use "./assets/style/variables" as v;

</style>
