
<script setup lang="ts">
  import type { NewMessage } from '@/types/Interfaces';
  import { ref } from 'vue';
  import UserService from '@/services/User';

  const message = ref('');
  const email = ref('');

  const showError = ref(false);
  const error = ref('');

  const emit = defineEmits(['newChat']);
  
  function sendNewChat() {

    if (email.value == localStorage.getItem('email')!) {
      error.value = 'No puedes enviarte mensajes a ti mismo';
      showError.value = true;
      return ;
    }
    showError.value = false;
    UserService.findByEmail(email.value).then( response => {
      returnMessage()
    }, (reject  : string ) => {
      console.log(reject);
      
      if (!reject.includes("Failed request create message, details: You have blocked user")) {
        error.value = 'Usuario no encontrado, primero debe registrarse para poder enviarle mensajes';
      } else {
        error.value = reject;
      }
      showError.value = true;
    });
  }

  function returnMessage() {
    if (email.value.trim() && message.value.trim()) {
        const newChat : NewMessage = {
          'send_to' : email.value.trim(),
          'message' : message.value.trim(),
        }
        document.getElementById('button-close-add')!.click()
        emit('newChat',newChat);
      } else {
        error.value = "Verifica el correo y el mensaje, no deben ser vacios";
        showError.value = true;
      } 
  }
</script>

<template>
  <!-- Button trigger modal -->
  <button
    id="button-open-modal-add"
    data-bs-toggle="modal"
    data-bs-target="#modalAddChat"
    hidden
    class="btn btn-primary"
    type="button"
    >
  </button>

  <!-- Modal -->
  <div
    class="modal fade modal-center"
    id="modalAddChat"
    tabindex="-1"
    aria-hidden="true"
    >
    <div class="modal-dialog">
      <div class="modal-content bg-background">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 white-text"
            >Nuevo chat</h1>
          <button
            id="button-close-add"
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
            >
          </button>
        </div>
        <div class="modal-body">
          <input
            type="email"
            placeholder="Correo"
            class="form-control input-text-style" 
            v-model="email"
            />
          <input
            type="text"
            placeholder="Mensaje"
            class="form-control input-text-style mt-3" 
            v-model="message"
            />
            <div class="alert alert-danger mt-3" role="alert" v-if="showError">
              {{ error }}
            </div>
        </div>
        <div class="modal-footer">
          <button
            @click="sendNewChat"
            type="button"
            class="btn btn-primary"
            >Enviar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

  .bg-background {
    background-color: var(--vt-c-black-mute);
  }

  .modal-center {
    margin-top: calc(100vh / 3);
  }
</style>