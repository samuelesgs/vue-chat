<script setup lang="ts">
    import type { Message } from '@/types/Interfaces';

    const email = localStorage.getItem('email');
    const props = defineProps<{
        message : Message
    }>();

    const classCard = props.message.send_to == email  ? 'card-message-me': 'card-message-to offset-4';
</script>

<template>
    <div class="col-12 white-text mt-1 mb-1">
        <div class="p-2 col-8" :class="`${classCard}`">
            <p class="no-space">{{ message.content }}</p>
        </div>
    </div>
</template>

<style>

    .card-message-me {
        background-color: #2E95A7;
        border-radius: 8px;
    }

    .card-message-to {
        /* 004900 */
        background-color: #066678;
        border-radius: 8px;
    }
</style>