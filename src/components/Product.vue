<template>
    <div class="modal product-modal">
        Produto: {{ product }}
    </div>
</template>

<script>
export default {
    props: ['productId'],
    data() {
        return {
            product: {},
        };
    },
    methods: {
        getProduct(id) {
            fetch(`./src/api/products/${id}/data.json`)
            .then((res) => res.json())
            .then((res) => {
              this.product = res;
            });
        },
    },
    created() {
        this.getProduct(this.productId);
    },
    watch: {
        productId() {
            this.getProduct(this.productId);
        }
    }
}
        
</script>

<style lang="scss" scoped>

</style>