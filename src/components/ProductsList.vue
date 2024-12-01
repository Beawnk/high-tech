<template> 
    <section class="products">
      <div class="product" v-for="product in products" :key="product.id" @click="productModal = true; getProductId(product.id)">
        <div class="product-img">
          <img :src="product.img" :alt="product.name" />
        </div>
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p>{{ formatCurrency(product.price) }}</p>
        </div>
      </div>
    </section>
    <Product v-if="productModal" :product-id="dataProductId"/>
</template>

<script>
import Product from "../components/Product.vue";

export default {
    components: {Product},
    data() {
        return {
            products: [],
            productModal: false,
            dataProductId: null,
        };
    },
    methods: {
        getProducts() {
            fetch("./src/api/products.json")
            .then((res) => res.json())
            .then((res) => {
              this.products = res;
            });
        },
        formatCurrency(value) {
            return value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            });
        },
        getProductId(id) {
            this.dataProductId = id;
        }
    },
    created() {
        this.getProducts();
    },
}

</script>

<style lang="scss" scoped>
@use '../assets/style/variables';

$products-max-width: 900px;

.products {
    max-width: $products-max-width;
    margin: 100px auto 0 auto;
    .product {
        cursor: pointer;
        display: flex;
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: variables.$br-medium;
        box-shadow: variables.$shadow;
        &:last-child {
            margin-bottom: 0;
        }
        .product-img {
            width: 200px;
            height: 200px;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        .product-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 20px;
            h3 {
                font-size: 20px;
                margin-bottom: 10px;
            }
            p {
                font-size: 18px;
                color: #333;
            }
        }
    }
}
</style>