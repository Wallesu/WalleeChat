<template>
    <div class="friendInformations">
        <div class="friendInformations-header">
            <i  class="bx bx-x friendInformations-header-closeIcon" @click="close()"></i>
            <div class="friendInformations-header-title">
                Detalhes do usuário
            </div>
        </div>


        <div class="friendInformations-body">
            <div class="friendInformations-body-container-photo">
                <div
                    class="friendInformations-body-photo"
                    :style="`background-image: url('${friend?.photo?.url}')`"
                ></div>
            </div>
            <div class="friendInformations-body-form">
                <div class="friendInformations-body-form-input">
                    <div class="friendInformations-body-form-input-label">Apelido</div>
                    <div class="friendInformations-body-form-input-value">{{ friend?.nickname || '- - - - -'}}</div>
                </div>
                <div class="friendInformations-body-form-input">
                    <div class="friendInformations-body-form-input-label">E-mail</div>
                    <div class="friendInformations-body-form-input-value">
                        {{ friend?.email || '- - - - -' }}
                    </div>
                </div>
                <div class="friendInformations-body-form-input">
                    <div class="friendInformations-body-form-input-label">Recado</div>
                    <div class="friendInformations-body-form-input-value">
                        {{ friend?.bio || '- - - - -' }}
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>

<script lang="ts">

export default {
    data() {
        return {
            isActive: false
        };
    },
    methods: {
        close() {
            this.$emit('close')
        }
    },
    props: {
        friend: {
            type: Object
        },
    },
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";

.friendInformations {
    z-index: 1;
    background: $primary;
    overflow: hidden;
    height: 100vh;
    color: white;
    &-header {
        padding: 0 1rem;
        display: flex;
        align-items: center;
        background: #213140;
        height: 4rem;
        width: 100%;
        &-closeIcon{
            font-size: 2rem;
            cursor: pointer;
            transition: 0.25s;
            &:hover{
                transform: rotate(90deg);
                color: red;
            }
        }
        &-title {
            padding: 0 1rem;
            white-space: nowrap;
        }
    }
    &-body {
        &-container-photo {
            padding: 2rem 0;
            display: flex;
            justify-content: center;
        }
        &-photo {
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
        &-form {
            padding: 1rem;
            &-input {
                padding: 1.5rem 0;
                &-label {
                    color: #91c4d9;
                    font-size: 0.9rem;
                    padding: 0 0 1rem 0;
                }
                &-value {
                    color: #f8f8f8;
                }
            } 
        }     
    }
    
    
}
</style>
