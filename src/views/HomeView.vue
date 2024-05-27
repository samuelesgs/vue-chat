<script setup  lang="ts">
    import { ref, type Ref } from 'vue';
    
    import MessagesView from '@/components/MessagesView.vue'
    import SideBarView from '@/components/SidebarView.vue'
    import ProfileView from '@/views/ProfileView.vue'
    import MessagesService from '@/services/Messages';
    import type { DataMessages, Message } from "@/types/Interfaces";

    const chats : Ref<DataMessages[]> = ref([])
    
  /*   const array : any = [
        0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,30,31,32
    ]; */

    function syncMessage() {
        MessagesService.sync().then(_ => {
            chats.value = MessagesService.getChats();
            console.log(chats.value);
            
        }, reject => {
            console.log(reject);
        });
    }
    
    let message = ref('');

    function isLoggin() {
        const email = localStorage.getItem('email');
        if (email == null) {
            window.location.href = "/";
        }
    }

    function verifyParams() {
        if (!message.value) {
            console.log("not send");
            
        } else {
            /* messages.value.push(chatMessage); */
        }
    }

    const isSelectionProfile = ref(false);

    const chatSelection : Ref<DataMessages | null> = ref(null);

    // Lógica adicional para manejar el evento de clic en el mensaje
    const setSelectionProfile = (selection: boolean) => {
        console.log('Message clicked:', selection);
        isSelectionProfile.value = selection;
        chatSelection.value = null;
    };

    //chatSelection enviar los mensajes del chat seleccionado
    const setSelectionChat = (chat : DataMessages) => {
        isSelectionProfile.value = false;
        chatSelection.value = chat
    }
    syncMessage();
    isLoggin();
</script>

<template>
    <div class="col-12 overflow-hidden">
        <div class="row">
            <side-bar-view
                :chats="chats"
                class="bg-font no-space col-3"
                @is-section-profile="setSelectionProfile"
                @selection-chat="setSelectionChat"
                >
            </side-bar-view>
            <div class="col center-horizontal">
                <div class="bg-container col-11 p-3">
                    <messages-view
                        v-if="!isSelectionProfile && chatSelection"
                        :chat="chatSelection"
                        >
                    </messages-view>
                    <div
                        class="row" 
                        v-if="!isSelectionProfile && chatSelection"
                        >
                        <div class="col flex-end  no-space">
                            <img
                                class="mt-3 size-img-send p-1 me-2"
                                src="@/assets/images/file.png"
                                />
                        </div>
                        <div class="col-10 no-space" >
                            <input
                                class="form-control mt-3 input-text-style no-space p-2"
                                v-model="message"
                                type="text"
                                />
                        </div>
                        <div class="col center-vertical no-space">
                            <img
                                @click="verifyParams"
                                class="mt-3 size-img-send p-1 ms-2"
                                src="@/assets/images/send.png"
                                />                            
                        </div>
                    </div>
                    <profile-view v-if="isSelectionProfile">
                    </profile-view>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
    .side-bar-size {
        min-height: 100vh;
        max-height: 100vh;
    }

    .bg-font {
        background-color: #323232;
    }

    .bg-container {
        background-color: #212121;
        min-height: 80vh;
        border-radius: 16px;
    }

    .img-icon-profile { 
        border-radius: 100%;
        padding: 1vh;
        background-color: #ced4da;
        height: 12vh;
        width: 12vh;
    }

    .size-img-send {
        height: 5vh;
        width: 5vh;
        background-color: #2E95A7;
        border-radius: 100%;
    }

    .input-text-style {
        background-color: #323232;
        border: 1px;
        border-color: #2E95A7;
        color: white;
    }

    .input-text-style::placeholder {
        background-color: #323232;
        border: 1px;
        border-color: #2E95A7;
        color: white;
    }

    .input-text-style:focus {
        background-color: #323232;
        border: 1px;
        border-color: #2E95A7;
        color: white;
    }
</style>