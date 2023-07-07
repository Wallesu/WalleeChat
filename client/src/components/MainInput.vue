<template>
    <div class="TextInput">
        <input placeholder="Mensagem" v-model="value" />
    </div>
</template>
<script lang="ts">
export default {
    name: 'TextInput',
    data() {
        return {
            value: this.modelValue,
        };
    },
    props: {
        modelValue: {
            type: String,
            default: '',
        },
    },
    watch: {
        value(newValue) {
            if(this.modelValue !== newValue){
                this.$emit('update:modelValue', newValue)
            }
        },
        modelValue(newValue) {
            this.value = newValue
        }
    }
};
</script>

<style scoped>
.TextInput {
    background: #91c4d9;
    width: 100%;
    height: 1rem;
    padding: 0.5rem;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.15);
}
.TextInput > input {
    color: #0a0b0d;
    width: 100%;
    height: 100%;
    /* padding: 0.5rem; */
    border: 0;
    font-size: 0.9rem;
    border-radius: 10px;
    background: transparent;
}
.TextInput > input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}
</style>
