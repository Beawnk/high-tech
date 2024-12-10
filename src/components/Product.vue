<template>
    <div class="modal product-modal">
        <div class="modal-container" ref="modalRef">
            <div class="product-img">
                <img :src="product.img" :alt="product.name">
            </div>
            <div class="product-wrap">
                <div class="product-info">
                    <h3>{{ product.name }}</h3>
                    <p>{{ productNewPrice }}</p>
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
            <button class="btn buy-btn" @click="cart.addProduct(product);" :disabled="isBuyButtonDisabled">{{ buyButtonText }}</button>
            <button class="btn exit-btn" @click="handleExitClick"></button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { formatCurrency } from "../composables/formatCurrency.js"; 
import { useCartStore } from "../stores/cart.js";
import { onClickOutside } from '@vueuse/core';

const props = defineProps(['productId']);
const emit = defineEmits(['toggle-modal']);

const product = ref({});
const showReviews = ref(false);
const modalRef = ref(null);
const cart = useCartStore();
let productNewPrice = ref('');

function getProduct(id) {
    fetch(`../src/api/products/${id}/data.json`)
        .then((res) => res.json())
        .then((data) => {
            product.value = data;
            productNewPrice = formatCurrency(product.value.price);
            changeRoute();
        })
        .catch((error) => {
            console.error('Error fetching product:', error);
        });
}

function changeRoute() {
    document.title = `HighTech | ${product.value.name}` || 'HighTech';
    const hash = product.value.id || ''; 
    history.pushState(null, null, `#${hash}`);
}

function removeRoute() {
    document.title = 'HighTech';
    history.pushState(null, null, '/');
}

function handleExitClick() {
    emit('toggle-modal');
    removeRoute();
}

const isBuyButtonDisabled = computed(() => {
    return product.value.stock === 0 || cart.disabledProducts.has(product.value.id);
});

const buyButtonText = computed(() => {
    return isBuyButtonDisabled.value ? 'Esgotado' : 'Comprar';
    
});

onClickOutside(modalRef, () => {
    handleExitClick();
});

watch(() => props.productId, (newId) => {
    getProduct(newId);
});

onMounted(() => {
    getProduct(props.productId);
});
</script>

<style lang="scss">
@use '../assets/style/variables' as v;

@include v.keyframes(slide-down) {
    0% {
        opacity: 0;
        transform: translateY(-20px); 
    }
    100% { 
        opacity: 1;
        transform: translateY(0px); 
    }
}

:root {
    --product-item-margin: 40px
}

@include v.media(768px) {
    :root {
        --product-item-margin: 20px;
    }
}

.product-img {
    width: 30%;
    @include v.media(768px) {
        width: 100%;
        height: 300px;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.product-wrap {
    width: 70%;
    @include v.media(768px) {
        width: 100%;
    }
}
.product-info {
    margin-bottom: var(--product-item-margin);
    h3 {
        color: v.$secondary-color;
        font-size: var(--title-medium);
        margin-bottom: 10px;
    }
    p {
        color: v.$primary-color;
        font-size: var(--text-big);
    }
}
.product-description {
    margin-bottom: var(--product-item-margin);
    h4 {
        color: v.$secondary-color;
        font-size: var(--subtitle-medium);
    }
    p {
        color: v.$primary-color;
        font-size: var(--text-small);
    }
}
.reviews {
    max-width: 80%;
    padding-bottom: 20px;
    @include v.media(768px) {
        max-width: 100%;
    }
    h4 {
        color: v.$secondary-color;
        font-size: var(--subtitle-medium);
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
            transition: v.$transition;
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
        transition-property: overlay, display, opacity, transform;
        transition-duration: 0.5s;
        transition-behavior: allow-discrete;
        border-bottom: 1px solid v.$shadow-color;
        @include v.animation('slide-down 0.5s');
        .rating {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
            h5 {
                color: v.$primary-color;
                font-size: var(--subtitle-small);
                margin-right: 5px;
            }
            span {
                color: v.$primary-color;
                font-size: var(--text-small);
            }
        }
        .comment {
            color: v.$primary-color;
            font-size: var(--text-small);
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
            background-color: v.$primary-color;
        }
    }
}
</style>