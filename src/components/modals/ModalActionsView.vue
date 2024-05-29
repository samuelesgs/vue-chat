
<script setup lang="ts">
    import MessagesService from '@/services/Messages';
    import type { Message } from '@/types/Interfaces';

    const props = defineProps<{
        message : Message
    }> ();

    const emit = defineEmits(['selectionMessage']);

    function downloadFile() {
        MessagesService.downloadFile(props.message.filename!);
        document.getElementById('button-close-actions')!.click();
    }

    function deleteMessage() {
        MessagesService.delete(props.message._id).then(_ => {
            props.message.delete = 1;
            document.getElementById('button-close-actions')!.click();
        }, _ => { });
    }

</script>

<template>
    <!-- Button trigger modal -->
    <button
      id="button-open-modal-actions"
      data-bs-toggle="modal"
      data-bs-target="#modalActions"
      hidden
      class="btn btn-primary"
      type="button"
      >
    </button>
  
    <!-- Modal -->
    <div
      class="modal fade modal-center"
      id="modalActions"
      tabindex="-1"
      aria-hidden="true"
      >
      <div class="modal-dialog">
        <div class="modal-content bg-background">
          <div class="modal-header">
            <h1
              class="modal-title fs-5 white-text"
              >Acciones de seleccionar mensaje</h1>
            <button
              id="button-close-actions"
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
              >
            </button>
          </div>
          <div class="modal-footer">
            <button
                v-if="props.message?.type!='message'"
                type="button"
                class="btn btn-success"
                @click="downloadFile"
                >Descargar
            </button>
            <button
              type="button"
              class="btn btn-danger"
              @click="deleteMessage"
              >Eliminar
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