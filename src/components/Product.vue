<template>
    <div class="modal product-modal">
        <div class="modal-container">
            <div class="product-img">
                <img :src="product.img" :alt="product.name">
            </div>
            <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p>{{ formatCurrency(product.price) }}</p>
            </div>
            Produto: {{ product }}
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { formatCurrency } from "../composables/formatCurrency.js";

const props = defineProps(['productId']);

const product = ref({});
const getProduct = async (id) => {
    const res = await fetch(`./src/api/products/${id}/data.json`);
    const data = await res.json();
    product.value = data;
};

watch(() => props.productId, (newId) => {
    getProduct(newId);
});

onMounted(() => {
    getProduct(props.productId);
});
</script>

<style lang="scss" scoped>

</style>