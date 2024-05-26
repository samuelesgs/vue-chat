<script setup lang="ts">
    import { type Chats } from '@/types/Interfaces';
    import RowMessageView from './RowMessageView.vue';

    const props = defineProps<{
        messages : Chats[]
    }>()

</script>

<template>
    <div class="row container-message-size overflow-auto">
        <row-message-view
            v-for="row in props.messages"
            :property="row.property"
            :user_send="row.user_send"
            :user_to="row.user_to"
            :message="row.message"
            >
        </row-message-view>
    </div>
</template>

<style>
    
    .container-message-size {
        min-height: 65vh;
        max-height: 70vh;
    }
</style>