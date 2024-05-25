
<script setup lang="ts">

  defineProps(
    {
      title : String,
      body_message : String,
      show_button_saved : Boolean
    }
  )
</script>
<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary"  id="button-open-modal" data-bs-toggle="modal" data-bs-target="#modalMessage" hidden>
    Launch demo modal
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
            >{{title}}</h1>
          <button
            type="button"
            class="btn-close btn-close-white"
            data-bs-dismiss="modal"
            aria-label="Close"
            >
          </button>
        </div>
        <div class="modal-body">
          {{ body_message }}
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
            v-if="show_button_saved"
            >Save changes
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