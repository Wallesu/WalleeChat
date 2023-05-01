<template>
    <div class="TextInput">
        <input placeholder="Mensagem" v-model="value" />
    </div>
</template>
<script>
// import { reactive, toRefs } from 'vue';

export default {
    name: 'TextInput',
    // setup() {
    //     const data = reactive({
    //         onFocus: false,
    //         value: '',
    //     });
    //     return { ...toRefs(data) };
    // },
    data() {
        return {
            value: '',
        };
    },
    // model: {
    //     prop: 'modelValue',
    //     event: 'input',
    // },
    props: {
        modelValue: {
            type: String,
            default: '',
        },
    },
    watch: {
        value(newValue) {
            this.$emit('teste', newValue);
        },
        modelValue(newValue) {
            this.value = newValue;
        },
    },
    // mounted() {
    //     console.log(this.$refs.TextInputInput.onfocus);
    // },
    // methods: {
    //     foco() {
    //         console.log('deu foco aq');
    //     },
    //     perdeuFoco() {
    //         console.log('perdeu foco');
    //     },
    // },
    // watch: {
    //     teste(newValue) {
    //         console.log(newValue);
    //     },
    // },
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
    /* padding: 0.5rem; */
    /* border-radius: 10px; */
    /* color: blue; */
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
