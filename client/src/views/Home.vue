<template>
    <div class="home" id="home">
        <Sidebar @selectedUser="selectedUser = $event" />
        <Chat
            :selectedUser="selectedUser"
            @activeRightBar="rightBarIsActive = $event"
        />
        <RightBar :isActive="rightBarIsActive">
            <FriendInformations
                @close="rightBarIsActive = false"
                :friend="selectedUser"
            />
        </RightBar>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Chat from './Chat.vue';
import Sidebar from './Sidebar.vue';
import RightBar from './RightBar.vue';
import FriendInformations from '../components/FriendInformations.vue'

export default defineComponent({
    components: {
        Chat,
        Sidebar,
        RightBar,
        FriendInformations
    },
    data() {
        return {
            selectedUser: {
                id: 0,
                nickname: '',
                email: '',
                photo: {
                    tiny_url: '',
                }
            },
            rightBarIsActive: false
        };
    },
});
</script>

<style scoped>
.home {
    display: flex;
}
</style>
