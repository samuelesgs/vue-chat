
<script setup lang="ts">
    import CardChatView from './CardChatView.vue';
    const user = getUser();

    defineProps(
        { array : [Number]}
    );

    function getUser() {
        const data = JSON.parse(localStorage.getItem('user_session')!)
        return data['name'] ?? data['email'];
    }
</script>

<template>
    <div class="col-3 side-bar-size overflow-auto-vertical">
        <div class="row">
            <div class="col-12 overflow-hidden header-style">
                <div class="row mt-2 ps-3 pe-2">
                    <h3 class="col-4 white-text">Chat</h3>
                    <div class="col-8 position-settings pe-3">
                        <!-- obtener foto y replazarla -->
                        <img
                            src="@/assets/images/settings.png"
                            class="img-icon-settings text-end"
                            />
                    </div>
                </div>
                <div class="col-12 text-center">
                    <img
                        src="@/assets/images/profile.png"
                        class="img-icon-profile"
                        />
                    <h3 class="mt-2">{{user}}</h3>
                </div>
            </div>        
        </div>
        
        <div class="one-colum mt-2">
            <div class="col-12 ps-2" v-for="row in array">
                <card-chat-view
                    :row="row"
                    >
                </card-chat-view>
            </div>
        </div>
    </div>
</template>

<style>
    .img-icon-settings{
        height: 4vh;
        width: 4vh;
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