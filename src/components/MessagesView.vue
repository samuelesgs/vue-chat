<script setup lang="ts">
    import { type Chats } from '@/types/Interfaces';
    import RowMessageView from './RowMessageView.vue';

    const props = defineProps<{
        messages : Chats[]
    }>()

</script>

<template>
    <div class="row container-message-size overflow-auto">
        <div class="row white-text center-vertical">
            <div class="col-9">
                <h1>Nombre del chat</h1>
            </div>
            <div class="col">
                <div class="row">
                    <button class="btn btn-danger me-2 col">Bloquear</button>
                    <button class="btn btn-secondary me-2 col white-text">Eliminar</button>
                </div>
            </div>
        </div>
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