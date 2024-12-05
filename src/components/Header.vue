<template>
<header class="header">
        <div class="logo">
            <img src="../assets/img/HighTech.png" alt="HighTech">
        </div>
        <div class="header-content">
            <nav>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
            <div class="cart-total">
                <button class="btn cart-btn" @click="handleCartOpen">{{ formatCurrency(cart.cartTotal) + ' | ' +  cart.cartLength }}</button>
            </div>
        </div>
    </header>        
</template>

<script setup>
import { ref, watch, onMounted} from 'vue';
import { useCartStore } from "../stores/cart.js";
import { formatCurrency } from "../composables/formatCurrency.js"; 

const emit = defineEmits(['toggle-modal']);

const cart = useCartStore();

function handleCartOpen() {
    emit('toggle-modal');
}

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
    height: v.$header-height;
    background-color: transparent;
    color: v.$primary-color;
    font-size: v.$subtitle-medium;
    z-index: 99;
    .logo {
        width: 50px;
        img {
            width: 100%;
        }
    }
    .header-content {
        display: flex;
        align-items: center;
        nav {
            ul {
                display: flex;
                li {
                    margin-right: 20px;
                    &last-child {
                        margin-right: 0;
                    }
                    a {
                        transition: v.$transition;
                        &:hover {
                            color: v.$secondary-color;
                        }
                    }
                }
            }
        }
        .cart-total {
            .cart-btn {
                background-color: transparent;
                color: v.$primary-color;
                display: flex;
                align-items: center;
                padding: 10px;
                transition: v.$transition;
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
                }
                &:hover {
                    color: v.$secondary-color;
                    &::after {
                        background-image: url('../assets/img/cart-hover.png');
                    }
                }
            }
        }
    }   
}

</style>