<template>
    <div class="modal product-modal">
        <div class="modal-container" ref="modalRef">
            <div class="product-img">
                <img :src="product.img" :alt="product.name">
            </div>
            <div class="product-wrap">
                <div class="product-info">
                    <h3>{{ product.name }}</h3>
                    <p>{{ product.price }}</p>
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
                <button class="btn buy-btn">Comprar</button>
                <button class="btn exit-btn" @click="$emit('toggle-modal')"></button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { formatCurrency } from "../composables/formatCurrency.js"; 
import { onClickOutside } from '@vueuse/core';

const props = defineProps(['productId']);
const emit = defineEmits(['toggle-modal']);

const product = ref({});
const showReviews = ref(false);
const modalRef = ref(null);

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

onClickOutside(modalRef, () => {
    emit('toggle-modal');
});

watch(() => props.productId, (newId) => {
    getProduct(newId);
});

onMounted(() => {
    getProduct(props.productId);
});
</script>

<style lang="scss" scoped>
@use '../assets/style/variables';

$modal-width: 1200px;
$modal-padding: 20px;

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: variables.$shadow-color;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    .modal-container {
        width: $modal-width;
        background-color: variables.$white-color;
        padding: $modal-padding;
        border-radius: variables.$br-medium;
        display: flex;
        gap: 20px;
        position: relative;
        .product-img {
            width: 30%;
            img {
                width: 100%;
                height: auto;
            }
        }
        .product-info {
            h3 {
                color: variables.$secondary-color;
                font-size: variables.$title-medium;
                margin-bottom: 10px;
            }
            p {
                color: variables.$primary-color;
                font-size: variables.$text-medium;
            }
        }
        .product-description {
            h4 {
                color: variables.$primary-color;
                font-size: variables.$title-small;
            }
            p {
                color: variables.$primary-color;
                font-size: variables.$text-small;
            }
        }
        .reviews {
            h4 {
                color: variables.$primary-color;
                font-size: variables.$title-small;
                cursor: pointer;
            }
            .review {
                .rating {
                    display: flex;
                    justify-content: space-between;
                    h3 {
                        color: variables.$primary-color;
                        font-size: variables.$title-small;
                    }
                    span {
                        color: variables.$primary-color;
                        font-size: variables.$text-small;
                    }
                }
                .comment {
                    color: variables.$primary-color;
                    font-size: variables.$text-small;
                }
            }
        }
        .buy-btn {
            position: absolute;
            bottom: $modal-padding;
            right: $modal-padding;
        }
    }
}
</style>