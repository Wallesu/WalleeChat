<template>
        <div
            class="textArea"
            :class="{'editable': editable}"
        >
            <input v-model="value" :disabled="!editable"/>
            <i
                v-if="!editable"
                @click="editable = true"
                class="bx bxs-edit icon"
            ></i>
            <i
                v-else
                @click="editable = false, confirm()"
                class="bx bx-check icon checkIcon"
            ></i>
        </div>
</template>

<script lang="ts">
    export default {
        data() {
            return {
                value: this.modelValue,
                editable: false
            }
        },
        props: ['modelValue'],
        emits: ['update:modelValue', 'confirm'],
        watch: {
            value(newValue) {
                this.$emit('update:modelValue', newValue)
            }
        },
        methods: {
            confirm() {
                this.$emit('confirm')
            }
        },
    }
</script>

<style scoped lang="scss">
.editable {
    input {
        border-bottom: 2px solid white !important;
    }
}
.textArea {
    position: relative;
    input{
        border: none;
        
        background: transparent;
        width: 100%;
        height: auto;
        min-height: 1rem;
        color: white;
        font-size: 1rem;
    }
    input:focus,
    select:focus,
    textarea:focus,
    button:focus {
        outline: none;
    }
    .icon {
        position: absolute;
        top: 2px;
        right: 0;
        &:hover{
            transform: scale(1.05);
            cursor: pointer;
        }
    }
    .checkIcon {
        font-size: 1.5rem;
        top: -2px;
        right: -2px;
    }
}
</style>