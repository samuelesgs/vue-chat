<script setup lang="ts">
    import AuthService from "@/services/Auth";
    import {ref} from "vue";
    import ModalMessageView from "../components/modals/ModalMessageView.vue";

    const email = ref('');
    const password = ref('');
    const name = ref('');

    const modalTitle : any = ref(null);
    const modalMessage : any = ref(null);

    async function verifyParams() {
        modalMessage.value = null;
        if (!email.value.trim()) {
            setError("Validación formulario", "Ingresa un correo");
        } else if (!password.value.trim()) {
            setError("Validación formulario", "Ingresa la contraseña");
        } else {
            sendRequest()
        }
    }
    
    function sendRequest() {
        AuthService.create(email.value.trim(), password.value.trim(), name.value.trim()).then(_ => {
            window.location.href = "/";
        }, reject => {
            setError("Error en el servidor:",reject)
        });
    }

    function setError(title : string, error : string) {
        modalTitle.value = title;
        modalMessage.value = error;
        document.getElementById('button-open-modal')!.click();
        console.log(error);
    }
    
    function isLoggin() {
        const email = localStorage.getItem('email');
        if (email != null) {
            window.location.href = "Home";
        }
    }
    isLoggin();
</script>

<template>
    <div class="container flex-center transparent">
        <div class="card-view row">
            <div class="flex-right ms-4 mt-3">
                <router-link to="/">
                    <img src="@/assets/images/back.png" class="img-icon-back">

                </router-link>
            </div>
            <div class="col-12 text-center">
                <div class="title mb-3">
                    <h3 class="white-text">Registro</h3>
                </div>
                <div class="body mt-3">
                    <div class="row center-horizontal mb-3">
                        <img
                            src="@/assets/images/profile.png"
                            class="img-icon-profile"
                            />
                        <div class="col-10 mt-4">
                            <input
                                class="form-control mb-3 custom-input"
                                type="email"
                                placeholder="Correo"
                                v-model="email"
                                name = "email"
                                />
                            <input
                                class="form-control custom-input mb-3"
                                type="text"
                                placeholder="Nombre"
                                v-model="name"
                                name = "name"
                                />
                            <input
                                class="form-control custom-input"
                                type="password"
                                placeholder="Contraseña"
                                v-model="password"
                                name = "password"
                                />
                        </div>
                        
                        <div class="col-4 mt-3">
                                <!-- @click="CrudService.login('samuelesgs04@gmail.com')" -->
                                <button
                                    @click="verifyParams()"
                                    class="btn btn-outline-success form-control mt-2"
                                    >Crear cuenta
                                </button>
                        </div>
                        <ModalMessageView
                            :title="modalTitle"
                            :body_message="modalMessage"
                            :show_button_saved="false"
                            >
                        </ModalMessageView>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .card-view {
        padding: 1%;
        width: 40%;
        border: 2px solid gray;
        background-color: black;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .img-icon-profile { 
        border-radius: 100%;
        padding: 1vh;
        background-color: #ced4da;
        height: 15vh;
        width: 15vh;
    }

    .img-icon-back {
        height: 5vh;
        width: 5vh;
    }
</style>