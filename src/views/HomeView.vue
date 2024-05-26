<script setup  lang="ts">
    import { ref } from 'vue';
    
    import MessagesView from '@/components/MessagesView.vue'
    import SideBarView from '@/components/SidebarView.vue'
    import ProfileView from '@/views/ProfileView.vue'
    import type { Chats } from '@/types/Interfaces';
    
    const array : any = [
        0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,30,31,32
    ];

    
    const messages = ref([
        {
            message : "Hola",
            property : true,
            date : "2024-05-03 19:11:14",
            user_send : "samuelesgs04@gmail.com",
            user_to : "la_chiquilla@gmail.com"
        },{
            message : "Hola",
            property : false,
            date : "2024-05-03 19:11:30",
            user_send : "la_chiquilla@gmail.com",
            user_to : "samuelesgs04@gmail.com"
        },
        {
            message : "Como estas",
            property : true,
            date : "2024-05-03 19:13:01",
            user_send : "samuelesgs04@gmail.com",
            user_to : "la_chiquilla@gmail.com"
        },
        {
            message : "Espero te encuentres bien",
            property : true,
            date : "2024-05-03 19:13:10",
            user_send : "samuelesgs04@gmail.com",
            user_to : "la_chiquilla@gmail.com"
        },
        {
            message : "Dejame de molestar",
            property : false,
            date : "2024-05-03 19:13:01",
            user_send : "la_chiquilla@gmail.com",
            user_to : "samuelesgs04@gmail.com"
        },
        {
            message : "Tu no eres el de mana",
            property : false,
            date : "2024-05-03 19:13:11",
            user_send : "la_chiquilla@gmail.com",
            user_to : "samuelesgs04@gmail.com"
        },
        {
            message : "Tu no eres el de mana",
            property : false,
            date : "2024-05-03 19:13:11",
            user_send : "la_chiquilla@gmail.com",
            user_to : "samuelesgs04@gmail.com"
        },
        {
            message : "Tu no eres el de mana",
            property : false,
            date : "2024-05-03 19:13:11",
            user_send : "la_chiquilla@gmail.com",
            user_to : "samuelesgs04@gmail.com"
        },
        {
            message : "Tu no eres el de mana",
            property : false,
            date : "2024-05-03 19:13:11",
            user_send : "la_chiquilla@gmail.com",
            user_to : "samuelesgs04@gmail.com"
        },{
            message : "Tu no eres el de mana",
            property : false,
            date : "2024-05-03 19:13:11",
            user_send : "la_chiquilla@gmail.com",
            user_to : "samuelesgs04@gmail.com"
        },{
            message : "Tu no eres el de mana",
            property : false,
            date : "2024-05-03 19:13:11",
            user_send : "la_chiquilla@gmail.com",
            user_to : "samuelesgs04@gmail.com"
        },{
            message : "Tu no eres el de mana",
            property : false,
            date : "2024-05-03 19:13:11",
            user_send : "la_chiquilla@gmail.com",
            user_to : "samuelesgs04@gmail.com"
        },{
            message : "Tu no eres el de mana",
            property : false,
            date : "2024-05-03 19:13:11",
            user_send : "la_chiquilla@gmail.com",
            user_to : "samuelesgs04@gmail.com"
        },{
            message : "Tu no eres el de mana",
            property : false,
            date : "2024-05-03 19:13:11",
            user_send : "la_chiquilla@gmail.com",
            user_to : "samuelesgs04@gmail.com"
        },
    ]);

    let message = ref(null)
    
    function closeSession() {
        window.location.href = "/";
        localStorage.clear()
    }
    
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
            const chatMessage :Chats = {
                message : message.value,
                property : true,
                date : "2024-05-26 13:10:15",
                user_send : localStorage.getItem('email')!,
                user_to : "la_chiquilla@gmail.com",
            }
            messages.value.push(chatMessage);
        }
    }

    const isSelectionProfile = ref(false);

    const chatSelection = ref();

    const setSelectionProfile = (selection: boolean) => {
        console.log('Message clicked:', selection);
        isSelectionProfile.value = selection;
    // Lógica adicional para manejar el evento de clic en el mensaje
    };

    const setSelectionChat = (chat : any) => {
        isSelectionProfile.value = false;
        chatSelection.value = chat
        //chatSelection enviar los mensajes del chat seleccionado
    }

    isLoggin();
</script>

<template>
    <div class="col-12 overflow-hidden">
        <div class="row">
            <side-bar-view
                :array="array"
                class="bg-font no-space col-3"
                @is-section-profile="setSelectionProfile"
                @selection-chat="setSelectionChat"
                >
            </side-bar-view>
            <div class="col center-horizontal">
                <div class="bg-container col-11 p-3">
                    <messages-view
                        v-if="!isSelectionProfile"
                        :messages="messages"
                        >
                    </messages-view>
                    <div
                        class="row" 
                        v-if="!isSelectionProfile"
                        >
                        <div class="col flex-end  no-space">
                            <img
                                class="mt-3 size-img-send p-1 me-2"
                                src="@/assets/images/file.png"
                                />
                        </div>
                        <div class="col-10 no-space">
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
                    <!-- <h1>HOME</h1>
                    <button @click="closeSession">Close session</button> -->
                </div>
            </div>
        </div>
    </div>
</template>


<style>
    .side-bar-size {
        min-height: 90vh;
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