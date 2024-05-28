<script setup lang="ts">
    import type { Message } from '@/types/Interfaces';


    const email = localStorage.getItem('email');
    const props = defineProps<{
        message : Message
    }>();

    const emit = defineEmits(['selectionMessage']);

    function openModalActions() {
        emit('selectionMessage', props.message);
    }

    const classCard = props.message.send_to == email  ? 'card-message-me text-start ps-3': 'card-message-to offset-4 text-end pe-3';
    const classTime = props.message.send_to == email ? 'text-end pe-2' : 'text-start ps-2';

</script>

<template>
    <div
        class="col-12 white-text mt-1 mb-1"
        v-if="message.delete == 1"
        >
        <div
            class="pt-1 pb-1 col-8"
            :class="`${classCard}`"
            style="background-color: gray;"
            >
            <p class="no-space size-message">Mensaje eliminado</p>
        </div>
    </div>
    <div
        v-if="message.delete == 0"
        class="col-12 white-text mt-1 mb-1">
        <div
            @click="openModalActions"
            class="pt-1 pb-1 col-8"
            :class="`${classCard}`"
            >
            <p class="size-datetime no-space" :class="`${classTime}`">
                {{ message.datetime }}
            </p>
            <img
                v-if="message.type!='message'"
                class="size-file-message mb-1"
                src="@/assets/images/file-message.png"
                />
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
        background-color: #066678;
        border-radius: 8px;
    }

    .size-message {
        font-size: 16px;
    }

    .size-datetime {
        font-size: 12px;
    }

    .size-file-message {
        height: 4vh;
        width: 4vh;
    }
</style>