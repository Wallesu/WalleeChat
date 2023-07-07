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
                    myMessage: message.sender?.email == userLogged?.email,
                }"
                v-for="(message, index) in messages"
                :key="index"
            >
                <MessageComponent
                    :nickname="message.sender.nickname"
                    :text="message.message"
                />
            </div>
        </div>
        <div class="chat-bottomBar" v-if="selectedUser">
            <EmojiPicker
                @selectedEmoji="inputValue += $event.native"
                v-model:isActive="showEmojis"
            >
                <template #icon>
                    <i class="bx bxs-cat chat-bottomBar-icon"></i>
                </template>
            </EmojiPicker>
            <i class="bx bx-paperclip chat-bottomBar-icon"></i>
            <MainInput
                v-model="inputValue"
                @keypress.enter="() => {
                    sendMessage(inputValue)
                    inputValue = ''
                    showEmojis = false
                }"
            ></MainInput>
            <i class="bx bx-microphone chat-bottomBar-icon"></i>
        </div>
    </div>
</template>

<script lang="ts">
import io from 'socket.io-client';
import axios from 'axios'

import MainInput from '../components/MainInput.vue';
import MessageComponent from '../components/Message.vue';
import { user } from '../stores/user';
import EmojiPicker from '@/components/global/EmojiPicker.vue';

import type User from '../types/User'
import type Photo from '../types/Photo'
import type Message from '../types/Message'

const photoTemplate = {
    id: 0,
    title: '',
    url: '',
    tiny_url: '',
    photographer: '',
    photographer_url: '',
    website: '',
} as Photo

const userTemplate = {
    id: 0,
    nickname: '',
    email: '',
    photo: photoTemplate,
} as User

export default {
    components: {
        MainInput,
        MessageComponent,
        EmojiPicker,
    },
    data() {
        return {
            inputValue: '',
            socket: io('http://localhost:3000'),
            messages: [{
                sender: userTemplate,
                receiver: userTemplate,
                message: ''
            }] as Message[],
            userLogged: user() as User,
            loadingPreviousMessages: true,
            showEmojis: false
        };
    },

    mounted() {   
        this.socket.on('receivedMessage', (message) => {
            this.receiveMessage(message);
        });
    },
    props: {
        selectedUser: {
            type: Object,
            default: userTemplate
        },
    },
    methods: {
        sendMessage(message: string) {
            if(message.length){
                const messageObj = {
                    sender: this.userLogged as User,
                    receiver: this.selectedUser as User,
                    message: message as string,
                }

                this.messages.push(messageObj)
                this.socket.emit('sendMessage', messageObj)
                setTimeout(() => {
                    this.scrollBarAtEnd()
                }, 0)
            }
        },
        getPreviousMessages(sender: User, receiver:User) {
            this.loadingPreviousMessages = true
            axios.get(`
                http://localhost:3000/messages/previous?sender_id=${sender.id}&receiver_id=${receiver.id}
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
        receiveMessage(message: Message) {
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
        '$el.querySelector(".messages").scrollHeight'() {
            if (this.scrollIsOnBottom()) {
                this.scrollBarAtEnd();
            }
        },
        selectedUser(newValue) {
            if(newValue){
                this.inputValue = ''
                this.showEmojis = false
                this.getPreviousMessages(this.userLogged, newValue)
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
        &-icon {
            font-size: 1.7rem;
            color: #73a2bf;
            padding: 0 1rem;
            &:hover {
                color: #91c4d9;
                cursor: pointer;
            }
        }
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
