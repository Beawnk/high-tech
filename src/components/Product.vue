<template>
    <div class="modal product-modal">
        <div class="modal-container">
            <div class="product-img">
                <img :src="product.img" :alt="product.name">
            </div>
            <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p>{{ product.price }}</p>
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

function getProduct(id) {
    fetch(`./src/api/products/${id}/data.json`)
        .then((res) => res.json())
        .then((data) => {
            product.value = data;
            product.value.price = formatCurrency(product.value.price);
            console.log(product.value.price);
        })
        .catch((error) => {
            console.error('Error fetching product:', error);
        });
}

watch(() => props.productId, (newId) => {
    getProduct(newId);
});

onMounted(() => {
    getProduct(props.productId);
    console.log(props.productId);
});
</script>

<style lang="scss" scoped>

</style>