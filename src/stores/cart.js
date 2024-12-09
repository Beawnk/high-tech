import { containsProp } from '@vueuse/core';
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useCartStore = defineStore('cart', () => {
    const cartValue = ref([]);
    let alert = ref(false);
    let alertMsg = ref('Produto adicionado ao carrinho.');
    const disabledProducts = ref(new Set());
    
    const cartLength = computed(() => {
        return cartValue.value.length;
    });

    const cartTotal = computed(() => {
        let total = 0;
        if (cartValue.value.length) {
            cartValue.value.forEach(product => {
                total += product.price;
            });
        }
        return total;
    });

    function addProduct(product) {
        product.stock--;
        const { id, name, price, img, stock, initialStock } = product;
        cartValue.value.push({ id, name, price, img, stock, initialStock });
        alertMsg.value = `${name} adicionado ao carrinho.`;
        alert.value = true;
        
        setTimeout(() => {
            alert.value = false;
        }, 2000);

        controlStock(product.id);
    }

    function removeProduct(index) {
        const product = cartValue.value[index];
        product.stock++;
        cartValue.value.splice(index, 1);
        controlStock(product.id);
    }

    function removeWholeProduct(id) {
        cartValue.value = cartValue.value.filter(item => item.id !== id);
        controlStock(id);
    }

    function loadCart() {
        const cart = localStorage.getItem('cart');
        const disabledProductsStorage = localStorage.getItem('disabledProducts');
        if (cart) {
            cartValue.value = JSON.parse(cart);
        }
        if (disabledProductsStorage) {
            disabledProducts.value = new Set(JSON.parse(disabledProductsStorage));
        }
    }

    function controlStock(productId) {
        if (cartValue.value.length > 0) {
            const productCount = cartValue.value.filter(item => item.id === productId).length;
            console.log(productCount);
            const product = cartValue.value.find(item => item.id === productId);
            console.log(product);
            if (product && productCount >= product.initialStock ) {
                disabledProducts.value.add(productId);
                console.log('added')
            } else {
                disabledProducts.value.delete(productId);
                console.log('deleted');
            }
            console.log(disabledProducts.value);
        }
    }

    const saveCart = watch(cartValue, (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('disabledProducts', JSON.stringify(Array.from(disabledProducts.value)));
    }, {deep: true})


    return {
        cartValue, 
        alert, 
        alertMsg, 
        disabledProducts,
        cartLength, 
        cartTotal, 
        addProduct, 
        removeProduct,
        removeWholeProduct, 
        loadCart, 
        controlStock,
        saveCart
    }
})