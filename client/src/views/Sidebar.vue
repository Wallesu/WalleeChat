<template>
    <div class="sideBar">
        <Transition name="slide">
            <Profile v-if="isOpen_profile" @close="closeProfile()"></Profile>
        </Transition>
        <Transition name="slide">
            <NewConversation
                v-if="isOpen_newConversation"
                @close="closeNewConversation()"
            ></NewConversation>
        </Transition>
        <div class="topBar">
            <div
                class="topBar-photo"
                @click="openProfile"
                :style="`background-image: url('${userLogged?.photo?.tiny_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSONNiD5SQ3jJIsWQ4Qp3m0XXpX-VUP3KZbPq_iIf9JRRoNN7OGtgSANmqcpNSSMOHaces&usqp=CAU'}')`"
            ></div>
            <div class="topBar-options">
                <div
                    class="topBar-options-addUser"
                    @click="openNewConversation"
                >
                    <i class="bx bx-message-add"></i>
                </div>
                <div class="topBar-options-threeDots">
                    <i class="bx bx-dots-vertical-rounded"></i>
                </div>
            </div>
        </div>
        <div class="contacts">
            <div class="contacts-searchBar">
                <TextInput />
            </div>
            <div
                class="contacts-user"
                :class="{'contacts-user-selected': selectedUser?.id === user?.id}"
                v-for="(user, index) in users"
                :key="index"
                @click="selectUser(user)"
            >
                <div
                    class="contacts-user-photo"
                    :style="`background-image: url('${user?.photo?.tiny_url || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSONNiD5SQ3jJIsWQ4Qp3m0XXpX-VUP3KZbPq_iIf9JRRoNN7OGtgSANmqcpNSSMOHaces&usqp=CAU'}')`"
                ></div>
                <div class="contacts-user-content">
                    <div class="contacts-user-content-name">
                        {{ user.nickname }}
                    </div>
                    <!-- <div class="contacts-user-content-lastMsg">
                        {{ user.lastMsg }}
                    </div> -->
                </div>
            </div>
            <!-- <div class="contacts-user">chat</div> -->
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TextInput from '../components/TextInput.vue';
import Profile from '../components/Profile.vue';
import NewConversation from '../components/NewConversation.vue';
import { reactive, toRefs } from 'vue';

import { user } from '../stores/user';

import type User from '../types/User'

const userTemplate = {
    id: 0,
    nickname: '',
    email: '',
    photo: {
        tiny_url: '',
    }
} as User

type GetUserResponse = {
    data: User[]
}

export default {
    components: {
        TextInput,
        Profile,
        NewConversation,
    },
    data() {
        const data = reactive({
            isOpen_profile: false,
            isOpen_newConversation: false,
        });
        return {
            loadingUsers: false,
            users: [userTemplate],
            selectedUser: userTemplate,
            axios: this.$axios,
            userLogged: user(),
            ...toRefs(data),
        };
    },
    mounted () {
        this.getFriends();
    },
    methods: {
        openProfile() {
            this.isOpen_newConversation = false;
            this.isOpen_profile = true;
        },
        openNewConversation() {
            this.isOpen_profile = false;
            this.isOpen_newConversation = true;
        },
        closeProfile() {
            this.isOpen_profile = false;
        },
        closeNewConversation() {
            this.isOpen_newConversation = false;
        },
        getFriends(){
            this.loadingUsers = true
            this.axios({
                method: 'get',
                url: 'http://localhost:3000/users'
            }).then((res: GetUserResponse) => {
                let userLogged_index = res.data.findIndex((user:User) => {
                    return user.email === this.userLogged.email
                })
                res.data.splice(userLogged_index, 1)
                this.users = res.data
                this.loadingUsers = false
            })
            .catch((error: any) => {
                console.log(error)
                this.loadingUsers = false
            })
            // this.$axios.get('http://localhost:3000/users')
            // .then((res) => {
            //     type User = {
            //         id?: number;
            //         nickname?: string;
            //         email: string;
            //         createdAt?: string;
            //         updatedAt?: string;
            //         deletedAt?: string; 
            //     };
            //     let userLogged_index = res.data.findIndex((user:User) => {
            //         return user.email === this.userLogged.email
            //     })
            //     res.data.splice(userLogged_index, 1)
            //     this.users = res.data
            //     this.loadingUsers = false
            // })
            // .catch(error => {
            //     console.log(error)
            //     this.loadingUsers = false
            // })
        },
        selectUser(user:User){
            this.$emit('selectedUser', user)
            this.selectedUser = user
        }
    },
};
</script>

<style scoped lang="scss">
.sideBar {
    background: #0a0b0d;
    height: 100vh;
    min-width: 20rem;
    max-width: 20%;
}
.topBar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0.5rem 0.5rem;
}
.topBar-photo {
    /* display: flex; */
    background: #73a2bf;
    width: 3rem;
    height: 3rem;
    border-radius: 30px;
    cursor: pointer;
    background-size: cover;
    background-position: center;
}
.topBar-options {
    display: flex;
}
.topBar-options-addUser {
    padding: 0 0.5rem;
    color: #73a2bf;
    font-size: 1.5rem;
    cursor: pointer;
}
.topBar-options-addUser:hover {
    color: #91c4d9;
}
.topBar-options-threeDots {
    padding: 0 0.5rem;
    color: #73a2bf;
    font-size: 1.5rem;
    cursor: pointer;
}
.topBar-options-threeDots:hover {
    color: #91c4d9;
}
.contacts-searchBar {
    padding: 0.5rem 0.5rem 1rem 0.5rem;
}
.contacts-user {
    display: flex;
    align-items: center;
    background: #213140;
    width: 100%;
    height: 4.5rem;
    margin-bottom: 2px;
    cursor: pointer;
    &-selected{
        background: #91C4D9;
        &:hover{
            background: #91C4D9;
        }
    }
    &:hover{
        background: #4a738c;
    }
    
}
.contacts-user-photo {
    background: #73a2bf;
    width: 3rem;
    height: 3rem;
    margin: 0.5rem;
    border-radius: 50px;
    background-size: cover;
    background-position: center;
}
.contacts-user-content {
    /* background: red; */
}
.contacts-user-content-name {
    font-size: 0.9rem;
    color: #f8f8f8;
    padding: 2px;
}
.contacts-user-content-lastMsg {
    font-size: 0.7rem;
    color: #aaaaaa;
    padding: 2px;
}
.slide-enter-from {
    transform: translateX(-20rem);
}
.slide-enter-active {
    transition: transform 0.3s;
}
.slide-leave-to {
    transform: translateX(-20rem);
}
.slide-leave-active {
    transition: transform 0.3s;
}
</style>
