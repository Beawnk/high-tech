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
                <button class="btn cart-btn">{{ formatCurrency(cart.cartTotal) + ' | ' +  cart.cartLength }}</button>
            </div>
        </div>
    </header>        
</template>

<script setup>
import { ref, watch, onMounted} from 'vue';
import { useCartStore } from "../stores/cart.js";
import { formatCurrency } from "../composables/formatCurrency.js"; 

const cart = useCartStore();

onMounted(() => {
    cart.loadCart();
});
</script>

<style lang="scss" scoped>
@use '../assets/style/variables';

$header-space: 500px;

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: variables.$header-height;
    background-color: transparent;
    color: variables.$primary-color;
    font-size: variables.$subtitle-medium;
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
                        transition: variables.$transition;
                        &:hover {
                            color: variables.$secondary-color;
                        }
                    }
                }
            }
        }
        .cart-total {
            .cart-btn {
                background-color: transparent;
                color: variables.$primary-color;
                display: flex;
                align-items: center;
                padding: 10px;
                transition: variables.$transition;
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
                    transition: variables.$transition;
                }
                &:hover {
                    color: variables.$secondary-color;
                    &::after {
                        background-image: url('../assets/img/cart-hover.png');
                    }
                }
            }
        }
    }   
}

</style>