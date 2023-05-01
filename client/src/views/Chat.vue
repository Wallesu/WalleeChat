<template>
    <div class="chat">
        <div class="topBar" v-if="selectedUser" @click="openFriendInformations">
            <div
                class="topBar-friendPhoto"
                :style="`background-image: url('${selectedUser?.photo?.tiny_url}')`"
            ></div>
            <div class="topBar-friendName">
                {{ selectedUser?.nickname }}
            </div>
        </div>
        <div class="messages">
            <div
                class="message-container"
                :class="{
                    myMessage: message.sender?.email == this.userLogged?.email,
                }"
                v-for="(message, index) in messages"
                :key="index"
            >
                <Message
                    :nickname="message.sender.nickname"
                    :text="message.message"
                />
            </div>
        </div>
        <div class="chat-bottomBar" v-if="selectedUser">
            <i class="bx bxs-cat"></i>
            <i class="bx bx-paperclip"></i>
            <MainInput
                :modelValue="inputValue"
                @teste="inputValue = $event"
                @keypress.enter="sendMessage(inputValue)"
            ></MainInput>
            <i class="bx bx-microphone"></i>
        </div>
    </div>
</template>

<script lang="ts">
import io from 'socket.io-client';
import axios from 'axios'

import MainInput from '../components/MainInput.vue';
import Message from '../components/Message.vue';
import { user } from '../stores/user';

export default {
    components: {
        MainInput,
        Message,
    },
    data() {
        return {
            inputValue: '',
            socket: null,
            messages: [],
            userLogged: null,
            loadingPreviousMessages: true,
        };
    },

    mounted() {
        this.userLogged = user();
        this.messages = [];
        this.socket = io('http://localhost:3000');
        
        this.socket.on('receivedMessage', (message) => {
            this.receiveMessage(message);
        });
    },
    props: {
        selectedUser: {
            type: Object,
            default: null,
        },
    },
    methods: {
        sendMessage(message: string) {
            let messageObj = {
                sender: {
                    id: this.userLogged?.id,
                    nickname: this.userLogged?.nickname,
                    email: this.userLogged?.email,
                },
                receiver: this.selectedUser,
                message: message,
            };
            console.log('msgObj', messageObj)
            this.messages.push(messageObj);
            this.socket.emit('sendMessage', messageObj);
            this.inputValue = '';
            setTimeout(() => {
                this.scrollBarAtEnd();
            }, 0);

            // if (isOnBottom) this.scrollBarAtEnd();
        },
        getPreviousMessages(sender_id, receiver_id) {
            this.loadingPreviousMessages = true

            axios.get(`
                http://localhost:3000/messages/previous?sender_id=${sender_id}&receiver_id=${receiver_id}
            `)
            .then((res) => {
                this.messages = res.data
                this.loadingPreviousMessages = false
                setTimeout(() => {
                    this.scrollBarAtEnd();
                }, 0);
            })
            .catch(error => {
                console.log(error)
                this.loadingPreviousMessages = false
            })
            
        },
        receiveMessage(message: object) {
            this.messages.push(message);
            if (this.scrollIsOnBottom()) {
                setTimeout(() => {
                    this.scrollBarAtEnd();
                }, 0);
            }
        },
        scrollIsOnBottom() {
            let chat = this.$el.querySelector('.messages');
            return chat.scrollHeight - chat.clientHeight === chat.scrollTop;
        },
        scrollBarAtEnd() {
            let chat = this.$el.querySelector('.messages');
            chat.scrollTop = chat.scrollHeight - chat.clientHeight;
        },
        openFriendInformations(){
            this.$emit('activeRightBar', true)
        }
    },
    computed: {
        scrollHeight() {
            if (this.$el?.querySelector('.messages')) {
                console.log(this.$el.querySelector('.messages'));
                return this.$el.querySelector('.messages').scrollHeight;
            }
            return 0;
        },
    },
    watch: {
        '$el.querySelector(".messages").scrollHeight'(newValue, oldValue) {
            let chat = this.$el.querySelector('.messages');
            if (
                this.scrollIsOnBottom(
                    oldValue,
                    chat.clientHeight,
                    chat.scrollTop
                )
            ) {
                this.scrollBarAtEnd();
            }
        },
        selectedUser(newValue) {
            if(newValue){
                this.getPreviousMessages(this.userLogged.id, newValue.id)
            }
        },
    },
};

// export default defineComponent({

// });
</script>

<style scoped lang="scss">
.chat {
    width: 100%;
    height: 100vh;
    background: #4a738c;
    // position: relative;
    display: flex;
    flex-direction: column;
    justify-content: end;
    padding: 0 0 0 0;
    scroll-behavior: smooth;
    .topBar{
        position: fixed;
        top: 0;
        background: #0A0B0D;
        color: white;
        width: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        height: 4rem;
        &-friendPhoto{
            background: #73a2bf;
            width: 3rem;
            height: 3rem;
            margin: 0.5rem;
            border-radius: 50px;
            background-size: cover;
            background-position: center;
        }
    }
    .messageTest {
    }
    .messages {
        margin-top: 4rem;
        overflow-y: auto;
        .message-container {
            width: 100%;
            display: flex;
        }
        .myMessage {
            justify-content: end;
        }
    }
    &-bottomBar {
        width: 100%;
        bottom: 0;
        padding: 1rem 0;
        display: flex;
        align-items: center;
        background: #213140;
        backdrop-filter: blur(10px);
    }
    &-bottomBar > i {
        font-size: 1.7rem;
        color: #73a2bf;
        padding: 0 1rem;
    }
    &-bottomBar > i:hover {
        color: #91c4d9;
        cursor: pointer;
    }
    ::-webkit-scrollbar {
        width: 7px;
        &-track {
            background: #4a738c;
        }
        &-thumb {
            background: #2131406e;
            &:hover {
                background: #333333;
            }
        }
    }
}
</style>
