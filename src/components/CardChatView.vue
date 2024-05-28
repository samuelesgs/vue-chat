<script setup lang="ts">
    import type { DataMessages } from "@/types/Interfaces";

    const props = defineProps<{
        chat : DataMessages
    }>();

    function getLastMessage() {
        return props.chat.lastMessage!.content;
    }
</script>

<template>
    <div class="col-12 mb-1 bg-row">
        <div class="row p-2">
            <div class="col-2 ms-1">
                <img
                    v-if="!chat.another_img"
                    src="@/assets/images/profile.png"
                    class="img-icon-chat text-start p-1"
                    />
                <img
                    v-if="chat.another_img"
                    :src="`http://localhost:3000/imgUsers/${chat.another_img}`"
                    class="img-icon-chat text-start p-1"
                    />
            </div>
            <div class="col-9 ms-2 mt-1">
                <h5 class="col-12 no-space">
                    {{ props.chat?.another_email }}
                </h5>
                <p class="no-space">{{getLastMessage()}}</p>
            </div>
        </div>
    </div>
</template>

<style>
    .img-icon-chat {
        height: 7vh;
        width: 7vh;
        border-radius: 100%;
        background-color: #ced4da;
    }

    .bg-row {
        background-color: #212121;
    }
</style>