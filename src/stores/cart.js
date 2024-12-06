import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useCartStore = defineStore('cart', () => {
    const cartValue = ref([]);
    let alert = ref(false);
    let alertMsg = ref('Produto adicionado ao carrinho.');
    
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
        const { id, name, price, img } = product;
        cartValue.value.push({ id, name, price, img });
        alertMsg.value = `${name} adicionado ao carrinho.`;
        alert.value = true;
        
        setTimeout(() => {
            alert.value = false;
        }, 2000);
    }

    function removeProduct(index) {
        cartValue.value.splice(index, 1);
    }

    function removeWholeProduct(id) {
        cartValue.value = cartValue.value.filter(item => item.id !== id);
    }

    function loadCart() {
        const cart = localStorage.getItem('cart');
        if (cart) {
            cartValue.value = JSON.parse(cart);
        }
    }

    function controlStock() {
        
    }

    const saveCart = watch(cartValue, (cart) => {
        localStorage.setItem('cart', JSON.stringify(cart))
        controlStock();
    }, {deep: true})


    return {
        cartValue, 
        alert, 
        alertMsg, 
        cartLength, 
        cartTotal, 
        addProduct, 
        removeProduct,
        removeWholeProduct, 
        loadCart, 
        saveCart
    }
})