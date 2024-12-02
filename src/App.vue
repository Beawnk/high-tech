<template> 
  <ProductsList />
</template>

<script setup>
import ProductsList from './components/ProductsList.vue';

components: {ProductsList};
</script>

<style lang="scss" scoped>
@use "./assets/style/variables";

#app {
  background-image: linear-gradient(to right, variables.$primary-color, variables.$secondary-color);
}

</style>
