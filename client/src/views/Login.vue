<template>
    <div class="login">
        <div class="login-box">
            <div class="login-box-container">
                <div class="login-box-container-title">Sign in</div>
                <div class="login-box-container-icons">
                    <div class="icons-google">
                        <i class="bx bxl-google"></i>
                    </div>
                    <div class="icons-github">
                        <i class="bx bxl-github"></i>
                    </div>
                </div>
                <div class="login-box-container-subText">
                    or use your account
                </div>
                <div class="login-box-container-input">
                    <div class="walleeInput">
                        <input
                            v-model="email"
                            type="text"
                            placeholder="Email"
                        />
                    </div>
                    <div class="walleeInput">
                        <input
                            v-model="password"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                </div>
                <div class="login-box-container-button">
                    <button @click="login">SIGN IN</button>
                </div>
                <div class="login-box-container-errorMessage">
                    <span v-if="loginError">{{ loginError }}</span>
                </div>
            </div>
            <div class="login-box-container">
                <div class="login-box-container-title">Create Account</div>
                <div class="login-box-container-icons">
                    <div class="icons-google">
                        <i class="bx bxl-google"></i>
                    </div>
                    <div class="icons-github">
                        <i class="bx bxl-github"></i>
                    </div>
                </div>
                <div class="login-box-container-subText">
                    or use email for registration
                </div>
                <div class="login-box-container-input">
                    <div class="walleeInput">
                        <input
                            v-model="nickname"
                            type="text"
                            placeholder="Nickname"
                        />
                    </div>
                    <div class="walleeInput">
                        <input
                            v-model="email"
                            type="text"
                            placeholder="Email"
                        />
                    </div>
                    <div class="walleeInput">
                        <input
                            v-model="password"
                            type="password"
                            placeholder="Password"
                        />
                    </div>
                </div>
                <div class="login-box-container-button">
                    <button @click="register">SIGN UP</button>
                </div>
                <div class="login-box-container-errorMessage">
                    <span v-if="registerError">{{ registerError }}</span>
                </div>
            </div>
            <div
                class="login-box-overlayer"
                :class="{
                    'login-box-overlayer-transition_MoveToRight': !signIn,
                }"
            >
                <div
                    class="overlayer-content overlayer-signin"
                    :class="{ 'transition-moveToRight': !signIn }"
                >
                    <div class="login-box-overlayer-title">Welcome back!</div>
                    <div class="login-box-overlayer-subText">
                        To keep chatting please login with your personal info
                    </div>
                    <div class="login-box-overlayer-button">
                        <button @click="changeToSignUp">SIGN IN</button>
                    </div>
                </div>
                <div
                    class="overlayer-content overlayer-signout"
                    :class="{ 'transition-moveToLeft': !signIn }"
                >
                    <div class="login-box-overlayer-title">Hello, friend!</div>
                    <div class="login-box-overlayer-subText">
                        Enter your personal details and start chatting right now
                    </div>
                    <div class="login-box-overlayer-button">
                        <button @click="changeToSignIn">SIGN UP</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import type { AxiosInstance } from 'axios';
import { user } from '../stores/user';

export default {
    data() {
        return {
            email: '',
            nickname: '',
            password: '',
            loginError: null,
            registerError: null,
            primary: '#ffffff',
            secondary: '#ff4457',
            fontPrimaryColor: '#000000',
            fontSecondaryColor: '#ffffff',
            signIn: true,
            axios: this.$axios as AxiosInstance
        };
    },
    methods: {
        login() {
            this.loginError = null
            this.axios.post('http://localhost:3000/users/login', {
                email: this.email,
                password: this.password
            })
            .then((res) => {

                localStorage.setItem('accessToken', res.data.accessToken)
                localStorage.setItem('refreshToken', res.data.refreshToken)

                const loggedUser = res.data
                user().setId(loggedUser.id)
                user().setEmail(loggedUser.email)
                user().setNickname(loggedUser.nickname)
                if(loggedUser.bio) user().setBio(loggedUser.bio)
                if(loggedUser.photo_id){
                    user().setPhoto(loggedUser.photo_id)
                }
                

                this.$router.push('/')
                
            })
            .catch((error) => {
                this.loginError = error.response?.data?.message || 'An error has occurred in the authentication.'
            })
        },
        register() {
            this.registerError = null
            this.axios.post('http://localhost:3000/users/register', {
                email: this.email,
                password: this.password,
                nickname: this.nickname
            })
            .then(() => {
                this.login()
            })
            .catch(error => {
                this.registerError = error.response?.data?.message || 'An error has occurred in the registration.'
            })
        },
        changeToSignUp() {
            this.signIn = true;
        },
        changeToSignIn() {
            this.signIn = false;
        }
    },
};
</script>

<style scoped lang="scss">
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    // background: red;
    &-box {
        width: 50rem;
        height: 35rem;
        border-radius: 1rem;
        overflow: hidden;
        display: grid;
        grid-template-columns: 50% 50%;
        box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.25);
        position: relative;

        &-container {
            background-color: v-bind('primary');
            padding: 1rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            &-title {
                display: flex;
                justify-content: center;
                font-size: 1.75rem;
                font-weight: bold;
                padding: 0.5rem 0;
                color: v-bind('fontPrimaryColor');
            }
            &-icons {
                // background: blue;
                display: flex;
                justify-content: center;
                padding: 0.5rem 0;
                div {
                    // background: pink;
                    margin: 0.5rem;
                    border: 1px solid rgb(202, 202, 202);
                    padding: 0.5rem;
                    border-radius: 30px;
                }
            }
            &-subText {
                text-align: center;
                padding: 0.5rem;
                color: v-bind('fontPrimaryColor');
            }
            &-input {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            &-button {
                padding: 0.5rem 0;
                display: flex;
                justify-content: center;
                button {
                    padding: 0.75rem 2rem;
                    border-radius: 20px;
                    border: none;
                    cursor: pointer;
                    background: v-bind('secondary');
                    color: white;
                    font-weight: bold;
                }
                button:hover {
                    background: #ff162d;
                }
            }
            &-errorMessage{
                height: 2rem;
                // background: pink;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                color: red;
                font-size: 0.9rem;
            }
        }
        &-overlayer {
            width: 50%;
            height: 100%;
            background: v-bind('secondary');
            position: absolute;
            left: 50%;
            transition: left 0.5s;
            text-align: center;
            color: white;
            overflow: hidden;
            &-transition_MoveToRight {
                left: 0%;
            }
            &-title {
                font-size: 1.5rem;
                font-weight: bold;
                padding: 0.5rem 0;
            }
            &-subText {
                padding: 0.5rem 1rem;
                line-height: 1.5rem;
            }
            &-button {
                padding: 1rem 0;
                button {
                    padding: 0.75rem 2rem;
                    border-radius: 20px;
                    border: none;
                    cursor: pointer;
                    background: v-bind('secondary');
                    color: white;
                    font-weight: bold;
                    border: 1px solid v-bind('primary');
                }
                button:hover {
                    background: #ff162d;
                }
            }
        }
        .overlayer-content {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: absolute;
            transition: all 0.5s;
        }
        .overlayer-signin {
            transform: translateX(-100%);
        }
        .transition-moveToRight {
            transform: translateX(0%);
        }
        .transition-moveToLeft {
            transform: translateX(100%);
        }
    }
}
.walleeInput {
    width: 300px;
    margin: 0.3rem 0;
    padding: 0.25rem 0.5rem;
    background: #eee;

    // height: 2rem;
    input {
        height: 1.5rem;
        width: 100%;
        margin: 0;
        background: transparent;
        // border-radius: 0;
        border: none;
    }

    textarea:focus,
    input:focus {
        outline: none;
    }
}
</style>
