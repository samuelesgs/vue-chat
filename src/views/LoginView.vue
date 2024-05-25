<script setup lang="ts">
    import AuthService from "@/services/Auth";
    import ModalMessageView from "../components/modals/ModalMessageView.vue";

    import {ref} from "vue";

    const email = ref('');
    const password = ref('');
    const modalTitle : any = ref(null);
    const modalMessage : any = ref(null);


    async function verifyParams() {
        modalMessage.value = null;
        if (!email.value) {
            setError("Validación formulario", "Ingresa un email");
        } else if (!password.value) {
            setError("Validación formulario", "Ingresa la contraseña");
        } else {
            sendRequest()
        }
    }

    function sendRequest() {
        AuthService.login(email.value, password.value).then(_ => {
            window.location.href = "Home";
        }, reject => {
            setError("Error server", reject);
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
            <div class="col-12 text-center">
                <div class="title">
                    <h3 class="white-text">Login</h3>
                </div>
                <div class="body mt-3">
                    <div class="row center-horizontal mb-2">
                        <div class="col-10">
                            <input
                                class="form-control mb-2 custom-input"
                                type="email"
                                placeholder="Email"
                                v-model="email"
                                name = "email"
                                />
                            <input
                                class="form-control custom-input"
                                type="password"
                                placeholder="Password"
                                v-model="password"
                                name="password"
                                />
                        </div>
                        
                        <div class="col-4 mt-3">
                                <!-- @click="CrudService.login('samuelesgs04@gmail.com')" -->
                                <button
                                    @click="verifyParams()"
                                    class="btn btn-primary form-control">
                                    Iniciar sesion
                                </button>
                                <router-link
                                    to="/register"
                                    class="btn btn-outline-success form-control mt-2"
                                    >Crear cuenta
                                </router-link>
                        </div>
                    </div>
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

    
    
</template>

<style>
    .card-view {
        padding: 1%;
        width: 50%;
        border: 2px solid gray;
        background-color: black;
        border-radius: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>