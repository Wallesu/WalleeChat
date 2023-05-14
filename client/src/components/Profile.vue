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
                <div
                    class="profile-body-photo"
                    :style="`background-image: url('${user.photo.url}')`"
                    @mouseover="changePhotoIconActive = true"
                    @mouseleave="changePhotoIconActive = false"
                >
                    <div v-show="changePhotoIconActive" class="profile-body-photo-hover">
                        <i
                            class='bx bxs-camera'
                            @click="changeProfilePhoto"
                        ></i>
                    </div>
                </div>
            </div>
            <div class="profile-body-form">
                <div class="profile-body-form-input">
                    <div class="profile-body-form-input-label">Seu apelido</div>
                    <div class="profile-body-form-input-value">{{ user.nickname }}</div>
                </div>
                <div class="profile-body-form-input">
                    <div class="profile-body-form-input-label">Seu e-mail</div>
                    <div class="profile-body-form-input-value">
                        {{ user.email }}
                    </div>
                </div>
                <div class="profile-body-form-input">
                    <div class="profile-body-form-input-label">Recado</div>
                    <div class="profile-body-form-input-value">
                        <TextArea v-model="bio" @confirm="changeBio(bio)"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="profile-logout" @click="logout()">
            <i class='bx bx-log-out-circle'></i> sair
        </div>
        <Teleport to="#home">
            <ChooseAPhoto v-model:active="activeChoseAPhotoEl"/>
        </Teleport> 
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import ChooseAPhoto from './Profile/ChooseAPhoto.vue';
import { user } from '../stores/user';

export default defineComponent({
    components: {
        ChooseAPhoto,
    },
    data() {
        return {
            activeEl: false,
            changePhotoIconActive: false,
            activeChoseAPhotoEl: false,
            bio: user().bio
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        changeProfilePhoto(){
            this.activeChoseAPhotoEl = !this.activeChoseAPhotoEl
        },
        changeBio(bio: string){
            this.user.setBio(bio)
        },
        logout(){
            this.user.logout()
            this.$router.push('/login')
        }
    },
    computed: {
        user() {
            return user()
        }
    },
});
</script>
<style scoped lang="scss">
.profile {
    min-width: 20rem;
    max-width: 20%;
    height: 10rem;
    background: #0a0b0d;
    position: absolute;
    height: 100vh;
    z-index: 2;
    color: #f8f8f8;
    &-logout{
        color: red;
        display: flex;
        align-items: center;
        position: absolute;
        bottom: 0.5rem;
        left: 1rem;
        height: 2rem;
        width: 8rem;
        cursor: pointer;
        i {
            padding: 0 .5rem 0 0;
        }
    }
}
.profile-header {
    padding: 0 1rem;
    display: flex;
    align-items: center;
    background: #213140;
    height: 4rem;
}
.profile-header-arrow {
    font-size: 1.4rem;
    cursor: pointer;
    padding: 0 1rem 0 0;
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
    &-hover{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.600);
        border-radius: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 3rem;
        i{
            transition: 0.1s;
            cursor: pointer;
            &:hover{
                transform: scale(1.1);
            }
        }
    }
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
