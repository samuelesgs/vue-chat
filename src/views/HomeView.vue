<script setup  lang="ts">
    
    function closeSession() {
        window.location.href = "/";
        localStorage.clear()
    }
    
    function isLoggin() {
        const email = localStorage.getItem('email');
        if (email == null) {
            window.location.href = "/";
        }
    }

    isLoggin();
</script>

<template>

    <h1>HOME</h1>
    <button @click="closeSession">Close session</button>
</template>