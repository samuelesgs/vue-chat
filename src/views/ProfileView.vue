<script setup lang="ts">
    import { ref } from 'vue';
    import UserService from '@/services/User';

    const email = localStorage.getItem('email')!;
    const imgProfile = ref(localStorage.getItem('img'));
    const name = ref('')

    function getName() {
        const nameJson = localStorage.getItem('name');
        name.value = nameJson ?? '';
    }

    function uploadFile(event :any) {
        const fileProfile = event.target.files[0];
        const formData = new FormData();
        formData.append('file', fileProfile);
        UserService.fileProfile(formData).then(_ => {
            imgProfile.value = localStorage.getItem('img')!;
        }, reject => {
            console.log(reject);
        });
    }

    function clickFile() {
        document.getElementById('input-file-profile')!.click();
    }
    getName()
</script>

<template>

    <input type="file" id="input-file-profile" @change="uploadFile" hidden>
    <div class="row">
        <div class="col-12 text-center">
            <h4 class="mt-2">Configuraciones en perfil</h4>
            <img
                v-if="imgProfile"
                @click="clickFile"
                :src="`http://localhost:3000/imgUsers/${imgProfile}`"
                class="img-icon-profile-2 mt-3"
                />
            <img
                v-if="!imgProfile"
                @click="clickFile"
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