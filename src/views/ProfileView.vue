<script setup lang="ts">
    import { ref, type Ref } from 'vue';
    import UserService from '@/services/User';
    import UserBlocked from '@/services/UserBlocked';

    const email = localStorage.getItem('email')!;
    const imgProfile = ref(localStorage.getItem('img'));
    const name = ref('')

    const listUserBlocked : Ref<string[] | null> = ref([]);

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

    function getUsersBlocked() {
        UserBlocked.getList().then(_ => {
            listUserBlocked.value = UserBlocked.getUsersBlocked();
        }, _ => {});
    }

    function sendRequestBlocked(email : string) {
        UserBlocked.sendRequestRemove(email).then(_ => {
            listUserBlocked.value = UserBlocked.getUsersBlocked()
        }, _ => {});
    }

    getUsersBlocked();
    getName()
</script>

<template>

    <input
        id="input-file-profile"    
        type="file"
        @change="uploadFile"
        hidden
        />
    <div class="row">
        <div class="col-12 text-center">
            <h4 class="mt-2">Configuraciones en perfil</h4>
            <div class="image-container">
                <img
                    src="@/assets/images/dark-settings.png"
                    class="icon-overlay"
                    />
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
        </div>
        <div class="col-12">
            <div class="row center-horizontal mt-4">
                <div class="col-5">
                    <input
                        type="email"
                        class="form-control input-text-style"
                        v-model="email"
                        disabled
                        />
                </div>
                <div class="col-5">
                    <input
                        type="text"
                        class="form-control input-text-style"
                        v-model="name"
                        disabled
                        />
                </div>
            </div>
        </div>
        <h4 class="text-center mt-4 mb-3">Usuarios bloqueados</h4>
        <div class="container-table d-flex justify-content-center">
            <div class="col-8">
                <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th
                            style="width: 75%;">
                            Correo
                        </th>
                        <th
                            style="width: 25%;"
                            class="text-center"
                            >
                            
                        </th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="row in listUserBlocked">
                        <td>
                            {{row}}
                        </td>
                        <td class="text-center">
                            <button
                                @click="sendRequestBlocked(row)"
                                class="btn btn-success"
                                >Desbloquear
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
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

    .image-container {
        position: relative;
        display: inline-block;
    }

    .icon-overlay {
        position: absolute;
        top: 17vh; /* Ajusta la posición según tus necesidades */
        right: 1vh; /* Ajusta la posición según tus necesidades */
        width: 5vh; /* Ajusta el tamaño según tus necesidades */
        height: 5vh; /* Ajusta el tamaño según tus necesidades */
    }

    .container-table {
        max-height: 30vh;
    }
</style>