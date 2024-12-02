<template> 
    <section id="products" class="products" :class="{open: productModal}">
        <div class="product" v-for="product in products" :key="product.id" @click="showProductModal(product.id)">
            <div class="product-img">
                <img :src="product.img" :alt="product.name" />
            </div>
            <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p>{{ formatCurrency(product.price) }}</p>
            </div>
        </div>
    </section>
    <Transition name="fade">
        <Product v-if="productModal" :product-id="dataProductId" @toggle-modal="productModal = false" />
    </Transition>
    
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Product from "../components/Product.vue";
import { formatCurrency } from "../composables/formatCurrency.js";

const products = ref([]);
const productModal = ref(false);
const dataProductId = ref(null);

const getProducts = async () => {
    try {
        const res = await fetch("./src/api/products.json");
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        products.value = data;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
};

const showProductModal = (id) => {
    dataProductId.value = id;
    productModal.value = true;
};

onMounted(() => {
    getProducts();
});
</script>

<style lang="scss" scoped>
@use '../assets/style/variables';

$products-max-width: 900px;

.products {
    max-width: $products-max-width;
    margin: variables.$top auto 0 auto;
    .product {
        cursor: pointer;
        display: flex;
        margin-bottom: 20px;
        padding: 10px;
        border-radius: variables.$br-medium;
        box-shadow: variables.$shadow;
        background-color: variables.$white-color;
        &:last-child {
            margin-bottom: 0;
        }
        .product-img {
            width: 200px;
            height: 200px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .product-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 20px;
            h3 {
                color: variables.$secondary-color;
                font-size: variables.$subtitle-medium;
                margin-bottom: 10px;
            }
            p {
                color: variables.$primary-color;
                font-size: 18px;
            }
        }
    }
}
</style>