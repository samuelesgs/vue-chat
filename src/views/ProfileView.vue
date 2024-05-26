<script setup lang="ts">
    import { ref } from 'vue';

    const email = localStorage.getItem('email')!;
    const password = ref('');

    const name = ref('')

    function getName() {
        const nameJson = JSON.parse(localStorage.getItem('user_session')!)['name'];
        name.value = nameJson ?? '';
    }

    getName()
</script>

<template>
    <div class="row">
        <div class="col-12 text-center">
            <h4 class="mt-2">Configuraciones en perfil</h4>
            <img
                src="@/assets/images/profile.png"
                class="img-icon-profile-2 mt-3"
                />
        </div>
        <div class="col-12">
            <div class="row center-horizontal mt-4">
                <div class="col-5">
                    <input type="email" class="form-control input-text-style" v-model="email">
                </div>
                <div class="col-5">
                    <input type="text" class="form-control input-text-style" v-model="name">
                </div>
            </div>
            <div class="row center-horizontal mt-4">
                <div class="col-5">
                    <input type="text" class="form-control input-text-style" v-model="password"/>
                </div>
            </div>
            <div class="row">
                <div class="col-11 flex-end mt-4">
                    <div class="col-5 flex-end">
                        <button class="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>


<style>
    .img-icon-profile-2 {
        border-radius: 100%;
        padding: 1vh;
        background-color: #ced4da;
        height: 20vh;
        width: 20vh;
    }
</style>