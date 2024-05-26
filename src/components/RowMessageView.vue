
<script setup lang="ts">
    const props = defineProps({
        property : Boolean,
        user_send : String,
        user_to : String,
        message : String
    });

    const classCard = props.property ? 'card-message-me': 'card-message-to offset-4';
</script>

<template>
    <div class="col-12 mb-1 bg-row white-text mt-1">
        <div class="row p-2 col-8" :class="`${classCard}`">
            <p class="no-space ">{{ message }}</p>
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