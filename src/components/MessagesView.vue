<script setup lang="ts">
    import { type Chats } from '@/types/Interfaces';
    import RowMessageView from './RowMessageView.vue';

    const array : Chats[] = [
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
    ];

</script>

<template>
    <div class="row container-message-size overflow-auto">
        <row-message-view
            v-for="row in array"
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