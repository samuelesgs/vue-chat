<script setup lang="ts">
    import moment from 'moment';
    import RowMessageView from './RowMessageView.vue';
    import type { DataMessages, Message } from "@/types/Interfaces";
    import ModalActionsView from './modals/ModalActionsView.vue'
    import ModalMessageView from './modals/ModalMessageView.vue';
    import { ref, type Ref } from 'vue';
    import UserBlockedService from '@/services/UserBlocked'

    const props = defineProps<{
        chat : DataMessages,
        bodyBlock : string | null
    }>();

    const selectionMessage : Ref<Message | null> = ref(null);

    const titleMessage = ref('');
    const bodyMessage = ref('');
    const ShowButtonMessage = ref(false);

    const search = ref('');

    const messages : Ref<Message[] | null> = ref(null);
    
    function orderList() {
        props.chat.messages = props.chat.messages.sort((a,b) => {
            const dateA = moment(a.datetime);
            const dateB = moment(b.datetime);
            return dateA.isBefore(dateB) ? -1 : dateA.isAfter(dateB) ? 1 : 0;
        });
    }

    function setSelectionMessage(message : Message) {
        selectionMessage.value = message;
        document.getElementById('button-open-modal-actions')!.click();
    }

    function modalConfirmUserBlock() {
        titleMessage.value = "Confirmación";
        bodyMessage.value = "¿Estás seguro de bloquear a este usuario?"
        ShowButtonMessage.value = true;
        openModalMessage();
    }

    function sendRequestUserBlocked() {
        closeModalMessage();

        UserBlockedService.sendRequest(props.chat.another_email).then(_ => {
            titleMessage.value = "Mensaje";
            bodyMessage.value = "Usuario bloqueado, no puede enviar ni recibir mensajes de este usuario";
            ShowButtonMessage.value = false;
        }, reject => {
            titleMessage.value = "Error servidor";
            bodyMessage.value = reject
            ShowButtonMessage.value = false;
        }).finally( () => {
            setTimeout(() => {
                openModalMessage();
            }, 100);
        });
    }

    function openModalMessage() {
        document.getElementById('button-open-modal')!.click();
    }

    function closeModalMessage() {
        document.getElementById('button-close-modal-message')!.click()
    }

    function getMessages() {
        if (search.value) {
            messages.value = props.chat.messages.filter(message =>
                message.content.toLowerCase().includes(search.value.toLowerCase())
            ); 
        } else {
            messages.value = props.chat.messages;
        }
    }

    function exeSearch() {
        getMessages();    
    }

    getMessages();

    orderList();
</script>

<template>
    <button id="button-load-messages" @click="getMessages" hidden>ReloadMessages</button>
    <div class="row container-message-size">
        <div class="row white-text center-vertical bg-header">
            <div :class="!bodyBlock ? 'col-9' : 'col-7'">
                <h1>{{ props.chat.another_email }}</h1>
            </div>
            <div class="col">
                <div class="row">
                    <button
                        v-if="!bodyBlock"
                        @click="modalConfirmUserBlock()"
                        class="btn btn-danger me-2 col"
                        >Bloquear
                    </button>
                    <p class="btn btn-secondary me-2 col" v-if="bodyBlock">{{ bodyBlock }}</p>
                </div>
            </div>
            <div class="col-12 mb-3">
                <div class="row  center-vertical">
                    <div class="col-10 ">
                        <input
                            type="text"
                            class="form-control input-text-style no-space p-2"
                            placeholder="Buscar mensaje"
                            v-model="search"
                            />
                    </div>
                    <div class="col">
                        <button
                            @click="exeSearch()"
                            class="btn btn-success"
                            >Buscar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div id="conteiner-messages" class="array-message-size overflow-auto">
            <row-message-view
                v-for="row in messages"
                :message="row"
                @selectionMessage="setSelectionMessage"
                >
            </row-message-view>
        </div>
    </div>

    <modal-message-view
        :title="titleMessage"
        :body_message="bodyMessage"
        :show_button_saved="ShowButtonMessage"
        @confirm="sendRequestUserBlocked"
        >        
    </modal-message-view>
    
    <modal-actions-view
        :message="selectionMessage!"
        >
    </modal-actions-view>
</template>

<style>
    
    .container-message-size {
        min-height: 65vh;
        max-height: 70vh;
    } 
    
    .array-message-size {
        min-height: 30vh !important;
        max-height: 54vh !important;
    }
</style>