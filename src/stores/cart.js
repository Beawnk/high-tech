import {defineStore} from 'pinia'
import { ref, computed, watch } from 'vue';

export const useCartStore = defineStore('cart', () => {
    const cartValue = ref([])
    const cartLength = computed(() => {
        return cartValue.value.length
    })

    const cartTotal = computed(() => {
        let total = 0;
        if (cartValue.value.length) {
            cartValue.value.forEach(product => {
                total += product.price
            })
        }
        return total
    })

    function addProduct(product) {
        product.stock--;
        const {id, name, price} = product;
        cartValue.value.push({id, name, price});
    }

    function removeProduct(index) {
        cartValue.value.splice(index, 1);
    }

    function loadCart() {
        const cart = localStorage.getItem('cart');
        if (cart) {
            cartValue.value = JSON.parse(cart);
        }
    }

    const saveCart = watch(cartValue, (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, {deep: true})


    return {cartValue, cartLength, cartTotal, addProduct, removeProduct, loadCart, saveCart}
})