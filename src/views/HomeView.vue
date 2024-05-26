<script setup  lang="ts">
    import SideBarView from '@/components/SidebarView.vue'
    const array : Number[] = [
        0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,30,31,32
    ]
    
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

    isLoggin();
</script>

<template>
    <div class="col-12 overflow-hidden">
        <div class="row">
            <side-bar-view
                :array="array"
                class="bg-font no-space col-3"
                >
            </side-bar-view>
            <div class="col center-horizontal">
                <div class="bg-container col-11 p-3">
                    <h1>HOME</h1>
                    <button @click="closeSession">Close session</button>
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
</style>