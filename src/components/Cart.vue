<template>
    <div class="cart-modal modal">
        <div class="modal-container" ref="modalRef">
            <h2>Carrinho</h2>
            <div class="cart-items" v-if="uniqueCartItems.length > 0">
                <div class="cart-item" v-for="(item, index) in uniqueCartItems" :key="item.id">
                    <div class="cart-item-img">
                        <img :src="item.img" :alt="item.name" />
                    </div>
                    <div class="cart-item-info">
                        <h3>{{ item.name }}</h3>
                        <p>{{ formatCurrency(item.price) }}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="btn btn-remove" @click="cart.removeProduct(index)">-</button>
                        <span>{{ itemQuantity(item.id) }}</span>
                        <button class="btn btn-add" @click="cart.addProduct(item)">+</button>
                    </div>
                    <button class="btn btn-remove-all" @click="cart.removeWholeProduct(item.id)">Remove</button>
                </div>
            </div>
            <div class="no-items" v-else>
                <h1>Seu carrinho está vazio</h1>
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

</style>