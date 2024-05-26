<script setup lang="ts">
    defineProps({
        /* row : {} */
        row : Number 
    })
</script>


<template>

    <div class="col-12 mb-1 bg-row">
        <div class="row p-2">
            <div class="col-2 ms-1">
                <img
                    src="@/assets/images/profile.png"
                    class="img-icon-chat text-start p-1"
                    />
            </div>
            <div class="col ms-2 mt-1">
                <h5 class="col-12 no-space">
                    Nombre
                </h5>
                <p class="no-space">Last message</p>
            </div>
        </div>
    </div>
</template>

<style>
    .img-icon-chat{
        height: 7vh;
        width: 7vh;
        border-radius: 100%;
        background-color: #ced4da;
    }

    .bg-row {
        background-color: #212121;
    }
</style>