<template>
    <div class="message">
        <div class="header">
            {{ nickname }}
        </div>
        <div class="body">
            {{ text }}
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    data() {
        return {};
    },
    props: {
        nickname: {
            type: String,
            default: '',
        },
        text: {
            type: String,
            default: '',
        },
        // myMessage: {
        //     type: Boolean,
        //     default: false,
        // },
    },
});
</script>
<style scoped lang="scss">
.message {
    padding: 1rem;
    margin: 1rem;
    display: inline-block;
    // width: 5rem;
    max-width: 70%;
    // height: 20rem;
    background: #0a0b0d;
    border-radius: 10px;
    // z-index: 100;
    // height: 30rem;
    .header {
        // background: blue;
        color: white;
        font-weight: bold;
        font-size: 0.8rem;
        padding-bottom: 1rem;
    }
    .body {
        color: #f8f8f8;
        font-size: 0.9rem;
    }
}
</style>
