<template>
    <div class="newConversation">
        <div class="newConversation-header">
            <div class="newConversation-header-arrow" @click="close()">
                <i class="bx bx-arrow-back"></i>
            </div>
            Nova conversa
        </div>
        <div class="newConversation-body">
            <div class="newConversation-body-searchBar">
                <TextInput></TextInput>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {
            activeEl: false,
        };
    },
    methods: {
        close() {
            this.$emit('close');
        },
    },
});
</script>
<style scoped>
.newConversation {
    min-width: 20rem;
    max-width: 20%;
    height: 10rem;
    background: #0a0b0d;
    position: absolute;
    height: 100vh;
    z-index: 2;
    color: #f8f8f8;
}
.newConversation-header {
    padding: 1rem;
    display: flex;
    align-items: center;
    background: #213140;
}
.newConversation-header-arrow {
    font-size: 1.4rem;
    cursor: pointer;
    padding: 0 1rem 0 0;
}
.newConversation-body-searchBar {
    padding: 1rem;
}
</style>
