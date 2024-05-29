
<script setup lang="ts">
    import { ref, type Ref } from 'vue';
    import CardChatView from './CardChatView.vue';
    import type { DataMessages, NewMessage } from "@/types/Interfaces";
    import ModalAddChatView from './modals/ModalAddChatView.vue'
    const user = getUser();

    const props = defineProps<{
        chats : DataMessages[] | null
    }>();

    const isSectionProfile = ref(false);

    const emit = defineEmits(['isSectionProfile','selectionChat', 'newChat']);

    const img : Ref<String | null> = ref(null);

    function selectionProfile() {
        isSectionProfile.value = true;
        emit('isSectionProfile', isSectionProfile.value)
    }

    function selectionChat(row : DataMessages) {
        emit('selectionChat', row)
    }

    function getUser() {
        return localStorage.getItem('name') ?? localStorage.getItem('email');
    }

    function closeSession() {
        localStorage.clear();
        window.location.href = "/";
    }

    function addChat() {
        document.getElementById('button-open-modal-add')!.click();
    }

    function setDataNewMessage(data : NewMessage) {
        if (data.send_to && data.message) {
            emit('newChat',data);
        }
    }

    function urlImage() {
        const imgSession = localStorage.getItem('img');
        img.value = imgSession;
    }

    urlImage();
</script>

<template>
    <div class="col-3 side-bar-size">
        <div class="row no-space">
            <div class="col-12 overflow-hidden header-style">
                <div class="row mt-2 ps-3 pe-2">
                    <h3 class="col-4 white-text">Chat</h3>
                    <div class="offset-3 col">
                        <div class="row offset-1">
                            <div
                                class="col-5"
                                @click="addChat"
                                >
                                <img
                                    src="@/assets/images/message.png"
                                    class="img-icon-settings text-end"
                                    />
                            </div>
                            
                        <div
                            id="dropdownMenuButton"
                            class="col-7 position-settings dropdown-toggle pe-3"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            >
                        <!-- obtener foto y replazarla -->
                            <img
                                src="@/assets/images/settings.png"
                                class="img-icon-settings text-end"
                                />
                                <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li @click="selectionProfile"><p class="dropdown-item">Perfil</p></li>
                                    <li @click="closeSession"><p class="dropdown-item">Cerrar sesión</p></li>
                                </ul>
                        </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 text-center">
                    <!-- :src="img ? `http://localhost:3000/imgUsers/${img}` : '../assets/images/profile.png'" -->
                    <img
                        v-if="!img"
                        src="@/assets/images/profile.png"
                        class="img-icon-profile"
                        @click="selectionProfile"
                        />
                    <img
                        v-if="img"
                        :src="`http://localhost:3000/imgUsers/${img}`"
                        class="img-icon-profile"
                        @click="selectionProfile"
                        />
                    <h3 class="mt-2">{{user}}</h3>
                </div>
            </div>        
        </div>
        
        <div
            class="one-colum mt-2 overflow-auto-vertical messages-size"
            >
            <div
                class="col-12 ps-2"
                v-if="props.chats"
                v-for="row in props.chats"
                >
                <div
                    @click="selectionChat(row)"
                    class="col-12"
                    >
                    <card-chat-view
                        :chat="row"
                        >
                    </card-chat-view>
                </div>
            </div>
        </div>
        <modal-add-chat-view
            @newChat="setDataNewMessage"
            >
        </modal-add-chat-view>
    </div>
</template>

<style>
    .img-icon-settings{
        height: 4vh;
        width: 4vh;
    }

    .messages-size {
        min-height: 60vh;
        max-height: 74vh;
    }

    .header-style {
        background-color: #2E95A7;
        border-bottom-left-radius: 8%;
        border-bottom-right-radius: 8%;
    }

    .position-settings {
        align-items: center;
        display: flex;
        justify-content: end;
    }

    .overflow-auto-vertical {
        overflow-y: auto;
        overflow-x: hidden;
    }

</style>