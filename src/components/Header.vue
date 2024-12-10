<template>
    <header class="header" :class="{open: menuMobileOpen}">
        <div class="logo">
            <img src="../assets/img/HighTech.png" alt="HighTech">
        </div>
        <div class="header-content" ref="headerRef">
            <div class="menu-btn" @click="menuMobileOpen = !menuMobileOpen">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav>
                <ul>
                    <li><a href="#products" @click.prevent>Products</a></li>
                </ul>
                <div class="cart-total">
                    <button class="btn cart-btn" @click="handleCartOpen">{{ formatCurrency(cart.cartTotal) + ' | ' +  cart.cartLength }}</button>
                </div>
            </nav>
        </div>
    </header>        
</template>

<script setup>
import { ref, watch, onMounted} from 'vue';
import { useCartStore } from "../stores/cart.js";
import { formatCurrency } from "../composables/formatCurrency.js"; 
import { onClickOutside } from '@vueuse/core';

const emit = defineEmits(['toggle-modal']);

const cart = useCartStore();

const menuMobileOpen = ref(false);
const headerRef = ref(null);

function handleCartOpen() {
    emit('toggle-modal');
}

onClickOutside(headerRef, () => {
    menuMobileOpen.value = false;
});

onMounted(() => {
    cart.loadCart();
});
</script>

<style lang="scss" scoped>
@use '../assets/style/variables' as v;

$header-space: 500px;

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--header-height);
    background-color: transparent;
    color: v.$primary-color;
    font-size: var(--subtitle-medium);
    z-index: 99;
    @include v.media(768px)  {
        color: v.$white-color;
    }
    .logo {
        width: 50px;
        img {
            width: 100%;
        }
    }
    .header-content {
        display: block;
        nav {
            display: flex;
            align-items: center;
            @include v.media(768px) {
                display: none;
                position: absolute;
                top: var(--header-height);
                right: var(--side);
                background-color: v.$primary-color;
                flex-direction: column;
                justify-content: center;
                min-width: 250px;
                transform: translateX(1000px);
                transition-property: overlay, display, transform;
                transition-duration: 0.5s;
                transition-behavior: allow-discrete;
            }
            ul {
                display: flex;
                @include v.media(768px) {
                    flex-direction: column;
                    width: 100%;
                }
                li {
                    margin-right: 20px;
                    @include v.media(768px) {
                        margin-right: 0;
                    }
                    &last-child {
                        margin-right: 0;
                    }
                    a {
                        transition: v.$transition;
                        display: block;
                        @include v.media(768px) {
                        padding: 20px;
                        }
                        &:hover {
                            color: v.$secondary-color;
                        }
                    }
                }
            }
            .cart-total {
                cursor: pointer;
                transition: v.$transition;
                @include v.media(768px) {
                    padding: 20px;
                    width: 100%;
                    background-color: v.$secondary-color;
                }
                &:hover {
                    @include v.media(768px) {
                        background-color: v.$primary-color;
                    }
                }
                .cart-btn {
                    background-color: transparent;
                    color: v.$primary-color;
                    display: flex;
                    align-items: center;
                    padding: 0;
                    transition: v.$transition;
                    @include v.media(768px) {
                        color: v.$white-color;
                        padding: 0;
                        flex-direction: row-reverse;
                    }
                    &::after {
                        content: '';
                        background-image: url('../assets/img/cart.png');
                        width: 20px;
                        height: 20px;
                        display: block;
                        background-size: contain;
                        background-position: center;
                        background-repeat: no-repeat;
                        margin-left: 10px;
                        transition: v.$transition;
                        @include v.media(768px) {
                            background-image: url('../assets/img/cart-mobile.png');
                            margin-left: 0;
                            margin-right: 10px;
                        }
                    }
                    &:hover {
                        color: v.$secondary-color;
                        @include v.media(768px) {
                            color: v.$white-color;
                        }
                        &::after {
                            background-image: url('../assets/img/cart-hover.png');
                            @include v.media(768px) {
                                background-image: url('../assets/img/cart-mobile.png');
                            }
                        }
                    }
                }
            }
        }
        .menu-btn {
            display: none;
            position: relative;
            top: 0;
            left: 0;
            z-index: 1;
            cursor: pointer;
            width: 30px;
            height: 30px;
            @include v.media(768px) {
                display: block;
            }
            span {
                display: block;
                width: 25px;
                height: 4px;
                top: 5px;
                left: 5px;
                margin-bottom: 5px;
                position: relative;
                background-color: v.$primary-color;
                border-radius: 3px;
                z-index: 1;
                transform-origin: 4px 0px;
                transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                            background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                            opacity 0.55s ease;
                &:first-child {
                    transform-origin: 0% 0%;
                }
                &:last-child {
                    transform-origin: 0% 100%;
                }
            }
        }
    }  
    &.open {
        .header-content {
            nav {
                @include v.media(768px) {
                    transform: translateX(0);
                    display: flex;
                    @starting-style {
                        transform: translateX(1000px);
                    }
                }
            }
        }
        .menu-btn {
            span {
                opacity: 1;
                transform: rotate(45deg) translate(3px, -2px);
                background-color: v.$primary-color;
                &:nth-child(2) {
                    opacity: 0;
                    transform: rotate(0deg) scale(0.2, 0.2);
                }
                &:last-child {
                    transform: rotate(-45deg) translate(3px, 2px);
                }
            }
        }
    }
}

</style>