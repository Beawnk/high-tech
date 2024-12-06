<template>
    <div class="alert">
        <p class="msg">
            <slot></slot>
        </p>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use "../assets/style/variables" as v;

.alert {
    background-color: v.$white-color;
    padding: 10px;
    position: fixed;
    top: calc(v.$header-height + 20px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 200;
    border-radius: v.$br-small;
    box-shadow: v.$shadow;
    display: flex;
    align-items: center;
    width: fit-content;
    &::after {
        content: '';
        width: 15px;
        height: 15px;
        display: block;
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
        margin-left: 10px;
    }
    &.success::after {
        background-image: url('../assets/img/check.png');
    }
    &.error::after {
        background-image: url('../assets/img/error.png');
    }
}

</style>