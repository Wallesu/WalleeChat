<template>
    <div class="TextInput">
        <div class="TextInput-icon">
            <Transition name="glass">
                <i v-if="!onFocus" class="bx bx-search"></i>
            </Transition>
            <Transition name="arrow">
                <i
                    v-if="onFocus"
                    class="bx bx-arrow-back"
                    @click="value = ''"
                ></i>
            </Transition>
        </div>
        <input
            ref="TextInputInput"
            type="text"
            v-model="value"
            @focus="onFocus = true"
            @blur="onFocus = false"
        />
    </div>
</template>
<script lang="ts">
import { reactive, toRefs } from 'vue';

export default {
    name: 'TextInput',
    setup() {
        const data = reactive({
            onFocus: false,
            value: '',
        });
        return { ...toRefs(data) };
    }
};
</script>

<style scoped>
.TextInput {
    display: flex;
    align-items: center;
    width: 100%;
    background: #213140;
    /* padding: 0.5rem; */
    border-radius: 10px;
    color: white;
}
.TextInput-icon {
    position: relative;
    /* background: red; */
    width: 1.5rem;
    height: 2rem;
}
.TextInput-icon > i {
    position: absolute;
    /* bottom: 0; */
    /* height: 100%; */
}
.TextInput-icon > i {
    padding: 0.5rem;
    cursor: pointer;
}
.TextInput > input {
    background: transparent;
    border: 0;
    width: 100%;
    padding: 0.5rem;
    color: white;
    font-size: 0.9rem;
}
.TextInput > input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}

.arrow-enter-from {
    transform: rotate(-90deg);
    opacity: 0;
}
.arrow-enter-active {
    /* transition: ; */
    transition: opacity 0.2s, transform 0.2s;
}

.arrow-leave-to {
    transform: rotate(-90deg);
    opacity: 0;
}
.arrow-leave-active {
    transition: opacity 0.1s, transform 0.2s;
}

.glass-enter-from {
    transform: rotate(90deg);
    opacity: 0;
}
.glass-enter-active {
    /* transition: ; */
    transition: opacity 0.2s, transform 0.2s;
}

.glass-leave-to {
    transform: rotate(90deg);
    opacity: 0;
}
.glass-leave-active {
    transition: opacity 0.2s, transform 0.2s;
}
</style>
