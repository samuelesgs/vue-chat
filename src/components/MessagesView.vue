<script setup lang="ts">
    import moment from 'moment';
import RowMessageView from './RowMessageView.vue';
    import type { DataMessages } from "@/types/Interfaces";

    const props = defineProps<{
        chat : DataMessages
    }>();

    function orderList() {
        props.chat.messages = props.chat.messages.sort((a,b) => {
            const dateA = moment(a.datetime);
            const dateB = moment(b.datetime);
            return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
        });
    }

    orderList();

</script>

<template>
    <div class="row container-message-size overflow-auto">
        <div class="row white-text center-vertical bg-header">
            <div class="col-9">
                <h1>{{ props.chat.another_email }}</h1>
            </div>
            <div class="col">
                <div class="row">
                    <button class="btn btn-danger me-2 col">Bloquear</button>
                    <button class="btn btn-secondary me-2 col white-text">Eliminar</button>
                </div>
            </div>
        </div>
        <row-message-view
            v-for="row in props.chat.messages"
            :message="row"
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