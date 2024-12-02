<template>
    <div class="modal product-modal">
        <div class="modal-container">
            <div class="product-img">
                <img :src="product.img" :alt="product.name">
            </div>
            <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p>{{ product.price }}</p>
                <button>Comprar</button>
            </div>
            <div class="product-description">
                <h4>Descrição</h4>
                <p>{{ product.description }}</p>
            </div>
            <div class="reviews" @click="showReviews = !showReviews">
                <h4>Reviews</h4>
                <div class="review" v-for="review in product.reviews" :key="review.id" v-show="showReviews">
                    <div class="rating">
                        <h3>{{ review.name }}</h3>
                        <span>{{ review.rating }}/5</span>
                    </div>
                    <p class="comment">{{ review.comment }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { formatCurrency } from "../composables/formatCurrency.js"; 

const props = defineProps(['productId']);

const product = ref({});
const showReviews = ref(false);

function getProduct(id) {
    fetch(`./src/api/products/${id}/data.json`)
        .then((res) => res.json())
        .then((data) => {
            product.value = data;
            product.value.price = formatCurrency(product.value.price);
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
});
</script>

<style lang="scss" scoped>

</style>