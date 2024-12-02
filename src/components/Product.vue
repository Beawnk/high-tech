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
                    <p>{{ product.stock }}</p>
                </div>
                <div class="product-description">
                    <h4>Descrição</h4>
                    <p>{{ product.description }}</p>
                </div>
                <div class="reviews" :class="{active: showReviews}">
                    <h4 @click="showReviews = !showReviews" >Reviews</h4>
                    <div class="review" v-for="review in product.reviews" :key="review.id" v-show="showReviews">
                        <div class="rating">
                            <h5>{{ review.name }} |</h5>
                            <span>{{ review.rating }}/5</span>
                        </div>
                        <p class="comment">{{ review.comment }}</p>
                    </div>
                </div>
            </div>
            <button class="btn buy-btn" @click="addItemToCart" :disabled="product.stock === 0">Comprar</button>
            <button class="btn exit-btn" @click="$emit('toggle-modal')"></button>
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
const cart = ref([]);

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

function addItemToCart() {
    product.value.stock--;
    const {id, name, price} = product.value;
    console.log(id, name, price);
    cart.value.push({id, name, price});
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

@include variables.keyframes(slide-down) {
    0% {
        opacity: 0;
        transform: translateY(-20px); 
    }
    100% { 
        opacity: 1;
        transform: translateY(0px); 
    }
}

@include variables.keyframes(hide) {
    0% {
        opacity: 1;
        transform: translateY(0px); 
    }
    100% { 
        opacity: 0;
        transform: translateY(-20px); 
    }
}

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
        height: 600px;
        overflow: auto;
        .product-img {
            width: 30%;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .product-wrap {
            width: 70%;
        }
        .product-info {
            margin-bottom: 40px;
            h3 {
                color: variables.$secondary-color;
                font-size: variables.$title-medium;
                margin-bottom: 10px;
            }
            p {
                color: variables.$primary-color;
                font-size: variables.$text-big;
            }
        }
        .product-description {
            margin-bottom: 40px;
            h4 {
                color: variables.$secondary-color;
                font-size: variables.$subtitle-medium;
            }
            p {
                color: variables.$primary-color;
                font-size: variables.$text-small;
            }
        }
        .reviews {
            max-width: 80%;
            padding-bottom: 20px;
            h4 {
                color: variables.$secondary-color;
                font-size: variables.$subtitle-medium;
                margin-bottom: 10px;
                cursor: pointer;
                display: flex;
                align-items: center;
                &::after {
                    content: "";
                    width: 15px;
                    height: 15px;
                    display: block;
                    background-image: url(../assets/img/open-arrow.png);
                    background-size: 10px;
                    background-position: center;
                    background-repeat: no-repeat;
                    margin-left: 5px;
                    transition: variables.$transition;
                }
            }
            &.active {
                h4 {
                    &::after {
                        transform: rotate(-180deg);
                    }
                }
                .review {
                    opacity: 1;
                    transform: translateY(0px);
                }
            }
            .review {
                padding-bottom: 15px;
                margin-bottom: 15px;
                opacity: 0;
                transform: translateY(-20px);
                transition-property: overlay display opacity transform;
                transition-duration: 0.5s;
                transition-behavior: allow-discrete;
                border-bottom: 1px solid variables.$shadow-color;
                @include variables.animation('slide-down 0.5s');
                .rating {
                    display: flex;
                    align-items: center;
                    margin-bottom: 5px;
                    h5 {
                        color: variables.$primary-color;
                        font-size: variables.$subtitle-small;
                        margin-right: 5px;
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
            position: sticky;
            top: 100%;
            &:disabled {
                filter: contrast(0.5);
                cursor: not-allowed;
                &:hover {
                    background-color: variables.$primary-color;
                }
            }
        }
    }
}
</style>