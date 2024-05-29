
<script setup lang="ts">

  const props = defineProps(
    {
      title : String,
      body_message : String,
      show_button_saved : Boolean
    }
  );

  const emit = defineEmits(['confirm']);

  function setConfirm() {
    emit('confirm', true);
  }
</script>

<template>
  <!-- Button trigger modal -->
  <button
    id="button-open-modal"
    data-bs-toggle="modal"
    data-bs-target="#modalMessage"
    hidden
    class="btn btn-primary"
    type="button"
    >
  </button>

  <!-- Modal -->
  <div
    class="modal fade modal-center"
    id="modalMessage"
    tabindex="-1"
    aria-hidden="true"
    >
    <div class="modal-dialog">
      <div class="modal-content bg-background">
        <div class="modal-header">
          <h1
            class="modal-title fs-5 white-text"
            >{{props.title}}</h1>
          <button
            id="button-close-modal-message"
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
            >
          </button>
        </div>
        <div class="modal-body">
          {{ props.body_message }}
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
            >Close
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="setConfirm"
            v-if="props.show_button_saved"
            >Guardar cambios
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