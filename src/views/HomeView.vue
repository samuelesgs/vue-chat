<script setup  lang="ts">
    import { ref, type Ref } from 'vue';
    
    import MessagesView from '@/components/MessagesView.vue'
    import SideBarView from '@/components/SidebarView.vue'
    import ProfileView from '@/views/ProfileView.vue'
    import MessagesService from '@/services/Messages';
    import type { DataMessages, Message, NewMessage, ResponseMessage, SendMessage } from "@/types/Interfaces";

    import { sendMessage, socket } from "@/socket";

    socket.connect();

    const chats : Ref<DataMessages[] | null> = ref([]);

    const email = localStorage.getItem('email');

    let message = ref('');

    let fileMessage = ref(null);

    const isSelectionProfile = ref(false);

    const chatSelection : Ref<DataMessages | null> = ref(null);

    function syncMessage() {
        MessagesService.sync().then(_ => {
            chats.value = MessagesService.getChats();
        }, reject => {
            console.log(reject);
        });
    }

    function isLoggin() {
        if (email == null) {
            window.location.href = "/";
        }
    }

    async function verifyParams(type : string) {
        if (!message.value && !fileMessage.value) {
            console.log("not send");
        } else {
            if (fileMessage.value) {
                
                const formData = new FormData();
                formData.append('file', fileMessage.value);
                formData.append('emailSendBy', localStorage.getItem('email')!);
                formData.append('emailSendTo', chatSelection.value!.another_email);
                formData.append('messageContent', message.value);
                MessagesService.sendFile(formData).finally( () => {
                    fileMessage.value = null;
                    message.value = '';
                });

            } else if (type == "message") {
                const params : SendMessage = {
                    content : message.value,
                    type : type,
                    send_by : email!,
                    send_to : chatSelection.value!.another_email,
                }
                sendMessage(params);
                fileMessage.value = null;
                message.value = '';
            }
        }
    }

    socket.on('message', (response : ResponseMessage) => {
        pushInformation(response.data)
    });

    function pushInformation(data : Message) {
        const checkChats = chats.value!.find(row => row.another_email == data.send_by || row.another_email == data.send_to);
        if (checkChats) {
            checkChats.messages.push(data);
        } else {
            const chat : DataMessages = {
                another_email : email == data.send_by ? data.send_to : data.send_by,
                another_img : null,
                my_email : email == data.send_by ? data.send_by : data.send_to,
                messages : [data] 
            };
            if (chats.value) {
                chats.value.push(chat);
            } else {
                chats.value = [chat];
            }
        }
        orderChats();
    }

    function orderChats() {
        
    }

    // Lógica adicional para manejar el evento de clic en el mensaje
    const setSelectionProfile = (selection: boolean) => {
        isSelectionProfile.value = selection;
        chatSelection.value = null;
    };

    //chatSelection enviar los mensajes del chat seleccionado
    const setSelectionChat = (chat : DataMessages) => {
        isSelectionProfile.value = false;
        chatSelection.value = chat
    }

    function newChat(data : NewMessage) {
        const params : SendMessage = {
            content : data.message,
            type : 'message',
            send_by : email!,
            send_to : data.send_to,
        };
        sendMessage(params);
    }

    function clickFile() {
        document.getElementById('input-file')!.click();
    }

    function uploadFile(event :any) {
        fileMessage.value = event.target.files[0];
    }
    
    syncMessage();
    isLoggin();
</script>

<template>
    <div class="col-12 overflow-hidden">
        <div class="row">
            <input type="file" id="input-file" @change="uploadFile" hidden>
            <side-bar-view
                :chats="chats"
                class="bg-font no-space col-3"
                @new-chat="newChat"
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
                                @click="clickFile"
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
                                @click="verifyParams('message')"
                                class="mt-3 size-img-send p-1 ms-2"
                                src="@/assets/images/send.png"
                                />                            
                        </div>
                    </div>
                    <div class="row text-center white-text mt-3" v-if="fileMessage">
                        <div class="col no-space">
                            <p>
                                <img
                                    src="@/assets/images/file.png"
                                    class="p-1 me-2 file-send"
                                    /> {{fileMessage != null ? fileMessage['name'] : ''}}
                            </p>
                        </div>
                    </div>
                    <profile-view
                        v-if="isSelectionProfile">
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

    .file-send {
        height: 5vh;
        width: 5vh;
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