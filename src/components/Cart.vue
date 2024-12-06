<template>
    <div class="cart-modal modal">
        <div class="modal-container" ref="modalRef">
            <div class="cart-content">
                <h2>Carrinho</h2>
                <div class="cart-items" v-if="uniqueCartItems.length > 0">
                    <div class="cart-item" v-for="(item, index) in uniqueCartItems" :key="item.id">
                        <div class="cart-wrap">
                            <div class="cart-item-img">
                            <img :src="item.img" :alt="item.name" />
                            </div>
                            <div class="cart-item-info">
                                <h3>{{ item.name }}</h3>
                                <p>{{ formatCurrency(item.price) }}</p>
                            </div>
                        </div>
                        <div class="cart-item-buttons">
                            <div class="cart-item-quantity">
                                <button class="btn btn-quantity remove small light" @click="cart.removeProduct(index)"></button>
                                <span>{{ itemQuantity(item.id) }}</span>
                                <button class="btn btn-quantity add small light" @click="cart.addProduct(item)"></button>
                            </div>
                            <button class="btn btn-remove-all small" @click="cart.removeWholeProduct(item.id)"></button>
                        </div>

                    </div>
                </div>
                <div class="no-items" v-else>
                    <h1>Seu carrinho está vazio</h1>
                </div>
            </div>
            <div class="cart-total" v-if="uniqueCartItems.length > 0">
                <h3>Total: {{ formatCurrency(cart.cartTotal) }}</h3>
            </div>
            <button class="btn exit-btn" @click="handleExitClick"></button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { formatCurrency } from "../composables/formatCurrency.js"; 
import { useCartStore } from "../stores/cart.js";
import { onClickOutside } from '@vueuse/core';

const emit = defineEmits(['close-modal']);

const cart = useCartStore();

const modalRef = ref(null);

function handleExitClick() {
    emit('close-modal');
}

function itemQuantity(id) {
    return cart.cartValue.filter((item) => item.id === id).length;
} 
    
const uniqueCartItems = computed(() => {
    const itemMap = new Map();
    cart.cartValue.forEach(item => {
        if (!itemMap.has(item.id)) {
            itemMap.set(item.id, item);
        }
    });
    return Array.from(itemMap.values());
});

onClickOutside(modalRef, () => {
    handleExitClick();
});

</script>

<style lang="scss" scoped>
@use '../assets/style/variables' as v;

.cart-modal.open {
    .modal-container {
        display: block;
        padding: 0;
    }
}

.cart-content {
    padding: 20px;
}

.no-items {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    h1 {
        font-size: v.$title-small;
        color: v.$primary-color;
    }
}

.cart-total {
    padding: 20px;
    background-color: v.$secondary-color;
    h3 {
        font-size: v.$subtitle-medium;
        color: v.$white-color;
    }
}

.cart-items {
    overflow: auto;
    width: 100%;
    .cart-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        border-bottom: 1px solid v.$shadow-color;
        .cart-wrap {
            display: flex;
            align-items: center;
            .cart-item-img {
                width: 50px;
                height: 50px;
                margin-right: 20px;
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .cart-item-info {
                h3 {
                    font-size: v.$subtitle-small;
                    color: v.$secondary-color;
                }
                p {
                    font-size: v.$text-small;
                    color: v.$primary-color;
                }
            }
        }
        .cart-item-buttons {
            display: flex;
            align-items: center;
            .cart-item-quantity {
                display: flex;
                align-items: center;
                margin-right: 20px;
                .btn-quantity {
                    background-size: 20px;
                    background-repeat: no-repeat;
                    background-position: center;
                    &.remove {
                        background-image: url('../assets/img/less.png');
                        background-size: 15px;
                        &:hover {
                            background-image: url('../assets/img/less-hover.png');
                        }
                    }
                    &.add {
                        background-image: url('../assets/img/plus.png');
                        &:hover {
                            background-image: url('../assets/img/plus-hover.png');
                        }
                    }
                }
                span {
                    margin: 0 1rem;
                    font-size: v.$text-small;
                    color: v.$primary-color;
                }
            }
            .btn-remove-all {
                background-size: 15px;
                background-repeat: no-repeat;
                background-position: center;
                background-image: url('../assets/img/trash.png');
            }
        }
    }
}

</style>