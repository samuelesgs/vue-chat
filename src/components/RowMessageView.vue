<script setup lang="ts">
    import type { Message } from '@/types/Interfaces';

    const email = localStorage.getItem('email');
    const props = defineProps<{
        message : Message
    }>();

    const classCard = props.message.send_to == email  ? 'card-message-me text-start ps-3': 'card-message-to offset-4 text-end pe-3';
    const classTime = props.message.send_to == email ? 'text-end pe-2' : 'text-start ps-2';
</script>

<template>
    <div class="col-12 white-text mt-1 mb-1">
        <div class="pt-1 pb-1 col-8" :class="`${classCard}`">
            <p class="size-datetime no-space" :class="`${classTime}`">
                {{ message.datetime }}
            </p>
            <p class="no-space size-message">{{ message.content }}</p>
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

    .size-message {
        font-size: 16px;
    }

    .size-datetime {
        font-size: 12px;
    }
</style>