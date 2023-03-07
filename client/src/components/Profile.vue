<template>
    <div class="profile">
        <div class="profile-header">
            <div class="profile-header-arrow" @click="close()">
                <i class="bx bx-arrow-back"></i>
            </div>
            Perfil
        </div>
        <div class="profile-body">
            <div class="profile-body-container-photo">
                <div class="profile-body-photo"></div>
            </div>
            <div class="profile-body-form">
                <div class="profile-body-form-input">
                    <div class="profile-body-form-input-label">Seu apelido</div>
                    <div class="profile-body-form-input-value">Wall-e</div>
                </div>
                <div class="profile-body-form-input">
                    <div class="profile-body-form-input-label">Seu e-mail</div>
                    <div class="profile-body-form-input-value">
                        wallysonsouza4@hotmail.com
                    </div>
                </div>
                <div class="profile-body-form-input">
                    <div class="profile-body-form-input-label">Recado</div>
                    <div class="profile-body-form-input-value">
                        Bom dia flor do dia
                    </div>
                </div>
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
.profile {
    min-width: 20rem;
    max-width: 20%;
    height: 10rem;
    background: #0a0b0d;
    position: absolute;
    height: 100vh;
    z-index: 2;
    color: #f8f8f8;
}
.profile-header {
    padding: 1rem;
    display: flex;
    align-items: center;
    background: #213140;
}
.profile-header-arrow {
    font-size: 1.4rem;
    cursor: pointer;
    padding: 0 1rem 0 0;
}
.profile-body {
    /* background: blue; */
    /* padding: ; */
}
.profile-body-container-photo {
    padding: 2rem 0;
    display: flex;
    justify-content: center;
}
.profile-body-photo {
    width: 12rem;
    height: 12rem;
    border-radius: 100px;
    background-size: cover;
    background-image: url('https://i.pinimg.com/originals/ae/24/87/ae24874dd301843548c034a3d2973658.png');
}
.profile-body-form {
    padding: 1rem;
}
.profile-body-form-input {
    padding: 1.5rem 0;
}
.profile-body-form-input-label {
    color: #91c4d9;
    font-size: 0.9rem;
    padding: 0 0 1rem 0;
}
.profile-body-form-input-value {
    color: #f8f8f8;
}
</style>
