<template>
    <Transition name="slide">
        <div v-if="isActive" class="rightBar">
            <slot>     
            </slot>
        </div>
    </Transition>
</template>

<script lang="ts">

export default {
    data() {
        return {};
    },
    props: {
        isActive: {
            type: Boolean,
            default: false
        },
    }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/breakpoints.scss";

@media (max-width: $medium-top){
    .rightBar{
        position: absolute;    
        right: 0;
        width: 20rem;
    }
    .slide-enter-to, .slide-leave-from {
        width: 20rem;
    }
}
@media (min-width: $large-bottom){
    .rightBar{
        width: 30rem;
        position: relative;
    }
    .slide-enter-to, .slide-leave-from {
        width: 30rem;
    }
}
.rightBar {
    z-index: 1;
    overflow: hidden;
    height: 100vh;
}
.slide-enter-from, .slide-leave-to {
    width: 0px;
}

.slide-enter-active, .slide-leave-active {
    transition: 0.3s;
}
</style>
