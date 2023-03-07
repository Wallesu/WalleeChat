<template>
    <div class="home">
        <Sidebar @selectedUser="selectedUser = $event" />
        <Chat :selectedUser="selectedUser"/>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Chat from './Chat.vue';
import Sidebar from './Sidebar.vue';

export default defineComponent({
    components: {
        Chat,
        Sidebar,
    },
    data() {
        return {
            selectedUser: null
        };
    },
});
</script>

<style scoped>
.home {
    display: flex;
}
</style>
